#!/bin/bash

if [ ! -z "${TRAVIS_TAG}" ]; then
    # Cria variáveis com o autor e email do último commit
    GIT_NAME=`git show --format="%an" | head -n 1`
    GIT_MAIL=`git show --format="%ae" | head -n 1`

    # Configura o git
    git config user.name "${GIT_NAME}"
    git config user.email "${GIT_MAIL}"

    # TODO fazer add de todos *.html na raiz do projeto?
    git checkout gh-pages
    git merge master --no-edit
    git add -f dist/ {angularjs,css,components,index}.html assets/styles/main.css
    git commit -m "chore(release): docs v${TRAVIS_TAG}"

    git push --force --quiet "https://${GH_TOKEN}:x-oauth-basic@${GH_REF}" gh-pages:gh-pages > /dev/null 2>&1
fi