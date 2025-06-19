'use client';

import { useEffect, useState } from 'react';

type Profile = {
  id: number;
  answers: number[];
};

function calculateCompatibility(a1: number[], a2: number[]) {
  return 1 / (1 + Math.sqrt(a1.reduce((sum, v, i) => sum + ((4 - v) - a2[i]) ** 2, 0)));
}

export default function MatchCompatibilityPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [latestId, setLatestId] = useState<number | null>(null);
  const [sorted, setSorted] = useState<{ id: number; compatibility: number }[]>([]);

  useEffect(() => {
    fetch('/api/profile')
      .then((res) => res.json())
      .then((data: Profile[]) => {
        if (!data.length) return;

        const latest = data[data.length - 1];
        setLatestId(latest.id);

        const others = data.slice(0, -1);
        const scored = others.map((profile) => ({
          id: profile.id,
          compatibility: calculateCompatibility(latest.answers, profile.answers),
        }));

        const top = scored.sort((a, b) => b.compatibility - a.compatibility).slice(0, 5);
        setSorted(top);
      });
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">相性が良い人（スコア順）</h1>
      {sorted.length === 0 ? (
        <p className="text-muted-foreground">比較対象がまだありません。他の診断を追加してください。</p>
      ) : (
        <ul className="list-disc list-inside">
          {sorted.map((p) => (
            <li key={p.id}>ID {p.id}（相性スコア: {p.compatibility.toFixed(4)}）</li>
          ))}
        </ul>
      )}
    </div>
  );
}