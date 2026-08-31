#!/bin/bash
# Story Engine — Word Count Report
# Usage: bash scripts/word-count.sh

set -euo pipefail
if [ ! -f PROJECT.md ]; then
    echo "Error: run from the story root containing PROJECT.md." >&2
    exit 1
fi

echo "📊 Word Count Report"
echo "=================================="
echo ""
TOTAL=0
echo "Chapter Breakdown:"
echo "------------------"

for CHAPTER in drafts/chapter-*.md; do
    if [ -f "$CHAPTER" ] && [[ "${CHAPTER##*/}" =~ ^chapter-[0-9]+\.md$ ]]; then
        WORDS=$(wc -w < "$CHAPTER")
        TOTAL=$((TOTAL + WORDS))
        BASENAME=$(basename "$CHAPTER" .md)
        printf "  %-20s %6d words\n" "$BASENAME" "$WORDS"
    fi
done

echo ""
echo "------------------"
printf "  %-20s %6d words\n" "TOTAL" "$TOTAL"
echo ""
echo "For reference:"
echo "  Short story:    1,000 - 7,500 words"
echo "  Novelette:      7,500 - 17,500 words"
echo "  Novella:       17,500 - 40,000 words"
echo "  Novel:         40,000 - 100,000 words"
echo "  Epic:         100,000+ words"
echo ""

# Read the actual Target Length field. Template examples are not real targets.
# Counts remain wc -w whitespace-delimited words, including Markdown headings.
TARGET=$(awk '
    { sub(/\r$/, "") }
    /^## Target Length[[:space:]]*$/ { in_target = 1; next }
    /^## / { in_target = 0 }
    in_target && NF {
        if ($0 ~ /^[[:space:]]*\[/) exit
        line = tolower($0)
        if (match(line, /[0-9][0-9,]*[[:space:]]+words?/)) {
            prefix = substr(line, 1, RSTART - 1)
            if (prefix ~ /-[[:space:]]*$/ || prefix ~ /[0-9.,]$/) exit
            number = substr(line, RSTART, RLENGTH)
            gsub(/[^0-9]/, "", number)
            if (number + 0 > 0 && length(number) <= 12) printf "%.0f", number
        }
        exit
    }
' PROJECT.md)

if [ -n "$TARGET" ] && [ "$TARGET" -gt 0 ]; then
    PCT=$((TOTAL * 100 / TARGET))
    BAR_LEN=30
    FILLED=$((PCT * BAR_LEN / 100))
    if [ "$FILLED" -gt "$BAR_LEN" ]; then FILLED=$BAR_LEN; fi
    EMPTY=$((BAR_LEN - FILLED))
    printf -v FULL_BAR '%*s' "$FILLED" ''
    printf -v EMPTY_BAR '%*s' "$EMPTY" ''
    BAR="${FULL_BAR// /█}${EMPTY_BAR// /░}"
    echo "Progress: [$BAR] $PCT% ($TOTAL / $TARGET)"
fi
