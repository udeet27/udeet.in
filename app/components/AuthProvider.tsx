"use client"; // ✅ Mark this file as a Client Component

import { ReactNode, useEffect } from "react";
import { supabase } from "./CommentSection";

export default function AuthProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          localStorage.setItem("sb-session", JSON.stringify(session));
        } else {
          localStorage.removeItem("sb-session");
        }
      }
    );

    return () => {
      subscription.unsubscribe(); // ✅ Correct cleanup
    };
  }, []);

  return <>{children}</>;
}
