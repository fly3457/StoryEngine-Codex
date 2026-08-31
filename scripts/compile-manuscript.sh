#!/bin/bash
# Story Engine — Compile Manuscript
# Merges chapter drafts into a single manuscript file.
# Usage: bash scripts/compile-manuscript.sh [output-filename]

set -euo pipefail
OUTPUT="${1:-manuscript.md}"
DATE=$(date +%Y-%m-%d)

if [ ! -f PROJECT.md ]; then
    echo "Error: run from the story root containing PROJECT.md." >&2
    exit 1
fi

# Resolve parent aliases before writing; manuscript output stays in this story.
ROOT=$(pwd -P)
if ! OUTPUT_DIR=$(cd -- "$(dirname -- "$OUTPUT")" 2>/dev/null && pwd -P); then
    echo "Error: the output directory must already exist." >&2
    exit 1
fi
OUTPUT_ABS="$OUTPUT_DIR/$(basename -- "$OUTPUT")"
case "$OUTPUT_ABS" in
    "$ROOT"/*) ;;
    *) echo "Error: output must stay inside the current story project." >&2; exit 1 ;;
esac
RELATIVE="${OUTPUT_ABS#"$ROOT"/}"
case "$RELATIVE" in
    PROJECT.md|AGENTS.md|README.md|LICENSE|build-docx.js|package.json|package-lock.json|.gitignore|.gitattributes|world/*|characters/*|outline/*|drafts/*|continuity/*|style/*|docs/*|prompts/*|scripts/*|tests/*|examples/*|.git/*|node_modules/*)
        echo "Error: output cannot overwrite a chapter, Canon, or engine file." >&2
        exit 1
        ;;
esac
if [ -L "$OUTPUT" ] || [ -d "$OUTPUT" ]; then
    echo "Error: output must be a regular manuscript file, not a symlink or directory." >&2
    exit 1
fi

# Also protect input files reached through a hard-link alias.
for PROTECTED in PROJECT.md AGENTS.md README.md LICENSE build-docx.js package.json package-lock.json .gitignore .gitattributes; do
    if [ -e "$PROTECTED" ] && [ "$OUTPUT" -ef "$PROTECTED" ]; then
        echo "Error: output aliases a protected project file." >&2
        exit 1
    fi
done
while IFS= read -r -d '' PROTECTED; do
    if [ "$OUTPUT" -ef "$PROTECTED" ]; then
        echo "Error: output aliases a chapter, Canon, or engine file." >&2
        exit 1
    fi
done < <(find world characters outline drafts continuity style docs prompts scripts tests examples -type f -print0 2>/dev/null)

echo "📖 Compiling manuscript..."
echo ""

TITLE=$(head -1 PROJECT.md | sed 's/# PROJECT — //; s/\r$//')
TEMP_OUTPUT=$(mktemp "$OUTPUT_ABS.tmp.XXXXXX")
trap 'rm -f -- "$TEMP_OUTPUT"' EXIT

cat > "$TEMP_OUTPUT" << EOF
# $TITLE

*Compiled: $DATE*

---

EOF

CHAPTER_COUNT=0
TOTAL_WORDS=0
for CHAPTER in drafts/chapter-*.md; do
    if [ -f "$CHAPTER" ] && [[ "${CHAPTER##*/}" =~ ^chapter-[0-9]+\.md$ ]]; then
        CHAPTER_COUNT=$((CHAPTER_COUNT + 1))
        WORDS=$(wc -w < "$CHAPTER")
        TOTAL_WORDS=$((TOTAL_WORDS + WORDS))

        echo "" >> "$TEMP_OUTPUT"
        cat "$CHAPTER" >> "$TEMP_OUTPUT"
        echo "" >> "$TEMP_OUTPUT"
        echo "---" >> "$TEMP_OUTPUT"

        echo "  ✅ Added: $CHAPTER ($WORDS words)"
    fi
done

mv -f -- "$TEMP_OUTPUT" "$OUTPUT_ABS"
echo ""
echo "=================================="
echo "📄 Manuscript compiled: $OUTPUT"
echo "📊 Chapters: $CHAPTER_COUNT"
echo "📊 Total words: $TOTAL_WORDS"
echo "📊 Avg words/chapter: $((TOTAL_WORDS / (CHAPTER_COUNT > 0 ? CHAPTER_COUNT : 1)))"
