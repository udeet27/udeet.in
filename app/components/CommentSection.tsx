"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion, AnimatePresence } from "framer-motion";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

type Comment = {
  id: string;
  username: string;
  avatar_url: string;
  content: string;
  created_at: string;
  formatted_timestamp: string;
  source: string;
};

type User = {
  id: string;
  user_metadata: {
    full_name: string;
    avatar_url: string;
  };
};

export default function CommentSection() {
  const [user, setUser] = useState<User | null>(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [showMessage, setShowMessage] = useState(false);
  const [authSource, setAuthSource] = useState("");

  const getUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (!error) {
      setUser(data.user as unknown as User);

      // Get the auth provider from user metadata or session
      if (data.user) {
        // Access provider directly from app_metadata
        const provider = data.user.app_metadata?.provider || "unknown";
        // console.log("Auth provider:", provider); // Add this for debugging
        setAuthSource(provider);
      }
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const fetchComments = async () => {
    let { data, error } = await supabase
      .from("comments")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching comments:", error.message);
    } else if (data){
      const formattedComments = data.map((c) => ({
        ...c,
        formatted_timestamp: new Date(c.created_at).toLocaleString("en-IN", {
          day: "numeric",
          month: "numeric",
          year: "2-digit",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }),
      }));
      setComments(formattedComments);
    }
  };
  useEffect(() => {
    fetchComments();
  }, []);

  const signInWithGitHub = async () => {
    await supabase.auth.signInWithOAuth({ provider: "github" });
  };

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({ provider: "google" });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setAuthSource("");
  };

  const postComment = async () => {
    if (!comment.trim() || !user) return;

    const newComment = {
      id: Math.random().toString(36).substr(2, 9),
      username: user.user_metadata.full_name,
      avatar_url: user.user_metadata.avatar_url,
      content: comment,
      created_at: new Date().toISOString(),
      formatted_timestamp: new Date().toLocaleString("en-IN", {
        day: "numeric",
        month: "numeric",
        year: "2-digit",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
      source: authSource, // Add source to the new comment
    };

    setComments((prev) => [newComment, ...prev]);

    const { error } = await supabase.from("comments").insert([
      {
        user_id: user.id,
        username: user.user_metadata.full_name,
        avatar_url: user.user_metadata.avatar_url,
        content: comment,
        source: authSource, // Add source to the database insert
      },
    ]);

    if (!error) {
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
      setComment("");
      fetchComments();
    }
  };

  return (
    <div className="p-4">
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-10 justify-between items-center dark:bg-[#FFFAF1] dark:text-[#070707] bg-[#070707] text-[#FFFAF1] p-3 text-sm rounded-lg shadow-lg"
          >
            Your comment is posted!
          </motion.div>
        )}
      </AnimatePresence>

      {user ? (
        <div className="mt-4">
          <div className="flex items-center gap-3 mb-4">
            <img
              src={user.user_metadata.avatar_url}
              alt={user.user_metadata.full_name}
              className="w-10 h-10 rounded-full"
            />
            <span className="font-medium text-sm">
              {user.user_metadata.full_name}
            </span>
            <button
              className="cursor-pointer px-3 py-1.5 text-xs text-[#FFFAF1] bg-red-500 rounded-lg shadow-md transition-all hover:bg-red-600 hover:shadow-lg active:scale-95"
              onClick={signOut}
            >
              Sign out
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              postComment();
            }}
            className="flex flex-col gap-3 p-4"
          >
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  postComment();
                }
              }}
              placeholder="Write a comment..."
              className="text-sm w-full p-3 border-none rounded-lg resize-none dark:focus:bg-[#070707] focus:bg-[#FFFAF1] focus:ring-2 focus:ring-blue-400 focus:outline-none transition shadow-md"
              rows={3}
            />
            <button
              type="submit"
              className="cursor-pointer text-sm px-3 py-1.5 text-[#FFFAF1] rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 shadow-sm transition-all hover:shadow-md hover:from-blue-600 hover:to-blue-700 active:scale-95"
            >
              Post
            </button>
          </form>
        </div>
      ) : null}

      <div className="mt-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-base font-semibold">Comments</span>
          <span className="text-xs text-gray-500 mx-2 my-2 whitespace-nowrap">
            (in IST)
          </span>
        </div>
        {!user && (
          <>
            <button
              type="button"
              onClick={signInWithGitHub}
              className="cursor-pointer mx-3 py-1.5 px-3 max-w-md flex justify-center items-center bg-[#24292e] hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-[#fafbfc] w-full transition ease-in duration-200 text-center text-xs font-semibold hover:shadow-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="mr-2"
                viewBox="0 0 1792 1792"
              >
                <path d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103zm-477 1103q3-7-7-12-10-3-13 2-3 7 7 12 9 6 13-2zm31 34q7-5-2-16-10-9-16-3-7 5 2 16 10 10 16 3zm30 45q9-7 0-19-8-13-17-6-9 5 0 18t17 7zm42 42q8-8-4-19-12-12-20-3-9 8 4 19 12 12 20 3zm57 25q3-11-13-16-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11-16 0-16 11 0 13 17 11 16 0 16-11zm58-10q-2-11-18-9-16 3-14 15t18 8 14-14z"></path>
              </svg>
              Log in with GitHub
            </button>
            <button className="gsi-material-button">
              <div className="gsi-material-button-state" />
              <div className="gsi-material-button-content-wrapper">
                <div className="gsi-material-button-icon">
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    style={{ display: "block" }}
                  >
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    />
                    <path fill="none" d="M0 0h48v48H0z" />
                  </svg>
                </div>
                <span
                  className="gsi-material-button-contents"
                  onClick={signInWithGoogle}
                >
                  Log in with Google
                </span>
                <span style={{ display: "none" }}>Log in with Google</span>
              </div>
            </button>
          </>
        )}
      </div>

      <div className="mt-4">
        <AnimatePresence>
          {comments.length > 0 ? (
            comments.map((c) => (
              <motion.div
                key={c.id}
                // initial={{ opacity: 0, y: 10 }}
                // animate={{ opacity: 1, y: 0 }}
                // exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="py-2"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={c.avatar_url}
                    alt={c.username}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="font-medium text-sm">{c.username}</span>
                </div>
                <div className="ml-11 flex items-center justify-between text-gray-700 dark:text-gray-300">
                  <span className="text-sm">{c.content}</span>
                  <span className="mx-4 text-xs text-gray-500">
                    {c.formatted_timestamp}
                  </span>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-gray-500 text-sm"
            >
              No comments yet.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
