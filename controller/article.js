 const articles = require('../models/articles')


 const posting = async (req, res, next) => {
    try{
        const newArticle = req.body
        const article = await articles.create(newArticle)
        res.status(201).json(article)
    }catch(err){
        next(err)
    }
}

// function for query
function findArticle(queryString) {
    const filter = {}
    if (queryString.title)  filter.title = { $regex: `${queryString.title}`, $options: "i" }
    if (queryString.content) filter.content = { $regex: `${queryString.content}`, $options: "i" }
    if (queryString.author) filter.author = { $regex: `${queryString.author}`, $options: "i" }
    return filter
}

// fetch all articles
const getAll = async (req, res, next) => {
    try{ 
        const filter = findArticle(req.query)
        const article = await articles.find(filter)
        res.status(200).json({articles: article}) 
}catch(err){
    next(err)
}
}

const getId = async (req, res, next) => {
    try{ 
        const article = await articles.findById(req.params.id)
        if (!article){
            const error = new Error('Not found')
            error.statusCode = 404
            return next(error)
        }
        res.status(200).json({articles: article}) 
}catch(err){
    if (err.name === 'CastError'){
        err.statusCode = 400
    }
    next(err)
}
}

const update = async (req, res, next) => {
    try{ 
        const article = await articles.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if (!article){
            const error = new Error('Not found')
            error.statusCode = 404
            return next(error)
        }
        res.status(200).json({articles: article}) 
}catch(err){
    if (err.name === 'CastError'){
        err.statusCode = 400
    }
    next(err)
}
}

const del = async (req, res, next) => {
    try{ 
        const article = await articles.findByIdAndDelete(req.params.id)
        if (!article){
            const error = new Error('Not found')
            error.statusCode = 404
            return next(error)
        }
        res.status(200).json({articles: article}) 
}catch(err){
    if (err.name === 'CastError'){
        err.statusCode = 400
    }
    next(err)
}
}

const uploadFile = async (req, res, next) => {
    try{
        const {path, originalname} = req.file
        res.status(201).json({ path, originalname })
    }catch(err){
        next(err)
    }
}

module.exports = {posting, getAll, getId, update, del, uploadFile} 