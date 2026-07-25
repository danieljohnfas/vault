
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../../css/src');
const outPath = path.join(__dirname, '../../css/style.css');

const files = [
  "_reset.css",
  "base.css",
  "base.css",
  "base.css",
  "base.css",
  "base.css",
  "base.css",
  "base.css",
  "base.css",
  "base.css",
  "base.css",
  "base.css",
  "base.css",
  "base.css",
  "base.css",
  "base.css",
  "base.css",
  "base.css",
  "base.css",
  "base.css",
  "base.css",
  "base.css"
];

let finalCss = '';
files.forEach(f => {
  finalCss += fs.readFileSync(path.join(srcDir, f), 'utf8') + '\n';
});

fs.writeFileSync(outPath, finalCss, 'utf8');
console.log('✅ CSS bundled successfully!');
