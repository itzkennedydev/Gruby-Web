'use client';

import { useState, useEffect } from 'react';
import {
  Database,
  Table,
  RefreshCw,
  Loader2,
  ChevronRight,
  ChevronDown,
  FileText,
  Eye,
  Search,
  ArrowLeft,
} from 'lucide-react';

interface Collection {
  name: string;
  count: number;
  browsable: boolean;
}

interface Document {
  id: string;
  [key: string]: unknown;
}

interface CollectionsResponse {
  success: boolean;
  data: {
    collections: Collection[];
    totalCollections: number;
  };
}

interface DocumentsResponse {
  success: boolean;
  data: {
    collection: string;
    documents: Document[];
    pagination: {
      limit: number;
      hasMore: boolean;
      nextCursor: string | null;
    };
  };
}

export default function DatabasePage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loadingDocs, setLoadingDocs] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [cursor, setCursor] = useState<string | null>(null);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedDocs, setExpandedDocs] = useState<Set<string>>(new Set());

  const fetchCollections = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/database?action=collections');
      const data: CollectionsResponse = await res.json();
      if (data.success) {
        setCollections(data.data.collections);
      }
    } catch (error) {
      console.error('Failed to fetch collections:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDocuments = async (collection: string, append = false) => {
    setLoadingDocs(true);
    try {
      const params = new URLSearchParams({
        action: 'browse',
        collection,
        limit: '25',
      });
      if (append && cursor) params.set('startAfter', cursor);

      const res = await fetch(`/api/admin/database?${params}`);
      const data: DocumentsResponse = await res.json();
      if (data.success) {
        setDocuments(prev => append ? [...prev, ...data.data.documents] : data.data.documents);
        setHasMore(data.data.pagination.hasMore);
        setCursor(data.data.pagination.nextCursor);
      }
    } catch (error) {
      console.error('Failed to fetch documents:', error);
    } finally {
      setLoadingDocs(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  useEffect(() => {
    if (selectedCollection) {
      setDocuments([]);
      setCursor(null);
      fetchDocuments(selectedCollection);
    }
  }, [selectedCollection]);

  const toggleDocExpand = (docId: string) => {
    const newExpanded = new Set(expandedDocs);
    if (newExpanded.has(docId)) {
      newExpanded.delete(docId);
    } else {
      newExpanded.add(docId);
    }
    setExpandedDocs(newExpanded);
  };

  const filteredDocuments = documents.filter(doc => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return doc.id.toLowerCase().includes(searchLower) ||
      JSON.stringify(doc).toLowerCase().includes(searchLower);
  });

  const formatValue = (value: unknown): string => {
    if (value === null || value === undefined) return 'null';
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  };

  const truncateValue = (value: string, maxLength = 50): string => {
    if (value.length <= maxLength) return value;
    return value.substring(0, maxLength) + '...';
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {selectedCollection && (
            <button
              onClick={() => {
                setSelectedCollection(null);
                setDocuments([]);
                setSelectedDoc(null);
              }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
          )}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              {selectedCollection ? selectedCollection : 'Database Explorer'}
            </h2>
            <p className="text-gray-500 mt-1">
              {selectedCollection
                ? `${documents.length} documents loaded`
                : 'Browse and manage Firestore collections'}
            </p>
          </div>
        </div>
        <button
          onClick={() => selectedCollection ? fetchDocuments(selectedCollection) : fetchCollections()}
          disabled={loading || loadingDocs}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${(loading || loadingDocs) ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {!selectedCollection ? (
        // Collections View
        loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {collections.map((collection) => (
              <button
                key={collection.name}
                onClick={() => setSelectedCollection(collection.name)}
                disabled={!collection.browsable}
                className="bg-white border border-gray-200 rounded-xl p-5 text-left hover:border-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-900 transition-colors">
                    <Table className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-900 transition-colors" />
                </div>
                <h3 className="font-medium text-gray-900">{collection.name}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {collection.count.toLocaleString()} documents
                </p>
              </button>
            ))}
          </div>
        )
      ) : (
        // Documents View
        <>
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm"
            />
          </div>

          {loadingDocs && documents.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
            </div>
          ) : filteredDocuments.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No documents found</h3>
              <p className="text-gray-500">
                {searchTerm ? 'Try a different search term' : 'This collection is empty'}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredDocuments.map((doc) => {
                const isExpanded = expandedDocs.has(doc.id);
                const fields = Object.entries(doc).filter(([key]) => key !== 'id');

                return (
                  <div
                    key={doc.id}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-colors"
                  >
                    <button
                      onClick={() => toggleDocExpand(doc.id)}
                      className="w-full px-4 py-3 flex items-center gap-3 text-left"
                    >
                      <ChevronDown
                        className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? '' : '-rotate-90'}`}
                      />
                      <div className="flex-1 min-w-0">
                        <code className="text-sm font-mono text-gray-900">{doc.id}</code>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {fields.length} fields
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDoc(doc);
                        }}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4 text-gray-500" />
                      </button>
                    </button>

                    {isExpanded && (
                      <div className="px-4 pb-4 pt-0 border-t border-gray-100">
                        <div className="mt-3 space-y-2">
                          {fields.slice(0, 10).map(([key, value]) => (
                            <div key={key} className="flex gap-2 text-sm">
                              <span className="text-gray-500 font-medium min-w-[100px]">{key}:</span>
                              <span className="text-gray-700 font-mono text-xs break-all">
                                {truncateValue(formatValue(value), 100)}
                              </span>
                            </div>
                          ))}
                          {fields.length > 10 && (
                            <p className="text-xs text-gray-400">
                              ... and {fields.length - 10} more fields
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Load More */}
          {hasMore && (
            <div className="text-center">
              <button
                onClick={() => fetchDocuments(selectedCollection, true)}
                disabled={loadingDocs}
                className="px-6 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                {loadingDocs ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </>
      )}

      {/* Document Detail Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">Document Details</h3>
                <code className="text-sm text-gray-500">{selectedDoc.id}</code>
              </div>
              <button
                onClick={() => setSelectedDoc(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ×
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <pre className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700 overflow-x-auto">
                {JSON.stringify(selectedDoc, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
