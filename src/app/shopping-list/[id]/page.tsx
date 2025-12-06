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
  const checkedCount = listData.items.filter(item => item.checked).length;
  const totalItems = listData.items.length;

  return (
    <>
      <div style={styles.container}>
        {/* Header */}
        <header style={styles.header}>
          <div style={styles.headerContent}>
            <h1 style={styles.headerTitle}>{listData.name}</h1>
            {listData.sharedBy && (
              <p style={styles.sharedByText}>
                {listData.sharedBy} shared this shopping list with you
              </p>
            )}
          </div>
        </header>

        {/* Summary Bar */}
        <div style={styles.summaryBar}>
          <div style={styles.summaryMain}>
            <span style={styles.summaryTotal}>${listData.total.toFixed(2)}</span>
            {totalItems > 0 && (
              <span style={styles.summarySubtext}>
                {checkedCount}/{totalItems} items
              </span>
            )}
          </div>
        </div>

        {/* Shopping List Items */}
        <div style={styles.content}>
          {Object.entries(categoryGroups).map(([category, items]) => {
            const categoryChecked = items.filter(item => item.checked).length;
            
            return (
              <div key={category} style={styles.categorySection}>
                {/* Category Header */}
                <div style={styles.categorySectionHeader}>
                  <span style={styles.categorySectionTitle}>{category}</span>
                  <span style={styles.categorySectionCount}>
                    {categoryChecked}/{items.length}
                  </span>
                </div>
                
                {/* Items */}
                {items.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      ...styles.ingredientRow,
                      ...(item.checked ? styles.ingredientRowChecked : {})
                    }}>
                    <div style={{
                      ...styles.checkbox,
                      ...(item.checked ? styles.checkboxChecked : {})
                    }}>
                      {item.checked && (
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path
                            d="M11.6667 3.5L5.25 9.91667L2.33334 7"
                            stroke="white"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                    <div style={styles.itemContent}>
                      <p style={{
                        ...styles.itemName,
                        ...(item.checked ? styles.itemNameChecked : {})
                      }}>
                        {item.name}
                      </p>
                      <p style={styles.itemMeta}>
                        {item.quantity} {item.unit}
                      </p>
                    </div>
                    <span style={{
                      ...styles.itemPrice,
                      ...(item.checked ? styles.itemPriceChecked : {})
                    }}>
                      ${item.cost.toFixed(2)}
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
    paddingTop: '60px',
    paddingBottom: '20px',
    paddingHorizontal: '20px',
  },
  headerContent: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  headerTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#222222',
    margin: 0,
    marginBottom: '8px',
  },
  sharedByText: {
    fontSize: '15px',
    color: '#717171',
    margin: 0,
    fontWeight: '500',
  },
  summaryBar: {
    backgroundColor: '#FFFFFF',
    borderBottom: '1px solid #EBEBEB',
    paddingVertical: '16px',
    paddingHorizontal: '20px',
  },
  summaryMain: {
    maxWidth: '600px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  summaryTotal: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#222222',
    letterSpacing: '-0.5px',
  },
  summarySubtext: {
    fontSize: '14px',
    color: '#717171',
    fontWeight: '500',
  },
  content: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    paddingBottom: '120px', // Space for import section
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
  categorySectionCount: {
    fontSize: '12px',
    fontWeight: '500',
    color: '#999999',
  },
  ingredientRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '14px',
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
  },
  itemPriceChecked: {
    textDecoration: 'line-through',
  },
  importSection: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTop: '1px solid #EBEBEB',
    padding: '20px',
    paddingBottom: 'max(20px, env(safe-area-inset-bottom))',
    boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.05)',
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
