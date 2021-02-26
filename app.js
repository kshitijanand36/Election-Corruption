

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
// Load the full build.
var _ = require('lodash');



const homeStartingContent = "All the reports posted have been listed down here. You can read any of the reports by clicking on read more.";


posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/" , function(req , res){

  res.sendFile(__dirname +  "/index.html");

})

app.get("/latest", function(req , res){

  res.render("content" , {content : posts , starting_content : homeStartingContent });
});

app.get("/reports/:topic" , function(req , res){

  var reqd = _.lowerCase( req.params.topic);

  console.log(reqd);
  for(let i = 0 ;  i< posts.length ; i++){
    console.log(_.lowerCase(posts[i].post_title));
    if(_.lowerCase(posts[i].post_title) == reqd){
      res.render("post" , {post_title :posts[i].post_title , post_content : posts[i].post_body })
    }
  }



  res.render("error");
})

app.get("/home" , function(req , res){

  res.redirect("/");
})



app.get("/report" , function(req , res){

  res.render("compose");
});


app.post("/compose" , function(req , res){
  const post = {
    post_title : req.body.post_title,
    post_body : req.body.post_body
  }

  // console.log(post);

  posts.push(post);

  res.redirect("/latest");
});

app.listen(process.env.PORT || 3000 , function() {
  console.log("Server started on port 3000");
});
