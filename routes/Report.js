const express = require('express');
const router = express.Router();

router.get("/report" , (req , res)=>{
    res.render("compose");
});

module.exports = router;