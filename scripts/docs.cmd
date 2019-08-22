@echo off

REM 打包文档
call yarn add amap-echarts@^1
call yarn docs:build


REM cd 到构建输出的目录下
call cd docs-dist

call git init
call git add -A
call git commit -m"docs: update"

REM 部署到 https://<USERNAME>.github.io/<REPO>
call git push -f https://github.com/liuweiGL/amap-echarts-doc-v1.git master:gh-pages

call cd ..

REM 可能安装了新的版本
call git add package.json yarn.lock
call git commit -m"chore: 更新 docs 依赖"
call git push