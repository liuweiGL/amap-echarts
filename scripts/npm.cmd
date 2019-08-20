@echo off
REM 构建类库
call yarn lib
call git add dist
call git commit -m"chore: 构建类库"

REM 更新版本
call yarn release

REM 发布到 npm 仓库，需要事先登录
call nrm use npm
call npm publish
call nrm use taobao