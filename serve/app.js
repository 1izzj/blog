const db = require("./db/db");
db(
  () => {
    const express = require("express");
    const app = express();
    const path = require("path");
    const bodyParse = require("body-parser");
    const multer = require('multer')
    const userRouter = require('./router/userRouter')
    const categoryRouter = require('./router/catergoryRouter')
    const blogRouter = require('./router/blogRouter')
    const uploadRouter = require('./router/uploadRouter')
    //设置跨域
    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*'); 
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); 
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      if (req.method === 'OPTIONS') {
        res.sendStatus(200);
        return;
      }
      next();
    });

    //引入文件上传功能
    const update = multer({
      dest:'./public/upload/temp'
    })
    app.use(update.any())
    //解析body
    app.use(bodyParse.json());
    app.use(bodyParse.urlencoded({ extended: true }));
    //设置静态资源路径
    app.use(express.static(path.join(__dirname, "public")));
    app.use('/login',userRouter)
    app.use('/category',categoryRouter)
    app.use('/blog',blogRouter)
    app.use('/upload',uploadRouter)

    app.listen("3000", () => {
      console.log("服务器启动了~~");
    });
  },
  () => {}
);


