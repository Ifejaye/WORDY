const { default: mongoose } = require('mongoose');
const {Post} = require('../models/post');
const {Comment} = require('../models/post')




// for new posts
const get_new_post = (req,res)=>{
    res.render('new_post');
}

//  for publishing new post
const publish_new_post = async(req,res)=>{
    // we will soon insert our save message. 
    const {title, content} = req.body;      
    const snippet = content.substring(0,50);    
    try {
        const post = new Post({
            author: req.session.user,
            title: req.body.title,
            content: req.body.content,
            snippet: snippet,
        })
        result = await post.save();
        res.redirect('/');           // This is to redirect the user back to the homepage 
    } catch (error) {
        console.log(error);
    }   
    
}


const get_single_post = (req,res)=>{ 
    const postId = req.params.id;
    viewPost = async()=>{
        const postResult = await Post.findById(postId)
        .then((result)=>{
        return result
    }).catch((error)=>{
        console.log(error);
    });
    
    const commentResult = await Comment
    .find({sourcePost: postId})
    .populate('sourcePost')
    .then((result)=>{
        return result      
    }).catch((err)=>{
        console.log(err)
    }
    );
    const aUser = req.session.user
                 res.render('post', {
                    posts: postResult,
                    comments: commentResult,
                    aUser: aUser,  
                    })
    }  
    viewPost();
}

const get_update_post_form = (req,res)=>{
    Post.findById(id)
    .then((result)=>{
        res.render('update_post', {post: result})
    }).catch((error)=>{
        console.log(error);
    })
}

const update_single_post = (req,res)=>{
    const id = req.params.id;
    Post.findByIdAndUpdate(id, req.body)
    .then((result)=>{
        res.redirect('/') 
        }).catch((error)=>{
            console.log(error);
    })
}

const delete_single_post = (req,res)=>{
    const id = req.params.id;
    Post.findByIdAndDelete(id)
    .then((result)=>{
        res.json({
            status: true,
            message: 'Post deleted successfully',
            redirect: '/',
        });
    })
    .catch((error)=>{
        res.status(400).json({
            status: false,
            message: 'Something went wrong',
            full_error: error,
        });
    });

};

const add_new_comment = (req,res)=>{
    const postId = req.params.id
    
            const newComment = new Comment ({
            commenter: req.session.user,
            content: req.body.reply,
            sourcePost: postId
        })
        newComment.save(function (err) {
            if (err) {
              console.log(err);
            }
            res.redirect('/')
          });
    };


module.exports = {
    get_new_post,
    publish_new_post,
    get_single_post,
    get_update_post_form,
    update_single_post,
    delete_single_post,
    add_new_comment,
}