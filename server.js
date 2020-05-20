const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors');
const mongoose = require('mongoose')
require('dotenv').config()


// app
const app = express()


//database connection
mongoose.connect(process.env.DATABASE , {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify:false})
.then(()=>console.log('DATABASE CONNECTED CLOUD'))




//bringing routes
const loginRoutes = require('./routes/login')
const registerRoutes = require('./routes/auth')

//middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser());

//cors
if(process.env.NODE_ENV === 'development'){
    app.use(cors({
        origin:`${process.env.CLIENT_URL}`
    }))
}


//routes middleware
app.use(loginRoutes);
app.use(registerRoutes)


//port
const port = process.env.PORT || 8000

app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})