const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const queueFile = path.join(__dirname, 'sites-queue.json');
const sqlFile = path.join(__dirname, 'queue_migration.sql');

if (!fs.existsSync(queueFile)) {
  console.log('No queue file found.');
  process.exit(0);
}

const queue = JSON.parse(fs.readFileSync(queueFile, 'utf8'));
let sql = '';

for (const site of queue) {
  const id = crypto.randomUUID();
  const url = site.url.replace(/'/g, "''");
  const cat = (site.category || '').replace(/'/g, "''");
  const name = (site.name || '').replace(/'/g, "''");
  
  sql += `INSERT OR IGNORE INTO queue (id, url, category, name, status) VALUES ('${id}', '${url}', '${cat}', '${name}', 'pending');\n`;
}

fs.writeFileSync(sqlFile, sql, 'utf8');
console.log('Wrote ' + queue.length + ' sites to ' + sqlFile);
