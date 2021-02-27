# electron starter

The electron example using vite for renderer process and esbuild for main process.

React demo with antd is available here: [antd branch](https://github.com/jctaoo/electron-starter/tree/antd)

## 使用
项目创建:
- 直接 clone 该项目
- 如果使用 GitHub，点击该页面上方的 Use this template 或[这里](https://github.com/jctaoo/electron-starter/generate)

安装依赖
```shell
yarn
```
启动本地调试
```shell
# 使用 esbuild 来编译主线程 Typescript，速度更佳
yarn run dev

# 使用 tsc 来编译主线程 Typescript
yarn run dev:tsc
```
也可以分开使用 `dev:main`, `dev:main:tsc`, `dev:renderer` 来分开调试主线程和渲染进程。

编译/打包
```shell
# 仅构建主线程和渲染进程的目标代码和资源，不打包（exe, dmg 等）
yarn run build

# 在 build 的基础上运行/预览运行效果 (production 模式)，用来本地验证
yarn run preview

# 构建并打包为可运行的程序或安装程序
yarn run pack:win
yarn run pack:mac
yarn run pack:linux

# 为所有平台打包
yarn run pack:all
```

## 运行截图
![screenshot](./screenshot.png)

## 文件结构
```
+ dist 构建产物
+ scripts 支持开发/构建等的脚本
+ src
  + common 通用代码
  + main 主进程模块
  + renderer 渲染进程模块
- package.json 
- vite.config.ts vite 配置
```