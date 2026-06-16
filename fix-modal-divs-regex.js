const fs = require('fs');
const path = require('path');

function walkDir(dir) {
    const results = [];
    for (const f of fs.readdirSync(dir)) {
        const full = path.join(dir, f);
        if (fs.statSync(full).isDirectory()) {
            if (f !== 'node_modules' && f !== '.git' && f !== '.wrangler') {
                results.push(...walkDir(full));
            }
        } else if (f.endsWith('.html')) {
            results.push(full);
        }
    }
    return results;
}

const files = walkDir('.');
let fixed = 0;

for (const file of files) {
    let c = fs.readFileSync(file, 'utf8');
    const orig = c;

    // The bug: <div class="share-actions">...</div> is closed, but its parent share-modal-content and share-modal are NOT.
    // So the very next tag is usually <!-- Scripts -->
    
    // We look for:
    // </div>
    // 
    // <!-- Scripts -->
    
    // And if we find it INSIDE a file that has id="shareModal", we add </div></div>
    
    if (c.includes('id="shareModal"')) {
        // Find if it's already properly closed
        const isClosedProperly = c.match(/<\/div>\s*<\/div>\s*<\/div>\s*<!-- Scripts/i) || c.match(/<\/div>\s*<\/div>\s*<\/div>\s*<!-- Honeypot/i);
        
        if (!isClosedProperly) {
            // Find the end of share-actions
            c = c.replace(/(<a id="btnShareReddit"[^>]*>.*?<\/a>\s*<\/div>)\s*<!-- Scripts/i, '$1\n        </div>\n    </div>\n\n    <!-- Scripts');
            // Check honeypot case too
            c = c.replace(/(<a id="btnShareReddit"[^>]*>.*?<\/a>\s*<\/div>)\s*<!-- Honeypot/i, '$1\n        </div>\n    </div>\n\n    <!-- Honeypot');
        }
    }

    if (c !== orig) {
        fs.writeFileSync(file, c, 'utf8');
        console.log('Fixed missing </div> in:', file);
        fixed++;
    }
}
console.log('\nTotal files patched: ' + fixed);
