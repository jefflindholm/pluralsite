const electron = require('electron')

const { app, clipboard, globalShortcuts, Menu, Tray } = electron

const STACK_SIZE = 5
const ITEM_MAX_LENGTH = 20

function registerShortCuts(shortCuts, clip, stack) {
    shortCuts.unregisterAll()
    for (let i = 0; i < STACK_SIZE; i += 1) {
        shortCuts.register(`Cmd+Alt+${i + 1}`, () => {
            clip.writeText(stack[i])
        })
    }
}
function addToStack(item, stack) {
    return [item].concat(stack.length >= STACK_SIZE ? stack.slice(0, stack.length - 1) : stack)
}

function checkClipboardForChange(clip, onChange) {
    let cache = clip.readText()
    let latest = null
    setInterval(() => {
        latest = clip.readText()
        if (latest !== cache) {
            cache = latest
            onChange(cache)
        }
    }, 1000)
}
function formatItem(item) {
    return item && item.length > ITEM_MAX_LENGTH
        ? `${item.substring(0, ITEM_MAX_LENGTH)}...`
        : item
}
function formatMenuTemplateForStack(stack, clip) {
    const template = stack.map((item, i) => ({
        label: `Copy ${formatItem(item)}`,
        click: () => clip.writeText(item),
        accelerator: `Cmd+Alt+${i+1}`,
    }))

    return template.concat([
       { type: 'separator' },
        {
            label: 'Quit',
            click: () => {
                app.quit()
            },
            accelerator: 'Cmd+Q'
        },
    ])
}

app.on('ready', () => {
    let stack = []

    const tray = new Tray('trayicon.png')
    const contextMenu = Menu.buildFromTemplate([
        {
            label: '<Empty>',
            enabled: false
        },
        { type: 'separator' },
        {
            label: 'Quit',
            click: () => {
                app.quit()
            },
            accelerator: 'Cmd+Q'
        },
    ])
    tray.setContextMenu(contextMenu)
    registerShortCuts(globalShortcuts, clipboard, stack)
    checkClipboardForChange(clipboard, (text) => {
        stack = addToStack(text, stack)
        tray.setContextMenu(Menu.buildFromTemplate(formatMenuTemplateForStack(stack, clipboard)))
    })
})
app.on('will-quit', () => {
    globalShortcuts.unregisterAll()
})
