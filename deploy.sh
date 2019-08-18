#!/usr/bin/env sh

# 当发生错误时中止脚本
set -e

# 构建
yarn docs:build

# cd 到构建输出的目录下
cd docs-dist

# 部署到自定义域域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'docs: update'

# 部署到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:liuweigl/amap-echarts.git master:gh-pages

cd -
