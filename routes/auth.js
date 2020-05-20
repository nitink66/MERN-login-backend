const express = require('express')
const router = express.Router()
const { register, signin,signout,profile, requireSignin,authMiddleware  } = require('../controllers/auth')

//validators
const { runValidation} = require('../Validators')
const {userSignUpValidator , userSignInValidator} = require ('../Validators/auth')
 

router.post('/register',userSignUpValidator,runValidation,register)
router.post('/signin',userSignInValidator,runValidation,signin)
router.get('/signout',signout)
router.get('/profile',requireSignin,authMiddleware)






module.exports = router
