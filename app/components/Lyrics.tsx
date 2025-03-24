"use client";

import { useState, useEffect } from "react";

function unescapeUnicode(str: string) {
  return str
    .replace(/\\u[\dA-F]{4}/gi, (match) =>
      String.fromCharCode(parseInt(match.replace("\\u", ""), 16))
    )
    .replace(/\\n/g, "\n");
}

export default function Lyrics() {
  const [lyrics, setLyrics] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLyrics() {
      try {
        // Fetch song data from /api/spotify
        const spotifyRes = await fetch("/api/spotify");
        const spotifyData = await spotifyRes.json();

        // Send the song data to /api/python
        const pythonRes = await fetch("/api/python", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(spotifyData),
        });

        const pythonOutput = await pythonRes.json();
        if (pythonOutput.lyrics) {
          setLyrics(unescapeUnicode(pythonOutput.lyrics)); // 🔥 Correctly formats Unicode
        } else {
          setLyrics("Lyrics not found.");
        }
      } catch (err) {
        setError("Failed to load lyrics.");
      } finally {
        setLoading(false);
      }
    }

    fetchLyrics();
  }, []);

  return (
    <div className="p-4 bg-neutral-900 rounded-md shadow-lg text-gray-300 opacity-80">
      {/* <h2 className="text-lg font-bold mb-2">Lyrics</h2> */}
      {loading && <p>Loading lyrics...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {lyrics && (
        <p className="leading-relaxed">
          {lyrics.split("\n").map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </p>
      )}
    </div>
  );
}
