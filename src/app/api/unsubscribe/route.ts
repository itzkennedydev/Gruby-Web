import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

// This route relies on query params; force dynamic rendering to avoid static errors
export const dynamic = "force-dynamic";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    const client = await pool.connect();

    // Check if email exists
    const existingResult = await client.query(
      "SELECT id FROM waitlist WHERE email = $1",
      [email.toLowerCase()],
    );

    if (existingResult.rows.length === 0) {
      client.release();
      // Return success even if not found (prevents email enumeration)
      return NextResponse.redirect(
        new URL("/unsubscribed?success=true", request.url),
      );
    }

    // Remove from waitlist
    await client.query("DELETE FROM waitlist WHERE email = $1", [
      email.toLowerCase(),
    ]);

    client.release();
    console.log("✅ Unsubscribed:", email.toLowerCase());

    // Redirect to a success page
    return NextResponse.redirect(
      new URL("/unsubscribed?success=true", request.url),
    );
  } catch (error) {
    console.error("❌ Unsubscribe API error:", error);
    return NextResponse.redirect(
      new URL("/unsubscribed?success=false", request.url),
    );
  }
}
