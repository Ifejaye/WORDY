const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');

function nAuth (req, res, next) {
    if (!req.session.user) {
        next()        
    }
  }


userRouter.get('/signup',nAuth, userController.get_signup); 
userRouter.get('/signin',nAuth, userController.get_signin); 
userRouter.post('/signup',userController.create_new_user); 
userRouter.post('/signin',userController.submit_login);
userRouter.get('/signout',userController.sign_me_out);

module.exports = { userRouter }