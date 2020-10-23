  const express = require("express");
  const bodyParser = require("body-parser");
  const Post =require('./models/post');
  const mongoose=require('mongoose');
const postsRoutes=require("./routes/posts")
  const app = express();

  mongoose.connect('mongodb+srv://akti:Jx9vVFphRyfy0IVD@cluster0.fzq5g.mongodb.net/meanproject?retryWrites=true&w=majority')
  .then(()=>{
    console.log('Connected to db');
  })
  .catch(()=>{
    console.log('something went wrong');
  }
  );
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      'Access-Control-Allow-Origin', '*'
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With,Authorization,Content-Type, Accept'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );
    next();
  });
app.use("/api/posts",postsRoutes);


module.exports = app;
