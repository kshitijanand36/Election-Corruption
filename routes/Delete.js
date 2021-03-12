const express = require('express');
const router =  express.Router();
const Post = require('../models/PostModel');

router.post('/delete/:id',(req,res)=>{

    const reqd = req.params.id;
  
    Post.findByIdAndRemove(reqd, (err)=>{
      res.redirect('/latest');
    });
  });

module.exports = router;