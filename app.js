const express = require('express');
const app = express();
const PORT = 5000;
const userRoutes =require('./routes/users')
const path = require('path')
const ejsLayouts = require('express-ejs-layouts')
const passport = require('passport')
const mongoose = require('mongoose');
const bodyParser =require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))
const flash =require('connect-flash')
const session =require('express-session')
const cookieParser = require("cookie-parser")


 
app.use(cookieParser("passporttutorial"));
app.use(session({cookie:{maxAge:60000},
resave:true,
secret:"passporttutorial",
saveUninitialized:true
}))
app.use(flash());

app.use(passport.initialize())
app.use(passport.session())



// local flashlar  ve local bilgiler
app.use((req,res,next)=>{
    
    res.locals.succsess = req.flash('loginsuccess')
    res.locals.passportFailure = req.flash('error')
   res.locals.passportSuccess=req.flash('success')
    console.log("user bilgisi",req.user)
    res.locals.user = req.user

      next()
})



mongoose.connect('mongodb://127.0.0.1:27017/passportdb');
const db =mongoose.connection;
db.on("error",console.error.bind(console,"veri tabanı hatası"))
db.once("open",()=>{
    console.log('bağlantı başarılı')
})
 






app.use(ejsLayouts)
app.set('layout', 'layouts/layouts');
 


app.set('view engine' ,'ejs')
app.set('views','./views')
app.use(express.static(path.join(__dirname, '/public')));

 
 

app.use(userRoutes)


 


app.use((req,res,next)=>{
    res.send('404 NOT FOUND')
})
app.listen(PORT,(req,res,next)=>{
    console.log("sistem çalışıyor");
})