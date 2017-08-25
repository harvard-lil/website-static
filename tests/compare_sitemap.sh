#!/bin/bash
mkdir tmp

echo "Comparing live sitemap to builds/dev/sitemap.xml..."
curl -s http://lil.law.harvard.edu/sitemap.xml > tmp/live.xml
diff -u -B <(grep -vE '^<lastmod>.*</lastmod>$' tmp/live.xml)  <(grep -vE '^<lastmod>.*</lastmod>$' builds/prod/sitemap.xml) >> tmp/errors.txt
echo ""

cat tmp/errors.txt >&2
rm -rf tmp

