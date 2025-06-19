// app/api/profile/route.ts

import { NextResponse } from 'next/server';

let results: { id: number; answers: number[] }[] = [];
let currentId = 1;

export async function POST(req: Request) {
  const body = await req.json();
  const answers = body.answers as number[];

  const newResult = {
    id: currentId++,
    answers,
  };

  results.push(newResult);

  return NextResponse.json({ id: newResult.id });
}

export async function GET() {
  return NextResponse.json(results);
}