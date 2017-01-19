const electron = require('electron')
const path = require('path')

const { app, BrowserWindow, Menu, Tray } = electron

let mainWindow = null


app.on('ready', () => {
    const tray = new Tray('trayicon.png')
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Wow',
            click: () => { console.log('wow?') }
        },
        {
            label: 'Awesome',
            click: () => { console.log('awesome!') }
        },
    ])
    tray.setContextMenu(contextMenu)
    tray.setToolTip('test tray icon')
    mainWindow = new BrowserWindow({
        width: 400,
        height: 400,
    })
})
