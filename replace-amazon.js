const fs = require('fs');
const path = require('path');

const newPureSquareGrid = `
    <!-- PureSquare Ecosystem Banner -->
    <div style="max-width:800px; margin: 40px auto 0; padding: 20px 24px; background: linear-gradient(135deg, rgba(123,13,30,0.12) 0%, rgba(192,57,43,0.08) 100%); border: 1px solid rgba(192,57,43,0.3); border-radius: 16px;">
        <div style="font-size:0.72rem; color: #888; text-transform:uppercase; letter-spacing:0.08em; margin-bottom:12px;">Sponsored · PureSquare Security Suite</div>
        <div style="display:flex; flex-wrap:wrap; gap:12px; align-items:stretch;">
            <a href="https://billing.purevpn.com/aff.php?aff=49387845" target="_blank" rel="noopener sponsored" style="flex:1; min-width:200px; display:flex; align-items:center; gap:14px; background: rgba(192,57,43,0.1); border: 1px solid rgba(192,57,43,0.35); border-radius:12px; padding:14px 18px; text-decoration:none; transition: all 0.2s;" onmouseover="this.style.background='rgba(192,57,43,0.18)'" onmouseout="this.style.background='rgba(192,57,43,0.1)'">
                <div style="font-size:2rem;">🛡️</div>
                <div>
                    <div style="font-weight:800; color:#e74c3c; font-size:0.95rem; line-height:1.2;">PureVPN</div>
                    <div style="font-size:0.8rem; color:rgba(255,255,255,0.75); margin-top:2px;">Ultimate Privacy &mdash; Bypass ISP blocks</div>
                    <div style="font-size:0.75rem; color:#e74c3c; margin-top:4px; font-weight:600;">Get 82% OFF + 3 Months Free &rarr;</div>
                </div>
            </a>
            <a href="https://billing.purevpn.com/aff.php?aff=49387845" target="_blank" rel="noopener sponsored" style="flex:1; min-width:200px; display:flex; align-items:center; gap:14px; background: rgba(46,204,113,0.08); border: 1px solid rgba(46,204,113,0.3); border-radius:12px; padding:14px 18px; text-decoration:none; transition: all 0.2s;" onmouseover="this.style.background='rgba(46,204,113,0.16)'" onmouseout="this.style.background='rgba(46,204,113,0.08)'">
                <div style="font-size:2rem;">🔑</div>
                <div>
                    <div style="font-weight:800; color:#2ecc71; font-size:0.95rem; line-height:1.2;">PureKeep</div>
                    <div style="font-size:0.8rem; color:rgba(255,255,255,0.75); margin-top:2px;">Secure Password Manager</div>
                    <div style="font-size:0.75rem; color:#2ecc71; margin-top:4px; font-weight:600;">Store credentials safely &rarr;</div>
                </div>
            </a>
            <a href="https://billing.purevpn.com/aff.php?aff=49387845" target="_blank" rel="noopener sponsored" style="flex:1; min-width:200px; display:flex; align-items:center; gap:14px; background: rgba(52,152,219,0.08); border: 1px solid rgba(52,152,219,0.3); border-radius:12px; padding:14px 18px; text-decoration:none; transition: all 0.2s;" onmouseover="this.style.background='rgba(52,152,219,0.16)'" onmouseout="this.style.background='rgba(52,152,219,0.08)'">
                <div style="font-size:2rem;">👁️‍🗨️</div>
                <div>
                    <div style="font-weight:800; color:#3498db; font-size:0.95rem; line-height:1.2;">PurePrivacy</div>
                    <div style="font-size:0.8rem; color:rgba(255,255,255,0.75); margin-top:2px;">Digital Privacy Manager</div>
                    <div style="font-size:0.75rem; color:#3498db; margin-top:4px; font-weight:600;">Stop trackers instantly &rarr;</div>
                </div>
            </a>
        </div>
    </div>`;

const newTopBanner = `
    <!-- Top PureVPN Banner -->
    <a href="https://billing.purevpn.com/aff.php?aff=49387845" target="_blank" rel="noopener sponsored" style="color: white; text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 10px; flex-wrap: wrap; background: rgba(231,76,60,0.15); padding: 5px 15px; border-radius: 8px;">
        <span style="font-size: 1.2rem;">🛡️</span>
        <span style="font-weight: bold; color: #e74c3c;">Get 82% OFF PureVPN + 3 Months Free! Stay anonymous online.</span>
    </a>`;

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (fullPath !== 'node_modules' && fullPath !== '.git') {
                walkDir(fullPath);
            }
        } else if (fullPath.endsWith('.html')) {
            patchFile(fullPath);
        }
    }
}

function patchFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Replace 3-column Amazon banner
    content = content.replace(/<!-- Amazon Affiliate Banner -->[\s\S]*?<div style="display:flex; flex-wrap:wrap; gap:12px; align-items:stretch;">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, newPureSquareGrid);
    
    // Sometimes it's slightly different formatting, let's use a broader regex if the first fails
    if(content.includes('Amazon Affiliate Banner')) {
        content = content.replace(/<!-- Amazon Affiliate Banner -->[\s\S]*?Amazon Business[\s\S]*?<\/a>\s*<\/div>\s*<\/div>/, newPureSquareGrid);
    }

    // Replace Top Amazon Banner
    content = content.replace(/<!-- Top Amazon Banner -->[\s\S]*?<\/a>/, newTopBanner);

    // Remove Amazon disclosure
    content = content.replace(/ &mdash; Amazon affiliate disclosure: we earn commissions from qualifying purchases\./g, '');

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Replaced Amazon banners in: ${filePath}`);
    }
}

walkDir('.');
console.log('Amazon cleanup complete.');
