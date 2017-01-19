const electron = require('electron')

const { ipcRenderer: ipc } = electron

document.getElementById('start').addEventListener('click', () => {
    ipc.send('countdown-start')
})

ipc.on('cd', (evt, count) => {
    document.getElementById('count').innerHTML = `<h2>${count}</h2>`
})
