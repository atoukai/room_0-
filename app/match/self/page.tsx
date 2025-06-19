'use client';

import { useEffect, useState } from 'react';

type Profile = {
  id: number;
  answers: number[];
};

type ScoredProfile = Profile & { similarity: number; compatibility: number };

function calculateSimilarity(a1: number[], a2: number[]) {
  return 1 / (1 + Math.sqrt(a1.reduce((sum, v, i) => sum + (v - a2[i]) ** 2, 0)));
}

function calculateCompatibility(a1: number[], a2: number[]) {
  return 1 / (1 + Math.sqrt(a1.reduce((sum, v, i) => sum + ((4 - v) - a2[i]) ** 2, 0)));
}

export default function MatchSelfPage() {
  const [profiles, setProfiles] = useState<ScoredProfile[]>([]);
  const [latestId, setLatestId] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/profile')
      .then((res) => res.json())
      .then((data: Profile[]) => {
        if (!data.length) return;

        const latest = data[data.length - 1];
        setLatestId(latest.id);

        const others = data.slice(0, -1);
        const scored = others.map((profile) => ({
          ...profile,
          similarity: calculateSimilarity(latest.answers, profile.answers),
          compatibility: calculateCompatibility(latest.answers, profile.answers),
        }));

        setProfiles(scored);
      });
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">自分に似ている人 / 相性が良い人</h1>
      {profiles.length === 0 ? (
        <p className="text-muted-foreground">比較対象がまだありません。他の診断も一度行ってみてください。</p>
      ) : (
        <>
          <h2 className="text-xl font-semibold mt-6 mb-2">自分に似ている人</h2>
          <ul className="mb-6 list-disc list-inside">
            {profiles
              .slice()
              .sort((a, b) => b.similarity - a.similarity)
              .slice(0, 5)
              .map((p) => (
                <li key={p.id}>ID {p.id}（類似度: {p.similarity.toFixed(4)}）</li>
              ))}
          </ul>
          <h2 className="text-xl font-semibold mb-2">相性が良い人</h2>
          <ul className="list-disc list-inside">
            {profiles
              .slice()
              .sort((a, b) => b.compatibility - a.compatibility)
              .slice(0, 5)
              .map((p) => (
                <li key={p.id}>ID {p.id}（相性スコア: {p.compatibility.toFixed(4)}）</li>
              ))}
          </ul>
        </>
      )}
    </div>
  );
}