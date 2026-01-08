import { NextResponse } from "next/server";

export async function GET() {
  const dbUrl = process.env.DATABASE_URL;

  if (!dbUrl) {
    return NextResponse.json(
      { error: "DATABASE_URL not set" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    message: "Server env variable loaded successfully"
  });
}
