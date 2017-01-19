const electron = require('electron')

const { app, BrowserWindow } = electron

let mainWindow = null

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 400,
        height: 100,
    })
    mainWindow.loadURL(`file://${__dirname}/index.html`)

    mainWindow.on('close', () => {
        mainWindow = null
    })
})

