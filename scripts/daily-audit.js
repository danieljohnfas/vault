#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const isSiteLive = require('./ping-site');

const DATA_FILE = path.resolve(__dirname, '../js/data.js');

function readDataJs() {
  const raw = fs.readFileSync(DATA_FILE, 'utf8').replace(/\r/g, '');
  const match = raw.match(/const\s+sitesData\s*=\s*([\s\S]*?\]);/);
  if (!match) throw new Error('Could not parse sitesData from data.js');
  const json = match[1].replace(/,\s*([\]}])/g, '$1');
  return JSON.parse(json);
}

function writeDataJs(sites) {
  const str = `const sitesData = ${JSON.stringify(sites, null, 4)};`;
  fs.writeFileSync(DATA_FILE, str, 'utf8');
}

async function run() {
  console.log(`\n🕵️ HentaiVault Daily Audit — ${new Date().toISOString()}`);
  
  const sites = readDataJs();
  console.log(`📦 Loaded ${sites.length} total sites from database.`);
  
  const validSites = [];
  const deadSites = [];
  
  console.log('\n🔍 Pinging ALL sites (concurrency=20) to purge dead domains...');
  
  for (let i = 0; i < sites.length; i += 20) {
    const chunk = sites.slice(i, i + 20);
    process.stdout.write(`   Batch ${Math.floor(i/20)+1}/${Math.ceil(sites.length/20)}... `);
    
    const results = await Promise.all(chunk.map(async s => {
      return { site: s, live: await isSiteLive(s.url) };
    }));
    
    let deadCount = 0;
    for (const r of results) {
      if (r.live) {
        validSites.push(r.site);
      } else {
        deadSites.push(r.site);
        deadCount++;
      }
    }
    console.log(`[${chunk.length - deadCount} Live, ${deadCount} Dead]`);
  }
  
  console.log(`\n✅ Audit complete.`);
  console.log(`   Live sites kept: ${validSites.length}`);
  console.log(`   Dead sites purged: ${deadSites.length}`);
  
  if (deadSites.length > 0) {
    console.log('\n❌ Dead sites removed:');
    deadSites.forEach(s => console.log(`   · ${s.url} (${s.name})`));
  }
  
  writeDataJs(validSites);
  console.log(`\n💾 data.js updated.`);
}

run();
