:: 打包文档，命令没有返回成功码，导致后面的命令不执行？
:: yarn docs:build


:: cd 到构建输出的目录下
cd docs-dist

git init
git add -A
git commit -m"docs: update"

:: 部署到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:liuweigl/amap-echarts.git master:gh-pages

cd ..