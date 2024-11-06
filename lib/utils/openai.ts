import { OpenAI } from 'openai';

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const SYSTEM_PROMPT = `You are DocMaster, an enthusiastic technical documentation wizard...`;

export async function generateDocumentation(query: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT
        },
        {
          role: "user",
          content: query
        }
      ],
      temperature: 0.5,
      max_tokens: 10000,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Failed to generate documentation');
  }
} 