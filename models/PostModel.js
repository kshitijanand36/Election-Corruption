const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    post_title :   { 
      type : String,
      required : true
    },
    post_body : {
      type : String , 
      required : true
    }
  });
 
const Post = mongoose.model('Post',postSchema);

module.exports = Post;