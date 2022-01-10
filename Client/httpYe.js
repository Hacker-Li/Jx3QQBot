
var http = require('http');//创建服务器的
var fs = require('fs');
//引入进来的是模块，模块中有方法，下一步就是使用方法
//Node.js一个最主要的特点：执行的基本都是函数
 
//创建服务
var myServer = http.createServer(function(req,res){
    //req->请求变量：客户端请求服务器的
    //res->响应变量:服务器要给客户端写回的变量
    //前端页面应该给客户端显示，即写回去
    //这之前应该先把文件内容读出来
 
    var html = fs.readFileSync('./resources/html/itemprice.html')
 
    res.write(html);
 
    //结束写的操作
    res.end();
 
})

//服务端等着客户端请求需要做一个监听。通过创建的服务。
//监听
module.exports = {myServer}

