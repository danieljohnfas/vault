// =========================================================
//  HentaiVault Discord Bot — Main Bot Script
//  
//  HOW TO USE:
//  1. Create a bot at https://discord.com/developers/applications
//  2. Get your Bot Token and Application (Client) ID
//  3. Set environment variables (or create a .env file):
//       DISCORD_TOKEN=your_bot_token_here
//       DISCORD_CLIENT_ID=your_application_id_here
//  4. Run: node register.js (only once to register commands)
//  5. Run: node index.js (to start the bot)
//
//  Host it on Railway, Render, or any Node.js server.
// =========================================================

const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

// Support .env file (optional) — install with: npm install dotenv
try { require('dotenv').config(); } catch(e) {}

const TOKEN = process.env.DISCORD_TOKEN;
const SITE_BASE_URL = 'https://hentaivault.me';
const API_BASE_URL = 'https://hentaivault.me';

if (!TOKEN) {
  console.error('❌  DISCORD_TOKEN environment variable is not set!');
  console.error('   Create a bot at https://discord.com/developers/applications');
  process.exit(1);
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// ── Helpers ──────────────────────────────────────────────────────────────────

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

function buildRandomEmbed(site) {
  const outLink = `${SITE_BASE_URL}/out?id=${encodeURIComponent(site.id)}`;
  const reviewLink = `${SITE_BASE_URL}/site?id=${encodeURIComponent(site.id)}`;

  const embed = new EmbedBuilder()
    .setColor(0xFF2A5F)
    .setTitle(`🎲 HentaiVault Roulette: ${site.name}`)
    .setURL(reviewLink)
    .setDescription(`**Category:** ${site.category || 'N/A'}\n\nClick the button below to visit the site!`)
    .setThumbnail(`https://www.google.com/s2/favicons?domain=${new URL(site.url || 'https://example.com').hostname}&sz=128`)
    .setFooter({ text: 'HentaiVault.me — The #1 Adult Directory' })
    .setTimestamp();

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setLabel(`Visit ${site.name} →`)
      .setURL(outLink)
      .setStyle(ButtonStyle.Link),
    new ButtonBuilder()
      .setLabel('📖 Read Full Review')
      .setURL(reviewLink)
      .setStyle(ButtonStyle.Link),
  );

  return { embeds: [embed], components: [row] };
}

function buildCategoryEmbed(sites, category) {
  const embed = new EmbedBuilder()
    .setColor(0xFF2A5F)
    .setTitle(`🗂️ Top ${category} Sites`)
    .setURL(`${SITE_BASE_URL}/category/${category}`)
    .setFooter({ text: 'HentaiVault.me — The #1 Adult Directory' })
    .setTimestamp();

  if (!sites || sites.length === 0) {
    embed.setDescription('No sites found in this category.');
    return { embeds: [embed], components: [] };
  }

  const lines = sites.slice(0, 5).map((s, i) => {
    const stars = '★'.repeat(Math.round(s.rating || 0)) + '☆'.repeat(5 - Math.round(s.rating || 0));
    const reviewUrl = `${SITE_BASE_URL}/site?id=${encodeURIComponent(s.id)}`;
    return `**${i + 1}.** [${s.name}](${reviewUrl}) — ${stars} (${s.rating || 'N/A'})`;
  });

  embed.setDescription(lines.join('\n\n'));

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setLabel(`Browse All →`)
      .setURL(`${SITE_BASE_URL}/category/${category}`)
      .setStyle(ButtonStyle.Link),
  );

  return { embeds: [embed], components: [row] };
}

// ── Event Handlers ────────────────────────────────────────────────────────────

client.once('ready', () => {
  console.log(`✅  Logged in as ${client.user.tag}`);
  client.user.setActivity('🎲 HentaiVault Roulette', { type: 4 }); // Custom status
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;
  await interaction.deferReply();

  try {
    if (commandName === 'roulette') {
      const data = await fetchJSON(`${API_BASE_URL}/api/random`);
      if (!data || !data.id) {
        return interaction.editReply('❌ Couldn\'t fetch a random site. Try again!');
      }
      return interaction.editReply(buildRandomEmbed(data));
    }

    if (commandName === 'topcategory') {
      const category = interaction.options.getString('category');
      const data = await fetchJSON(`${API_BASE_URL}/api/sites?category=${encodeURIComponent(category)}&sort=rating&limit=5`);
      return interaction.editReply(buildCategoryEmbed(data.sites, category));
    }

    if (commandName === 'sitelist') {
      return interaction.editReply({
        content: `📋 **Browse the full HentaiVault directory:**\n${SITE_BASE_URL}`,
        embeds: [new EmbedBuilder()
          .setColor(0xFF2A5F)
          .setTitle('HentaiVault — The #1 Adult Site Directory')
          .setURL(SITE_BASE_URL)
          .setDescription('Browse hundreds of reviewed and rated hentai sites, anime streams, games, and communities.')
          .setFooter({ text: 'HentaiVault.me' })
        ]
      });
    }

  } catch (err) {
    console.error(`Error handling /${commandName}:`, err);
    return interaction.editReply('❌ An error occurred. Please try again later.');
  }
});

// ── Login ─────────────────────────────────────────────────────────────────────

client.login(TOKEN);

// ── Dummy HTTP Server for Render ──────────────────────────────────────────────
// Render "Web Services" require the app to bind to an HTTP port, otherwise
// it will mark the deploy as failed after 60 seconds.
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('HentaiVault Discord Bot is running!'));

app.listen(port, () => {
  console.log(`==> Dummy HTTP server listening on port ${port} for Render`);
});

