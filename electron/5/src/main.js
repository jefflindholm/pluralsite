const electron = require('electron')

const { app, BrowserWindow, globalShortcut, Menu, Tray } = electron

let mainWindow = null

const debug = false

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: debug ? 900 : 0,
        height: debug ? 500 : 0,
        resizable: false,
        frame: false,
    })
    debug ? mainWindow.openDevTools() : null

    mainWindow.loadURL(`file://${__dirname}/capture.html`)
    mainWindow.on('close', () => {
        mainWindow = null
    })

    globalShortcut.register('Ctrl+Alt+Cmd+D', () => {
        mainWindow.webContents.send('capture', app.getPath('pictures'))
    })
    const tray = new Tray('trayicon.png')
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Quit',
            click: () => {
                app.quit()
            },
            accelerator: 'Cmd+Q'
        },
    ])
    tray.setContextMenu(contextMenu)
})

app.on('will-quit', () => {
    globalShortcut.unregisterAll()
})
