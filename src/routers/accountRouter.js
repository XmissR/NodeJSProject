const express = require('express');
const path = require('path');
// 创建路由对象
var accountRouter = express.Router();
// 导入控制模块
const accountControl = require(path.join(__dirname,"../controllers/accountControl.js"));
// 发送get请求获取登录页面
accountRouter.get('/login',accountControl.getLoginPage);
// 发送get请求获取图片验证码
accountRouter.get('/vcode',accountControl.getImageVcode);

// 导出路由中间件
module.exports = accountRouter;