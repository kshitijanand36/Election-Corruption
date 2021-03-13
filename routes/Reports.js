const express = require('express');
const router =  express.Router();
const Post = require('../models/PostModel');

router.get("/reports/:id" , (req , res)=>{

    const  reqd =  req.params.id;  
    
    Post.findById(reqd , (err,doc)=>{
        res.render('post',{thispost : doc});
    });
 })
  


module.exports = router;