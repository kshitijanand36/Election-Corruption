const express = require('express');
const router =  express.Router();
const Post = require('../models/PostModel');
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({extended: true}));

router.get("/reports/:id" , (req , res)=>{

    const  reqd =  req.params.id;  
    
    Post.findById(reqd , (err,doc)=>{
        res.render('post',{thispost : doc});
    });
 })
  


module.exports = router;