import readline from 'readline';
import { setTargetUser } from './config.js';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

/**
 * Prompts the user for a Discord user ID to follow.
 * Returns a Promise that resolves with the user ID.
 * @returns {Promise<string>}
 */
export function promptTargetUser() {
  return new Promise((resolve) => {
    console.log('\n=== Insult Bot ===');
    console.log('Enter the Discord User ID of the person to follow.');
    console.log('(Right-click their profile in Discord → Copy User ID - enable Developer Mode in settings if needed)\n');
    rl.question('User ID: ', (answer) => {
      const userId = answer.trim();
      if (userId) {
        setTargetUser(userId);
        console.log(`\nFollowing user: ${userId}. Waiting for their messages...\n`);
      } else {
        console.log('\nNo user ID provided. Run the bot again and enter a valid ID.');
      }
      rl.close();
      resolve(userId);
    });
  });
}
