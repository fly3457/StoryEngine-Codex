#!/bin/bash
# Story Engine — Initialize New Project
# Usage: bash scripts/init-project.sh "My Story Title"

set -euo pipefail
TITLE="${1:-Untitled Project}"
SLUG=$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | tr -cd 'a-z0-9-')
DATE=$(date +%Y-%m-%d)

if [ ! -f PROJECT.md ]; then
    echo "Error: run from a complete StoryEngine-Codex project root (PROJECT.md is required)." >&2
    exit 1
fi
if [ "$#" -gt 1 ]; then
    echo "Error: pass one quoted, single-line story title." >&2
    exit 1
fi
case "$TITLE" in
    *$'\n'*|*$'\r'*)
        echo "Error: the story title must be a single line." >&2
        exit 1
        ;;
esac

echo "📖 Story Engine — Initializing: $TITLE"
echo "=================================="

# The templates come from the repository; only create missing directories/acts.
mkdir -p world characters outline/scenes drafts continuity style

# Set only the template's title placeholders; preserve an existing story's title.
# Escape replacement metacharacters so &, backslashes, and | remain literal.
ESCAPED_TITLE=$(printf '%s' "$TITLE" | sed 's/[\\&|]/\\&/g')
sed -i \
    -e "1s|\[Your Story Title\]|$ESCAPED_TITLE|" \
    -e "1s|\[Working Title\]|$ESCAPED_TITLE|" \
    -e "/^## Working Title/,/^## /s|^\[Title\]\r\?$|$ESCAPED_TITLE|" \
    -e "/^## Working Title/,/^## /s|^\[Working Title\]\r\?$|$ESCAPED_TITLE|" \
    PROJECT.md

# Create initial act files from the original structure.
for ACT in 1 2 3; do
    if [ ! -f "outline/act-${ACT}.md" ]; then
        cat > "outline/act-${ACT}.md" << EOF
# Act ${ACT} — [Title]

## Chapters

### Chapter [N] — [Title]
- **Scene Card:** outline/scenes/ch[N]-s1.md
- **POV:** [Character]
- **Purpose:** [Why this chapter exists]
- **Word Target:** [N]

---

## Act ${ACT} Notes
[Thematic concerns, pacing notes, key moments to nail]
EOF
        echo "  ✅ Created outline/act-${ACT}.md"
    fi
done

echo "  ✅ Existing continuity files preserved"
echo ""
echo "=================================="
echo "✨ Project initialized: $TITLE"
echo "📁 Structure:"
echo ""
find . -name "*.md" -not -path "./.git/*" -not -path "./node_modules/*" | sort | sed -n '1,30p'
echo ""
echo "🚀 Next steps:"
echo "   1. Open this directory in Codex"
echo "   2. Share your story idea"
echo "   3. Codex will read AGENTS.md and guide you through each phase"
echo ""
echo "📋 Initialization does not approve story phases or overwrite established Canon."
