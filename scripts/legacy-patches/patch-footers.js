const fs = require('fs');
const path = require('path');

const bannerHtml = `
            <!-- VPN Affiliate Banner -->
            <div style="margin: 24px auto; max-width: 800px; padding: 22px 24px; background: linear-gradient(135deg, rgba(123,13,30,0.18) 0%, rgba(192,57,43,0.1) 100%); border: 1px solid rgba(192,57,43,0.4); border-radius: 16px; text-align: left;">
                <div style="font-size:0.72rem; color: var(--text-muted); text-transform:uppercase; letter-spacing:0.08em; margin-bottom:14px;">Sponsored &middot; Recommended VPN for Adult Sites</div>
                <div style="display:flex; flex-wrap:wrap; gap:12px; align-items:stretch;">
                    <a href="https://billing.purevpn.com/aff.php?aff=49387845" target="_blank" rel="noopener sponsored" style="flex:1; min-width:220px; display:flex; align-items:center; gap:16px; background: rgba(192,57,43,0.12); border: 1px solid rgba(192,57,43,0.4); border-radius:12px; padding:16px 20px; text-decoration:none; transition: all 0.2s;" onmouseover="this.style.background='rgba(192,57,43,0.22)';this.style.transform='translateY(-2px)'" onmouseout="this.style.background='rgba(192,57,43,0.12)';this.style.transform=''">
                        <div style="font-size:2.4rem; flex-shrink:0;">🛡️</div>
                        <div style="flex:1;">
                            <div style="font-weight:900; color:#e74c3c; font-size:1rem; line-height:1.2; margin-bottom:4px;">PureVPN &mdash; Hide From Your ISP</div>
                            <div style="font-size:0.82rem; color:rgba(255,255,255,0.8); margin-bottom:6px;">Bypass ISP blocks, stay anonymous, access everything</div>
                            <div style="display:flex; gap:8px; flex-wrap:wrap;">
                                <span style="background:rgba(231,76,60,0.25); color:#e74c3c; padding:3px 10px; border-radius:20px; font-size:0.75rem; font-weight:700;">&#10003; Best Value: 2-Year Plan</span>
                                <span style="background:rgba(231,76,60,0.25); color:#e74c3c; padding:3px 10px; border-radius:20px; font-size:0.75rem; font-weight:700;">&#10003; 31-Day Money Back</span>
                            </div>
                        </div>
                        <div style="background:linear-gradient(135deg,#c0392b,#e74c3c); color:white; padding:10px 18px; border-radius:10px; font-weight:900; font-size:0.9rem; white-space:nowrap; flex-shrink:0;">Get PureVPN &rarr;</div>
                    </a>
                </div>
            </div>
            <p class="copyright">&copy; 2026 HentaiVault.me. All rights reserved.</p>`;

const directories = [
    './category',
    './blog',
    '.'
];

let modifiedCount = 0;

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (fullPath !== 'node_modules' && fullPath !== '.git' && fullPath !== '.github') {
                // Ignore subdirs for now as we only care about top level, blog, and category
            }
        } else if (fullPath.endsWith('.html')) {
            patchFile(fullPath);
        }
    }
}

function patchFile(filePath) {
    // Don't patch specific files that shouldn't have standard footers or are already patched
    if (filePath.includes('out.html') || filePath.includes('embed.html') || filePath.includes('extension')) return;

    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if it already has the VPN banner
    if (content.includes('49387845')) return;

    // Check for standard copyright line
    const targetString = '<p class="copyright">&copy; 2026 HentaiVault.me. All rights reserved.</p>';
    if (content.includes(targetString)) {
        content = content.replace(targetString, bannerHtml);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Patched: ${filePath}`);
        modifiedCount++;
    } else {
        // Some files might have 2024 or 2025 copyright? 
        const targetRegex = /<p class="copyright">.*?<\/p>/;
        if (targetRegex.test(content)) {
            content = content.replace(targetRegex, bannerHtml);
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Patched (Regex): ${filePath}`);
            modifiedCount++;
        }
    }
}

directories.forEach(dir => walkDir(dir));
console.log(`Total files modified: ${modifiedCount}`);
