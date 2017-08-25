#!/bin/bash
mkdir tmp

echo "Looking for Liquid errors, rendered in the pages..."
grep -Einor --include=*.html "Liquid error:" builds/dev >> tmp/errors.txt
echo "Looking for unrendered markdown links..."
grep -Enor --include=*.html "\[.*\]\(.*\)" builds/dev | grep -Evf tests/config/exclude_md_links.txt >> tmp/errors.txt
# (Not working yet... finds acceptable braces)
# echo "Looking for braces (relics of liquid tags, kramdown)..."
# grep -Enor --include=*.html ".{0,15}[{}].{0,15}" builds/dev | grep -Evf tests/config/exclude_braces.txt >> tmp/errors.txt
echo ""

cat tmp/errors.txt >&2
rm -rf tmp
