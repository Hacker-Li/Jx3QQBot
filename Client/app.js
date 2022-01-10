const {createClient,segment, cqcode } = require("oicq");
const {qqQUN,qqHao} = require( "./routes/index")
const {account,account1,server} = require("./config/config")
const {myServer} = require("./httpYe")
const socket = require("./SocketNew")

var user = process.argv.splice(2)
if(user == ""){
    user[0] = QQ号;
    user[1] = "密码";
}
const uin = user[0]
const password =user[1]
console.log(user)
const bot = createClient(uin);
const start = require("./start")
start.config = {account,server};
const logic = require("./logic/logic")
const puppeteer = require('puppeteer');
start.puppeteer = puppeteer;
const schedule = require("node-schedule");
const nodeXlsx = require('node-xlsx');
let ChatData = [];
let GroupList = [];

async function  llq(){
  const browser = await puppeteer.launch( { headless: true,defaultViewport:{
    width: 1000,
    height:800,
  },});
  const page =  await browser.newPage();
  start.page = page;
}
// llq();
//聊天消息监听
bot.on("message", event=>{
  if (event.group_id) {
    GroupList = global.GroupList; 
    var GroupDataList = GroupList.filter(function (e) { return e.ServerID == event.group_id; });
    if (GroupDataList.length > 0 || event.raw_message.indexOf("RightRaising") != -1) {
      Array.prototype.baoremove = function (dx) {
        if (isNaN(dx) || dx > this.length) { return false; }
        this.splice(dx, 1);
      }
      ChatData.push({ server: event.group_id, msg: event });
      var menu_node1 = ChatData.filter(function (e) { return e.server == event.group_id; });
      if (menu_node1.length > 50) {
        var index1 = ChatData.indexOf(menu_node1[0]);
        ChatData.baoremove(index1);
      }
      qqQUN(event, server.Jx3Server,GroupDataList[0]);//注册qq群事件
    }else{
      //event.reply("此群无权限")
    }
  } else {
    qqHao(event, server.Jx3Server);//注册qq号事件
  }
});
bot.on("system.login.slider", function (event) { //监听滑动验证码事件
    process.stdin.once("data", (input) => {
      this.sliderLogin(input); //输入ticket
    });
  }).on("system.login.device", function (event) { //监听登录保护验证事件
    process.stdin.once("data", () => {
      this.login(); //验证完成后按回车登录
    });
  }).login(password); //需要填写密码或md5后的密码


bot.on("system.online", event=>{
  try {
    start.SqlLink.query('SELECT * FROM botserverlist WHERE BotQQ = ? and Flag = 1', [event.self_id], function (err, results, fields) {
        if (results != null && results.length > 0) {
            GroupList = results;
            GroupList.forEach(element => {
              element.Config = JSON.parse(element.Config);
            });
            global.GroupList = GroupList; 
        } else {
            GroupList = [];
            global.GroupList = GroupList;
        }
    });
  }
  catch(e){
    GroupList = [];
    global.GroupList = GroupList;
  }
});



//早安
schedule.scheduleJob({ hour: 8, minute: 30 }, function () {

  logic.hitokoto(bot,{
    "type":"k",
    "Str":"早安,起床啦笨猪!"
  });
});
//午安
schedule.scheduleJob({ hour: 12, minute: 00 }, function () {
  logic.hitokoto(bot,{
    "type":"f",
    "Str":"午安!"
  });
});
//晚安
schedule.scheduleJob({ hour: 23, minute: 59 }, function () {
  logic.hitokoto(bot,{
    "type":"j",
    "Str":"夜深了,晚安!"
  });
});


bot.on("notice.group.increase",function(event){//监控群成员增加
  let message = cqcode.image("./image/tishi.jpg");
  bot.sendGroupMsg(event.group_id,message);
})

socket.on("message", function(data) {
  var data = Buffer.from(data)
  data = data.toString()
  data = JSON.parse(data)
  var Group = global.GroupList;
  //开服监控
  if(data.type == 2011){
    var groupList = bot.gl;
    groupList.forEach((key)=>{
      var IsGroup = Group.filter(function (e) { return e.ServerID == key.group_id });
      if(IsGroup.length>0&&IsGroup!=null&&IsGroup[0].ServerName == data.data.server){
        if (JSON.stringify(data.data.status) == 1) {
          bot.sendGroupMsg(key.group_id,"【" + data.data.server + "】      开服了！大侠快上线吧~~~")
        } else {
          bot.sendGroupMsg(key.group_id,"【" + data.data.server + "】      倒闭了！")
        }
      }
    })
  }
  //新闻资讯
  if(data.type == 2012){
      var groupList = bot.gl;
      groupList.forEach((key)=>{
        bot.sendGroupMsg(key.group_id,"【"+data.data.title+"】\n"+data.data.url+"\n"+data.data.date)
      })
  }
  //奇遇播报
  if(data.type == 2000){
    var groupList = bot.gl;
      groupList.forEach((key)=>{
        var IsGroup = Group.filter(function (e) { return e.ServerID == key.group_id });
        if(IsGroup.length>0&&IsGroup!=null&&IsGroup[0].Config.AdventurePush&&IsGroup[0].ServerName == data.data.server){
          bot.sendGroupMsg(key.group_id,'【'+data.data.server+'】 的 ' + '"'+data.data.name+'" 不经意间出触发了 ' + '"'+data.data.serendipity+'"')
        }
      })
  }
  //马驹刷新
  if(data.type == 2001){
    var groupList = bot.gl;
      groupList.forEach((key)=>{
        var IsGroup = Group.filter(function (e) { return e.ServerID == key.group_id });
        if(IsGroup.length>0&&IsGroup!=null&&IsGroup[0].Config.FoalPush&&IsGroup[0].ServerName == data.data.server){
          bot.sendGroupMsg(key.group_id,'【'+data.data.server+'】 ' + '"'+data.data.map+'" 将在 '+data.data.min+' - '+data.data.max + ' 分钟刷新马驹。');
        }
      })
  }
  //马驹抓捕
  if(data.type == 2002){
    var groupList = bot.gl;
      groupList.forEach((key)=>{
        var IsGroup = Group.filter(function (e) { return e.ServerID == key.group_id });
        if(IsGroup.length>0&&IsGroup!=null&&IsGroup[0].Config.FoalPush&&IsGroup[0].ServerName == data.data.server){
          bot.sendGroupMsg(key.group_id,'【'+data.data.server+'】 ' + data.data.name+'  在  "'+data.data.map+'"   捕捉了   ' + data.data.horse);
        }
      })
  }

  //扶摇开启
  if(data.type == 2003){
    var groupList = bot.gl;
      groupList.forEach((key)=>{
        var IsGroup = Group.filter(function (e) { return e.ServerID == key.group_id });
        if(IsGroup.length>0&&IsGroup!=null&&IsGroup[0].Config.Fuyao&&IsGroup[0].ServerName == data.data.server){
          bot.sendGroupMsg(key.group_id,'【'+data.data.server+'】 的 【扶摇九天】 开启了');
        }
      })
  }
  //扶摇开启
  if(data.type == 2004){
    var groupList = bot.gl;
      groupList.forEach((key)=>{
        var IsGroup = Group.filter(function (e) { return e.ServerID == key.group_id });
        if(IsGroup.length>0&&IsGroup!=null&&IsGroup[0].Config.Fuyao&&IsGroup[0].ServerName == data.data.server){
          var StrName = "《";
          for(var i = 0;i>data.data.name.length;i++){
            StrName += data.data.name[i];
          }
          StrName += "》";
          bot.sendGroupMsg(key.group_id,''+StrName+' 被 【扶摇九天】 点名了');
        }
      })
  }
});

module.exports = bot;

start.bot = bot;
