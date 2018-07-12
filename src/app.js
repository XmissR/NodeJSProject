// 使用express开启web服务
var express = require('express');
const path = require('path');
var app = express();
// node中处理静态资源
app.use(express.static(path.join(__dirname,"statics")));
// 集成路由中间件
var accountRouter = require(path.join(__dirname,"./routers/accountRouter"));
app.use('/',accountRouter);

app.listen(3000,'127.0.0.1',err=>{
    if(err){
        console.log(err);
    }
    console.log('start OK');
});