const electron = require('electron')

const video = require('./video')
const countdown = require('./count-down')

const { ipcRenderer: ipc } = electron

function formatImgTag(doc, bytes) {
    const div = doc.createElement('div')
    div.classList.add('photo')
    const close = doc.createElement('div')
    close.classList.add('photoClose')
    const img = new Image()
    img.classList.add('photoImg')
    img.src = bytes
    div.appendChild(img)
    div.appendChild(close)
    return div
}
window.addEventListener('DOMContentLoaded', () => {
    /* eslint-disable no-unused-vars */
    const videoEl = document.getElementById('video')
    const canvasEl = document.getElementById('canvas')
    const recordEl = document.getElementById('record')
    const photosEl = document.querySelector('.photosContainer')
    const counterEl = document.getElementById('counter')

    const ctx = canvasEl.getContext('2d')

    video.init(navigator, videoEl)

    recordEl.addEventListener('click', () => {
        countdown.start(counterEl, 3, () => {
            const bytes = video.captureBytes(videoEl, ctx, canvasEl)
            ipc.send('image-captured', bytes)
            photosEl.appendChild(formatImgTag(document, bytes))
        })
    })
})
