const router = require('express').Router()
const termsController = require('../controllers/termsController')

router.get('/', termsController.terms)

module.exports = router
