const express = require('express');
const router = express.Router();

//? Need of this package -> Express donot allow ../ path in sendFile , path.resolve can handle this 
const path = require('path')

router.get("/" , (req , res)=>{
    res.sendFile(path.resolve(__dirname +  "/../index.html"));
});

router.get("/home" , (req , res)=>{
    res.redirect("/");
});  

module.exports = router;