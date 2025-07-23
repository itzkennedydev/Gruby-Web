import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/server/db'; 
import { products, productImages, homeCooks } from '@/server/db/schema'; 
import { eq, and } from 'drizzle-orm';

interface ProductRequestBody {
  name: string;
  description?: string;
  price: number;
  images?: string[];
  homeCookId: string;
}

export async function POST(request: NextRequest) {
  try {
    const { name, description, price, images, homeCookId } = await request.json() as ProductRequestBody;

    // Validate required fields
    if (!name || typeof price !== 'number' || !homeCookId) {
      return NextResponse.json({ error: 'Name, price, and homeCookId are required' }, { status: 400 });
    }

    // Check subscription status before allowing product creation
    const homeCook = await db
      .select({
        subscriptionStatus: homeCooks.subscriptionStatus,
        onboardingCompleted: homeCooks.onboardingCompleted,
      })
      .from(homeCooks)
      .where(eq(homeCooks.id, homeCookId))
      .limit(1);

    if (homeCook.length === 0) {
      return NextResponse.json({ error: 'Home cook profile not found' }, { status: 404 });
    }

    if (homeCook[0].onboardingCompleted !== 'true') {
      return NextResponse.json({ error: 'Please complete your onboarding before adding products' }, { status: 403 });
    }

    if (homeCook[0].subscriptionStatus !== 'active') {
      return NextResponse.json({ 
        error: 'Active subscription required to list products',
        subscriptionRequired: true 
      }, { status: 403 });
    }

    // Insert the product into the database
    const newProduct = await db.insert(products).values({
      name,
      description: description ?? null,
      price: price.toFixed(2),
      homeCookId,
    }).returning();

    const productId = newProduct[0].id;

    // Insert images if provided
    if (images && images.length > 0) {
      const imageValues = images.map((imageUrl, index) => ({
        productId,
        imageUrl,
        isPrimary: index === 0 ? 'true' : 'false', // First image is primary
        orderIndex: index,
      }));

      await db.insert(productImages).values(imageValues);
    }

    // Fetch the complete product with images
    const completeProduct = await db
      .select({
        id: products.id,
        name: products.name,
        description: products.description,
        price: products.price,
        homeCookId: products.homeCookId,
        createdAt: products.createdAt,
        updatedAt: products.updatedAt,
        images: productImages.imageUrl,
      })
      .from(products)
      .leftJoin(productImages, eq(products.id, productImages.productId))
      .where(eq(products.id, productId));

    // Group images by product
    const productWithImages = {
      ...completeProduct[0],
      images: completeProduct
        .filter(row => row.images)
        .map(row => row.images)
        .filter(Boolean),
    };

    return NextResponse.json(productWithImages, { status: 201 });
  } catch (error) {
    console.error('Error adding product:', error);
    return NextResponse.json({ error: 'Failed to add product' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const homeCookId = searchParams.get('homeCookId');
    const featured = searchParams.get('featured');

    let allProducts;
    
    if (featured === 'true') {
      // Fetch all products with home cook information for homepage
      // Show products from home cooks who have completed onboarding and have an active subscription
      allProducts = await db
        .select({
          id: products.id,
          name: products.name,
          description: products.description,
          price: products.price,
          homeCookId: products.homeCookId,
          createdAt: products.createdAt,
          updatedAt: products.updatedAt,
          images: productImages.imageUrl,
          homeCookName: homeCooks.name,
          homeCookCuisine: homeCooks.cuisine,
          subscriptionStatus: homeCooks.subscriptionStatus,
        })
        .from(products)
        .leftJoin(productImages, eq(products.id, productImages.productId))
        .leftJoin(homeCooks, eq(products.homeCookId, homeCooks.id))
        .where(and(
          eq(homeCooks.onboardingCompleted, 'true'),
          eq(homeCooks.subscriptionStatus, 'active')
        ));
    } else if (homeCookId) {
      // Filter products by home cook ID
      allProducts = await db
        .select({
          id: products.id,
          name: products.name,
          description: products.description,
          price: products.price,
          homeCookId: products.homeCookId,
          createdAt: products.createdAt,
          updatedAt: products.updatedAt,
          images: productImages.imageUrl,
        })
        .from(products)
        .leftJoin(productImages, eq(products.id, productImages.productId))
        .where(eq(products.homeCookId, homeCookId));
    } else {
      // Fetch all products
      allProducts = await db
        .select({
          id: products.id,
          name: products.name,
          description: products.description,
          price: products.price,
          homeCookId: products.homeCookId,
          createdAt: products.createdAt,
          updatedAt: products.updatedAt,
          images: productImages.imageUrl,
        })
        .from(products)
        .leftJoin(productImages, eq(products.id, productImages.productId));
    }

    // Group products with their images
    const productsMap = new Map();
    
    allProducts.forEach(row => {
      if (!productsMap.has(row.id)) {
        const baseProduct = {
          id: row.id,
          name: row.name,
          description: row.description,
          price: row.price,
          homeCookId: row.homeCookId,
          createdAt: row.createdAt,
          updatedAt: row.updatedAt,
          images: [],
        };

        // Add home cook info if available (featured query)
        if ('homeCookName' in row) {
          const featuredRow = row as typeof row & { 
            homeCookName: string; 
            homeCookCuisine: string; 
            subscriptionStatus: string;
          };
          productsMap.set(row.id, {
            ...baseProduct,
            homeCookName: featuredRow.homeCookName,
            homeCookCuisine: featuredRow.homeCookCuisine,
            subscriptionStatus: featuredRow.subscriptionStatus,
          });
        } else {
          productsMap.set(row.id, baseProduct);
        }
      }
      
      if (row.images) {
        productsMap.get(row.id).images.push(row.images);
      }
    });

    const productsWithImages = Array.from(productsMap.values());

    return NextResponse.json(productsWithImages);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
} 