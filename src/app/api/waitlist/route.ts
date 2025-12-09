import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";
import { sendWaitlistConfirmation, sendAdminNotification } from "@/lib/email";

const pool = new Pool({
  connectionString:
    "postgres://74b017d6a8db709aaeb335032f78ad5b1e35f82ebb2137ddc59744c7ea18406b:sk_AtedbOlZMmSa-TTeiqs-y@db.prisma.io:5432/postgres?sslmode=require",
});

export async function POST(request: NextRequest) {
  try {
    console.log("🔥 API called");

    const body = await request.json();
    const { email } = body;

    console.log("📧 Email received:", email);

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

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
      "INSERT INTO waitlist (email) VALUES ($1) RETURNING *",
      [email.toLowerCase()],
    );

    client.release();
    console.log("✅ Waitlist entry created:", insertResult.rows[0]);

    // Send confirmation email to user
    const userEmailResult = await sendWaitlistConfirmation(email.toLowerCase());
    if (!userEmailResult.success) {
      console.error("❌ Failed to send user email:", userEmailResult.error);
    } else {
      console.log("✅ Confirmation email sent to user");
    }

    // Send notification email to admin
    const adminEmailResult = await sendAdminNotification(email.toLowerCase());
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
