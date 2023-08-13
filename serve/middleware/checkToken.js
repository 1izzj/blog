const express = require("express");
const User = require("../modules/userSchema");

//中间件函数
async function checkToken(req, res, next) {
  let { token } = req.headers;
  try {
    const data = await User.findOne({ token });
    if (!data) {
      res.status(401).send({
        code: "401",
        message: "请先登录",
      });
      return;
    }
    next();
  } catch (err) {
    res.status(500).send({
      code: "500",
      message: "服务器错误",
    });
  }
}

//暴露函数
module.exports = checkToken;