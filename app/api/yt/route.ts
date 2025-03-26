import { NextResponse } from "next/server";
import YTMusic from "ytmusic-api";

const ytmusic = new YTMusic();

export async function GET(request: Request) {
  try {
    await ytmusic.initialize(); // Optional: Pass custom cookies
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query) {
      return NextResponse.json({ error: "Query parameter 'q' is required" }, { status: 400 });
    }

    const results = await ytmusic.search(query);
    return NextResponse.json(results);
  } catch (error) {
    console.error("YTMusic API error:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
