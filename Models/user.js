const mongoose = require('mongoose')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        max: 32
    },
    email:{
        type: String,
        unique: true,
        trim: true,
        lowercase: true
    },
     hashed_password : {
         type:String,
         required: true
     },
        role: {
            type: Number,
            default: 0
        },
     salt:String
},{timestamps: true }
);

userSchema.virtual('password')
        .set(function(password){
            //create a temporary variable called _password
                this._password = password
            //generate salt
                this.salt = this.makeSalt()
            //encryptPassword
                this.hashed_password = this.encryptPassword(password)

        })


        .get(function(){
            return this._password;
        })

userSchema.methods = {

            //login 
            authenticate: function(plainText){
                return this.encryptPassword(plainText) === this.hashed_password;
            },



        encryptPassword: function(password){
            if(!password) return ''
            try{
                    return crypto.createHmac('sha1',this.salt)
                                .update(password)
                                .digest('hex')
            }
                catch(err){
                    return ''
                }
        },
        makeSalt:function(){
                return Math.round(new Date().valueOf() * Math.random())+ ''
        }
}


module.exports = mongoose.model('User',userSchema)