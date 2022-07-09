const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const {User} = require('./user')

const postSchema = new Schema({
    author:{
        type: String,
        required: false,
    },
    title:{
        type: String,
        required: true,
    },
    content:{
        type: String,
        required: true,
    },
    snippet:{
        type: String,
    },
    date:{
        type: Date,
        default: Date.now,
    },
    edit:{
        type:Boolean,
        default: false
    },
    likes:[{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    
},{timestamps: true, strictPopulate: false});


const commentSchema = newSchema = ({
    sourcePost: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    commenter:{
        type: String,
        required: true,
    },
    content:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now,
    },
    
})








const Post = mongoose.model('Post', postSchema);
const Comment = mongoose.model('Comment',commentSchema);


module.exports = {
    Post :Post,
    Comment : Comment
}