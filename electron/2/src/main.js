const electron = require('electron')

const { app, BrowserWindow, Menu } = electron

let mainWindow = null

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 400,
        height: 400,
    })
    mainWindow.on('closed', () => {
        mainWindow = null
    })

    const name = electron.app.getName()
    const menuTemplate = [
        {
            label: name,
            submenu: [
                {
                    label: `About ${name}`,
                    click: () => {
                        console.log('about clicked')
                    },
                    role: 'about',
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Quit',
                    click: () => {
                        app.quit()
                    },
                    accelerator: 'Cmd+Q'
                }
            ]
        },

    ]
    const menu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(menu)

})
