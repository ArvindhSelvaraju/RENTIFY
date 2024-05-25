const express = require('express')
const {signupUser,loginUser,getUser} = require('../controllers/userController')

const router = express.Router()

router.post('/signup',signupUser)

router.post('/login',loginUser)

router.get('/',getUser)

module.exports = router