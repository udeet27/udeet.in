"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Loader from "./Loader";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

function EyeIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.5 11C4.80285 11 2.52952 9.62184 1.09622 7.50001C2.52952 5.37816 4.80285 4 7.5 4C10.1971 4 12.4705 5.37816 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11ZM7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C1.65639 10.2936 4.30786 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C13.3436 4.70638 10.6921 3 7.5 3ZM7.5 9.5C8.60457 9.5 9.5 8.60457 9.5 7.5C9.5 6.39543 8.60457 5.5 7.5 5.5C6.39543 5.5 5.5 6.39543 5.5 7.5C5.5 8.60457 6.39543 9.5 7.5 9.5Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

type VisitorCounterProps = {
  name: string;
};

const VisitorCounterBlog = ({ name }: VisitorCounterProps) => {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  const trackVisitor = async () => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const { ip } = await response.json();

      // 1. Check if IP already exists for homepage visitors
      const { data: existing, error: fetchExistingError } = await supabase
        .from("visitors")
        .select("id")
        .eq("ip", ip)
        .eq("name", name)
        .limit(1)
        .maybeSingle();

      if (fetchExistingError) throw fetchExistingError;

      // 2. Insert only if not exists
      if (!existing) {
        const { error: insertError } = await supabase
          .from("visitors")
          .insert({ ip, name });

        if (insertError) throw insertError;
      }

      // 3. Fetch TOTAL visitor count (no 1000 limit)
      const { count, error: countError } = await supabase
        .from("visitors")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("name", name);

      if (countError) throw countError;

      // 4. Update visitor count state
      setVisitorCount(count ?? 0);
    } catch (err) {
      console.error("Error tracking visitor:", err);
    }
  };

  useEffect(() => {
    trackVisitor();
  }, [name]);

  return (
    <span className="flex justify-end">
      <span className="relative group inline-block text-right">
        <span className="inline-flex items-center justify-end gap-1 text-sm">
          {visitorCount !== null ? (
            <>
              <EyeIcon /> {visitorCount}
            </>
          ) : (
            <Loader />
          )}
        </span>
      </span>
    </span>
  );
};

export default VisitorCounterBlog;
