const mongoose = require('mongoose');
const {Schema} = require('mongoose');
// const {Post} = require('./models/post')

const postSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    snippet:{
        type: String,
        required:true,
    },
    content:{
        type: String,
        required: true,
    },    
},
{timestamps: true})

const Post = mongoose.model('Post', postSchema);

module.exports = {Post};