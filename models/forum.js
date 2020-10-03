const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const forumSchema = new Schema({
    author: {
        type: String
    },
    blog:{
        type: String
    }
},{timestamps: true});

module.exports = mongoose.model('forum', forumSchema);