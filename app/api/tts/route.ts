import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { text } = await req.json();
  if (!text) return NextResponse.json({ error: 'text is required' }, { status: 400 });
  return NextResponse.json({ text, message: 'Use SpeechSynthesis API client-side' });
}
