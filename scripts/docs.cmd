@echo off
REM 打包文档
call yarn docs:build


REM cd 到构建输出的目录下
call cd docs-dist

call git init
call git add -A
call git commit -m"docs: update"

REM 部署到 https://<USERNAME>.github.io/<REPO>
call git push -f https://github.com/liuweiGL/amap-echarts.git master:gh-pages

call cd ..