/**
 * Shared Shopping List Page
 * 
 * This page displays a shared shopping list with the exact design language
 * of the mobile app, including a message about who shared it and a button
 * to import it into the Gruby app.
 */

'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Image from 'next/image';

const BRAND_COLOR = '#fa2625';

interface ShoppingListItem {
  name: string;
  quantity: number;
  unit: string;
  checked: boolean;
  cost: number;
}

interface ShoppingListData {
  name: string;
  items: ShoppingListItem[];
  total: number;
  createdAt: string;
  sharedBy?: string; // User name who shared it
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
        // Try to fetch from API first
        const response = await fetch(`/api/shopping-list/${listId}`);
        
        if (response.ok) {
          const data = await response.json();
          setListData(data);
        } else {
          // Fallback to URL-encoded data
          const dataParam = searchParams.get('data');
          if (dataParam) {
            const decoded = JSON.parse(decodeURIComponent(dataParam));
            setListData(decoded);
          } else {
            setError('Shopping list not found');
          }
        }
      } catch (err) {
        // Try URL-encoded data as fallback
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

  // Group items by category (matching app logic)
  const groupByCategory = (items: ShoppingListItem[]) => {
    const categoryGroups: Record<string, ShoppingListItem[]> = {};
    items.forEach(item => {
      // You might want to add category detection logic here
      // For now, using 'Other' as default
      const category = 'Other';
      if (!categoryGroups[category]) {
        categoryGroups[category] = [];
      }
      categoryGroups[category].push(item);
    });
    return categoryGroups;
  };

  const handleImportToApp = () => {
    if (!listData) return;
    
    // Create deep link to open app with shopping list data
    const data = encodeURIComponent(JSON.stringify(listData));
    const deepLink = `gruby://shopping-list/import?data=${data}`;
    
    // Try to open app
    window.location.href = deepLink;
    
    // Fallback: redirect to app store if app not installed
    setTimeout(() => {
      // Detect platform and redirect to appropriate app store
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const isAndroid = /Android/.test(navigator.userAgent);
      
      if (isIOS) {
        window.location.href = 'https://apps.apple.com/app/gruby';
      } else if (isAndroid) {
        window.location.href = 'https://play.google.com/store/apps/details?id=com.gruby.app';
      } else {
        // Show message to download app
        alert('Please download the Gruby app to import this shopping list.');
      }
    }, 500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSharePage = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: listData?.name || 'Shopping List',
          text: `${listData?.sharedBy || 'Someone'} shared a shopping list with you`,
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled or error occurred
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
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
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
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
          <p style={styles.loadingText}>Loading shopping list...</p>
        </div>
      </div>
    );
  }

  if (error || !listData) {
    return (
      <div style={styles.container}>
        <div style={styles.errorContainer}>
          <h1 style={styles.errorTitle}>Shopping List Not Found</h1>
          <p style={styles.errorText}>{error || 'This shopping list may have been deleted or is no longer available.'}</p>
        </div>
      </div>
    );
  }

  const categoryGroups = groupByCategory(listData.items);
  const totalItems = listData.items.length;
  
  // Calculate and verify total from item costs
  const calculatedTotal = listData.items.reduce((sum, item) => {
    const cost = item.cost || 0;
    return sum + cost;
  }, 0);
  
  // Use calculated total if it differs from provided total (more accurate)
  const displayTotal = Math.abs(calculatedTotal - listData.total) > 0.01 
    ? calculatedTotal 
    : listData.total;
  
  // Calculate category totals for better breakdown
  const categoryTotals = Object.entries(categoryGroups).reduce((acc, [category, items]) => {
    acc[category] = items.reduce((sum, item) => sum + (item.cost || 0), 0);
    return acc;
  }, {} as Record<string, number>);
  
  const itemsWithPrice = listData.items.filter(item => item.cost && item.cost > 0).length;

  return (
    <>
      <div style={styles.container}>
        {/* Header with Logo */}
        <header style={styles.header}>
          <div style={styles.headerContent}>
            <div style={styles.logoContainer}>
              <Image
                src="/GrubyLogo.svg"
                alt="Gruby"
                width={120}
                height={32}
                priority
                style={styles.logo}
              />
            </div>
            {listData.sharedBy && (
              <p style={styles.sharedByText}>
                {listData.sharedBy} shared this shopping list with you
              </p>
            )}
            {listData.createdAt && (
              <p style={styles.createdDateText}>
                Created {formatDate(listData.createdAt)}
              </p>
            )}
          </div>
        </header>

        {/* List Title and Actions */}
        <div style={styles.titleSection} className="no-print">
          <h1 style={styles.listTitle}>{listData.name}</h1>
          <div style={styles.actionButtons}>
            <button
              onClick={handleSharePage}
              style={styles.actionButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F7F7F7';
                e.currentTarget.style.borderColor = '#DDDDDD';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
                e.currentTarget.style.borderColor = '#EBEBEB';
              }}
              title="Share this page">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M15 6.667a2.5 2.5 0 1 0-1.875-2.4L7.5 7.5a2.5 2.5 0 1 0 0 3.333l5.625 3.233a2.5 2.5 0 1 0 .625-1.733l-5.625-3.233a2.5 2.5 0 0 0 0-1.667l5.625-3.233A2.5 2.5 0 0 0 15 6.667z"
                  stroke="#717171"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={handlePrint}
              style={styles.actionButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F7F7F7';
                e.currentTarget.style.borderColor = '#DDDDDD';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
                e.currentTarget.style.borderColor = '#EBEBEB';
              }}
              title="Print list">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M5 5h10v2.5H5V5zm0 5h10M5 12.5h10M3.75 15h12.5a1.25 1.25 0 0 0 1.25-1.25V7.5a1.25 1.25 0 0 0-1.25-1.25H3.75A1.25 1.25 0 0 0 2.5 7.5v6.25A1.25 1.25 0 0 0 3.75 15z"
                  stroke="#717171"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Summary Bar */}
        <div style={styles.summaryBar}>
          <div style={styles.summaryMain}>
            <div style={styles.summaryTopRow}>
              <span style={styles.summaryTotal}>${displayTotal.toFixed(2)}</span>
              <span style={styles.summaryItemCount}>
                {itemsWithPrice} of {totalItems} items priced
              </span>
            </div>
            <span style={styles.summarySubtext}>
              Estimated total • Based on current market prices
            </span>
          </div>
        </div>

        {/* Shopping List Items */}
        <div style={styles.content}>
          {Object.entries(categoryGroups).map(([category, items]) => {
            return (
              <div key={category} style={styles.categorySection}>
                {/* Category Header */}
                <div style={styles.categorySectionHeader}>
                  <span style={styles.categorySectionTitle}>{category}</span>
                  {categoryTotals[category] > 0 && (
                    <span style={styles.categoryTotal}>
                      ${categoryTotals[category].toFixed(2)}
                  </span>
                  )}
                </div>
                
                {/* Items */}
                {items.map((item, index) => (
                  <div
                    key={index}
                    style={styles.ingredientRow}>
                    <div style={styles.itemContent}>
                      <p style={styles.itemName}>
                        {item.name}
                      </p>
                      <p style={styles.itemMeta}>
                        {item.quantity} {item.unit}
                      </p>
                    </div>
                    <span style={styles.itemPrice}>
                      {item.cost && item.cost > 0 ? (
                        `$${item.cost.toFixed(2)}`
                      ) : (
                        <span style={styles.itemPriceUnavailable}>—</span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* Import to App Section */}
        <div style={styles.importSection}>
          <div style={styles.importContent}>
            <h2 style={styles.importTitle}>Get Gruby</h2>
            <p style={styles.importDescription}>
              Import this shopping list into your Gruby app to start cooking and saving money.
            </p>
            <button
              onClick={handleImportToApp}
              style={styles.importButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.9';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
              }}>
              <span style={styles.importButtonText}>Import to Gruby App</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                style={styles.importButtonIcon}>
                <path
                  d="M7.5 15L12.5 10L7.5 5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          background-color: #FFFFFF;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            background: white;
          }
        }
      `}</style>
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#FFFFFF',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    gap: '16px',
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
  },
  errorTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#222222',
    marginBottom: '12px',
  },
  errorText: {
    fontSize: '15px',
    color: '#717171',
    lineHeight: '22px',
  },
  header: {
    backgroundColor: '#FFFFFF',
    borderBottom: '1px solid #EBEBEB',
    paddingTop: '24px',
    paddingBottom: '20px',
    paddingLeft: '20px',
    paddingRight: '20px',
  },
  headerContent: {
    maxWidth: '600px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '8px',
  },
  logo: {
    height: 'auto',
    width: 'auto',
  },
  sharedByText: {
    fontSize: '15px',
    color: '#717171',
    margin: 0,
    fontWeight: '500',
    textAlign: 'center',
  },
  createdDateText: {
    fontSize: '13px',
    color: '#999999',
    margin: 0,
    fontWeight: '400',
    textAlign: 'center',
  },
  titleSection: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '24px 20px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
  },
  listTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#222222',
    margin: 0,
    flex: 1,
  },
  actionButtons: {
    display: 'flex',
    gap: '8px',
  },
  actionButton: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    border: '1px solid #EBEBEB',
    backgroundColor: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  summaryBar: {
    backgroundColor: '#FFFFFF',
    borderBottom: '1px solid #EBEBEB',
    paddingTop: '16px',
    paddingBottom: '16px',
    paddingLeft: '20px',
    paddingRight: '20px',
  },
  summaryMain: {
    maxWidth: '600px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  summaryTopRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: '16px',
  },
  summaryTotal: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#222222',
    letterSpacing: '-0.5px',
    lineHeight: '1',
  },
  summaryItemCount: {
    fontSize: '13px',
    color: '#717171',
    fontWeight: '500',
    whiteSpace: 'nowrap',
  },
  summarySubtext: {
    fontSize: '13px',
    color: '#999999',
    fontWeight: '400',
  },
  content: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    paddingBottom: '40px',
  },
  categorySection: {
    marginBottom: '24px',
  },
  categorySectionHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: '12px',
    borderBottom: '1px solid #F0F0F0',
    marginBottom: '4px',
  },
  categorySectionTitle: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#717171',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  categoryTotal: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#222222',
  },
  ingredientRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: '14px',
    paddingBottom: '14px',
    backgroundColor: '#FFFFFF',
    borderBottom: '1px solid #F5F5F5',
  },
  ingredientRowChecked: {
    opacity: 0.5,
  },
  checkbox: {
    width: '22px',
    height: '22px',
    borderRadius: '6px',
    border: '2px solid #DDDDDD',
    marginRight: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  checkboxChecked: {
    backgroundColor: BRAND_COLOR,
    borderColor: BRAND_COLOR,
  },
  itemContent: {
    flex: 1,
    marginRight: '12px',
  },
  itemName: {
    fontSize: '15px',
    fontWeight: '500',
    color: '#222222',
    margin: 0,
    marginBottom: '4px',
    lineHeight: '20px',
  },
  itemNameChecked: {
    textDecoration: 'line-through',
  },
  itemMeta: {
    fontSize: '13px',
    color: '#717171',
    margin: 0,
  },
  itemPrice: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#222222',
    flexShrink: 0,
    textAlign: 'right',
    minWidth: '60px',
  },
  itemPriceUnavailable: {
    fontSize: '13px',
    color: '#CCCCCC',
    fontStyle: 'italic',
  },
  itemPriceChecked: {
    textDecoration: 'line-through',
  },
  importSection: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '40px 20px',
    paddingBottom: 'max(40px, env(safe-area-inset-bottom))',
    borderTop: '1px solid #EBEBEB',
    marginTop: '40px',
  },
  importContent: {
    maxWidth: '600px',
    margin: '0 auto',
    textAlign: 'center',
  },
  importTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#222222',
    margin: 0,
    marginBottom: '8px',
  },
  importDescription: {
    fontSize: '15px',
    color: '#717171',
    margin: 0,
    marginBottom: '20px',
    lineHeight: '22px',
  },
  importButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    backgroundColor: BRAND_COLOR,
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '12px',
    padding: '16px 24px',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    width: '100%',
    transition: 'opacity 0.2s',
  },
  importButtonText: {
    color: '#FFFFFF',
  },
  importButtonIcon: {
    marginLeft: '4px',
  },
};
