//! for securing credentials of MongoDB Atlas 
require('dotenv').config();

const express = require("express");
const ejs = require("ejs");
const app = express();
const  _ = require('lodash');
const mongoose  = require("mongoose");
// const credentials = require(__dirname + '/Credentials.js');


//! Routers
const DeleteRouter = require('./routes/Delete')
const UpdateRouter = require('./routes/Update');
const ReportsRouter = require('./routes/Reports')
const ComposeRouter = require('./routes/Compose')
const ReportRouter = require('./routes/Report')
const LatestRouter = require('./routes/Latest');
const HomeRouter = require('./routes/Home');

//! Use Routers 
app.use(DeleteRouter);
app.use(UpdateRouter);
app.use(ReportsRouter);
app.use(ComposeRouter);
app.use(ReportRouter);
app.use(LatestRouter);
app.use(HomeRouter);

//! Set View Engine 
app.set('view engine', 'ejs');
//! Serve static files
app.use(express.static("public"));


//!  for local testing and development . 

   mongoose.connect('mongodb://localhost:27017/ElectionCorruption',{
   useNewUrlParser : true,
   useUnifiedTopology:true
  });


//! for deployment

// mongoose.connect(process.env.DB_LINK,{
//   useNewUrlParser: true,   
//   useUnifiedTopology: true
// });


//  const postSchema = new mongoose.Schema({
//    post_title :   { 
//      type : String,
//      required : true
//    },
//    post_body : {
//      type : String , 
//      required : true
//    }
//  });

//  const Post = mongoose.model('Post',postSchema);







// app.get("/" , (req , res)=>{

//   res.sendFile(__dirname +  "/index.html");

// });

// app.get("/latest", (req , res)=>{

//   Post.find({},(err,docs)=>{
//     res.render('content',{
//       starting_content : homeStartingContent, 
//       posts : docs
//     }); 
//   })
// });

// app.get("/reports/:id" , (req , res)=>{

//   const  reqd =  req.params.id;

//   Post.findById(reqd , (err,doc)=>{
//       res.render('post',{thispost : doc});
//   });
// })

// app.get("/home" , (req , res)=>{
//   res.redirect("/");
// })



// app.get("/report" , (req , res)=>{
//   res.render("compose");
// });


// app.post("/compose" , (req , res)=>{

//   const newPost = new Post({
//     post_title : req.body.post_title,
//     post_body : req.body.post_body
//   });
//   newPost.save(()=>{
//     res.redirect('/latest');
//   })

// });

//* update
// app.get('/update/:id' , (req,res)=>{

//   const reqd = req.params.id;

//   Post.findById(reqd, (err,doc)=>{
//     res.render('update' , {thispost : doc});
//   })
// });

// app.post('/update/:id' , (req,res)=>{
//   const reqd = req.params.id; 

//   const updatedTitle = req.body.post_title;
//   const updatedBody = req.body.post_body;

//   Post.findByIdAndUpdate(reqd,{post_title : updatedTitle , post_body : updatedBody} , (err,doc)=>{
//     res.redirect('/reports/' + reqd);
//   });
// });


//* delete
// app.post('/delete/:id',(req,res)=>{

//   const reqd = req.params.id;

//   Post.findByIdAndRemove(reqd, (err)=>{
//     res.redirect('/latest');
//   });
// });

app.listen(process.env.PORT || 3000 , function() {
  console.log("Server started on port 3000");
});

