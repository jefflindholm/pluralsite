const electron = require('electron')
const images = require('./images')

const { app, BrowserWindow, ipcMain: ipc } = electron

let mainWindow = null

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 725,
        resizable: false,
    })
    mainWindow.loadURL(`file://${__dirname}/index.html`)

    mainWindow.webContents.openDevTools()

    images.mkdir(images.getPicturesDir(app))

    mainWindow.on('closed', () => {
        mainWindow = null
    })
})

ipc.on('image-captured', (evt, contents) => {
    images.save(images.getPicturesDir(app), contents)
})
