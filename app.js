require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const articleRoutes = require('./routes/articles')
const auth = require('./routes/auth')
const logger = require('./middleware/logger')
const timer = require('./middleware/timer')

// Parsing middleware
app.use(express.json())

app.use(cors())

// middleware
app.use(logger)

app.use(timer)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {console.log('DB connected auccesfully')})
    .catch((err) => {console.error(err)})


app.use('/articles', articleRoutes)

app.use((err, req, res, next) =>{
    console.error(err.stack)
    const status = err.statusCode || 500
    res.status(status).json({error: err.message})
})

app.use('/auth', auth)

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`server is live at port ${PORT}`)
})
