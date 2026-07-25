const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');
html = html.replace('<script src=\"https://challenges.cloudflare.com/turnstile/v0/api.js\" async defer></script>', '<script src=\"https://challenges.cloudflare.com/turnstile/v0/api.js\" async defer></script>\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/dompurify/3.0.6/purify.min.js\"></script>');
fs.writeFileSync('index.html', html);

let js = fs.readFileSync('js/app.js', 'utf8');
js = js.replace('card.innerHTML = `\n                <div class=\"badge-container\"', 'card.innerHTML = window.DOMPurify ? window.DOMPurify.sanitize(`\n                <div class=\"badge-container\"');
js = js.replace('            `;\n            \n            // Add Favorite Listener', '            `) : \"\";\n            \n            // Add Favorite Listener');
fs.writeFileSync('js/app.js', js);
console.log('✅ DOMPurify injected successfully!');
