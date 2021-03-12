const express = require('express');
const router =  express.Router();
const Post = require('../models/PostModel');
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({extended: true}));

router.post("/compose" , (req , res)=>{

    const newPost = new Post({
      post_title : req.body.post_title,
      post_body : req.body.post_body
    });
    newPost.save(()=>{
      res.redirect('/latest');
    })
 
});

module.exports = router;