import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';
import { generateDocumentation } from '@/lib/utils/openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const { query } = await request.json();

    const completion = await generateDocumentation(query);

    console.log(completion);
    return NextResponse.json({ content: completion });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate documentation' },
      { status: 500 }
    );
  }
}