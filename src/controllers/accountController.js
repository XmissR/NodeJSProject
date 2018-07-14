const path = require("path");
const captchapng = require("captchapng");
const datatool = require(path.join(__dirname,"../tools/datatool.js"));

/**
 * 暴露了一个获取登录页面的方法，给路由调用
 */
exports.getLoginPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/login.html"));
};

/**
 * 暴露出去的获取图片验证码的方法
 */
exports.getImageVcode = (req, res) => {
  //1.利用一个第三方的包生成 一张带数字的图片
  const random = parseInt(Math.random() * 9000 + 1000);

  req.session.vcode = random

  var p = new captchapng(80, 30, random);
  p.color(0, 0, 0, 0); 
  p.color(80, 80, 80, 255); 

  var img = p.getBase64();
  var imgbase64 = new Buffer(img, "base64");
  res.writeHead(200, {
    "Content-Type": "image/png"
  });
  

  //3.返回，并且告知是一张图片
  res.end(imgbase64);
};

/**
 * 暴露出去，获取注册页面的方法
 */
exports.getRegisterPage = (req,res) => {
  res.sendFile(path.join(__dirname,"../views/register.html"))
}

/**
 * 暴露出去，注册的方法
 * status : 0 代表成功
 *          1 用户名存在
 *          2 注册失败
 */
exports.register = (req,res) => {
  const result = {status:0,message:'注册成功'}
  //1.获取传递过来的 username password
  // const params = req.body
  //es6的解构赋值 http://es6.ruanyifeng.com/
  const {username} = req.body;
  //2.判断用户名是否存在，存在就响应用户说用户名已经存在，不存在，就先插入到数据库中，然后响应注册成功
  //2.1 node连接到mongodb服务端
  datatool.findOne('accountInfo',{username},(err,doc)=>{
    if(doc != null){//存在
      result.status = 1
      result.message = "用户名已经存在!"
      res.json(result);
    }else {
      datatool.insetOne('accountInfo',req.body,(err,result1)=>{
        if(result1 == null){
          result.status = 2
          result.message = "注册失败!"
        }
        res.json(result);
      })
    }
  })
}

/**
 * 暴露出一个方法，该方法处理具体的登录请求
 * status : 0 成功
 *          1 验证码错误
 *          2 用户名或是密码错误
 */
exports.login = (req,res)=>{
  const result = {status:0,message:'登录成功'}
  //1.获取到请求体中的内容
  const {username,password,vcode} = req.body
  //2.验证验证码
  if(vcode != req.session.vcode){
    result.status = 1
    result.message = "验证码错误!"

    res.json(result)

    return
  }
  //3.验证用户名和密码
  //2.1 node连接到mongodb服务端
  datatool.findOne('accountInfo',{username,password},(err,doc)=>{
    if(doc == null){//没查询到
      result.status = 2
      result.message = "用户名或密码错误"
    }
    res.json(result);
  })
}