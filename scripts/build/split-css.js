const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '../../css/style.css');
const srcDir = path.join(__dirname, '../../css/src');

if (!fs.existsSync(srcDir)) {
  fs.mkdirSync(srcDir, { recursive: true });
}

const cssContent = fs.readFileSync(cssPath, 'utf8');

// The CSS file uses blocks like /* === Navbar === */
// We can split by /* ==========================================================================
const sections = cssContent.split(/\/\*\s*={10,}\s*\n/g);

let buildConfig = [];

sections.forEach((section, index) => {
  if (!section.trim()) return;
  
  // Extract the title
  const titleMatch = section.match(/^\s*(.+)\n\s*={10,}\s*\*\//);
  let filename = 'base.css';
  let content = section;
  
  if (titleMatch) {
    const title = titleMatch[1].trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
    filename = `_${title}.css`;
    // content = section.replace(titleMatch[0], '').trim();
  } else if (index === 0) {
    filename = '_reset.css';
  }
  
  fs.writeFileSync(path.join(srcDir, filename), `/* ==========================================================================\n` + section, 'utf8');
  buildConfig.push(filename);
});

// Write a simple build script
const buildScript = `
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../../css/src');
const outPath = path.join(__dirname, '../../css/style.css');

const files = ${JSON.stringify(buildConfig, null, 2)};

let finalCss = '';
files.forEach(f => {
  finalCss += fs.readFileSync(path.join(srcDir, f), 'utf8') + '\\n';
});

fs.writeFileSync(outPath, finalCss, 'utf8');
console.log('✅ CSS bundled successfully!');
`;

fs.writeFileSync(path.join(__dirname, 'build-css.js'), buildScript, 'utf8');
console.log('✅ CSS split successfully into css/src/ and build-css.js created.');
