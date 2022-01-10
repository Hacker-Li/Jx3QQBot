const bot = require("./app")

var ws = require("ws");

// url ws://127.0.0.1:6080
// 创建了一个客户端的socket,然后让这个客户端去连接服务器的socket
var sock = new ws("wss://socket.nicemoe.cn");
// var sock = new ws("ws://120.92.176.116:3724");

sock.on("open", function () {
	console.log("websocket 链接成功！");
    setInterval(function(){
        sock.send("ping");
        //console.log("Ping");
    },1000*5);
});



sock.on("error", function(err) {
	console.log("error: ", err);
    sock = new ws("wss://socket.nicemoe.cn");
});

sock.on("close", function() {
    console.log("close");
    socket = new ws("wss://socket.nicemoe.cn");
});




module.exports = sock;