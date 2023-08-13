const express = require("express");
const router = express.Router();
const blog = require("../modules/blogSchema");
const GenId = require("../utils/snowId");
const genid = new GenId({ WorkerId: 1 });
const checkToken = require("../middleware/checkToken");

//添加文章
router.post("/add", checkToken, (req, res) => {
  let obj = req.body;
  blog
    .create(obj)
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

//删除文章
router.delete("/delete", checkToken,(req, res) => {
  const { id } = req.query;
  blog
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

//修改文章
router.put("/updata", checkToken,(req, res) => {
  let { id } = req.query;
  let obj = req.body;
  blog
    .updateMany(
      { _id: id },
      { title: obj.title, content: obj.content, categoryId: obj.categoryId }
    )
    .then((data) => {
      res.json({
        code: "200",
        message: "修改成功",
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        code: "500",
        message: "修改失败",
      });
    });
});

//查询文章（涉及到模糊查询，分页功能）
router.get("/find", (req, res) => {
  let { keyword, categoryId, page, pageSize } = req.query; //接受搜索框输入内容,接受前端传递过来的页码（在第几页），pageSize（一页显示多少数据）
  //验证前端传递过来的数据
  page = page == null ? 1 : page;
  pageSize = pageSize == null ? 10 : pageSize;
  categoryId = categoryId == null ? 0 : categoryId;
  keyword = keyword == null ? "" : keyword;

  //封装查询函数
  async function search(queryConditions, page, pageSize) {
    const totalPosts = await blog.countDocuments(queryConditions);
    const totalPages = Math.ceil(totalPosts / pageSize);
    const blogPosts = await blog
      .find(queryConditions)
      .skip((page - 1) * pageSize) // 跳过前面的文章
      .limit(pageSize); // 限制每页文章数量
    return res.json({
      code: "200",
      totalPages,
      totalPosts,
      currentPage: page,
      blogPosts,
    });
  }

  //查询条件
  if (keyword !== "" && categoryId !== 0) {
    const queryConditions = {
      $or: [
        {
          $and: [
            { categoryId: { $regex: categoryId, $options: "i" } },
            { title: { $regex: keyword, $options: "i" } },
          ],
        },
        {
          $and: [
            { categoryId: { $regex: categoryId, $options: "i" } },
            { content: { $regex: keyword, $options: "i" } },
          ],
        },
      ],
    };
    search(queryConditions, page, pageSize);
  } else if (keyword === "" && categoryId !== 0) {
    const queryConditions = {
      categoryId: { $regex: categoryId, $options: "i" },
    };
    search(queryConditions, page, pageSize);
  } else if (keyword !== "" && categoryId === 0) {
    const queryConditions = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { content: { $regex: keyword, $options: "i" } },
      ],
    };
    search(queryConditions, page, pageSize);
  } else if (keyword === "" && categoryId === 0) {
    const queryConditions = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { content: { $regex: keyword, $options: "i" } },
      ],
    };
    search(queryConditions, page, pageSize);
  }
});

module.exports = router;
