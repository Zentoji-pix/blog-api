const express = require('express')
const router = express.Router()
const articles = require('../models/articles')

const validator = (req, res, next) => {
    const {title, content, author} = req.body
    if (!title || !content || !author){
        const error = new Error('Input required fields')
        error.statusCode = 400
        return next(error)
    }
next()
}

// create an article
router.post('/', validator, async (req, res, next) => {
    try{
        const newArticle = req.body
        const article = await articles.create(newArticle)
        res.status(201).json(article)
    }catch(err){
        next(err)
    }
})

// function for query
function findArticle(queryString) {
    const filter = {}
    if (queryString.title)  filter.title = { $regex: `${queryString.title}`, $options: "i" }
    if (queryString.content) filter.content = { $regex: `${queryString.content}`, $options: "i" }
    if (queryString.author) filter.author = { $regex: `${queryString.author}`, $options: "i" }
    return filter
}

// fetch all articles
router.get('/', async (req, res, next) => {
    try{ 
        const filter = findArticle(req.query)
        const article = await articles.find(filter)
        res.status(200).json({articles: article}) 
}catch(err){
    next(err)
}
})

// fetch by id
router.get('/:id', async (req, res, next) => {
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
})

// fetch by id and update
router.patch('/:id', async (req, res, next) => {
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
})

// fetch by id and delete
router.delete('/:id', async (req, res, next) => {
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
})


module.exports = router