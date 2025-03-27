import { NextResponse } from "next/server";
const youtubesearchapi = require("youtube-search-api");

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query) {
      return NextResponse.json(
        { error: "Query parameter 'q' is required" },
        { status: 400 }
      );
    }

    // Await the API call properly
    const response = await youtubesearchapi.GetListByKeyword(query, false, 5, [{ type: "video" }]);

    return NextResponse.json(response.items);
  } catch (error) {
    console.error("YTMusic API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
