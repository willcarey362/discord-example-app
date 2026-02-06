import OpenAI from 'openai';

let client = null;

function getClient() {
  if (!client) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is not set in .env');
    }
    client = new OpenAI({ apiKey });
  }
  return client;
}

/**
 * Generates a funny insult based on the user's message using ChatGPT
 * @param {string} userMessage - The message the target user sent
 * @param {string} [username] - Optional username for context
 * @returns {Promise<string>} The generated insult
 */
export async function generateInsult(userMessage, username = 'them') {
  const openai = getClient();

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: `You are a witty roaster. When given a message someone sent in chat, respond with ONE short, funny insult that references or plays off what they said. Keep it lighthearted and playful - no real malice. Max 1-2 sentences. Don't use quotes around your response.`
      },
      {
        role: 'user',
        content: `${username} said: "${userMessage}"`
      }
    ],
    max_tokens: 100,
    temperature: 0.8
  });

  const insult = completion.choices[0]?.message?.content?.trim();
  return insult || '...silence speaks volumes.';
}
