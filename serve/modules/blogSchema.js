const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    id:BigInt,
    title: String,
    content: String,
    creatTime:{
      type:Date,
      default:Date.now()
    },
    categoryId:String
  });

const Blog = mongoose.model('blogs',blogSchema)

module.exports = Blog