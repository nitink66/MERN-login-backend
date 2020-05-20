const { check } = require('express-validator')

exports.userSignUpValidator = [
    check('name').not().isEmpty()
            .withMessage('Name is required'),

   check('email').not().isEmpty().isEmail()
            .withMessage('Email must be Valid '),

    check('password').isLength({min:8})
            .withMessage('Password must be Atleast 8 characters Long')
]



exports.userSignInValidator = [
        
       check('email').not().isEmpty().isEmail()
                .withMessage('Email must be Valid '),
    
        check('password').isLength({min:8})
                .withMessage('Password must be Atleast 8 characters Long')
    ]