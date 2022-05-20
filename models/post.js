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
    }
},{timestamps: true})

const Post = mongoose.model('Post', postSchema);

module.exports = {Post};