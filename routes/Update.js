const express = require('express');
const router =  express.Router();
const Post = require('../models/PostModel');

//! No need of bodyparser 
router.use(express.urlencoded({extended: true}));
router.use(express.json());

router.get('/update/:id' , (req,res)=>{

    const reqd = req.params.id;
  
    Post.findById(reqd, (err,doc)=>{
      res.render('update' , {thispost : doc});
    })
});
  
router.post('/update/:id' , (req,res)=>{
    const reqd = req.params.id; 
  
    const updatedTitle = req.body.post_title;
    const updatedBody = req.body.post_body;
  
    Post.findByIdAndUpdate(reqd,{post_title : updatedTitle , post_body : updatedBody} , (err,doc)=>{
      res.redirect('/reports/' + reqd);
    });
  });
  
module.exports = router;