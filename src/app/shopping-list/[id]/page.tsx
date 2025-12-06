'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Footer } from '@/components/Footer';

interface ShoppingListItem {
  name: string;
  quantity: number;
  unit: string;
  checked?: boolean;
  cost?: number;
}

interface ShoppingListData {
  name: string;
  items: ShoppingListItem[];
  total: number;
  createdAt?: string;
}

export default function ShoppingListPage() {
  const params = useParams();
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
          // Fallback: try to decode from URL params
          const urlParams = new URLSearchParams(window.location.search);
          const encoded = urlParams.get('data');
          if (encoded) {
            const decoded = decodeURIComponent(encoded);
            const data = JSON.parse(decoded);
            setListData(data);
          } else {
            setError('Shopping list not found');
          }
        }
      } catch (err) {
        console.error('Error fetching shopping list:', err);
        setError('Failed to load shopping list');
      } finally {
        setLoading(false);
      }
    };

    if (listId) {
      fetchListData();
    }
  }, [listId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading shopping list...</p>
        </div>
      </div>
    );
  }

  if (error || !listData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">List Not Found</h1>
          <p className="text-gray-600">{error || 'This shopping list may have expired or been deleted.'}</p>
        </div>
      </div>
    );
  }

  const checkedCount = listData.items.filter(item => item.checked).length;
  const totalItems = listData.items.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                {listData.name}
              </h1>
              {listData.createdAt && (
                <p className="text-sm text-gray-500">
                  Created {new Date(listData.createdAt).toLocaleDateString()}
                </p>
              )}
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-red-600">
                ${listData.total.toFixed(2)}
              </div>
              <p className="text-xs text-gray-500">Estimated Total</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {totalItems > 0 && (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>{checkedCount} of {totalItems} items</span>
            <span>{totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 0}% complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${totalItems > 0 ? (checkedCount / totalItems) * 100 : 0}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Items List */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {listData.items.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-gray-600">This list is empty</p>
          </div>
        ) : (
          <div className="space-y-3">
            {listData.items.map((item, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg shadow-sm border-2 p-4 transition-all ${
                  item.checked
                    ? 'border-green-200 bg-green-50 opacity-75'
                    : 'border-gray-200 hover:border-red-200 hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        item.checked
                          ? 'bg-green-500 border-green-500'
                          : 'border-gray-300'
                      }`}
                    >
                      {item.checked && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`font-medium text-gray-900 ${
                          item.checked ? 'line-through text-gray-500' : ''
                        }`}
                      >
                        {item.name}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm text-gray-600">
                          {item.quantity} {item.unit}
                        </span>
                        {item.cost && item.cost > 0 && (
                          <>
                            <span className="text-gray-400">•</span>
                            <span className="text-sm font-semibold text-gray-900">
                              ${item.cost.toFixed(2)}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-6 text-white text-center shadow-lg">
          <h2 className="text-xl font-bold mb-2">Get Gruby</h2>
          <p className="text-red-50 mb-4 text-sm">
            Create and share beautiful shopping lists like this one
          </p>
          <a
            href="https://apps.apple.com/app/gruby"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-red-600 px-6 py-2 rounded-lg font-semibold hover:bg-red-50 transition-colors"
          >
            Download App
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
