#!/usr/bin/env node
/**
 * split-sql.js — Splits a large SQL file into batches of 200 statements
 *
 * Usage:
 *   node scripts/split-sql.js /path/to/input.sql /path/to/output/dir
 *
 * Cloudflare D1 has a 1MB per-request limit, so we split large SQL files
 * into smaller batches to ensure reliable execution.
 */

'use strict';

const fs   = require('fs');
const path = require('path');

const [,, inputFile, outputDir] = process.argv;

if (!inputFile || !outputDir) {
  console.error('Usage: node split-sql.js <input.sql> <output-dir>');
  process.exit(1);
}

if (!fs.existsSync(inputFile)) {
  console.error(`❌ Input file not found: ${inputFile}`);
  process.exit(1);
}

fs.mkdirSync(outputDir, { recursive: true });

const content = fs.readFileSync(inputFile, 'utf8');

// Split on semicolons that end statements (each INSERT ends with ;)
const statements = content
  .split('\n')
  .map(s => s.trim())
  .filter(s => s.length > 0 && s.endsWith(';'));

if (statements.length === 0) {
  console.log('⚠️  No SQL statements found in input file. Nothing to split.');
  process.exit(0);
}

const BATCH_SIZE = 200;
let batchIndex = 1;
let written = 0;

for (let i = 0; i < statements.length; i += BATCH_SIZE) {
  const batch = statements.slice(i, i + BATCH_SIZE);
  const filename = path.join(outputDir, `batch_${String(batchIndex).padStart(3, '0')}.sql`);
  fs.writeFileSync(filename, batch.join('\n') + '\n', 'utf8');
  console.log(`  📄 Wrote ${filename} (${batch.length} statements)`);
  batchIndex++;
  written += batch.length;
}

console.log(`✅ Split ${written} statements into ${batchIndex - 1} batch file(s).`);
