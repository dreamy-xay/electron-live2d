const {
    app,
    BrowserWindow,
    Tray,
    Menu,
    globalShortcut
} = require('electron');
const path = require('path');

let mainWindow = null;
let mainWindowPosition = [null, null];

app.whenReady().then(() => {
    menuCustomer();
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0)
        createWindow();
});

// 主窗口基本操作函数 显示 隐藏 退出
function mainWindowShow() {
    if (mainWindow) {
        if (!mainWindow.isVisible())
            mainWindow.show();
    } else
        createWindow();
}

function mainWindowHide() {
    if (mainWindow && mainWindow.isVisible())
        mainWindow.hide();
}

function mainWindowQuit() {
    unRegisterGlobalShortcuts();
    app.quit();
}

// 注册和取消注册全局事件
function registerGlobalShortcuts() {
    globalShortcut.register('Command+Shift+s', mainWindowShow);
    globalShortcut.register('Command+Shift+h', mainWindowHide);
    globalShortcut.register('Command+Shift+q', mainWindowQuit);
}

function unRegisterGlobalShortcuts() {
    globalShortcut.unregisterAll();
}

// 自定义托盘菜单
function menuCustomer() {
    // dock栏隐藏
    if (process.platform == "darwin")
        app.dock.hide();

    // 注册全局事件
    registerGlobalShortcuts();

    //设置托盘图标和菜单
    let trayMenuTemplate = [{
        label: 'show',
        accelerator: "Command+Shift+s",
        click: mainWindowShow
    }, {
        label: 'hide',
        accelerator: "Command+Shift+h",
        click: mainWindowHide
    }, {
        label: 'quit',
        accelerator: "Command+Shift+q",
        click: mainWindowQuit
    }];
    //系统托盘图标
    appTray = new Tray(path.join(__dirname, './render/resource/tray.png'));
    //图标的上下文菜单
    const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);
    //设置此托盘图标的悬停提示内容
    appTray.setToolTip('看板娘');
    //设置此图标的上下文菜单
    appTray.setContextMenu(contextMenu);
    //右键
    appTray.on('right-click', () => {
        appTray.popUpContextMenu(trayMenuTemplate);
    });
}

// 创造主窗口
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 305,
        height: 360,
        x: mainWindowPosition[0],
        y: mainWindowPosition[1],
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        resizable: false,
        maximizable: false,
        hasShadow: false,
        minimizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    });

    // mainWindow.webContents.openDevTools();

    mainWindow.loadFile(path.join(__dirname, 'index.html'));

    mainWindow.on('close', () => {
        mainWindowPosition = mainWindow.getPosition();
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
};