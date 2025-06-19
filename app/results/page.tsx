'use client'

import { useEffect, useState } from 'react'

export default function ResultsPage() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('profile_results')
    if (stored) {
      setData(JSON.parse(stored))
    }
  }, [])

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">保存された診断結果一覧</h1>
      {data.length === 0 ? (
        <p>保存された結果はありません。</p>
      ) : (
        <ul className="space-y-4">
          {data.map((entry, index) => (
            <li key={index} className="border p-4 rounded">
              <p className="text-sm text-gray-600">ID: {index + 1}</p>
              <p className="text-sm">スコア: {JSON.stringify(entry.answers)}</p>
              <p className="text-sm">日時: {entry.timestamp}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}