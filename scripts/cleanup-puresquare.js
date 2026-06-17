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

const IN_CONTENT_300_250 = `            <!-- Adsterra 300x250 In-Content -->
            <div style="margin: 40px auto; text-align:center; overflow:hidden;">
                <script>
                  atOptions = {
                    'key' : '384264be4aaafb8eb28962829e409253',
                    'format' : 'iframe',
                    'height' : 250,
                    'width' : 300,
                    'params' : {}
                  };
                </script>
                <script src="https://revolthem.com/384264be4aaafb8eb28962829e409253/invoke.js"></script>
            </div>`;

const files = walk('.');
let c = 0;
for (const file of files) {
  let html = fs.readFileSync(file, 'utf8');
  const orig = html;
  
  // Replace the entire PureSquare block with the 300x250 ad
  html = html.replace(/\s*<!-- PureSquare Ecosystem Banner -->[\s\S]*?Sponsored · PureSquare Security Suite[\s\S]*?<\/div>\s*<\/div>\s*/, '\n' + IN_CONTENT_300_250 + '\n');
  
  if (html !== orig) {
    fs.writeFileSync(file, html, 'utf8');
    c++;
    console.log('Cleaned: ' + file);
  }
}
console.log('Total fixed: ' + c);
