const express = require("express");
const bodyParser = require("body-parser");
const Post =require('./models/post');
const mongoose=require('mongoose');

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

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title:req.body.title,
    content:req.body.content
  });
post.save().then(createdPost=>{

  console.log(post);
  res.status(201).json({
    message: 'Post added successfully',
    postId:createdPost._id
});

  });
});

app.get("/api/posts", (req, res, next) => {
  Post.find().then(documents=>{
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts:documents
  });

  });
});
app.delete("/api/posts/:id",(req,res,next)=>{
  Post.deleteOne({_id:req.params.id}).then(result=>{
    console.log(result);
    res.status(200).json({message:"Post deleted"});
  });

});
module.exports = app;
