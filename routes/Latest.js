const express = require('express');
const router = express.Router();
const Post = require('../models/PostModel');

const homeStartingContent = "All the reports posted have been listed down here. You can read any of the reports by clicking on read more.";

router.get("/latest", (req , res)=>{

    Post.find({},(err,docs)=>{
      res.render('content',{
        starting_content : homeStartingContent, 
        posts : docs
      }); 
    })
});

module.exports = router;