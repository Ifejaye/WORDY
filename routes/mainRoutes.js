const express = require('express');
const {Post} = require('../models/post');
const mainRouter = express.Router();



// setting up our homepage
mainRouter.get('/',(req,res)=>{
    Post.find()
    .sort({createdAt: -1})
        .then((result)=>{
            res.render('home', {posts: result});
        }).catch((error)=>{
            console.log(error);
        })
    

});

// setting our about page
mainRouter.get('/about', (req,res)=>{
    res.render('about')
})

//setting our 404 page
mainRouter.all('*',(req,res)=>{
    res.status('404').render('404')
});

module.exports = {mainRouter}