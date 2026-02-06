import { getTargetUser } from './config.js';
import { generateInsult } from './insult-generator.js';

/**
 * Handles incoming Discord messages - checks if from target user and responds with insult
 * @param {import('discord.js').Message} message
 * @param {import('discord.js').Client} client
 */
export async function handleMessage(message, client) {
  // Ignore bot messages
  if (message.author.bot) return;

  const targetUserId = getTargetUser();
  if (!targetUserId) return;

  if (message.author.id !== targetUserId) return;

  try {
    const content = message.content || '(sent something with no text)';
    const insult = await generateInsult(content, message.author.username);
    await message.reply(insult);
  } catch (err) {
    console.error('Error generating insult:', err.message);
    await message.reply('My wit is on cooldown... try again in a moment.').catch(() => {});
  }
}
