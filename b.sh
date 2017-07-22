#!/bin/bash
ENVIRONMENT=production redskull build --publicPath ./dist/
cp -f ./dist/index.html ./index.html
mkdir ./dist/css/dist
cp -R ./dist/img ./dist/css/dist/
git add .
git commit -m'fix'
git push