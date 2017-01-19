const path = require('path')
const fs = require('fs')

function logError(err) {
    if (err) {
        console.log('error', err)
    }
}
exports.save = (picturePath, content) => {
    const base64Data = content.replace(/^data:image\/png;base64,/, '')
    fs.writeFile(path.join(picturePath, `${new Date()}.png`), base64Data, { encoding: 'base64' }, logError)
}

exports.getPicturesDir = app => path.join(app.getPath('pictures'), 'photobooth')

exports.mkdir = (dir) => {
    console.log(dir)
    fs.stat(dir, (err, stats) => {
        if (err && err.code !== 'ENOENT') {
            logError(err)
        } else if (err || !stats.isDirectory()) {
            fs.mkdir(dir, logError)
        }
    })
}
