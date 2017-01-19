const electron = require('electron')
const countDown = require('./count-down')

const { app, BrowserWindow, ipcMain: ipc } = electron

let mainWindow = null

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        height: 400,
        width: 400,
    })

    mainWindow.loadURL(`file://${__dirname}/index.html`)

    mainWindow.on('closed', () => {
        mainWindow = null
    })
})

ipc.on('countdown-start', () => {
    countDown((count) => {
        mainWindow.webContents.send('cd', count)
    })
})
