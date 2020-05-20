const User = require('../Models/user')
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');


exports.register = (req,res) =>{
       User.findOne({email:req.body.eamil})
                .exec((err,user)=>{
                    if(user){
                        return res.json({
                            error:'Email already exist'
                        })
                    }

                    const { name ,email, password} = req.body
                    let newUser = new User({name,email,password})

                    //save to db
                    newUser.save((err,success)=>{
                        if(err){
                            return res.status(400).json({
                                error:'Email already exist,return to login'
                            })
                        }
                         return res.json({
                             message:'SignUp Success,Please return to the login page'
                         })
                    })

                })
        
}



exports.signin = (req,res) =>{

    const { email,password } = req.body;

    //check if user exists
        User.findOne({email}).exec((err,user) =>{
            if(err || !user){
                    return res.status(400).json({
                        error : "User with that email does not exist ,please signup"
                    })
            }    

             //authenticate
             if(!user.authenticate(password)){
                return res.status(400).json({
                    error : "Email and Password does not Match"
                })
             }

                // generate a token and send to client
                const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

                res.cookie('token', token, { expiresIn: '1d' });

                const { _id , name , email , role } = user;
                return res.json({
                    token,
                    user:{ _id , name , email , role }
                })
        }
                
    )

}



exports.signout = (req, res) => {
    res.clearCookie('token');
    res.json({
        message: 'Signout success'
    });
};


exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET // req.user
});



exports.profile = (req,res) =>{
    res.json({
        message: "Welcome to the restricted Route Profile"
    })
}


exports.authMiddleware = (req, res, next) => {
    const authUserId = req.user._id;
    User.findById({ _id: authUserId }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        req.profile = user;
        next();
    });
};