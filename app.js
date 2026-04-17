require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const articleRoutes = require('./routes/articles')

// Parsing middleware
app.use(express.json())

app.use(cors())

// logging middleware
app.use((req, res, next) => {
    console.log(`${req.method}, ${req.url}, ${new Date}`)
    next()
})

// timer middleware
app.use( (req, res, next) => {
    let time = Date.now()
    res.on('finish', () => {
        time = new Date() - time
        console.log(`Time taken: ${time} ms`)
    })
    next()
})

mongoose.connect(process.env.MONGO_URI)
    .then(() => {console.log('DB connected auccesfully')})
    .catch((err) => {console.error(err)})


app.use('/articles', articleRoutes)

app.use((err, req, res, next) =>{
    console.error(err.stack)
    const status = error.statusCode || 500
    res.status(status).json({error: err.message})
})

PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`server is live at port ${PORT}`)
})
