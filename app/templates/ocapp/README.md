# a start app

~

## start

`npm start -s`

## 目录结构

build/  app最终发布目录


## 约定

* app 代码发布到 gitlab.alibaba-inc.com/oc 这个gitlab组下面
* 仓库的命名使用app-开头, 复合词中间使用 - 来链接
* app的命名与仓库命名有直接转换关系,如 仓库名为 app-case-detail, 则App命名为 AppCaseDetail, 这也是react组件本身的compoents名称
* 在components你可以自由的命名子组件以及目录结构,但要求src/components/app.js 是APP的入口文件(webpack已配置好打包) 

