const express = require('express')
const router = express.Router()
const authWare = require('../middleware/authenticate')

const validator = require('../middleware/validator')
const controller = require('../controller/article')

// create an article
router.post('/', authWare, validator, controller.posting)


// fetch all articles
router.get('/', authWare, controller.getAll)

// fetch by id
router.get('/:id', controller.getId)

// fetch by id and update
router.patch('/:id', authWare, controller.update)

// fetch by id and delete
router.delete('/:id', authWare, controller.del)


module.exports = router