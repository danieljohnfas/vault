const fs = require('fs');
const path = require('path');

function walk(dir, results = []) {
  const SKIP = ['node_modules', '.git', 'scripts', 'assets', 'css', 'js', '.wrangler', '.github', 'migrations', 'bot'];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP.includes(entry.name)) continue;
      walk(full, results);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      results.push(full);
    }
  }
  return results;
}

const files = walk('.');
const report = {
  totalFiles: files.length,
  missingFooter: [],
  missingAdSlots: {},
  rogueAds: [],
  seoIssues: [],
  potentialAdAreas: []
};

const REQUIRED_ADS = {
  'top_banner': '40d623b6e8e7efa7651f8c6fbeb29bef',
  'skyscraper': '13ca4044b4b6e65ef15f10d18752754e',
  'sticky_bottom': 'sticky-bottom-ad',
  'native_banner': 'container-a098db90df9a9b985c317d9ba01e155e',
  'social_bar': '994511c440490953ceb331525d9f463f',
  'popunder': 'ba6744afc790009f7b04d7509a97ea2f'
};

const ROGUE_KEYWORDS = ['purevpn', 'puresquare', 'highperformanceformat'];

for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  
  if (!html.includes('<footer')) report.missingFooter.push(file);

  const missingAds = [];
  for (const [adName, adKey] of Object.entries(REQUIRED_ADS)) {
    if (!html.includes(adKey)) missingAds.push(adName);
  }

  // Check specific contextual ads
  if (html.includes('class="hero"') && !html.includes('4179d9cf3a579f7778ba7a09f693ca35')) {
    missingAds.push('hero_banner_468x60');
  }
  if (html.includes('class="sidebar"') && !html.includes('f09dcac8f1df551ed650e4aee0028622')) {
    missingAds.push('sidebar_banner_160x300');
  }

  if (missingAds.length > 0) {
    report.missingAdSlots[file] = missingAds;
  }

  for (const rogue of ROGUE_KEYWORDS) {
    if (html.toLowerCase().includes(rogue)) {
      report.rogueAds.push(`${file} (${rogue})`);
    }
  }

  // Basic SEO check for blog pages
  if (file.includes('blog\\') || file.includes('blog/')) {
    if (!html.includes('<h1')) report.seoIssues.push(`${file} (Missing H1)`);
    if (!html.includes('<meta name="description"')) report.seoIssues.push(`${file} (Missing meta description)`);
  }
}

fs.writeFileSync('audit_report.json', JSON.stringify(report, null, 2));
console.log('Audit complete.');
