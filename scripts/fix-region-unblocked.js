#!/usr/bin/env node
/**
 * fix-region-unblocked.js
 * Restores region-unblocked.html from the git original and applies
 * clean Adsterra ad injection (removes PureVPN contextual banner).
 */
const fs = require('fs');

let html = fs.readFileSync('region-unblocked.html', 'utf8');

// 1. Remove PureVPN contextual banner
html = html.replace(
  /[ \t]*<!-- PureVPN Contextual Banner[^>]*-->\r?\n[ \t]*<div[^>]*>[\s\S]*?<\/div>\r?\n/,
  [
    '            <!-- Adsterra 300x250 In-Content -->',
    '            <div style="margin: 40px auto; text-align:center;">',
    '                <script type="text/javascript">',
    '                    atOptions = {',
    "                        'key' : '29314488',",
    "                        'format' : 'iframe',",
    "                        'height' : 250,",
    "                        'width' : 300,",
    "                        'params' : {}",
    '                    };',
    '                </script>',
    '                <script type="text/javascript" src="//www.highperformanceformat.com/29314488/invoke.js"></script>',
    '            </div>',
    ''
  ].join('\n')
);

// 2. Remove old skyscraper pair (PureVPN ones appended near </body>)
html = html.replace(/[ \t]*<!-- Sticky Skyscraper Ads[\s\S]*?<\/div>\s*\n?[ \t]*<\/div>\s*\n?(?=[\s\S]*<\/body>)/g, '');

// 3. Remove any remaining old invoke.js blocks
html = html.replace(/<script[^>]*>\s*\n?\s*atOptions\s*=[\s\S]*?<\/script>\s*\n?\s*<script[^>]*highperformanceformat[^>]*>[^<]*<\/script>\s*\n?/g, '');
html = html.replace(/<script[^>]*highperformanceformat[^>]*>[^<]*<\/script>\s*\n?/g, '');
html = html.replace(/<script[^>]*profitablecpmratenetwork[^>]*>[^<]*<\/script>\s*\n?/g, '');
html = html.replace(/<script[^>]*revolthem[^>]*>[^<]*<\/script>\s*\n?/g, '');

// 4. Remove Amazon affiliate disclosure
html = html.replace(/ — Amazon affiliate disclosure:[^<]*/g, '');

// 5. Inject top banner right after <body>
const TOP_BANNER = `
    <!-- Adsterra Top Banner (728x90 desktop / 320x50 mobile) -->
    <div class="ad-top-banner" style="text-align:center; margin: 8px auto 0; max-width:100%; overflow:hidden;">
        <div class="ad-728" style="display:none;">
            <script type="text/javascript">
                atOptions = {
                    'key' : '29314492',
                    'format' : 'iframe',
                    'height' : 90,
                    'width' : 728,
                    'params' : {}
                };
            </script>
            <script type="text/javascript" src="//www.highperformanceformat.com/29314492/invoke.js"></script>
        </div>
        <div class="ad-320" style="display:none;">
            <script type="text/javascript">
                atOptions = {
                    'key' : '29314491',
                    'format' : 'iframe',
                    'height' : 50,
                    'width' : 320,
                    'params' : {}
                };
            </script>
            <script type="text/javascript" src="//www.highperformanceformat.com/29314491/invoke.js"></script>
        </div>
    </div>
    <style>
        @media (min-width: 729px) { .ad-top-banner .ad-728 { display:block !important; } }
        @media (max-width: 728px) { .ad-top-banner .ad-320 { display:block !important; } }
    </style>
`;
if (!html.includes('Adsterra Top Banner')) {
  html = html.replace(/(<body[^>]*>)\s*\n?/, `$1\n${TOP_BANNER}\n`);
}

// 6. Inject skyscrapers before </body>
const SKYSCRAPERS = `<!-- Sticky Skyscraper Ads (Wide Screens Only) -->
    <div class="skyscraper skyscraper-left">
        <script type="text/javascript">
            atOptions = {
                'key' : '29314489',
                'format' : 'iframe',
                'height' : 600,
                'width' : 160,
                'params' : {}
            };
        </script>
        <script type="text/javascript" src="//www.highperformanceformat.com/29314489/invoke.js"></script>
    </div>
    <div class="skyscraper skyscraper-right">
        <script type="text/javascript">
            atOptions = {
                'key' : '29314490',
                'format' : 'iframe',
                'height' : 600,
                'width' : 160,
                'params' : {}
            };
        </script>
        <script type="text/javascript" src="//www.highperformanceformat.com/29314490/invoke.js"></script>
    </div>`;
if (!html.includes('29314489')) {
  html = html.replace(/\s*<\/body>/, `\n\n${SKYSCRAPERS}\n\n</body>`);
}

// 7. Inject sticky bottom before </body>
const STICKY = `    <!-- Adsterra Sticky Bottom Banner (320x50) -->
    <div id="sticky-bottom-ad" style="position:fixed; bottom:0; left:50%; transform:translateX(-50%); z-index:9999; text-align:center;">
        <div class="sticky-ad-inner">
            <script type="text/javascript">
                atOptions = {
                    'key' : '29314491',
                    'format' : 'iframe',
                    'height' : 50,
                    'width' : 320,
                    'params' : {}
                };
            </script>
            <script type="text/javascript" src="//www.highperformanceformat.com/29314491/invoke.js"></script>
        </div>
        <button onclick="document.getElementById('sticky-bottom-ad').style.display='none'" class="btn-close-ad" style="position:absolute;top:-10px;right:0;background:#333;color:#fff;border:none;border-radius:50%;width:20px;height:20px;font-size:12px;cursor:pointer;line-height:20px;">&times;</button>
    </div>`;
if (!html.includes('sticky-bottom-ad')) {
  html = html.replace(/\s*<\/body>/, `\n${STICKY}\n</body>`);
}

// 8. Social Bar + Popunder
const SOCIAL = `    <!-- Adsterra SocialBar & Popunder -->
    <script type="text/javascript" src="//pl29314486.highperformanceformat.com/29314486/invoke.js" async></script>
    <script type="text/javascript" src="//pl29314483.highperformanceformat.com/29314483/invoke.js" async></script>`;
if (!html.includes('pl29314486')) {
  html = html.replace(/<\/body>/, `${SOCIAL}\n</body>`);
}

fs.writeFileSync('region-unblocked.html', html, 'utf8');
console.log('✅ region-unblocked.html fixed cleanly.');
