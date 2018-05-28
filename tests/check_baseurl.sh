#!/bin/bash
mkdir tmp

echo "Looking for relative links that don't use {{site.baseurl}}..."
grep -Enor --include=*.md "\[.*\]\(/.*\)" app | grep -Evf tests/config/exclude_lines_urltest.txt >> tmp/errors.txt
grep -Enor --include=*.html "href=\"/.*\"" app | grep -Ev "site.baseurl" | grep -Evf tests/config/exclude_lines_urltest.txt >> tmp/errors.txt
echo ""

cat tmp/errors.txt >&2
rm -rf tmp
