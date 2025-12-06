import { NextRequest, NextResponse } from 'next/server';

const KROGER_CLIENT_ID = process.env.KROGER_CLIENT_ID || process.env.NEXT_PUBLIC_KROGER_CLIENT_ID || 'gruby-bbc94mcp';
const KROGER_CLIENT_SECRET = process.env.KROGER_CLIENT_SECRET || 'BGzjxxeOmggxu6gE0qOczAZo7nFwexCsfSTaAmxF';

const API_BASE = 'https://api.kroger.com/v1';
const AUTH_URL = 'https://api.kroger.com/v1/connect/oauth2/token';

// Token cache (in-memory for server)
let tokenCache: { token: string; expiresAt: number } | null = null;

/**
 * Get OAuth access token
 */
async function getAccessToken(): Promise<string | null> {
  // Check cache
  if (tokenCache && Date.now() < tokenCache.expiresAt - 60000) {
    return tokenCache.token;
  }

  const credentials = Buffer.from(`${KROGER_CLIENT_ID}:${KROGER_CLIENT_SECRET}`).toString('base64');

  try {
    const response = await fetch(AUTH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${credentials}`,
      },
      body: 'grant_type=client_credentials&scope=product.compact',
    });

    if (!response.ok) {
      // Handle authentication failures - use fallback pricing
      // This can happen if:
      // - IP restrictions in Kroger developer portal (localhost may not be whitelisted)
      // - Credentials not configured for web/server-side use
      // - Rate limiting or security restrictions
      const errorText = await response.text().catch(() => 'Unknown error');
      console.warn(`Kroger authentication failed: ${response.status}. Using fallback pricing.`);
      console.warn(`Error details: ${errorText.substring(0, 200)}`);
      console.warn(`Note: If you're on localhost, you may need to whitelist your IP in Kroger Developer Portal`);
      return null;
    }

    const data = await response.json();

    tokenCache = {
      token: data.access_token,
      expiresAt: Date.now() + (data.expires_in * 1000),
    };

    return data.access_token;
  } catch (error: any) {
    console.error('Kroger API request failed:', error.message);
    return null;
  }
}

/**
 * Search for a product in Kroger
 */
async function searchKrogerProduct(query: string, storeId: string = '01400929') {
  const token = await getAccessToken();
  
  if (!token) {
    // Authentication failed, return null to allow fallback
    return null;
  }

  const url = new URL(`${API_BASE}/products`);
  url.searchParams.append('filter.term', query);
  url.searchParams.append('filter.locationId', storeId);
  url.searchParams.append('filter.limit', '5');

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
      return searchKrogerProduct(query, storeId);
    }
    throw new Error(`Kroger API error: ${response.status}`);
  }

  const data = await response.json();

  if (!data.data || data.data.length === 0) {
    return null;
  }

  // Find first product with price
  const productWithPrice = data.data.find((p: any) => 
    p.items?.[0]?.price?.regular
  );

  if (!productWithPrice) {
    return null;
  }

  const item = productWithPrice.items[0];
  return {
    name: productWithPrice.description,
    price: item.price.regular,
    promoPrice: item.price.promo,
    brand: productWithPrice.brand,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ingredients, storeId } = body;

    if (!ingredients || !Array.isArray(ingredients)) {
      return NextResponse.json(
        { error: 'Ingredients array is required' },
        { status: 400 }
      );
    }

    const prices: Record<string, number | null> = {};
    const foundProducts: Record<string, any> = {};

    // Search for each ingredient
    for (const ingredient of ingredients) {
      try {
        const product = await searchKrogerProduct(ingredient, storeId || '01400929');
        if (product && product.price) {
          prices[ingredient] = product.price;
          foundProducts[ingredient] = product;
        } else {
          prices[ingredient] = null;
        }
        
        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 200));
      } catch (error: any) {
        // Silently handle errors - we'll use fallback prices
        // Don't log individual ingredient errors to reduce noise
        prices[ingredient] = null;
      }
    }

    // Calculate totals
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

    return NextResponse.json({
      success: true,
      prices,
      foundProducts,
      total,
      foundPrices,
      totalIngredients: ingredients.length,
      ingredientPrices: validPrices,
    });
  } catch (error: any) {
    console.error('Kroger API route error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch prices' },
      { status: 500 }
    );
  }
}

