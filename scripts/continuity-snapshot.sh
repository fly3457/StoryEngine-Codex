#!/bin/bash
# Story Engine — Continuity Snapshot
# Creates a timestamped backup of all continuity files.
# Usage: bash scripts/continuity-snapshot.sh

set -euo pipefail
DATE=$(date +%Y-%m-%d_%H%M)
SNAPSHOT_DIR="continuity/snapshots"

if [ ! -f PROJECT.md ]; then
    echo "Error: run from the story root containing PROJECT.md." >&2
    exit 1
fi
if [ -L continuity ] || [ -L "$SNAPSHOT_DIR" ]; then
    echo "Error: continuity snapshots must stay in this project's own directory." >&2
    exit 1
fi

# Preflight all three inputs and destinations before copying any file.
for NAME in tracker threads changelog; do
    if [ ! -f "continuity/$NAME.md" ]; then
        echo "Error: missing continuity/$NAME.md; no snapshot written." >&2
        exit 1
    fi
    TARGET="$SNAPSHOT_DIR/${NAME}_${DATE}.md"
    if [ -e "$TARGET" ] || [ -L "$TARGET" ]; then
        echo "Error: snapshot already exists for $DATE; refusing to overwrite." >&2
        exit 1
    fi
done

mkdir -p "$SNAPSHOT_DIR"
echo "📸 Creating continuity snapshot: $DATE"
for NAME in tracker threads changelog; do
    cp -n -- "continuity/$NAME.md" "$SNAPSHOT_DIR/${NAME}_${DATE}.md"
    echo "  ✅ $NAME backed up"
done

echo ""
echo "Snapshot saved to: $SNAPSHOT_DIR/*_${DATE}.md"
echo ""
echo "Existing snapshots:"
ls -la "$SNAPSHOT_DIR/" | tail -10
