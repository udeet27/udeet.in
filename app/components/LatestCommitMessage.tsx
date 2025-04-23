"use client";

import { useEffect, useState } from "react";

type Props = {
  owner: string;
  repo: string;
};

function ArrowIcon() {
  return (
    <svg
      width="9"
      height="9"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function LastUpdatedCommit({ owner, repo }: Props) {
  const [commitMsg, setCommitMsg] = useState<string | null>(null);
  const [commitURL, setCommitURL] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCommitData = async () => {
      try {
        const res = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/commits/main`
        );
        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
        const data = await res.json();

        const message = data.commit?.message;
        const apiCommitUrl: string | undefined = data.commit?.url;
        const sha: string | undefined = data.sha;

        if (!message || !sha) throw new Error("Commit data missing");

        setCommitMsg(message);
        setCommitURL(`https://github.com/${owner}/${repo}/commit/${sha}`);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      }
    };

    fetchCommitData();
  }, [owner, repo]);

  if (error) return <span>Error: {error}</span>;
  if (!commitMsg || !commitURL) return <span>Loading...</span>;

  return (
    <a
      href={commitURL}
      target="_blank"
      rel="noopener noreferrer"
      className="cursor-pointer inline-flex items-center gap-1 bg-transparent text-gray-500 dark:shadow-gray-400 dark:shadow-sm dark:hover:shadow-lg transition ease-in duration-200 text-center text-xs font-normal hover:shadow-xl shadow-md px-3 py-1 rounded-lg group"
      title={commitMsg}
    >
      {commitMsg.slice(0, 40)}
      {commitMsg.length > 40 ? "…" : ""}
      <span className="inline-block transform transition-transform duration-200 group-hover:-translate-y-[0.1rem]">
        <ArrowIcon />
      </span>
    </a>
  );
}
