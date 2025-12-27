import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";
import { sendWaitlistConfirmation, sendAdminNotification } from "@/lib/email";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(request: NextRequest) {
  try {
    console.log("🔥 API called");

    const body = await request.json();
    const { email, name } = body;

    console.log("📧 Email received:", email);
    console.log("👤 Name received:", name);

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Name is optional, so we'll use an empty string if not provided
    const trimmedName = name && typeof name === "string" ? name.trim() : "";

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 },
      );
    }

    const client = await pool.connect();
    console.log("✅ Database connected");

    // Ensure name column exists (migration)
    try {
      await client.query(`
        DO $$ 
        BEGIN
          IF NOT EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name='waitlist' AND column_name='name'
          ) THEN
            ALTER TABLE waitlist ADD COLUMN name text;
          END IF;
        END $$;
      `);
      console.log("✅ Name column check completed");
    } catch (migrationError) {
      console.warn("⚠️ Migration check warning:", migrationError);
      // Continue anyway - column might already exist
    }

    // Check if email already exists
    const existingResult = await client.query(
      "SELECT id FROM waitlist WHERE email = $1",
      [email.toLowerCase()],
    );

    if (existingResult.rows.length > 0) {
      client.release();
      return NextResponse.json(
        { error: "This email is already on the waitlist" },
        { status: 409 },
      );
    }

    // Insert new waitlist entry
    const insertResult = await client.query(
      "INSERT INTO waitlist (email, name) VALUES ($1, $2) RETURNING *",
      [email.toLowerCase(), trimmedName],
    );

    // Get the official position (count of all entries created at or before this one)
    const positionResult = await client.query(
      `SELECT COUNT(*)::int as position 
       FROM waitlist 
       WHERE created_at <= (SELECT created_at FROM waitlist WHERE email = $1)`,
      [email.toLowerCase()],
    );

    const position = positionResult.rows[0]?.position || 0;

    client.release();
    console.log("✅ Waitlist entry created:", insertResult.rows[0]);
    console.log("✅ Position:", position);

    // Send confirmation email to user
    const userEmailResult = await sendWaitlistConfirmation(email.toLowerCase(), trimmedName);
    if (!userEmailResult.success) {
      console.error("❌ Failed to send user email:", userEmailResult.error);
    } else {
      console.log("✅ Confirmation email sent to user");
    }

    // Send notification email to admin
    const adminEmailResult = await sendAdminNotification(email.toLowerCase(), trimmedName);
    if (!adminEmailResult.success) {
      console.error("❌ Failed to send admin email:", adminEmailResult.error);
    } else {
      console.log("✅ Admin notification email sent");
    }

    return NextResponse.json(
      {
        message:
          "Successfully joined the waitlist! Check your email for confirmation.",
        data: insertResult.rows[0],
        position: position,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("❌ Waitlist API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
