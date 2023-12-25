"use strict";
exports.__esModule = true;
// main.ts
var electron_1 = require("electron");
var path = require("path");
var isDev = require("electron-is-dev");
var BASE_URL = "http://localhost:3000";
// BrowserWindow 객체는 전역으로 관리합니다.
// 전역이 아닌 경우 자바스크립트 가비지 컬렉팅 발생 시 의도치 않게 browser window가 닫힐 수 있습니다.
var mainWindow = null;
var tray = null;
var createTray = function () {
    var icon = electron_1.nativeImage.createFromPath(path.join(__dirname, "icon.png"));
    // .resize({ width: 16, height: 16 })
    tray = new electron_1.Tray(icon);
};
var handelTrayEvent = function () {
    if (tray) {
        tray.setToolTip("This is my application.");
        tray.on("right-click", toggleWindow);
        tray.on("double-click", toggleWindow);
        tray.on("click", toggleWindow);
    }
};
var getWindowPosition = function () {
    if (tray) {
        var windowBounds = mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.getBounds();
        var trayBounds = tray.getBounds();
        // Center window horizontally below the tray icon
        if (windowBounds) {
            var x = Math.round(trayBounds.x + trayBounds.width / 2 - windowBounds.width / 2);
            // Position window 4 pixels vertically below the tray icon
            var y = Math.round(trayBounds.y + trayBounds.height + 4);
            return { x: x, y: y };
        }
    }
};
var showWindow = function () {
    var position = getWindowPosition();
    if (position)
        mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.setPosition(position === null || position === void 0 ? void 0 : position.x, position === null || position === void 0 ? void 0 : position.y, false);
    mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.show();
    mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.focus();
};
var handleWindow = function () {
    if (mainWindow) {
        // 항상 위
        mainWindow.setAlwaysOnTop(true, "screen-saver");
        // 화면 변경하더라도 항상 위
        mainWindow.setVisibleOnAllWorkspaces(true);
        // 포커스를 잃었을 경우
        mainWindow.on("blur", function () {
            mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.hide();
        });
    }
};
var toggleWindow = function () {
    if (mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.isVisible()) {
        mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.hide();
    }
    else {
        showWindow();
    }
};
electron_1.ipcMain.on("show-window", function () {
    showWindow();
});
electron_1.ipcMain.on("add-done", function () {
    // showWindow();
});
var createWindow = function () {
    // browser window를 생성합니다.
    mainWindow = new electron_1.BrowserWindow({
        width: 300,
        height: 70,
        minHeight: 50,
        maxHeight: 900,
        show: false,
        frame: false,
        fullscreenable: false,
        resizable: false,
        movable: false,
        transparent: false,
        // minWidth: 1281,
        // minHeight: 800,
        // icon: path.join(__dirname, "AppIcon.jpg"),
        // backgroundColor: "white",
        vibrancy: "popover",
        visualEffectState: "followWindow",
        webPreferences: {
            devTools: isDev,
            // nodeIntegration: true,
            preload: path.join(__dirname, "preload.js"),
            backgroundThrottling: false
        }
    });
    // 앱의 index.html을 로드합니다.
    if (isDev) {
        // 개발 모드인 경우
        mainWindow.loadURL(BASE_URL); // 개발 도구에서 호스팅하는 주소로 로드합니다.
        mainWindow.webContents.openDevTools({ mode: "detach" }); // DevTools를 엽니다.
    }
    else {
        // 프로덕션 모드인 경우
        mainWindow.loadURL("file://".concat(path.join("index.html")));
        // mainWindow.loadFile(path.join("/build/index.html")); //
    }
};
// Electron이 준비되면 whenReady 메서드가 호출되어,
// 초기화 및 browser window를 생성합니다.
electron_1.app.whenReady().then(function () {
    createWindow();
    handleWindow();
    createTray();
    handelTrayEvent();
    // Linux와 Winodws 앱은 browser window가 열려 있지 않을 때 종료됩니다.
    // macOS는 browser window가 열려 있지 않아도 계속 실행되기 때문에,
    // browser window가 열려 있지 않을 때 앱을 활성화 하면 새로운 browser window를 열어줍니다.
    electron_1.app.on("activate", function () {
        if (electron_1.BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});
// Linux와 Winodws에서는 모든 창을 종료하면 일반적으로 앱이 완전히 종료됩니다.
// macOS(darwin)가 아닌 경우, 'window-all-closed' 이벤트가 발생했을 때, 앱을 종료합니다.
electron_1.app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
