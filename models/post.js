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
    Comment:{
        type: String,
        required: false,
    }  
},
{timestamps: true})

const Post = mongoose.model('Post', postSchema);

module.exports = {Post};