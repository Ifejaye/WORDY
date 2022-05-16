const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');




userRouter.get('/signup',userController.get_signup); 
userRouter.get('/signin',userController.get_signin); 
userRouter.post('/signup',userController.create_new_user); 
userRouter.post('/signin',userController.submit_login);

module.exports = { userRouter }