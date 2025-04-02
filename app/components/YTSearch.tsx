"use client";

import { useState, useEffect } from "react";
import YouTubeAudioPlayer from "./YoutubeAudio";

// Define the shape of a single search result
interface SearchResult {
  id: string;
  // Add other properties if necessary
}

export default function YTSearch() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchSpotifyData = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/spotify");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        if (data.title && data.artist && data.album) {
          const combinedQuery = `${data.title} ${data.artist} audio`;
          setSearchQuery(combinedQuery);
          searchYT(combinedQuery);
        } else {
          console.error("Incomplete data received from /api/spotify");
        }
      } catch (error) {
        console.error("Error fetching Spotify data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpotifyData();
  }, []);

  const searchYT = async (query: string) => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/yt?q=${encodeURIComponent(query)}`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data: SearchResult[] = await res.json();
      setResults(data || []);
    } catch (error) {
      console.error("Error fetching YouTube data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <span>
      {/* {loading && <p>Loading...</p>} */}
      {!loading && results.length > 0 ? (
        <YouTubeAudioPlayer videoId={results[0].id} />
      ) : (
        <span></span>
      )}
    </span>
  );
}
