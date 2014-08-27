#!/bin/bash

if [ ! -z "${TRAVIS_TAG}" ]; then
    # TODO fazer add de todos *.html na raiz do projeto?
    git add -f dist/ {angularjs,css,components,index}.html assets/styles/main.css
    git commit -m "chore(release): docs v${TRAVIS_TAG}"

    git push --force --quiet "https://${GH_TOKEN}:x-oauth-basic@${GH_REF}" master:gh-pages > /dev/null 2>&1
fi