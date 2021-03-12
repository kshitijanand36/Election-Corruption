//! for securing credentials of MongoDB Atlas 
require('dotenv').config();

const express = require("express");
const ejs = require("ejs");
const app = express();
const  _ = require('lodash');
const mongoose  = require("mongoose");



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

})



//! for deployment

// mongoose.connect(process.env.DB_LINK,{
//   useNewUrlParser: true,   
//   useUnifiedTopology: true
// });


app.listen(process.env.PORT || 3000 , ()=>   {
  console.log("Server started on port 3000");
});

