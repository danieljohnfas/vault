const fs = require('fs');

let mylist = fs.readFileSync('mylist.html', 'utf8');
const index = fs.readFileSync('index.html', 'utf8');

// Extract full nav from index
const navRegex = /<nav class="navbar">[\s\S]*?<\/nav>/;
const fullNav = index.match(navRegex)[0];

// Extract footer from index
const footerRegex = /<footer class="site-footer">[\s\S]*?<\/footer>/;
const fullFooter = index.match(footerRegex)[0];

// Replace nav in mylist
mylist = mylist.replace(navRegex, fullNav);

// Insert footer after main
// mylist currently has: </main>\n\n<script>
mylist = mylist.replace('</main>', '</main>\n\n' + fullFooter);

fs.writeFileSync('mylist.html', mylist, 'utf8');
console.log('Fixed mylist.html');
