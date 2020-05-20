const express = require('express')
const router = express.Router()
const { login } = require('../controllers/login')


router.get('/',(req,res)=>{
    res.json('Welcome to INDEX PAGE , return to login page ')
})

router.post('/login',login)




module.exports = router
