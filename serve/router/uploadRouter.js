const express = require("express");
const router = express.Router();
const fs = require('fs')
const GenId = require("../utils/snowId");
const genid = new GenId({ WorkerId: 1 });

router.post('/rich_upload',async (req,res) => {
  if(!req.files){
    res.send({
        "errno": 1, // 只要不等于 0 就行
        "message": "失败信息"
    })
    return
  }

  let files = req.files
  let ret_files = []
  for(let file of files){
    //获取文件后缀
    let file_ext = file.originalname.substring(file.originalname.lastIndexOf('.') + 1)
    //重新命名文件名
    let file_name = genid.NextId() + '.' + file_ext
    fs.renameSync(
        process.cwd() + '/public/upload/temp/' + file.filename,
        process.cwd() + '/public/upload/' + file_name,
    )
    ret_files.push('/upload/' + file_name)
  }
  res.send(
    {
        "errno": 0, // 注意：值是数字，不能是字符串
        "data": {
            "url": ret_files[0], // 图片 src ，必须
        }
    }
  )
})

module.exports = router