import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const audioFile = formData.get('audio') as File | null;
    const originalText = formData.get('text') as string | null;

    if (!audioFile || !originalText) {
      return NextResponse.json({ error: 'audio and text are required' }, { status: 400 });
    }

    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: 'whisper-1',
      language: 'zh',
    });

    const spokenText = transcription.text;

    const evaluation = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a Chinese pronunciation expert. Evaluate the pronunciation based on the transcription vs original text. Return JSON with score (0-100) and feedback string.',
        },
        {
          role: 'user',
          content: `Original: "${originalText}"\nTranscribed: "${spokenText}"\nEvaluate and return JSON: { "score": number, "feedback": string }`,
        },
      ],
      response_format: { type: 'json_object' },
    });

    const result = JSON.parse(evaluation.choices[0].message.content || '{"score":0,"feedback":"Error"}');

    return NextResponse.json({
      score: result.score,
      feedback: result.feedback,
      transcribed: spokenText,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Evaluation failed';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
