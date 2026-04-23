const timer = (req, res, next) => {
    let time = Date.now()
    res.on('finish', () => {
        time = new Date() - time
        console.log(`Time taken: ${time} ms`)
    })
    next()
}

module.exports = timer