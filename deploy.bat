@echo off
REM Deploy script - DO NOT commit API keys here
set WRANGLER_SEND_METRICS=false
npx.cmd wrangler deploy
pause
