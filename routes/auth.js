require('dotenv').config()
const express = require('express')
const router = express.Router()
const user = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authWare = require('../middleware/authenticate')

router.post('/signup', async (req, res, next) => {
    try{
        let { username, email, password } = req.body
        password = await bcrypt.hash(password, 10)
        const userData = {"username": username, "email": email, "password": password}
        await user.create(userData)
        res.status(201).send(`Welcome ${username}`)
    }catch(err){
        next(err)
    }
})

router.post('/login', authWare, async (req, res, next) => {
    try{
        const {username, password} = req.body
        const userData = await user.findOne({ username: username })
        if (!userData){
            const error = new Error('User does not exist')
            error.statusCode = 404
            return next(error)
        }
        const verify = await bcrypt.compare(password, userData.password)
        if (verify === false){
            const error = new Error('Wrong Password')
            error.statusCode = 401
            return next(error)
        }
        const token = jwt.sign({id: userData.id}, process.env.JWT_SECRET, {expiresIn: '10d'})
        res.status(200).json({message: 'Login successful', token: token})
    }catch(err){
        next(err)
    }
})