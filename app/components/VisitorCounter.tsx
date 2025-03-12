// Import necessary libraries
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Loader from "./Loader";

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
    <span className="ml-2 relative group inline-block min-w-[150px] text-center">
    <span className="absolute left-0 mt-[-1.5rem] w-max px-2 py-1 text-xs text-[#0f0f0f] bg-[#D1E5F4] rounded opacity-0 group-hover:opacity-100 transition-opacity">
      calculated on unique IP addresses
    </span>
    <span className="inline-block min-w-[150px]">
      {visitorCount !== null ? `total unique visitors: ${visitorCount}` : <Loader />}
    </span>
  </span>
  );
};

export default VisitorCounter;
