#!/bin/bash

set -ev

docker-compose run jekyll jekyll build
java -jar node_modules/vnu-jar/build/dist/vnu.jar --skip-non-html --errors-only --filterfile tests/config/vnufilter.txt build/
