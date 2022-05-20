const {Post} = require('../models/post');
const {Comment} = require('../models/comment')




// for new posts
const get_new_post = (req,res)=>{
    res.render('new_post');
}

//  for publishing new post
const publish_new_post = async(req,res)=>{
    // we will soon insert our save message. 
    const {title, content} = req.body;  
    
    const body = content.substring(1,500);
    
    try {
        const post = new Post({
            author: req.session.user,
            title: req.body.title,
            content: req.body.content,
            snippet: body,
        })
        result = await post.save();
        res.redirect('/');           // This is to redirect the user back to the homepage 
    } catch (error) {
        console.log(error);
    }   
    
}

const get_single_post = (req,res)=>{ 
    const id = req.params.id;
   
    Post.findById(id)
    .then((result1)=>{
        const aUser = req.session.user;
        Comment.find({id})
        .then((result2)=>{
            res.render('post', {
                posts: result1,
                aUser: aUser, comments:result2, 
                })
        })
        .catch((error)=>{
            console.log(error);
        })
    }).catch((error)=>{
        console.log(error);
    })
    // Sine we have got the posts, let's then get comments
}

const get_update_post_form = (req,res)=>{
    const id = req.params.id
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
}

module.exports = {
    get_new_post,
    publish_new_post,
    get_single_post,
    get_update_post_form,
    update_single_post,
    delete_single_post
}