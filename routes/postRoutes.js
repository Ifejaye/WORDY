const express = require('express');
const {Post} = require('../models/post');
const postRouter = express.Router();
const postController = require('../controllers/postController');

// setting the new posts page.
postRouter.get('/new_post',postController.get_new_post);

// now to set post the message
postRouter.post('/new_post',postController.publish_new_post);

// to read the post in details 
postRouter.get('/read/:id',postController.get_single_post);


// To get the update post form
postRouter.get('/update_post/:id',postController.get_update_post_form);

// To post the updated form
postRouter.post('/update_post/:id',postController.update_single_post)

postRouter.delete('/delete_post/:id', postController.delete_single_post);

module.exports = {postRouter}