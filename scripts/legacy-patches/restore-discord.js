const fs = require('fs');
const path = require('path');
const dirs = ['.', './blog', './category'];
const btn = '<a href="https://discord.gg/your_discord_invite_here" target="_blank" class="btn-theme" title="Join our Discord" style="text-decoration: none; display: flex; align-items: center; justify-content: center; font-size: 1.2rem;">💬</a>\n                ';

let restored = 0;
dirs.forEach(dir => {
    fs.readdirSync(dir).forEach(file => {
        if(file.endsWith('.html')) {
            const p = path.join(dir, file);
            let content = fs.readFileSync(p, 'utf8');
            if(!content.includes('discord.gg')) {
                content = content.replace(/<button id="themeToggle"/, btn + '<button id="themeToggle"');
                fs.writeFileSync(p, content, 'utf8');
                restored++;
            }
        }
    });
});
console.log(`Restored Discord button in ${restored} files.`);
