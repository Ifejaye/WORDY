const mongoose = require('mongoose');
const {Schema} = require('mongoose');
// const {Post} = require('./models/post')

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
    likes:{
        type:Number
    },
    comments:[{
        type: Schema.Types.ObjectId,
        ref: 'Comments'
    }]
    
},{timestamps: true});


const commentSchema = newSchema = ({
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
    sourcePost: {
        type: String,
    }
})








const Post = mongoose.model('Post', postSchema);
const Comment = mongoose.model('Comment',commentSchema);


module.exports = {
    Post :Post,
    Comment : Comment
}