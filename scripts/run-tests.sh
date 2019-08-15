#!/bin/bash

set -ev

grep -r '^title: ' app | while read MATCH ; do FILE=`echo $MATCH | cut -f 1 -d ':'` ; TITLE=`echo $MATCH | cut -f 2- -d ':' | sed 's/^title: //'` ; echo $TITLE | grep ':' | grep -q -v [\'\"] && echo "$FILE needs title quoted" && exit 1 ; done
docker-compose run jekyll jekyll build
java -jar node_modules/vnu-jar/build/dist/vnu.jar --skip-non-html --errors-only --filterfile tests/config/vnufilter.txt build/
