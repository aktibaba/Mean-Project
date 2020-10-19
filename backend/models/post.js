const mongoose =require('mongoose');


//mongo database de datayi nasil store edecegimi tanimladim mongoose schemayi kurmama yardimci oldu  Jx9vVFphRyfy0IVD
const postSchema= mongoose.Schema({

  title:{   type:String, required:true},
  content:{type:String, required:true}
});

module.exports =mongoose.model('Post', postSchema);
