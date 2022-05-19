const mongoose = require('mongoose');
const {schema} = require('mongoose');

const commentSchema = newSchema = {
    source:{
        type: String,
        required: true,
    },
    commenter:{
        type: String,
        required: true,
    },
    content:{
        type: String,
        required: true,
    }
}

const Comment = mongoose.model('Comment',commentSchema);
module.exports = {Comment}