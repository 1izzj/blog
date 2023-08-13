/**
 * @param {*} success 数据库连接成功的回调
 * @param {*} error 数据库连接失败的回调
 */

module.exports = function (success, error) {
    const mongoose = require("mongoose");
    mongoose.connect("mongodb://127.0.0.1:27017/blog");
  
    const db = mongoose.connection;
  
    db.once("open", () => {
      success();
    });
  
    db.on("error", () => {
      error();
    });
  
    db.on("close", () => {
      console.log("连接关闭~~");
    });
  };
  