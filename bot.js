import 'dotenv/config';
import { Client, GatewayIntentBits } from 'discord.js';
import { promptTargetUser } from './modules/prompt.js';
import { handleMessage } from './modules/message-handler.js';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages
  ]
});

client.once('ready', async () => {
  console.log(`Logged in as ${client.user.tag}`);
  await promptTargetUser();
});

client.on('messageCreate', (message) => {
  handleMessage(message, client);
});

const token = process.env.DISCORD_TOKEN;
if (!token) {
  console.error('DISCORD_TOKEN is not set in .env');
  process.exit(1);
}

client.login(token);
