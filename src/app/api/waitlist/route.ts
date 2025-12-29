import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/firebase-admin";
import { sendWaitlistConfirmation, sendAdminNotification } from "@/lib/email";
import { FieldValue } from "firebase-admin/firestore";

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

    const db = getDb();
    const waitlistRef = db.collection("waitlist");
    const normalizedEmail = email.toLowerCase();

    // Check if email already exists
    const existingQuery = await waitlistRef
      .where("email", "==", normalizedEmail)
      .limit(1)
      .get();

    if (!existingQuery.empty) {
      const existingDoc = existingQuery.docs[0];
      const existingData = existingDoc.data();
      return NextResponse.json(
        {
          error: "This email is already on the waitlist",
          position: existingData.position || 0
        },
        { status: 409 },
      );
    }

    // Get current waitlist count for position
    const countSnapshot = await waitlistRef.count().get();
    const position = countSnapshot.data().count + 1;

    // Create new waitlist entry
    const newEntry = {
      email: normalizedEmail,
      name: trimmedName,
      position: position,
      source: "web",
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };

    const docRef = await waitlistRef.add(newEntry);
    console.log("✅ Waitlist entry created with ID:", docRef.id);
    console.log("✅ Position:", position);

    // Send confirmation email to user
    const userEmailResult = await sendWaitlistConfirmation(normalizedEmail, trimmedName);
    if (!userEmailResult.success) {
      console.error("❌ Failed to send user email:", userEmailResult.error);
    } else {
      console.log("✅ Confirmation email sent to user");
    }

    // Send notification email to admin
    const adminEmailResult = await sendAdminNotification(normalizedEmail, trimmedName);
    if (!adminEmailResult.success) {
      console.error("❌ Failed to send admin email:", adminEmailResult.error);
    } else {
      console.log("✅ Admin notification email sent");
    }

    return NextResponse.json(
      {
        message:
          "Successfully joined the waitlist! Check your email for confirmation.",
        data: {
          id: docRef.id,
          email: normalizedEmail,
          name: trimmedName,
        },
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
