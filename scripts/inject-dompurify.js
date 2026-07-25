const fs = require('fs');
const path = require('path');

// 1. Update index.html
const indexHtmlPath = path.join(__dirname, 'index.html');
let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

const target1 = `<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>`;
const replacement1 = `<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>\n    <!-- DOMPurify for XSS Protection -->\n    <script src="https://cdnjs.cloudflare.com/ajax/libs/dompurify/3.0.6/purify.min.js"></script>`;

indexHtml = indexHtml.replace(target1, replacement1);
fs.writeFileSync(indexHtmlPath, indexHtml, 'utf8');

// 2. Update js/app.js
const appJsPath = path.join(__dirname, 'js/app.js');
let appJs = fs.readFileSync(appJsPath, 'utf8');

const target2 = 'card.innerHTML = `\n                <div class="badge-container"';
const replacement2 = 'card.innerHTML = window.DOMPurify ? window.DOMPurify.sanitize(`\n                <div class="badge-container"';
appJs = appJs.replace(target2, replacement2);

const target3 = '            `;\n            \n            // Add Favorite Listener';
const replacement3 = '            `) : `\n                <div class="badge-container"...`; // Fallback omitted for brevity, but actually we will just add the closing parenthesis \n            `);\n            \n            // Add Favorite Listener';
// Actually, doing a safe replace:
appJs = appJs.replace(target3, '            `) : "";\n            \n            // Add Favorite Listener');

fs.writeFileSync(appJsPath, appJs, 'utf8');
console.log('✅ DOMPurify injected successfully!');
