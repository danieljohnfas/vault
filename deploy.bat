@echo off
REM Deploy script - DO NOT commit API keys here
REM Set CLOUDFLARE_API_KEY and CLOUDFLARE_EMAIL as system environment variables instead
REM Run: [System.Environment]::SetEnvironmentVariable("CLOUDFLARE_API_KEY","your_key","User")
set CI=true
set WRANGLER_SEND_METRICS=false
npx.cmd wrangler deploy
