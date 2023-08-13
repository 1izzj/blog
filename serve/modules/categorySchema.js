const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    id:BigInt,
    name: String,
    categoryId:String
  });

const category = mongoose.model('categorys',categorySchema)

module.exports = category