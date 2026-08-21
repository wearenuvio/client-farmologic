#!/usr/bin/env bash
# Renders every artboard at its exact pixel size with headless Chrome, so the
# type is whatever Chrome draws rather than an approximation of it.
set -euo pipefail
cd "$(dirname "$0")/.."

CHROME="$HOME/Library/Caches/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell"
[ -x "$CHROME" ] || { echo "headless chrome not found at $CHROME"; exit 1; }

mkdir -p marketing/launch
rm -f marketing/launch/*.png

for f in marketing/boards/*.html; do
  slug=$(basename "$f" .html)
  size=${slug##*-}                       # e.g. 1080x1080
  w=${size%x*}; h=${size#*x}
  "$CHROME" --headless --disable-gpu --hide-scrollbars \
    --force-device-scale-factor=1 --default-background-color=00000000 \
    --window-size="$w,$h" --virtual-time-budget=6000 \
    --screenshot="marketing/launch/$slug.png" "file://$PWD/$f" >/dev/null 2>&1
  printf '%-34s %sx%s  %s\n' "$slug.png" "$w" "$h" \
    "$(python3 -c "from PIL import Image;im=Image.open('marketing/launch/$slug.png');print(f'{im.width}x{im.height}')")"
done
