const path = require('path');
// 引入图片验证码第三方包
const captchapng = require('captchapng');
/**
 * 暴露一个获取登录页面的方法给外面，方便路由调用
 */
exports.getLoginPage = (req,res)=>{
    res.sendFile(path.join(__dirname,"../views/login.html"));
};
// 发请求处理图片验证码逻辑
exports.getImageVcode = (req,res)=>{
    var p = new captchapng(80,30,parseInt(Math.random()*9000+1000)); // width,height,numeric captcha
        p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
        p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)
    var img = p.getBase64();
    var imgbase64 = new Buffer(img,'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
}
