#!/bin/bash

cp -f ./dist/index.html ./index.html
mkdir ./dist/css/dist
cp -R ./dist/img ./dist/css/dist/
cp -R ./src/html ./dist/
git add .
git commit -m'fix'
git push