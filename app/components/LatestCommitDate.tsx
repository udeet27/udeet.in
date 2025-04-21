'use client';

import { useEffect, useState } from 'react';

type Props = {
  owner: string;
  repo: string;
};

function getOrdinalSuffix(n: number) {
  const j = n % 10,
        k = n % 100;
  if (j === 1 && k !== 11) return 'st';
  if (j === 2 && k !== 12) return 'nd';
  if (j === 3 && k !== 13) return 'rd';
  return 'th';
}

function formatDateWithSuffix(dateStr: string) {
  const date = new Date(dateStr);
  const day = date.getDate();
  const suffix = getOrdinalSuffix(day);
  const month = date.toLocaleString('default', { month: 'short' });
  const year = `'${date.getFullYear().toString().slice(-2)}`;

  return (
    <>
      last updated {day}
      <sup>{suffix}</sup> {month} {year}
    </>
  );
}

export default function LastUpdated({ owner, repo }: Props) {
  const [dateStr, setDateStr] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCommitDate = async () => {
      try {
        const res = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/commits/main`
        );
        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
        const data = await res.json();
        const commitDate = data.commit?.committer?.date;
        if (commitDate) setDateStr(commitDate);
        else throw new Error('Date not found in response');
      } catch (err: any) {
        setError(err.message || 'An error occurred');
      }
    };
    fetchCommitDate();
  }, [owner, repo]);

  if (error) return <span>Error: {error}</span>;
  if (!dateStr) return <span>Loading...</span>;

  return <span>{formatDateWithSuffix(dateStr)}</span>;
}
