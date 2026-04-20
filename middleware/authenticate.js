const jwt = require('jsonwebtoken')
require('dotenv').config()

const auth = (req, res, next) =>{
    const token = req.headers.authorization.split(' ')[1]
    try{
        const verification = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verification
        next()
    }catch(err){
        next(err)
    }
}

module.exports = auth