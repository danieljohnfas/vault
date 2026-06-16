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

    // Check if the shareModal has missing closing divs
    if (c.includes('id="shareModal"')) {
        // Find where the share-actions ends
        const targetStr = '<a id="btnShareReddit" href="#" target="_blank" class="btn-share-action">&#x1F916; Share on Reddit</a>\n            </div>';
        const replaceStr = '<a id="btnShareReddit" href="#" target="_blank" class="btn-share-action">&#x1F916; Share on Reddit</a>\n            </div>\n        </div>\n    </div>';

        if (c.includes(targetStr) && !c.includes(replaceStr)) {
            c = c.replace(targetStr, replaceStr);
        }

        // Also check if index.html variant with emojis instead of hex codes
        const targetStr2 = '<a id="btnShareReddit" href="#" target="_blank" class="btn-share-action">🤖 Share on Reddit</a>\r\n            </div>';
        const replaceStr2 = '<a id="btnShareReddit" href="#" target="_blank" class="btn-share-action">🤖 Share on Reddit</a>\r\n            </div>\r\n        </div>\r\n    </div>';

        if (c.includes(targetStr2) && !c.includes(replaceStr2)) {
            c = c.replace(targetStr2, replaceStr2);
        }
    }

    if (c !== orig) {
        fs.writeFileSync(file, c, 'utf8');
        console.log('Fixed missing </div> in:', file);
        fixed++;
    }
}
console.log('\nTotal files patched: ' + fixed);
