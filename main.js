const {
    app,
    BrowserWindow,
    Tray,
    Menu,
    globalShortcut
} = require('electron');
const path = require('path');

let mainWindow = null;

app.whenReady().then(() => {
    menuCustomer();
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        mainWindowQuit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0)
        createWindow();
});

function mainWindowShow() {
    if (mainWindow && !mainWindow.isVisible())
        mainWindow.showInactive();
}

function mainWindowHide() {
    if (mainWindow && mainWindow.isVisible())
        mainWindow.hide();
}

function mainWindowQuit() {
    unRegisterGlobalShortcuts();
    app.quit();
}


// 注册全局快捷键和取消注册
function registerGlobalShortcuts() {
    globalShortcut.register('Ctrl+Shift+S', mainWindowShow);
    globalShortcut.register('Ctrl+Shift+H', mainWindowHide);
    globalShortcut.register('Ctrl+Shift+Q', mainWindowQuit);
}

function unRegisterGlobalShortcuts() {
    globalShortcut.unregisterAll();
}

// 自定义托盘菜单
function menuCustomer() {
    // 注册全局事件
    registerGlobalShortcuts();

    //设置托盘图标和菜单
    let trayMenuTemplate = [{
        label: 'show',
        accelerator: "Ctrl+Shift+S",
        click: mainWindowShow
    }, {
        label: 'hide',
        accelerator: "Ctrl+Shift+H",
        click: mainWindowHide
    }, {
        label: 'quit',
        accelerator: "Ctrl+Shift+Q",
        click: mainWindowQuit
    }];
    //系统托盘图标
    appTray = new Tray(path.join(__dirname, 'icon/icon.ico'));
    //图标的上下文菜单
    const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);
    //设置此托盘图标的悬停提示内容
    appTray.setToolTip('看板娘');
    //设置此图标的上下文菜单
    appTray.setContextMenu(contextMenu);
    //单击右下角小图标显示应用左键
    appTray.on('click', mainWindowShow);
    //右键
    appTray.on('right-click', () => {
        appTray.popUpContextMenu(trayMenuTemplate);
    });
}

// 创建新窗口
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 305,
        height: 360,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        resizable: false,
        autoHideMenuBar: true,
        hasShadow: false,
        skipTaskbar: true,
        maximizable: false,
        minimizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    });
    // mainWindow.webContents.openDevTools();
    mainWindow.loadFile(path.join(__dirname, 'index.html'));

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
};