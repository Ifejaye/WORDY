const express = require('express');
const {Post} = require('../models/post');
const mainRouter = express.Router();

// middleware to test if authenticated
function isAuth (req, res, next) {
    if (req.session.user) {
        next()        
    } else {
        res.redirect('/signin')
        
    }
  }

// setting up our homepage
mainRouter.get('/', isAuth, (req,res)=>{
    Post.find()
    .sort({createdAt: -1})
        .then((myResult)=>{
            res.render('home', {posts: myResult,});
            }).catch((error)=>{
            console.log(error);
        })
    });


// setting our about page
mainRouter.get('/about',isAuth, (req,res)=>{
    res.render('about')
})

//setting our 404 page
// mainRouter.all('*',(req,res)=>{
//     res.status('404').render('404')
// });

module.exports = {mainRouter}