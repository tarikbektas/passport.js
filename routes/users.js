const express =require('express')
const routes = express.Router();
const userController = require('../controllers/userController')
const User = require('../models/User')
routes.get('/',(req,res,next)=>{
  User.find()
  .then(users=>{
  
     
    res.render('pages/index',{ layout:'layouts/layouts',users:users})
  })


})

routes.get('/login',userController.getUserLogin)

routes.get('/register',userController.getUserRegister)

routes.post('/login',userController.postUserLogin)

routes.post('/register',userController.postUserRegister)

module.exports =routes

 