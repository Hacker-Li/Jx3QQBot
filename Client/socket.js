// 1 引入模块
const net = require('net');
const readline = require('readline');
// 2 创建套接字和输入输出命令行
let rl = readline.createInterface({
// 调用std接口
input:process.stdin,
output:process.stdout
})
let client = new net.Socket();
// 3 链接
// client.connect(2724,'120.92.17.116');
client.connect(18048,'120.92.144.231');
// var sock = new ws("ws://120.92.176.116:3724");
client.setEncoding('utf8');
client.on('CONNECTED',(chunk)=>{
    console.log(chunk)
    })
client.on('data',(chunk)=>{
console.log(chunk)
})
client.on('error',(e)=>{
console.log(e.message);
})
// 绑定输io流事件,获取输入输出字符
rl.on('line',(mes)=>{
client.write(mes);
})

