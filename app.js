

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const  _ = require('lodash');
const mongoose  = require("mongoose");
// const credentials = require(__dirname + '/Credentials.js');

// mongoose.connect('mongodb://localhost:27017/ElectionCorruption',{
//   useNewUrlParser : true,
//   useUnifiedTopology:true
// });

mongoose.connect("mongodb+srv://admin-kshitij:Test123@cluster0.cdg7o.mongodb.net/reportsDB?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// mongoose.connect(credentials.link,{
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });


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

const homeStartingContent = "All the reports posted have been listed down here. You can read any of the reports by clicking on read more.";




app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/" , (req , res)=>{

  res.sendFile(__dirname +  "/index.html");

});

app.get("/latest", (req , res)=>{

  Post.find({},(err,docs)=>{


    res.render('content',{
      starting_content : homeStartingContent,
      posts : docs
    });
  })
});

app.get("/reports/:id" , (req , res)=>{

  const  reqd =  req.params.id;


  Post.findById(reqd , (err,doc)=>{
      if(err || doc == null){

        res.render('error');
      }

      else{

        res.render('post',{thispost : doc});

      }

  });



})

app.get("/home" , (req , res)=>{

  res.redirect("/");
})



app.get("/report" , (req , res)=>{

  res.render("compose");
});


app.post("/compose" , (req , res)=>{

  const newPost = new Post({
    post_title : req.body.post_title,
    post_body : req.body.post_body
  });
  newPost.save(()=>{
    res.redirect('/latest');
  })

});

// update
app.get('/update/:id' , (req,res)=>{

  const reqd = req.params.id;

  Post.findById(reqd, (err,doc)=>{
    if(err || doc == null){

      res.render('error');
    }

    else{
      res.render('update' , { thispost : doc });

    }
  })
});

app.post('/update/:id' , (req,res)=>{
  const reqd = req.params.id;

  const updatedTitle = req.body.post_title;
  const updatedBody = req.body.post_body;

  Post.findByIdAndUpdate(reqd,{post_title : updatedTitle , post_body : updatedBody} , (err,doc)=>{
    if(err || doc == null){

      res.render('error');
    }
    else{
      res.redirect('/reports/' + reqd);

    }
  });
});


// delete
app.post('/delete/:id',(req,res)=>{

  const reqd = req.params.id;

  Post.findByIdAndRemove(reqd, (err)=>{
    res.redirect('/latest');
  });

});
app.listen(process.env.PORT || 3000 , function() {
  console.log("Server started on port 3000");
});
