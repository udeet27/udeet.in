// Import necessary libraries
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

const VisitorCounter = () => {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  // Function to get the user's IP and update the database
  const trackVisitor = async () => {
    try {
      // Fetch user's IP address
      const response = await fetch("https://api.ipify.org?format=json");
      const { ip } = await response.json();

      // Insert IP into the Supabase database if it doesn't already exist
      await supabase.from("visitors").upsert({ ip });

      // Fetch the total number of unique visitors
      const { data, error } = await supabase.from("visitors").select("ip", { count: "exact" });

      if (error) throw error;

      // Update visitor count state
      setVisitorCount((data?.length || 0)+25);
    } catch (err) {
      console.error("Error tracking visitor:", err);
    }
  };

  // Use effect to track visitor on component mount
  useEffect(() => {
    trackVisitor();
  }, []);

  return (
    <div>
      {/* <h2>Unique Visitors</h2> */}
      {visitorCount !== null ? (
        <p className="text-right text-sm text-gray-600 mt-4">total unique visitors: {visitorCount}</p>
      ) : (
        <p className="text-right text-sm text-gray-600 mt-4">Loading...</p>
      )}
    </div>
  );
};

export default VisitorCounter;
