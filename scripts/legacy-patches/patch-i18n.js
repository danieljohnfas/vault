const fs = require('fs');
let text = fs.readFileSync('./js/i18n.js', 'utf8');

text = text.replace(/"nhentai-alternatives-2026\.html":\s*\{[^}]+\},/g, match => {
  return match + `\n            "hanime-alternatives-2026.html": { title: "7 Best Hanime Alternatives in 2026 (Free & Working) | HentaiVault", description: "Hanime.tv down or buffering? Here are the 7 best free hanime alternatives in 2026 for high-quality, uncensored hentai streaming." },`;
});

text = text.replace(/"nhentai-alternatives-2026\.html":\s*".+?",/g, match => {
  return match + `\n        "hanime-alternatives-2026.html": "7 Best Hanime Alternatives in 2026",`;
});

fs.writeFileSync('./js/i18n.js', text, 'utf8');
