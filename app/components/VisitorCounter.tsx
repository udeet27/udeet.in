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

function EyeIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.5 11C4.80285 11 2.52952 9.62184 1.09622 7.50001C2.52952 5.37816 4.80285 4 7.5 4C10.1971 4 12.4705 5.37816 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11ZM7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C1.65639 10.2936 4.30786 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C13.3436 4.70638 10.6921 3 7.5 3ZM7.5 9.5C8.60457 9.5 9.5 8.60457 9.5 7.5C9.5 6.39543 8.60457 5.5 7.5 5.5C6.39543 5.5 5.5 6.39543 5.5 7.5C5.5 8.60457 6.39543 9.5 7.5 9.5Z"
        fill="currentColor"
        fill-rule="evenodd"
        clip-rule="evenodd"
      ></path>
    </svg>
  );
}

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
      const { data, error } = await supabase
        .from("visitors")
        .select("ip", { count: "exact" });

      if (error) throw error;

      // Update visitor count state
      setVisitorCount(data?.length || 0);
    } catch (err) {
      console.error("Error tracking visitor:", err);
    }
  };

  // Use effect to track visitor on component mount
  useEffect(() => {
    trackVisitor();
  }, []);

  return (
    <div className="flex justify-end">
      <span className="ml-2 relative group inline-block min-w-[150px] sm:min-w-[200px] text-right">
        <span className="absolute left-1/2 -translate-x-1/1.8 mt-[-1.5rem] w-max px-2 py-1 text-xs text-[#0f0f0f] bg-[#D1E5F4] rounded opacity-0 group-hover:opacity-100 group-hover:translate-y-[-4px] transition-all duration-300 ease-in-out whitespace-nowrap">
          calculated on unique IP addresses
        </span>
        <span className="inline-flex items-center justify-end gap-1 min-w-[150px] sm:min-w-[200px]">
          {visitorCount !== null ? (
            <>
              <EyeIcon /> {visitorCount}
            </>
          ) : (
            <Loader />
          )}
        </span>
      </span>
    </div>
  );
};

export default VisitorCounter;
