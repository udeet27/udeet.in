"use client";

import { useEffect, useState } from "react";

type Props = {
  owner: string;
  repo: string;
};

function CommitIcon() {
  return (
  <svg
    data-testid="geist-icon"
    height="11"
    stroke-linejoin="round"
    viewBox="0 0 16 16"
    width="11"
    style={{color: 'currentcolor'}}
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M8 10.5C9.38071 10.5 10.5 9.38071 10.5 8C10.5 6.61929 9.38071 5.5 8 5.5C6.61929 5.5 5.5 6.61929 5.5 8C5.5 9.38071 6.61929 10.5 8 10.5ZM8 12C9.95279 12 11.5787 10.6006 11.9298 8.75H15.25H16V7.25H15.25H11.9298C11.5787 5.39935 9.95279 4 8 4C6.04721 4 4.42125 5.39935 4.0702 7.25H0.75H0V8.75H0.75H4.0702C4.42125 10.6006 6.04721 12 8 12Z"
      fill="currentColor"
    ></path>
  </svg>
  );
}

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
        {/* <ArrowIcon /> */}
        <CommitIcon />
      </span>
    </a>
  );
}
