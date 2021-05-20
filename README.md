<p align="center">
  <img width="120" src="icon/icon.ico" >
</p>

<p align="center">
  <a href="https://github.com/electron/electron">
    <img src="https://img.shields.io/badge/electron-12.0.0-blue.svg" alt="electron">
  </a>
  <a href="https://github.com/dreamy-xay/electron-live2d/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/mashape/apistatus.svg?color=5470c6" alt="license">
  </a>
</p>

## 介绍

[electron-live2d](https://github.com/dreamy-xay/electron-live2d) 是一个看板娘桌面应用程序，它主要基于 [live2d-widget](https://github.com/stevenjoezhang/live2d-widget) 实现。通过 [Electron](https://www.electronjs.org/) 框架将 Live2D 看板娘模型引入桌面环境，用户可以自定义看板娘的模型、动作和交互方式，打造个性化的桌面看板娘体验。

## 准备

你需要在本地环境中安装 [Node](https://nodejs.org/) 和 [Git](https://git-scm.com/)。该项目基于 [live2d-widget](https://github.com/stevenjoezhang/live2d-widget) 和 [Electron](https://www.electronjs.org/)。

## 使用方法

```bash
# 克隆项目
git clone https://github.com/dreamy-xay/electron-live2d.git

# 进入项目目录
cd electron-live2d

# 安装依赖
npm install

# 开发
npm run test
```

这将自动打开一个 [Electron](https://www.electronjs.org/) 应用窗口。

## 构建

```bash
# 为 Windows 环境构建
npm run build:win

# 为 Mac 环境构建
npm run build:mac
```

## 安装包

你可以在[发布页面](https://github.com/dreamy-xay/electron-live2d/releases)下载该应用的 Windows 安装包和 Mac 安装包。
