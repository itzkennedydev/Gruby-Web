/**
 * Kroger API Service for Web
 * Fetches real-time prices from Kroger stores
 */

// Note: Client-side authentication removed - all API calls go through server-side route
// Client ID can remain public, but secret should never be exposed client-side
const KROGER_CLIENT_ID = process.env.NEXT_PUBLIC_KROGER_CLIENT_ID || 'gruby-bbc93mxh';

const API_BASE = 'https://api.kroger.com/v1';
const AUTH_URL = 'https://api.kroger.com/v1/connect/oauth2/token';

// Token cache (deprecated - use API route instead)
let tokenCache: { token: string; expiresAt: number } | null = null;

interface KrogerProduct {
  productId: string;
  upc: string;
  description: string;
  brand?: string;
  items?: {
    itemId: string;
    price?: {
      regular: number;
      promo?: number;
    };
    size?: string;
  }[];
  images?: {
    sizes: { size: string; url: string }[];
  }[];
}

interface GroceryProduct {
  id: string;
  name: string;
  price: number | null;
  promoPrice?: number | null;
  brand?: string;
  imageUrl?: string;
}

/**
 * Base64 encode credentials
 */
function base64Encode(str: string): string {
  if (typeof window !== 'undefined' && typeof btoa !== 'undefined') {
    return btoa(str);
  }
  // Node.js fallback
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(str).toString('base64');
  }
  // Manual base64 encoding fallback
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  let output = '';
  for (let i = 0; i < str.length; i += 3) {
    const byte1 = str.charCodeAt(i);
    const byte2 = i + 1 < str.length ? str.charCodeAt(i + 1) : 0;
    const byte3 = i + 2 < str.length ? str.charCodeAt(i + 2) : 0;
    const enc1 = byte1 >> 2;
    const enc2 = ((byte1 & 3) << 4) | (byte2 >> 4);
    const enc3 = ((byte2 & 15) << 2) | (byte3 >> 6);
    const enc4 = byte3 & 63;
    output += chars.charAt(enc1) + chars.charAt(enc2);
    output += i + 1 < str.length ? chars.charAt(enc3) : '=';
    output += i + 2 < str.length ? chars.charAt(enc4) : '=';
  }
  return output;
}

/**
 * Get OAuth access token
 * NOTE: This function should not be used client-side. All API calls should go through /api/kroger/price route.
 * Keeping for backwards compatibility but it will fail without client secret.
 */
async function getAccessToken(): Promise<string> {
  throw new Error('Client-side authentication is disabled. Use the /api/kroger/price route instead.');
}

/**
 * Make authenticated request to Kroger API
 */
async function krogerRequest(endpoint: string, params?: Record<string, string>): Promise<any> {
  const token = await getAccessToken();

  const url = new URL(`${API_BASE}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  const response = await fetch(url.toString(), {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      // Token expired, clear cache and retry once
      tokenCache = null;
      return krogerRequest(endpoint, params);
    }
    throw new Error(`Kroger API error: ${response.status}`);
  }

  return response.json();
}

/**
 * Map Kroger product to our format
 */
function mapKrogerProduct(product: KrogerProduct): GroceryProduct {
  const item = product.items?.[0];
  const price = item?.price?.regular ?? null;
  const promoPrice = item?.price?.promo ?? null;

  // Get image
  let imageUrl: string | undefined;
  if (product.images?.length) {
    const frontImage = product.images[0];
    const large = frontImage.sizes?.find(s => s.size === 'large' || s.size === 'xlarge');
    imageUrl = large?.url;
  }

  return {
    id: product.productId,
    name: product.description,
    price,
    promoPrice: promoPrice || undefined,
    brand: product.brand,
    imageUrl,
  };
}

/**
 * Search for a product by name
 * Uses a default store location (can be updated later)
 */
export async function searchKrogerProduct(
  query: string,
  storeId: string = '01400929' // Default Kroger store ID (can be made configurable)
): Promise<GroceryProduct | null> {
  try {
    console.log(`🔍 Searching Kroger for: "${query}"`);
    const data = await krogerRequest('/products', {
      'filter.term': query,
      'filter.locationId': storeId,
      'filter.limit': '5',
    });

    if (!data.data || data.data.length === 0) {
      console.log(`❌ No results found for: "${query}"`);
      return null;
    }

    // Find best match (first result with price)
    const productWithPrice = data.data.find((p: KrogerProduct) => 
      p.items?.[0]?.price?.regular
    );

    if (!productWithPrice) {
      console.log(`❌ No price found for: "${query}"`);
      return null;
    }

    const mapped = mapKrogerProduct(productWithPrice);
    console.log(`✅ Found: "${mapped.name}" - $${mapped.price}`);
    return mapped;
  } catch (error: any) {
    console.error(`❌ Error searching Kroger for "${query}":`, error.message || error);
    return null;
  }
}

/**
 * Get prices for multiple ingredients via API route
 */
export async function getIngredientPrices(
  ingredients: string[],
  storeId: string = '01400929'
): Promise<Record<string, number | null>> {
  try {
    const response = await fetch('/api/kroger/price', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingredients, storeId }),
    });

    if (!response.ok) {
      throw new Error(`API route failed: ${response.status}`);
    }

    const data = await response.json();
    console.log(`✅ Fetched ${data.foundPrices}/${data.totalIngredients} prices from Kroger API`);
    return data.prices;
  } catch (error: any) {
    console.error('Error fetching prices from API route:', error);
    // Return empty prices object on error
    return ingredients.reduce((acc, ing) => {
      acc[ing] = null;
      return acc;
    }, {} as Record<string, number | null>);
  }
}

/**
 * Calculate total price for a meal based on ingredients
 */
export async function calculateMealPrice(
  ingredients: string[],
  storeId: string = '01400929'
): Promise<{ total: number; perServing: number; servings: number; ingredientPrices: Record<string, number> }> {
  console.log(`💰 Calculating meal price for ${ingredients.length} ingredients`);
  
  try {
    const prices = await getIngredientPrices(ingredients, storeId);
    
    // Filter out null prices and calculate total
    const validPrices: Record<string, number> = {};
    let total = 0;
    let foundPrices = 0;
    
    for (const [ingredient, price] of Object.entries(prices)) {
      if (price !== null && price > 0) {
        validPrices[ingredient] = price;
        total += price;
        foundPrices++;
      }
    }

    console.log(`📊 Found ${foundPrices}/${ingredients.length} prices, total: $${total.toFixed(2)}`);

    // If we didn't find enough prices, use fallback estimates
    if (foundPrices < ingredients.length * 0.5 || total === 0) {
      console.log(`⚠️ Using fallback prices (found ${foundPrices} of ${ingredients.length})`);
      // Use average price per ingredient if we found less than 50% of prices
      const avgPricePerIngredient = foundPrices > 0 && total > 0
        ? total / foundPrices 
        : 3.5; // Default fallback
      
      for (const ingredient of ingredients) {
        if (!validPrices[ingredient]) {
          validPrices[ingredient] = avgPricePerIngredient;
          total += avgPricePerIngredient;
        }
      }
    }

    // Assume 4 servings per meal
    const servings = 4;
    const perServing = total / servings;

    console.log(`✅ Final total: $${total.toFixed(2)}, per serving: $${perServing.toFixed(2)}`);

    return {
      total,
      perServing,
      servings,
      ingredientPrices: validPrices,
    };
  } catch (error: any) {
    console.error('❌ Error calculating meal price:', error);
    // Return fallback prices
    const fallbackPrice = ingredients.length * 3.5;
    return {
      total: fallbackPrice,
      perServing: fallbackPrice / 4,
      servings: 4,
      ingredientPrices: {},
    };
  }
}

