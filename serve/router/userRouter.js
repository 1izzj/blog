const express = require("express");
const router = express.Router();
const User = require("../modules/userSchema");
const GenId = require("../utils/snowId");
const genid = new GenId({ WorkerId: 1 });

//注册
router.post("/add", (req, res) => {
  let { username, password } = req.body;
  User.create({ username: username, password: password, token: "" })
    .then((data) => {
      res.send({
        code: "200",
        message: "注册成功",
      });
    })
    .catch((err) => {
      res.send({
        code: "500",
        message: "注册失败",
      });
    });
});

//登录接口
router.get("/login", async (req, res) => {
  let { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username, password: password });
    user.token = genid.NextId();
    const data = await user.save();
    data.password = "";
    res.send({
      code: "200",
      message: "登录成功",
      data: data,
    });
  } catch {
    res.send({
      code: "500",
      message: "登录失败",
    });
  }
});

module.exports = router;
