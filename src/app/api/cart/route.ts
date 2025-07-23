import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/server/db';
import { eq, and } from 'drizzle-orm';
import { orders, orderItems, products } from '@/server/db/schema';
import type { OrderItem } from '@/server/db/schema';
import { auth } from '@clerk/nextjs/server';

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const cartItems = await db
      .select({
        orderId: orders.id,
        productId: products.id,
        name: products.name, // Include the product name
        quantity: orderItems.quantity,
        price: orderItems.price,
      })
      .from(orders)
      .innerJoin(orderItems, eq(orders.id, orderItems.orderId))
      .innerJoin(products, eq(orderItems.productId, products.id))
      .where(
        and(
          eq(orders.user_id, userId),
          eq(orders.status, 'cart') // Only fetch cart orders
        )
      );
    
    return NextResponse.json(cartItems);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return NextResponse.json({ error: 'Error fetching cart items' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const updatedCart: OrderItem[] = await request.json();

    await db.transaction(async (trx) => {
      // Find or create the cart order for the user
      const [cartOrder] = await trx
        .select()
        .from(orders)
        .where(
          and(
            eq(orders.user_id, userId),
            eq(orders.status, 'cart')
          )
        )
        .limit(1);

      let orderId = cartOrder?.id;

      // If no cart order exists, create a new one
      if (!orderId) {
        const [newCartOrder] = await trx
          .insert(orders)
          .values({
            user_id: userId,
            status: 'cart',
            total: '0',
          })
          .returning();
        
        orderId = newCartOrder?.id;
      }

      if (orderId) {
        // Delete existing cart items
        await trx
          .delete(orderItems)
          .where(eq(orderItems.orderId, orderId));

        // Insert updated cart items
        for (const item of updatedCart) {
          await trx.insert(orderItems).values({
            orderId,
            productId: item.productId,
            quantity: item.quantity,
            price: item.price.toString(), // Convert price to string
          });
        }

        // Calculate total price
        const total = updatedCart.reduce(
          (sum, item) => sum + (Number(item.price) * Number(item.quantity)),
          0
        );

        // Update order total
        await trx
          .update(orders)
          .set({ total: total.toString() })
          .where(eq(orders.id, orderId));
      }
    });

    return NextResponse.json({ message: 'Cart updated successfully' });
  } catch (error) {
    console.error('Error updating cart:', error);
    return NextResponse.json({ error: 'Error updating cart' }, { status: 500 });
  }
} 