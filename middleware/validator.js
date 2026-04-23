const validator = (req, res, next) => {
    const {title, content, author} = req.body
    if (!title || !content || !author){
        const error = new Error('Input required fields')
        error.statusCode = 400
        return next(error)
    }
next()
}

module.exports = validator