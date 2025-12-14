/**
 * Kroger API Service for Next.js
 * 
 * Background product sync service using Kroger API with:
 * - OAuth 2.0 client credentials flow
 * - Product search and retrieval
 * - Rate limiting and retry logic
 * - Error handling and logging
 */

// Environment variables  
const KROGER_CLIENT_ID = process.env.NEXT_PUBLIC_KROGER_CLIENT_ID || process.env.KROGER_CLIENT_ID || '';
const KROGER_CLIENT_SECRET = process.env.KROGER_CLIENT_SECRET || '';

// API endpoints
const API_BASE = 'https://api.kroger.com/v1';
const AUTH_URL = 'https://api.kroger.com/v1/connect/oauth2/token';

// Token cache
let cachedToken: {
  access_token: string;
  expires_at: number;
} | null = null;

export interface KrogerProduct {
  productId: string;
  upc: string;
  brand?: string;
  description: string;
  categories?: string[];
  images?: {
    perspective: string;
    featured?: boolean;
    sizes: { size: string; url: string }[];
  }[];
  items?: {
    itemId: string;
    price?: {
      regular: number;
      promo?: number;
    };
    size?: string;
    soldBy?: string;
  }[];
}

export interface KrogerStore {
  locationId: string;
  name: string;
  address: {
    addressLine1: string;
    city: string;
    state: string;
    zipCode: string;
  };
  geolocation?: {
    latitude: number;
    longitude: number;
  };
}

/**
 * Get OAuth access token using client credentials flow
 */
async function getAccessToken(): Promise<string> {
  // Check if we have a valid cached token
  if (cachedToken && cachedToken.expires_at > Date.now()) {
    return cachedToken.access_token;
  }

  if (!KROGER_CLIENT_ID || !KROGER_CLIENT_SECRET) {
    throw new Error('Kroger API credentials not configured');
  }

  const credentials = Buffer.from(`${KROGER_CLIENT_ID}:${KROGER_CLIENT_SECRET}`).toString('base64');

  try {
    const response = await fetch(AUTH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${credentials}`,
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        scope: 'product.compact',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to get access token: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    // Cache the token (expires in 30 minutes, refresh 1 minute early)
    cachedToken = {
      access_token: data.access_token,
      expires_at: Date.now() + (29 * 60 * 1000),
    };

    return data.access_token;
  } catch (error) {
    console.error('Error getting Kroger access token:', error);
    throw error;
  }
}

/**
 * Search for products by term
 */
export async function searchProducts(
  searchTerm: string,
  locationId?: string,
  limit: number = 50
): Promise<KrogerProduct[]> {
  const token = await getAccessToken();

  const params = new URLSearchParams({
    'filter.term': searchTerm,
    'filter.limit': limit.toString(),
  });

  if (locationId) {
    params.append('filter.locationId', locationId);
  }

  try {
    const response = await fetch(`${API_BASE}/products?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to search products: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error searching Kroger products:', error);
    throw error;
  }
}

/**
 * Get product by ID
 */
export async function getProduct(
  productId: string,
  locationId?: string
): Promise<KrogerProduct | null> {
  const token = await getAccessToken();

  const params = new URLSearchParams();
  if (locationId) {
    params.append('filter.locationId', locationId);
  }

  try {
    const response = await fetch(
      `${API_BASE}/products/${productId}${params.toString() ? '?' + params.toString() : ''}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      const errorText = await response.text();
      throw new Error(`Failed to get product: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data.data || null;
  } catch (error) {
    console.error('Error getting Kroger product:', error);
    throw error;
  }
}

/**
 * Search for stores by location
 */
export async function searchStores(
  zipCode?: string,
  latitude?: number,
  longitude?: number,
  radiusMiles: number = 10,
  limit: number = 10
): Promise<KrogerStore[]> {
  const token = await getAccessToken();

  const params = new URLSearchParams({
    'filter.radiusInMiles': radiusMiles.toString(),
    'filter.limit': limit.toString(),
  });

  if (zipCode) {
    params.append('filter.zipCode.near', zipCode);
  } else if (latitude !== undefined && longitude !== undefined) {
    params.append('filter.lat.near', latitude.toString());
    params.append('filter.lon.near', longitude.toString());
  } else {
    throw new Error('Either zipCode or lat/lon must be provided');
  }

  try {
    const response = await fetch(`${API_BASE}/locations?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to search stores: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error searching Kroger stores:', error);
    throw error;
  }
}

/**
 * Batch search products for multiple ingredients
 */
export async function batchSearchProducts(
  ingredients: string[],
  locationId?: string
): Promise<Map<string, KrogerProduct[]>> {
  const results = new Map<string, KrogerProduct[]>();

  // Process in batches to avoid rate limiting
  for (const ingredient of ingredients) {
    try {
      const products = await searchProducts(ingredient, locationId, 10);
      results.set(ingredient, products);
      
      // Add small delay between requests to respect rate limits
      await new Promise(resolve => setTimeout(resolve, 200));
    } catch (error) {
      console.error(`Error searching for ingredient "${ingredient}":`, error);
      results.set(ingredient, []);
    }
  }

  return results;
}
