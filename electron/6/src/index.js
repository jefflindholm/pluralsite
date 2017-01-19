const fs = require('fs')
const os = require('os')
const exec = require('child_process').exec

function isDir(dir) {
    try {
        return fs.lstatSync(dir).isDirectory()
    } catch (e) {
        console.log(e)
        return false
    }
}
function removeStatus() {
    const el = document.getElementById('status')
    el.classList.remove('unknown', 'clean', 'dirty')
    return el
}
function setStatus(status) {
    const el = removeStatus()
    el.classList.add(status)
}
function checkGitStatus(dir) {
    exec('git status', {
        cwd: dir,
    }, (err, stdout, stderr) => {
        console.log('err', err)
        console.log('stdout', stdout)
        console.log('stderr', stderr)

        if (err) return setStatus('unknown')
        if (/nothing to commit/.test(stdout)) return setStatus('clean')
        return setStatus('dirty')
    })
}
function formatDir(dir) {
    return /^~/.test(dir)
        ? `${os.homedir()}${dir.substr(1).trim()}`
        : dir.trim()
}
let timer = null
document.getElementById('directory').addEventListener('keyup', (event) => {
    removeStatus()
    clearTimeout(timer)
    timer = setTimeout(() => {
        const dir = formatDir(event.target.value)
        console.log('dir', dir)
        if (isDir(dir)) {
            checkGitStatus(dir)
        }
    }, 500)
})
