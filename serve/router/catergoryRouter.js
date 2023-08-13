const express = require("express");
const router = express.Router();
const category = require("../modules/categorySchema");
const GenId = require("../utils/snowId");
const genid = new GenId({ WorkerId: 1 });
const checkToken = require("../middleware/checkToken");

//添加类别
router.post("/add", checkToken, (req, res) => {
  let { name } = req.body;
  category
    .create({ name: name, categoryId: genid.NextId() })
    .then((data) => {
      res.json({
        code: "200",
        message: "添加成功",
      });
    })
    .catch((err) => {
      res.json({
        code: "500",
        message: "添加失败",
      });
    });
});

//删除类别
router.delete("/delete", checkToken, (req, res) => {
  const { id } = req.query;
  category
    .deleteMany({ _id: id })
    .then((data) => {
      res.json({
        code: "200",
        message: "删除成功",
      });
    })
    .catch((err) => {
      res.json({
        code: "500",
        message: "删除失败",
      });
    });
});

//修改类别
router.put("/updata", checkToken, (req, res) => {
  let { id, name } = req.query;
  category
    .updateMany({ _id: id }, { name: name })
    .then((data) => {
      res.json({
        code: "200",
        message: "修改成功",
      });
    })
    .catch((err) => {
      res.json({
        code: "500",
        message: "修改失败",
      });
    });
});

//查询类别
router.get("/find", (req, res) => {
  let { id } = req.query;
  category
    .find({ _id: id })
    .then((data) => {
      res.json({
        code: "200",
        message: "查询成功",
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        code: "500",
        message: "查询失败",
      });
    });
});

module.exports = router;
