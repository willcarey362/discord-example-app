/**
 * Generates insults using a local LLM via Ollama.
 * Requires Ollama installed and running: https://ollama.com
 * Run: ollama pull llama3.2  (or another model)
 */

const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama3.2';

/**
 * Generates a funny insult based on the user's message using a local LLM
 * @param {string} userMessage - The message the target user sent
 * @param {string} [username] - Optional username for context
 * @returns {Promise<string>} The generated insult
 */
export async function generateInsult(userMessage, username = 'them') {
  const response = await fetch(`${OLLAMA_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: OLLAMA_MODEL,
      messages: [
        {
          role: 'system',
          content: 'You are a witty roaster. When given a message someone sent in chat, respond with ONE short, funny insult that references or plays off what they said. Keep it lighthearted and playful - no real malice. Max 1-2 sentences. Don\'t use quotes around your response.'
        },
        {
          role: 'user',
          content: `${username} said: "${userMessage}"`
        }
      ],
      stream: false,
      options: {
        temperature: 0.8,
        num_predict: 100
      }
    })
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Ollama error (${response.status}): ${err}`);
  }

  const data = await response.json();
  const insult = data.message?.content?.trim();
  return insult || '...silence speaks volumes.';
}
