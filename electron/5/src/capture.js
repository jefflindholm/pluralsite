const electron = require('electron')
const path = require('path')
const fs = require('fs')

const { desktopCapturer, ipcRenderer: ipc, screen } = electron

function getMainSource(capturer, scrn, done) {
    const options = { types: ['screen'], thumbnailSize: scrn.getPrimaryDisplay().workAreaSize }
    capturer.getSources(options, (err, sources) => {
        if (err) return console.log('cannot capture screen:', err)

        const isMainSource = source => source.name === 'Entire Screen' || source.name === 'Screen 1'
        done(sources.filter(isMainSource)[0])
    })
}
function writeScreenShot(png, filePath) {
    fs.writeFile(filePath, png, (err) => {
        if (err) console.log('Failed to save screen shot:', err)
    })
}
function onCapture(evt, targetPath) {
    getMainSource(desktopCapturer, screen, (source) => {
        const png = source.thumbnail.toPng()
        const filePath = path.join(targetPath, `${new Date()}.png`)
        writeScreenShot(png, filePath)
    })
}
ipc.on('capture', onCapture)
