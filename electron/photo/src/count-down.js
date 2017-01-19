
function setCount(counter, count) {
    counter.innerHTML = count > 0 ? count : '' // eslint-disable-line no-param-reassign
}
exports.start = (counter, seconds, done) => {
    for (let i = 0; i <= seconds; i += 1) {
        setTimeout(() => {
            const count = seconds - i
            setCount(counter, count)
            if (i === seconds) {
                done()
            }
        }, i * 1000)
    }
}
