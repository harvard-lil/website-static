#!/bin/bash
mkdir tmp

echo "Comparing live sitemap to build/sitemap.xml..."
curl -s https://lil.law.harvard.edu/sitemap.xml > tmp/live.xml
diff -u -B <(grep -vE '^<lastmod>.*</lastmod>$' tmp/live.xml)  <(grep -vE '^<lastmod>.*</lastmod>$' build/sitemap.xml) >> tmp/errors.txt
echo ""

cat tmp/errors.txt >&2
rm -rf tmp

