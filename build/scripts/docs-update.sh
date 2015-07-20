#!/bin/bash

if [ ! -z "${TRAVIS_TAG}" ]; then
    # Cria variáveis com o autor e email do último commit
    GIT_NAME=`git show --format="%an" | head -n 1`
    GIT_MAIL=`git show --format="%ae" | head -n 1`

    # Configura o git
    git config user.name "${GIT_NAME}"
    git config user.email "${GIT_MAIL}"

    # Baixa o conteúdo do branch gh-pages (indisponível quando fazendo shallow clone) e faz o merge
    git fetch -n origin gh-pages:gh-pages
    git checkout -f gh-pages
    git merge ${TRAVIS_COMMIT} --no-edit

    # TODO fazer add de todos *.html na raiz do projeto?
    git add -f dist/ {angularjs,css,components,index}.html assets/styles/main.css
    git commit -m "chore(release): docs v${TRAVIS_TAG}"

    git push --force --quiet "https://${GH_TOKEN}:x-oauth-basic@${GH_REF}" gh-pages:gh-pages > /dev/null 2>&1
else
    echo "Not a tagged build"
fi
