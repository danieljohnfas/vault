#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const SITEMAP_FILE = path.resolve(__dirname, '../sitemap.xml');
const API_KEY = '45598f4e24eb4bdf9891e4a106e23298';
const HOST = 'hentaivault.me';
const ENDPOINT = 'https://www.bing.com/indexnow';

async function run() {
  console.log(`\n📡 IndexNow Ping — ${new Date().toISOString()}`);

  if (!fs.existsSync(SITEMAP_FILE)) {
    console.error('❌ sitemap.xml not found. Cannot ping IndexNow.');
    process.exit(1);
  }

  const sitemap = fs.readFileSync(SITEMAP_FILE, 'utf8');
  
  // Extract all <loc> URLs from the sitemap using a simple regex
  const urlMatches = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)];
  const urls = urlMatches.map(m => m[1]);

  console.log(`📦 Found ${urls.length} URLs in sitemap.xml to submit to Bing...`);

  // IndexNow payload
  const payload = {
    host: HOST,
    key: API_KEY,
    keyLocation: `https://${HOST}/${API_KEY}.txt`,
    urlList: urls
  };

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    if (res.status === 200 || res.status === 202) {
      console.log(`✅ Successfully pinged Bing IndexNow (Status: ${res.status}).`);
      console.log('   Bing will now prioritize indexing these pages!');
    } else {
      const text = await res.text();
      console.error(`❌ Failed to ping IndexNow (Status: ${res.status}): ${text}`);
    }
  } catch (err) {
    console.error('❌ Network error while pinging IndexNow:', err.message);
  }
}

run();
