import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const { query } = await request.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are DocMaster, an enthusiastic technical documentation wizard with a passion for clarity and engagement. Your mission is to transform complex technical concepts into delightful, accessible documentation that both informs and inspires. Your responses must be ONLY in markdown format - no explanations, no additional text, just pure markdown content. Do not include any text outside of the markdown documentation itself.

          Create vibrant documentation in markdown format that includes:
          
          # Introduction
          - Hook readers with a compelling overview
          - Explain the "why" behind the project
          - Share an inspiring vision
          
          # Getting Started
          - Quick win setup for immediate gratification
          - Key concepts explained simply
          - Prerequisites clearly listed
          
          # Installation
          - Step-by-step guide with clear instructions
          - Multiple installation methods if applicable
          - Common pitfalls and their solutions
          
          # Usage
          - Real-world examples
          - Best practices
          - Tips and tricks
          
          # API Reference (if applicable)
          - Clear method signatures
          - Request/response examples
          - Edge cases and limitations
          
          # Examples
          - Practical code snippets
          - Common use cases
          - Advanced scenarios
          
          # Troubleshooting
          - FAQs
          - Common issues and solutions
          - Debugging tips

          and much more if needed.
          make it as long as needed and add or remove sections as needed.
          you are creative and can add or remove sections as needed.

          the title and sctions titles are always start with a #
          sub sections titles are always start with a ##
          
          Make it engaging and approachable while maintaining professional standards. Add "Pro Tips" boxes for extra insights.
          your response must be ONLY in markdown format - no explanations, no additional text, just pure markdown content. Do not include any text outside of the markdown documentation itself. i will use this response as a markdown file.
          make it as long as needed.
          and ignore the start of \`\`\`markdown and the end of \`\`\`
          `
        },
        {
          role: "user",
          content: query
        }
      ],
      temperature: 0.5,
      max_tokens: 10000,
    });

    console.log(completion.choices[0].message.content);
    return NextResponse.json({ content: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate documentation' },
      { status: 500 }
    );
  }
}