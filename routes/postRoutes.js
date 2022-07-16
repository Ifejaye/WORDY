const express = require('express');
const {Post} = require('../models/post');
const postRouter = express.Router();
const postController = require('../controllers/postController');


function isAuth (req, res, next) {
    if (req.session.user) {
        next()        
    } else {
        res.redirect('/signin')
        
    }
  }
// setting the new posts page.
postRouter.get('/new_post',isAuth,postController.get_new_post);

// now to set post the message
postRouter.post('/new_post',isAuth,postController.publish_new_post);

// to read the post in details 
postRouter.get('/read/:id',isAuth,postController.get_single_post);


// To get the update post form
postRouter.get('/update_post/:id',isAuth,postController.get_update_post_form);

// To post the updated form
postRouter.post('/update_post/:id',isAuth,postController.update_single_post);

// To delete posts
postRouter.delete('/delete_post/:id',isAuth, postController.delete_single_post);

// To add new comment to a specific post 
postRouter.post('/comment/:id', isAuth,postController.add_new_comment);

// To like a post
postRouter.get('/likepost/:id', isAuth,postController.like_a_post);

// To unlike a liked post
postRouter.get('/unlikepost/:id',isAuth, postController.unlike_a_post);

module.exports = {postRouter}