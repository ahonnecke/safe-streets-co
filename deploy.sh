#!/usr/bin/env bash
# Deploy HB26-1318 advocacy site to honnecke.us
#
# Usage: ./deploy.sh [--delete] [--dry-run]
#   --delete   Mirror local exactly (removes server-side files not in source)
#   --dry-run  Show what would change without uploading
#
# Source: ./HB26-1318/
# Target: honnecke.us:/var/www/honnecke/bike_bus/hb26-1318/
set -euo pipefail

REMOTE_HOST="honnecke.us"
REMOTE_PATH="/var/www/honnecke/bike_bus/hb26-1318/"
SOURCE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/HB26-1318/"

RSYNC_OPTS=(-avz --human-readable --progress
            --chmod=D755,F644
            --exclude='.DS_Store' --exclude='*.swp' --exclude='*~')

for arg in "$@"; do
  case "$arg" in
    --delete)  RSYNC_OPTS+=(--delete) ;;
    --dry-run) RSYNC_OPTS+=(--dry-run) ;;
    *) echo "unknown arg: $arg" >&2; exit 2 ;;
  esac
done

echo "▶ source: $SOURCE_DIR"
echo "▶ target: $REMOTE_HOST:$REMOTE_PATH"
echo "▶ opts:   ${RSYNC_OPTS[*]}"
echo

ssh "$REMOTE_HOST" "mkdir -p '$REMOTE_PATH'"
rsync "${RSYNC_OPTS[@]}" "$SOURCE_DIR" "$REMOTE_HOST:$REMOTE_PATH"

echo
echo "✓ deployed → https://honnecke.us/bike_bus/hb26-1318/"
