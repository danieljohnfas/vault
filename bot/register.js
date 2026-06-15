// =========================================================
//  HentaiVault Discord Bot — Slash Command Registration
//  Run this ONCE with: node register.js
// =========================================================
const { REST, Routes, SlashCommandBuilder } = require('discord.js');
require('dotenv').config(); // optional: npm install dotenv

const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.DISCORD_CLIENT_ID;

if (!TOKEN || !CLIENT_ID) {
  console.error('❌ Missing DISCORD_TOKEN or DISCORD_CLIENT_ID env vars.');
  process.exit(1);
}

const commands = [
  new SlashCommandBuilder()
    .setName('roulette')
    .setDescription('🎲 Get a random adult site recommendation from HentaiVault!')
    .toJSON(),

  new SlashCommandBuilder()
    .setName('topcategory')
    .setDescription('📋 Browse top sites by category')
    .addStringOption(opt =>
      opt.setName('category')
        .setDescription('Category to browse')
        .setRequired(true)
        .addChoices(
          { name: 'Anime Streaming', value: 'anime-streaming' },
          { name: 'Hentai Streaming', value: 'hentai-streaming' },
          { name: 'Manga & Doujin', value: 'manga-doujin' },
          { name: 'Image Boorus', value: 'images-boorus' },
          { name: 'Games', value: 'games' },
          { name: 'Communities', value: 'communities' },
          { name: 'Visual Novels', value: 'visual-novels' },
        )
    )
    .toJSON(),

  new SlashCommandBuilder()
    .setName('sitelist')
    .setDescription('📋 Browse the full HentaiVault directory')
    .toJSON(),
];

const rest = new REST({ version: '10' }).setToken(TOKEN);

rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands })
  .then(() => console.log('✅ Slash commands registered successfully!'))
  .catch(err => console.error('❌ Failed to register commands:', err));
