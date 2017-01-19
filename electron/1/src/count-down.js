module.exports = function countdown(tick) {
    let count = 10

    const timer = setInterval(() => {
        count -= 1
        tick(count)
        if (count <= 0) {
            clearInterval(timer)
        }
    }, 1000)
}
