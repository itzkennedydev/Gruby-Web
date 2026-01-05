/**
 * Shared Shopping List Page
 *
 * Airbnb-inspired design with:
 * - Hero section with gradient overlay
 * - Floating header with logo
 * - Clean card-based item layout
 * - Sticky action bar
 */

'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Image from 'next/image';

// Design System: Brand Red for primary
const BRAND_COLOR = '#ff1e00';

interface ShoppingListItem {
  name: string;
  quantity: number;
  unit: string;
  checked: boolean;
  cost: number;
  category?: string;
}

interface ShoppingListData {
  name: string;
  items: ShoppingListItem[];
  total: number;
  createdAt: string;
  sharedBy?: string;
}

export default function SharedShoppingListPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const listId = params.id as string;
  const [listData, setListData] = useState<ShoppingListData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchListData = async () => {
      try {
        const response = await fetch(`/api/shopping-list/${listId}`);

        if (response.ok) {
          const data = await response.json();
          setListData(data);
        } else {
          const dataParam = searchParams.get('data');
          if (dataParam) {
            const decoded = JSON.parse(decodeURIComponent(dataParam));
            setListData(decoded);
          } else {
            setError('Shopping list not found');
          }
        }
      } catch (err) {
        const dataParam = searchParams.get('data');
        if (dataParam) {
          try {
            const decoded = JSON.parse(decodeURIComponent(dataParam));
            setListData(decoded);
          } catch (parseErr) {
            setError('Unable to load shopping list');
          }
        } else {
          setError('Unable to load shopping list');
        }
      } finally {
        setLoading(false);
      }
    };

    if (listId) {
      fetchListData();
    }
  }, [listId, searchParams]);

  // Intelligent category detection
  const detectCategory = (itemName: string): string => {
    const name = itemName.toLowerCase();
    const categories: Record<string, string[]> = {
      'Produce': ['apple', 'banana', 'orange', 'tomato', 'lettuce', 'onion', 'garlic', 'pepper', 'carrot', 'celery', 'broccoli', 'spinach', 'potato', 'lemon', 'lime', 'avocado', 'cucumber', 'mushroom', 'zucchini', 'squash', 'kale', 'cabbage', 'corn', 'asparagus', 'green bean', 'pea', 'fruit', 'vegetable', 'herb', 'basil', 'cilantro', 'parsley', 'mint', 'thyme', 'rosemary'],
      'Dairy & Eggs': ['milk', 'cheese', 'butter', 'cream', 'yogurt', 'egg', 'sour cream', 'cottage', 'ricotta', 'mozzarella', 'cheddar', 'parmesan', 'feta'],
      'Meat & Seafood': ['chicken', 'beef', 'pork', 'fish', 'salmon', 'shrimp', 'turkey', 'bacon', 'sausage', 'ham', 'steak', 'ground', 'lamb', 'tuna', 'crab', 'lobster', 'cod', 'tilapia'],
      'Bakery': ['bread', 'bagel', 'muffin', 'croissant', 'roll', 'bun', 'tortilla', 'pita', 'baguette', 'cake', 'pastry'],
      'Pantry': ['rice', 'pasta', 'flour', 'sugar', 'oil', 'vinegar', 'sauce', 'broth', 'stock', 'can', 'bean', 'lentil', 'cereal', 'oat', 'honey', 'syrup', 'salt', 'pepper', 'spice', 'seasoning'],
      'Frozen': ['frozen', 'ice cream', 'pizza', 'waffle'],
      'Beverages': ['water', 'juice', 'soda', 'coffee', 'tea', 'wine', 'beer', 'drink'],
      'Snacks': ['chip', 'cracker', 'cookie', 'candy', 'chocolate', 'nut', 'popcorn', 'pretzel'],
    };

    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => name.includes(keyword))) {
        return category;
      }
    }
    return 'Other';
  };

  // Group items by category
  const groupByCategory = (items: ShoppingListItem[]) => {
    const categoryGroups: Record<string, ShoppingListItem[]> = {};
    const categoryOrder = ['Produce', 'Dairy & Eggs', 'Meat & Seafood', 'Bakery', 'Pantry', 'Frozen', 'Beverages', 'Snacks', 'Other'];

    items.forEach(item => {
      const category = item.category || detectCategory(item.name);
      if (!categoryGroups[category]) {
        categoryGroups[category] = [];
      }
      categoryGroups[category].push(item);
    });

    // Sort by category order
    const sortedGroups: Record<string, ShoppingListItem[]> = {};
    categoryOrder.forEach(cat => {
      if (categoryGroups[cat]) {
        sortedGroups[cat] = categoryGroups[cat];
      }
    });
    // Add any remaining categories
    Object.keys(categoryGroups).forEach(cat => {
      if (!sortedGroups[cat]) {
        sortedGroups[cat] = categoryGroups[cat];
      }
    });

    return sortedGroups;
  };

  
  const handleImportToApp = () => {
    if (!listData) return;

    const data = encodeURIComponent(JSON.stringify(listData));
    const deepLink = `gruby://shopping-list/import?data=${data}`;

    window.location.href = deepLink;

    setTimeout(() => {
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const isAndroid = /Android/.test(navigator.userAgent);

      if (isIOS) {
        window.location.href = 'https://apps.apple.com/app/gruby';
      } else if (isAndroid) {
        window.location.href = 'https://play.google.com/store/apps/details?id=com.gruby.app';
      } else {
        alert('Please download the Gruby app to import this shopping list.');
      }
    }, 500);
  };

  const handleSharePage = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: listData?.name || 'Shopping List',
          text: `Check out this shopping list on Gruby`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      } catch (error) {
        console.error('Failed to copy link:', error);
      }
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return '';
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p style={styles.loadingText}>Loading your list...</p>
        </div>
      </div>
    );
  }

  if (error || !listData) {
    return (
      <div style={styles.container}>
        <div style={styles.errorContainer}>
          <div style={styles.errorIcon}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          </div>
          <h1 style={styles.errorTitle}>List Not Found</h1>
          <p style={styles.errorText}>
            {error || 'This shopping list may have been deleted or is no longer available.'}
          </p>
          <a href="/" style={styles.errorLink}>
            Go to Gruby.app
          </a>
        </div>
      </div>
    );
  }

  const categoryGroups = groupByCategory(listData.items);
  const totalItems = listData.items.length;

  const calculatedTotal = listData.items.reduce((sum, item) => {
    return sum + (item.cost || 0);
  }, 0);

  const displayTotal = Math.abs(calculatedTotal - listData.total) > 0.01
    ? calculatedTotal
    : listData.total;

  const itemsWithPrice = listData.items.filter(item => item.cost && item.cost > 0).length;

  return (
    <>
      <div style={styles.container}>
        {/* Floating Header */}
        <header className="floating-header" style={styles.floatingHeader}>
          <Image
            src="/GrubyLogo.svg"
            alt="Gruby"
            width={90}
            height={24}
            priority
          />
          <button
            onClick={handleSharePage}
            style={styles.headerShareButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F0F0F0';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
            }}
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path
                d="M15 6.667a2.5 2.5 0 1 0-1.875-2.4L7.5 7.5a2.5 2.5 0 1 0 0 3.333l5.625 3.233a2.5 2.5 0 1 0 .625-1.733l-5.625-3.233a2.5 2.5 0 0 0 0-1.667l5.625-3.233A2.5 2.5 0 0 0 15 6.667z"
                stroke="#222222"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </header>

        {/* Hero Section */}
        <div className="hero-section" style={styles.heroSection}>
          <div style={styles.heroContent}>
            <div style={styles.heroIconWrapper}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
            </div>
            {listData.sharedBy && (
              <p style={styles.heroSubtitle}>Shared by {listData.sharedBy}</p>
            )}
            <h1 className="list-title" style={styles.heroTitle}>{listData.name}</h1>
            <div style={styles.heroMeta}>
              <span style={styles.heroMetaItem}>{totalItems} items</span>
              <span style={styles.heroMetaDot}>·</span>
              <span style={styles.heroMetaItem}>${displayTotal.toFixed(2)} est.</span>
            </div>
          </div>
        </div>

        {/* Summary Card */}
        <div style={styles.summaryCard}>
          <div style={styles.summaryRow}>
            <div style={styles.summaryColumn}>
              <p style={styles.summaryLabel}>Estimated Total</p>
              <p style={styles.summaryValue}>${displayTotal.toFixed(2)}</p>
            </div>
            <div style={styles.summaryDivider} />
            <div style={styles.summaryColumn}>
              <p style={styles.summaryLabel}>Items</p>
              <p style={styles.summaryValue}>{totalItems}</p>
            </div>
            <div style={styles.summaryDivider} />
            <div style={styles.summaryColumn}>
              <p style={styles.summaryLabel}>Priced</p>
              <p style={styles.summaryValue}>{itemsWithPrice}</p>
            </div>
          </div>
        </div>

        {/* Shopping List Items */}
        <div className="content-wrapper" style={styles.content}>
          {Object.entries(categoryGroups).map(([category, items]) => (
            <div key={category} className="category-card" style={styles.categoryCard}>
              <div style={styles.categoryHeader}>
                <span style={styles.categoryTitle}>{category}</span>
                <span style={styles.categoryCount}>{items.length}</span>
              </div>

              <div style={styles.itemsList}>
                {items.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      ...styles.itemRow,
                      borderBottom: index === items.length - 1 ? 'none' : '1px solid #F5F5F5',
                    }}
                  >
                    <div style={styles.itemContent}>
                      <p style={styles.itemName}>{item.name}</p>
                      <p style={styles.itemQuantity}>
                        {item.quantity} {item.unit}
                      </p>
                    </div>
                    <div style={styles.itemPrice}>
                      {item.cost && item.cost > 0 ? (
                        `$${item.cost.toFixed(2)}`
                      ) : (
                        <span style={styles.itemPriceEmpty}>—</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        {listData.createdAt && (
          <div style={styles.infoSection}>
            <p style={styles.infoText}>
              Created on {formatDate(listData.createdAt)}
            </p>
          </div>
        )}

        {/* Bottom Padding for Fixed Button */}
        <div style={styles.bottomPadding} />

        {/* Sticky Action Bar */}
        <div style={styles.stickyActionBar}>
          <div style={styles.actionBarContent}>
            <div style={styles.actionBarInfo}>
              <p style={styles.actionBarTitle}>Get Gruby</p>
              <p style={styles.actionBarSubtitle}>Import & start shopping</p>
            </div>
            <button
              onClick={handleImportToApp}
              style={styles.importButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Open in App
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          background-color: #F7F7F7;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @media print {
          .no-print {
            display: none !important;
          }
        }

        /* Responsive Design - Tablet (768px+) */
        @media (min-width: 768px) {
          .hero-section {
            height: 280px !important;
          }
          .content-wrapper {
            max-width: 680px !important;
            padding: 0 32px !important;
          }
          .category-card {
            padding: 20px !important;
          }
          .list-title {
            font-size: 28px !important;
          }
          .item-row {
            padding: 14px 0 !important;
          }
          .sticky-bar {
            padding: 20px 32px !important;
          }
          .action-bar-content {
            max-width: 680px !important;
          }
        }

        /* Responsive Design - Desktop (1024px+) */
        @media (min-width: 1024px) {
          .hero-section {
            height: 320px !important;
            border-radius: 0 0 24px 24px !important;
          }
          .content-wrapper {
            max-width: 720px !important;
            padding: 0 40px !important;
            margin-top: -40px !important;
          }
          .category-card {
            padding: 24px !important;
            border-radius: 20px !important;
          }
          .list-title {
            font-size: 32px !important;
          }
          .floating-header {
            padding: 16px 40px !important;
          }
          .action-bar-content {
            max-width: 720px !important;
          }
          .action-button {
            padding: 14px 32px !important;
            font-size: 16px !important;
          }
        }

        /* Large Desktop (1280px+) - Centered layout */
        @media (min-width: 1280px) {
          .hero-section {
            max-width: 1200px;
            margin: 0 auto;
          }
          .content-wrapper {
            max-width: 800px !important;
          }
          .action-bar-content {
            max-width: 800px !important;
          }
        }
      `}</style>
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#F7F7F7',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    gap: '16px',
    backgroundColor: '#FFFFFF',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '3px solid #F0F0F0',
    borderTop: `3px solid ${BRAND_COLOR}`,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    fontSize: '15px',
    color: '#717171',
    fontWeight: '500',
  },
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '40px',
    textAlign: 'center',
    backgroundColor: '#FFFFFF',
  },
  errorIcon: {
    width: '80px',
    height: '80px',
    borderRadius: '40px',
    backgroundColor: '#F5F5F5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '24px',
  },
  errorTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#222222',
    marginBottom: '12px',
    margin: 0,
  },
  errorText: {
    fontSize: '15px',
    color: '#717171',
    lineHeight: '22px',
    marginBottom: '24px',
  },
  errorLink: {
    fontSize: '15px',
    fontWeight: '600',
    color: BRAND_COLOR,
    textDecoration: 'none',
  },
  floatingHeader: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 20px',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
  },
  headerShareButton: {
    width: '36px',
    height: '36px',
    borderRadius: '18px',
    border: '1px solid #EBEBEB',
    backgroundColor: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  heroSection: {
    background: `linear-gradient(135deg, ${BRAND_COLOR} 0%, #3d3d3d 100%)`,
    paddingTop: '80px',
    paddingBottom: '40px',
    paddingLeft: '20px',
    paddingRight: '20px',
  },
  heroContent: {
    maxWidth: '600px',
    margin: '0 auto',
    textAlign: 'center',
  },
  heroIconWrapper: {
    width: '64px',
    height: '64px',
    borderRadius: '16px',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px',
  },
  heroSubtitle: {
    fontSize: '14px',
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.7)',
    margin: 0,
    marginBottom: '8px',
  },
  heroTitle: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#FFFFFF',
    margin: 0,
    marginBottom: '12px',
    lineHeight: '34px',
  },
  heroMeta: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  heroMetaItem: {
    fontSize: '14px',
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  heroMetaDot: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.5)',
  },
  summaryCard: {
    maxWidth: '600px',
    margin: '-20px auto 0',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '0 20px',
    position: 'relative',
    zIndex: 10,
  },
  summaryRow: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
  },
  summaryColumn: {
    flex: 1,
    textAlign: 'center',
  },
  summaryDivider: {
    width: '1px',
    height: '40px',
    backgroundColor: '#EBEBEB',
  },
  summaryLabel: {
    fontSize: '12px',
    fontWeight: '500',
    color: '#717171',
    margin: 0,
    marginBottom: '4px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  summaryValue: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#222222',
    margin: 0,
  },
  content: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '24px 20px',
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: '16px',
    marginBottom: '16px',
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
  },
  categoryHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 20px',
    backgroundColor: '#FAFAFA',
    borderBottom: '1px solid #F0F0F0',
  },
  categoryTitle: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#222222',
    flex: 1,
  },
  categoryCount: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#717171',
    backgroundColor: '#F0F0F0',
    paddingLeft: '8px',
    paddingRight: '8px',
    paddingTop: '4px',
    paddingBottom: '4px',
    borderRadius: '12px',
  },
  itemsList: {
    padding: '0',
  },
  itemRow: {
    display: 'flex',
    alignItems: 'center',
    padding: '16px 20px',
    gap: '12px',
  },
  itemContent: {
    flex: 1,
    minWidth: 0,
  },
  itemName: {
    fontSize: '15px',
    fontWeight: '500',
    color: '#222222',
    margin: 0,
    marginBottom: '2px',
  },
  itemQuantity: {
    fontSize: '13px',
    color: '#717171',
    margin: 0,
  },
  itemPrice: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#222222',
    flexShrink: 0,
  },
  itemPriceEmpty: {
    color: '#CCCCCC',
  },
  infoSection: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '0 20px 24px',
    textAlign: 'center',
  },
  infoText: {
    fontSize: '13px',
    color: '#999999',
    margin: 0,
  },
  bottomPadding: {
    height: '100px',
  },
  stickyActionBar: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTop: '1px solid #EBEBEB',
    padding: '16px 20px',
    paddingBottom: 'max(16px, env(safe-area-inset-bottom))',
    zIndex: 100,
  },
  actionBarContent: {
    maxWidth: '600px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
  },
  actionBarInfo: {
    flex: 1,
  },
  actionBarTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#222222',
    margin: 0,
    marginBottom: '2px',
  },
  actionBarSubtitle: {
    fontSize: '13px',
    color: '#717171',
    margin: 0,
  },
  importButton: {
    backgroundColor: BRAND_COLOR,
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '12px',
    padding: '14px 24px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    whiteSpace: 'nowrap',
  },
};
