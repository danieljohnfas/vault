const fs = require('fs');
const path = require('path');

const SKYSCRAPER_COMMENT = '<!-- Sticky Skyscraper Ads (Wide Screens Only) -->';

const skyscrapers = `    <!-- Sticky Skyscraper Ads (Wide Screens Only) -->
    <div class="skyscraper skyscraper-left">
        <a href="https://billing.purevpn.com/aff.php?aff=49387845" target="_blank" rel="noopener sponsored" style="display:flex; flex-direction:column; width:160px; height:600px; background:linear-gradient(180deg, var(--bg-surface-elevated) 0%, var(--bg-surface) 100%); border: 1px solid rgba(231,76,60,0.4); border-radius:12px; text-decoration:none; padding:20px; box-sizing:border-box; color:white; text-align:center; transition:0.3s;" onmouseover="this.style.borderColor='#e74c3c'; this.style.boxShadow='0 0 15px rgba(231,76,60,0.2)'" onmouseout="this.style.borderColor='rgba(231,76,60,0.4)'; this.style.boxShadow='none'">
            <div style="font-size:3.5rem; margin-bottom:20px; margin-top: 10px;">🛡️</div>
            <h3 style="color:#e74c3c; margin:0 0 15px 0; font-size:1.4rem; line-height:1.2; font-weight:900;">PureVPN</h3>
            <p style="font-size:0.9rem; color:var(--text-muted); margin:0 0 20px 0; line-height:1.5;">Bypass ISP blocks &amp; stay completely anonymous.</p>
            <div style="margin-top:auto; background:linear-gradient(135deg,#c0392b,#e74c3c); color:white; padding:12px; border-radius:8px; font-weight:bold; font-size:1rem; text-transform:uppercase;">82% OFF</div>
            <div style="font-size:0.65rem; color:#555; margin-top:15px; text-transform:uppercase; letter-spacing:1px;">Sponsored</div>
        </a>
    </div>
    <div class="skyscraper skyscraper-right">
        <a href="https://billing.purevpn.com/aff.php?aff=49387845" target="_blank" rel="noopener sponsored" style="display:flex; flex-direction:column; width:160px; height:600px; background:linear-gradient(180deg, var(--bg-surface-elevated) 0%, var(--bg-surface) 100%); border: 1px solid rgba(231,76,60,0.4); border-radius:12px; text-decoration:none; padding:20px; box-sizing:border-box; color:white; text-align:center; transition:0.3s;" onmouseover="this.style.borderColor='#e74c3c'; this.style.boxShadow='0 0 15px rgba(231,76,60,0.2)'" onmouseout="this.style.borderColor='rgba(231,76,60,0.4)'; this.style.boxShadow='none'">
            <div style="font-size:3.5rem; margin-bottom:20px; margin-top: 10px;">🛡️</div>
            <h3 style="color:#e74c3c; margin:0 0 15px 0; font-size:1.4rem; line-height:1.2; font-weight:900;">PureVPN</h3>
            <p style="font-size:0.9rem; color:var(--text-muted); margin:0 0 20px 0; line-height:1.5;">Unlock region-blocked anime &amp; content instantly.</p>
            <div style="margin-top:auto; background:linear-gradient(135deg,#c0392b,#e74c3c); color:white; padding:12px; border-radius:8px; font-weight:bold; font-size:1rem; text-transform:uppercase;">Get Deal</div>
            <div style="font-size:0.65rem; color:#555; margin-top:15px; text-transform:uppercase; letter-spacing:1px;">Sponsored</div>
        </a>
    </div>`;

function walkDir(dir) {
    const entries = fs.readdirSync(dir);
    for (const entry of entries) {
        const fullPath = path.join(dir, entry);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            if (entry !== 'node_modules' && entry !== '.git') {
                walkDir(fullPath);
            }
        } else if (entry.endsWith('.html')) {
            patchFile(fullPath);
        }
    }
}

function patchFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    // Step 1: Strip ALL existing skyscraper blocks (wherever they are, correct or not)
    // This regex matches the full block from comment to the end of skyscraper-right's closing </div>
    const skyRegex = /\s*<!-- Sticky Skyscraper Ads \(Wide Screens Only\) -->[\s\S]*?<div class="skyscraper skyscraper-left">[\s\S]*?<\/div>\s*<div class="skyscraper skyscraper-right">[\s\S]*?<\/a>\s*<\/div>/g;
    content = content.replace(skyRegex, '');

    // Step 2: Inject cleanly just before </body>
    content = content.replace('</body>', `\n${skyscrapers}\n\n</body>`);

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✔ Fixed: ${filePath}`);
    } else {
        console.log(`  Skipped (no change): ${filePath}`);
    }
}

walkDir('.');
console.log('\nAll done! Skyscrapers cleanly placed before </body> on every page.');
