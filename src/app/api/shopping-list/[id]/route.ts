import { NextRequest, NextResponse } from 'next/server';

// In-memory store for shopping lists (in production, use a database)
const shoppingListStore = new Map<string, { data: any; expiresAt: number }>();

// Clean up expired lists every hour
setInterval(() => {
  const now = Date.now();
  for (const [id, entry] of shoppingListStore.entries()) {
    if (entry.expiresAt < now) {
      shoppingListStore.delete(id);
    }
  }
}, 60 * 60 * 1000);

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  
  const entry = shoppingListStore.get(id);
  if (!entry) {
    return NextResponse.json(
      { error: 'Shopping list not found' },
      { status: 404 }
    );
  }

  if (entry.expiresAt < Date.now()) {
    shoppingListStore.delete(id);
    return NextResponse.json(
      { error: 'Shopping list has expired' },
      { status: 404 }
    );
  }

  return NextResponse.json(entry.data);
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await request.json();

  // Store for 7 days
  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
  shoppingListStore.set(id, { data: body, expiresAt });

  return NextResponse.json({ success: true, id });
}
