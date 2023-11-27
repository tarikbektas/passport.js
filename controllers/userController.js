const formValidation =require('../validation/formValidation')
const bcrypt = require('bcrypt');
const User = require('../models/User')
const passport=require('passport')
require('../authentication/passport/local')

module.exports.getUserLogin = (req,res,next) =>{

    res.render('pages/login',{layout:'layouts/layouts'})

}

module.exports.getUserRegister = (req,res,next)=>{
    const username =""
    const password =""
    const erorrs = ""
    res.render('pages/register',{layout:'layouts/layouts',username:username,password,erorrs:erorrs})
}
 

module.exports.postUserLogin =  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    successFlash:true,
    failureFlash: true
   
})

 


module.exports.postUserRegister = (req,res,next)=>{
    const username = req.body.username;
    const password=req.body.password
    const errors = [];
    const validationerrors =formValidation.registerValidation(username,password)
    if(validationerrors.length>0) {
        
        return res.render('pages/register',{
            username:username,
            password,
            erorrs:validationerrors})
    }
    User.findOne({
        username
    })
    .then(user =>{
        if(user) {
            errors.push({message:"Username Already in use"})
             return res.render('pages/register',{layout:'layouts/layouts',username:username,password:password,erorrs:errors})
        }
       
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                const newUser = new User({
                    username:username,
                    password:hash 
                   })
                   newUser.save()
                   .then(()=>{
                    console.log('veri kaydedildi')
                    req.flash('loginsuccess', 'kayıt  başarılı');
                    res.redirect('/')
                   }) 
                   
                   
            });
        });
       
    })

    
  }


  module.exports.postUserLogout = (req, res) => {
    // Oturumu sonlandır
    req.logout(function(err) {
        if (err) {
            // Hata işleme
            console.error('Logout hatası:', err);
            return next(err); // Hata durumunda middleware zincirini sonlandırma
        }

        // İsteği ve yanıtı yönlendirme veya başka bir işlem yapma
        res.redirect('/'); // Örneğin, ana sayfaya yönlendirme
    });
}