import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

export async function GET() {
  try {
    // Read the logo file from the public directory
    const logoPath = join(process.cwd(), "public", "GrubyLogo.svg");
    const logoContent = readFileSync(logoPath, "utf-8");

    // Return the SVG with proper headers for email clients
    return new NextResponse(logoContent, {
      status: 200,
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=31536000, immutable",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
      },
    });
  } catch (error) {
    console.error("Error serving logo:", error);
    return new NextResponse("Logo not found", { status: 404 });
  }
}
