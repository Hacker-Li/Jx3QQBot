
const { Jx3ApiPOST } = require("../tool/http")
const {createClient, segment, cqcode } = require("oicq");
const fs = require('fs');
var request = require("request");
const start = require("../start")
var edge = require('edge-js');
var url = require("url");
const mysql = require('mysql')
let OSS = require('ali-oss')

// 将数据库附加后添写对应的数据库信息
const connection = mysql.createConnection({
    host: '127.0.0.1',   // 服务器端口
    user: 'user',        // 用户名称
    password: 'password',  // 密码
    database: 'database'         // 连接的数据库
});
connection.connect();  // 启动连接数据库
const addTypeImagesSql = "INSERT INTO keysimages(KeyWord, Url, Flag , CQImages,CreationTime) VALUES(?,?,?,?,?)";

//这里需要填写您的OSS信息
let Ossclient = new OSS({
  region: 'oss-cn-shenzhen',
  accessKeyId: 'accessKeyId',
  accessKeySecret: 'accessKeySecret',
  bucket: 'bucket',
});
//Node.js引用DLL实例
var OnImageFireworks = edge.func({
    assemblyFile: './Dll/ImageFile.dll',
    typeName: 'ImageFile.iMAGEfILE',
    methodName: 'OnImageFireworks'
});
var OnTaixu = edge.func({
    assemblyFile: './Dll/ImageFile.dll',
    typeName: 'ImageFile.iMAGEfILE',
    methodName: 'Taixu'
});
var OnJX3Love = edge.func({
    assemblyFile: './Dll/ImageFile.dll',
    typeName: 'ImageFile.iMAGEfILE',
    methodName: 'OnImageLove'
});

var yc = {
    app:(bot)=>{
        this.bot = bot;

    },
    //日常
    daily: (event, data) => {
        Jx3ApiPOST("/daily", { server: data.server }, (res) => {
            event.reply(res);
        })
    },
    //金价
    demon: (event, data) => {
        Jx3ApiPOST("/demon", { server: data.server }, (res) => {
            event.reply(res);
        })
    },
    //沙盘
    shapan: (event, data) => {
        Jx3ApiPOST("/shapan", { server: data.server }, (data) => {
            var src = data.sand_data.sandImage;
            var t = new Date().getTime();
            var writeStream = fs.createWriteStream("./image/shapan/" + data.server + t + ".jpg");
            var readStream = request(src)
            readStream.pipe(writeStream);

            readStream.on('end', () => {
                console.log('文件下载成功');
            });
            readStream.on('error', function () {
                console.log("错误信息:" + err)
            })
            writeStream.on("finish", () => {
                console.log("文件写入成功");
                writeStream.end();
                let message = cqcode.image("./image/shapan/" + data.server + t + ".jpg");
                event.reply(message)
            });
        })
    },
    qixue: (event, name) => {//奇穴
        Jx3ApiPOST("/qixue", { name: name }, (data) => {
            if("{}" != JSON.stringify(data)){
                let message = cqcode.image(data.all);
                event.reply(message);
            }else{
                event.reply("请检查游戏心法是否正确");
            }
        })
    },
    macro: (event, name) => {
        Jx3ApiPOST("/macro", { name: name }, (data) => {
            event.reply(data);
        })

    },
    price: (event, name) => {
        Jx3ApiPOST("/price", { name: name }, (data) => {
            async function evaluate(data) {
                var dataStr = data;
                const puppeteer = require('puppeteer');
                function isEmptyObject(obj) {

                    for (var key in obj) {
                        if (key) {
                            return true
                        }
                    };
                    return false;
                };
                if (!isEmptyObject(data)) {
                    event.reply("请输入正确的外观名称！")
                    return;
                }
                const browser = await puppeteer.launch({
                    headless: true, defaultViewport: {
                        width: 1000,
                        height: 800,
                    },
                });
                const page = await browser.newPage();
                await page.goto("http://127.0.0.1/resources/html/itemprice.html", {
                    waitUntil: 'networkidle0'
                });
                await page.evaluate((data) => {
                    handle(data)
                }, data)
                setTimeout(async () => {
                    let clip = await page.evaluate(() => {
                        let {
                            x,
                            y,
                            width,
                            height
                        } = document.getElementById('main').getBoundingClientRect();
                        return {
                            x,
                            y,
                            width,
                            height
                        };

                    });
                    await page.screenshot({
                        path: 'evaluate.png',
                        clip: clip
                    });
                    let message = cqcode.image("evaluate.png");
                    event.reply(message)
                }, 1000);
            }
            evaluate(data);
        })

    },
    //物价直接接受图片
    priceImage: (event, data) => {
        Jx3ApiPOST("/priceimage", { data }, (res) => {
            if ("{}" != JSON.stringify(res)) {
                console.log("当前外观地址")
                console.log(res.url)
                let message = cqcode.image(res.url);
                event.reply(message);
            } else {
                event.reply("找不到相应信息，请输入正确的外观名称！");
            }
        })
    },
    //推器物谱
    travel: (event, name) => {
        Jx3ApiPOST("/travel", { name: name }, (data) => {
            event.reply(data);
        })
    },
    AnAdventurePrint: (event, data) => {//奇遇
        Jx3ApiPOST("/serendipity", { server: data.server, name: data.name }, (res) => {
            if (res != null && res != {}) {
                var s = {
                    "ImageUrl": "",
                    "UserName": data.name,
                    "Server": data.server,
                    "Data": [
                    ]
                };
                for (var i = 0; i < res.length; i++) {
                    s.Data.push({
                        "serendipity": res[i].serendipity,
                        "time": res[i].time == 0 ? "946656000" : res[i].time
                    });
                }
                var ResData = JSON.stringify(s);
                OnImageRender(ResData, function (error, result) {
                    if (error) throw event.reply(error);
                    const base64 = result;
                    const dataBuffer = new Buffer.from(base64, 'base64');
                    fs.writeFile('./image/shapan/code.png', dataBuffer, function (finish) {
                        if (finish) {
                            let message = cqcode.image("./image/shapan/code.png");
                            event.reply(message)
                        } else {
                            console.log('写入成功！');
                            let message = cqcode.image("./image/shapan/code.png");
                            event.reply(message)
                        }
                    })
                });
            }
        })
    },
    strategy:(event, data) => {//攻略
        Jx3ApiPOST("/strategy", { data }, (res) => {
            if ("{}" != JSON.stringify(res)) {
                let message = cqcode.image(res.url);
                event.reply(message);
            } else {
                event.reply("找不到攻略相应信息！");
            }
        })
    },
    flower: (event, data) => {
        Jx3ApiPOST("/flower", { data }, (res) => {
            if ("{}" != JSON.stringify(res)) {
                event.reply(res);
            } else {
                event.reply("找不到花价相应信息！");
            }
        })
    },
    SerendipityInfo: (event, data) => {//查询已生成好的进度
        Jx3ApiPOST("/serendipityInfo", { data }, (res) => {
            if ("{}" != JSON.stringify(res)) {
                let message = cqcode.image(res.url);
                event.reply(message);
            } else {
                event.reply("找不到奇遇相应信息，请确认是否开启分享或者无奇遇！");
            }
        })
    },
    Nlpchat: (event, data) => {//智能聊天
        if (data.question.indexOf("狗蛋") != -1) {
            Jx3ApiPOST("/nlpchat", { data }, (res) => {
                var ChatStr = res.answer;
                event.reply(ChatStr);
            })
        } else {
            if (Math.floor(Math.random() * 300) == 1) {
                Jx3ApiPOST("/nlpchat", { data }, (res) => {
                    event.reply(res.answer);
                })
            }
        }
    },
    Random: (event, data) => {//舔狗日记
        Jx3ApiPOST("/random", { data }, (res) => {
            event.reply(res.text);
        })
    },
    RandomS: (event, data) => {//骚话
        Jx3ApiPOST("/randoms", { data }, (res) => {
            event.reply(res.text);
        })
    },
    Attribute: (event, data) => {//属性
        Jx3ApiPOST("/attribute", { data }, (res) => {
            if ("{}" != JSON.stringify(res)) {
                let message = cqcode.image(res.url);
                event.reply(message);
            } else {
                event.reply("找不到相应信息，请确认是否开启分享！");
            }
        })
    },
    History: (event, data) => {//战绩
        Jx3ApiPOST("/history", { data }, (res) => {
            if ("{}" != JSON.stringify(res)) {
                let message = cqcode.image(res.url);
                event.reply(message);
            } else {
                event.reply("找不到相应信息，请确认是否开启分享！");
            }
        })
    },
    TeamCdList: (event, data) => {//副本CD
        Jx3ApiPOST("/teamCdList", { data }, (res) => {
            if ("{}" != JSON.stringify(res)) {
                let message = cqcode.image(res.url);
                event.reply(message);
            } else {
                event.reply("找不到副本相应信息，请确认是否开启分享或者无CD！");
            }
        })
    },
    UpdateAnnouncement: (event, data) => {//更新公告
        Jx3ApiPOST("/updateannouncement", { data }, (res) => {
            if ("{}" != JSON.stringify(res)) {
                let message = cqcode.image(res.url);
                event.reply(message);
            } else {
                event.reply("没有！");
            }
        })
    },
    check: (event, data) => {//检查开服状态
        Jx3ApiPOST("/check", { data }, (res) => {
            var str = res.status == 0?"倒闭了":"开服了";
            event.reply("服务器：【"+res.server+"】\n状态："+str+"");
        })
    },
    achievement: (event, data) => {//成就进度
        Jx3ApiPOST("/achievement", { data }, (res) => {
            if ("{}" != JSON.stringify(res)) {
                setTimeout(function(){
                    let message = cqcode.image(res.url);
                    event.reply(message);
                },1000 * 5);
            } else {
                event.reply("没有！");
            }
        })
    },
    Fireworks: (event, data) => {//烟花记录
        Jx3ApiPOST("/fireworks", { data }, (res) => {
            if ("[]" != JSON.stringify(res)) {
                console.log("烟花记录为：")
                var ResData = JSON.stringify(res);
                console.log(ResData)
                OnImageFireworks(ResData, function (error, result) {
                    if (error) throw event.reply(error);
                    const base64 = result;
                    const dataBuffer = new Buffer.from(base64, 'base64');
                    fs.writeFile('./image/shapan/code.png', dataBuffer, function (finish) {
                        if (finish) {
                            let message = cqcode.image("./image/shapan/code.png");
                            event.reply(message)
                        } else {
                            console.log('写入成功！');
                            let message = cqcode.image("./image/shapan/code.png");
                            event.reply(message)
                        }
                    })
                });
            } else {
                event.reply("【"+data.server+"】  的 " + data.name +" 是个寡王没有烟花记录");
            }
        })
    },
    TaiXu: (event, data) => {//剑纯日记
        OnTaixu(data, function (error, result) {
                    if (error) throw event.reply(error);
                    console.log(result);
                    const base64 = result;
                    const dataBuffer = new Buffer.from(base64, 'base64');
                    fs.writeFile('./image/shapan/code.png', dataBuffer, function (finish) {
                        if (finish) {
                            let message = cqcode.image("./image/shapan/code.png");
                            event.reply(message)
                        } else {
                            console.log('写入成功！');
                            let message = cqcode.image("./image/shapan/code.png");
                            event.reply(message)
                        }
                    })
                });
        
    },
    hitokoto: (event, data) => {//一言
        Jx3ApiPOST("/hitokoto", { data }, (res) => {
            if(data.Str==null){
                event.reply(res.hitokoto + "        <"+res.from+"> "+(res.from_who==null?"":res.from_who));
            }else{
                var groupList = start.bot.gl;
                var Group = global.GroupList;
                groupList.forEach((key)=>{
                    var groupServer = Group.filter(function (e) { return e.ServerID == key.group_id; });
                    if(groupServer.length > 0 && groupServer != null && groupServer[0].Config.DailyGreetings){
                        start.bot.sendGroupMsg(key.group_id,res.hitokoto + "        <"+res.from+"> "+(res.from_who==null?"":res.from_who)+(data.Str==null?"":"        "+data.Str));
                    }
                });
            }
        })
    },
    Eat:(event, data) => {//吃什么
        var EatList = ["肉丝拉皮","手撕羊肉","孜然羊肉","酸辣土豆丝","青蔬丸子汤","章鱼小丸子","酱肘子","煲仔饭","水饺","过桥米线","披萨","馄饨","拉面","烩面","热干面","刀削面","油泼面","炸酱面","炒面","重庆小面","酸辣粉","土豆粉","螺狮粉","凉皮儿","麻辣烫","肉夹馍","羊肉汤","炒饭","盖浇饭","卤肉饭","烤肉饭","黄焖鸡米饭","驴肉火烧","麻辣香锅","火锅","酸菜鱼","烤串","烤鸭","汉堡","炸鸡","寿司","蟹黄包","粽子","煎饼果子","生煎","炒年糕"];
        function getRandomArrayElements(arr, count) {
            var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
            while (i-- > min) {
                index = Math.floor((i + 1) * Math.random());
                temp = shuffled[index];
                shuffled[index] = shuffled[i];
                shuffled[i] = temp;
            }
            return shuffled.slice(min);
        }
        var item = getRandomArrayElements(EatList, 3)
        event.reply("今天吃什么，我来给你建议（三选一）：\n1-》"+item[0] +"\n2-》"+item[1]+"\n3-》"+item[2]);
    },
    Drink:(event, data) => {//喝什么
        var EatList = [
        "星巴克-星冰乐",
        "星巴克-手摇柠檬茶",
        "星巴克-拿铁咖啡",
        "桂源铺-冻柠茶",
        "一点点-阿华田",
        "一点点-四季奶青",
        "一点点-四季奶青",
        "一点点-乌龙奶茶",
        "一点点-红茶玛奇朵",
        "一点点-阿华田",
        "一点点-可可奶茶",
        "一点点-焦糖奶茶",
        "一点点-抹茶奶茶",
        "一点点-冰淇淋红茶",
        "奈雪の茶-芝士奈雪初露",
        "奈雪の茶-芝士茉莉初雪",
        "瑞幸-厚乳拿铁",
        "瑞幸-陨石拿铁",
        "瑞幸-生椰拿铁",
        "伏小桃-超浓郁豆乳麻薯奶茶",
        "伏小桃-乌龙嬷嬷",
        "阿姨奶茶-血糯米奶茶",
        "好淳朴一奶茶",
        "茉沏一芝士蜜瓜",
        "七分甜-芒果西米露",
        "七分甜-杨枝甘露",
        "快乐柠檬-蛋糕忌廉珍珠奶茶",
        "快乐柠檬-岩盐芝士可可",
        "Coco-鲜百香双响炮",
        "茶颜悦色-桂花弄",
        "茶颜悦色-声声乌龙",
        "茶颜悦色-幽兰拿铁",
        "茶颜悦色-人间烟火",
        "茶颜悦色-不知冬",
        "柠季-手打柠檬茶",
        "茶百道-杨枝甘露",
        "茶百道-超级杯水果茶",
        "茶百道-生椰大满贯",
        "蜜雪冰城-外婆烧仙草",
        "蜜雪冰城-柠檬水",
        "蜜雪冰城-芝士奶盖红茶",
        "蜜雪冰城-芝士奶盖四季春",
        "蜜雪冰城-蜜桃四季春",
        "DQ-浓郁草莓奶昔",
        "茶满满-芋圆芋泥白芽奶绿",
        "山东特饮-阿水大杯茶",
        "农工商超市-冰可乐",
        "农工商超市-茉莉清茶",
        "农工商超市-茉莉蜜茶",
        "农工商超市-蜜桃乌龙茶",
        "别喝奶茶-健康白开水",
        "三得利-乌龙茶",
        "三得利-沁柠水",
        "UCC-职人の咖啡",
        "QQㄋㄟㄋㄟ好喝到咩噗茶"
    ];
        function getRandomArrayElements(arr, count) {
            var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
            while (i-- > min) {
                index = Math.floor((i + 1) * Math.random());
                temp = shuffled[index];
                shuffled[index] = shuffled[i];
                shuffled[i] = temp;
            }
            return shuffled.slice(min);
        }
        var item = getRandomArrayElements(EatList, 3)
        event.reply("今天喝什么，我来给你建议（三选一）：\n1-》"+item[0] +"\n2-》"+item[1]+"\n3-》"+item[2]);
    },
    FullServiceNotice: (event, data) => {//全服公告
        var groupList = start.bot.gl;
        groupList.forEach((key)=>{
            start.bot.sendGroupMsg(key.group_id,data)
        })
    },
    Recall: (event, data) => {//全服公告
        
        
    },
    AddKeyImage:(event, data) => {//依旧指令相应对应的图片
        var ImageUrl = event.raw_message.split("url=")[1];
        ImageUrl = ImageUrl.substr(0, ImageUrl.length - 1);
        var date = new Date((new Date()).getTime())
        Y = date.getFullYear() + '_';
        M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '_';
        D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '_';
        h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + '_';
        m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + '_';
        s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        let filename =  event.group_id + "_" + event.user_id + "-" + Y + M + D + h + m + s + `.png`;
        request(ImageUrl).pipe(fs.createWriteStream("./image/KeyImages/" + filename)).on("close", async function (err) {
            let result = await Ossclient.put(data.ImageType+"/"+filename, "./image/KeyImages/"+filename);
            connection.query(addTypeImagesSql,[data.ImageType,result.url,1,event.raw_message.split("url=")[1],new Date()],function(err,res){
                let message = cqcode.image(ImageUrl);
                event.reply("图片上传成功\n上传标识:"+res.insertId+"\n上传地址:"+result.url+"\n上传条目："+res.affectedRows+"\n上传类别："+data.ImageType+"\n"+message);
            });
        });
        
    },
    OnKeyImage: (event, data) => {//依旧指令发送对应的图片
        try {
            connection.query('SELECT * FROM keysimages WHERE keyword = ? and keyword != "" and Flag = 1 order by rand() LIMIT 1', [data.MsgType], function (err, results, fields) {
                if (results != null && results.length > 0) {
                    let message = cqcode.image(results[0].Url);
                    event.reply(message)
                } else {
                    module.exports.Nlpchat(event, {
                        secretId: "AKIDc8sVsB77pRzgDdmIXwNq10rWknf4Nepp",
                        secretKey: "57g9cueGqpJRdklfVEpK2a21xlOTYSDg",
                        name: "狗蛋",
                        question: data.MsgType
                    })
                }
            });
        } catch (error) {
            console.log(error)
        }
    },
    BindLove: (event, data) => {//绑定情缘
        try {
            console.log(data)
            if (data.BindersName != null && data.BoundPersonName != null && data.BindersTime != null&& typeof(data.BindersName) != "undefined" && typeof(data.BoundPersonName) != "undefined" && typeof(data.BindersTime) != "undefined") {
                connection.query('SELECT * FROM jx3love WHERE BindersUserID = ?', [event.user_id], function (err, results, fields) {
                    if (results != null && results.length > 0) {
                        event.reply("《中华人民共和国刑法》第二百五十八条规定，重婚罪指有配偶而重婚的，或者明知他人有配偶而与之结婚的，处二年以下有期徒刑或者拘役。")
                    } else {
                        data.BindersTime = data.BindersTime.replace(/-/g, '/'); // "2010/08/01";
                        connection.query("insert into jx3love(BindersName,BoundPersonName,BindersTime,BindersUserID,CreationTime) values(?,?,?,?,?)", [data.BindersName, data.BoundPersonName, new Date(data.BindersTime), event.user_id.toString(), new Date()], function (err, res) {
                            if (err != null) {
                                console.log(err)
                            } else {
                                event.reply("情缘创建成功")
                            }
                        });
                    }
                });
            }
            else {
                event.reply("指令错误!")
            }
        } catch (error) {
            console.log(error)
        }
    },
    DelLove: (event, data) => {//绑定情缘
        try {
            connection.query('delete from jx3love WHERE BindersUserID = ?', [event.user_id], function (err, results, fields) {
                if (results != null && results. affectedRows > 0) {
                    event.reply("解绑成功")
                } else {

                }
            });
        } catch (error) {
            console.log(error)
        }
    },
    OnLove: (event, data) => {//我的情缘
        try {
            connection.query('SELECT * FROM jx3love WHERE BindersUserID = ?', [event.user_id], function (err, results, fields) {
                if (results != null && results.length > 0) {
                    // 日期格式化
                    Date.prototype.format = function (fmt) {
                        var o = {
                            "M+": this.getMonth() + 1,                 //月份 
                            "d+": this.getDate(),                    //日 
                            "h+": this.getHours(),                   //小时 
                            "m+": this.getMinutes(),                 //分 
                            "s+": this.getSeconds(),                 //秒 
                            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
                            "S": this.getMilliseconds()             //毫秒 
                        };
                        if (/(y+)/.test(fmt)) {
                            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                        }
                        for (var k in o) {
                            if (new RegExp("(" + k + ")").test(fmt)) {
                                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                            }
                        }
                        return fmt;
                    }
                    console.log(results)
                    var ResData = JSON.stringify({
                        BindersName: results[0].BindersName,
                        BoundPersonName: results[0].BoundPersonName,
                        BindersTime: results[0].BindersTime.format("yyyy-MM-dd hh:mm:ss")
                    });
                    console.log(ResData)
                    OnJX3Love(ResData, function (error, result) {
                        if (error) throw event.reply(error);
                        const base64 = result;
                        const dataBuffer = new Buffer.from(base64, 'base64');
                        fs.writeFile('./image/JX3Love/JX3love.jpg', dataBuffer, function (finish) {
                            if (finish) {
                                let message = cqcode.image("./image/JX3Love/JX3love.jpg");
                                event.reply(message)
                            } else {
                                console.log('写入成功！');
                                let message = cqcode.image("./image/JX3Love/JX3love.jpg");
                                event.reply(message)
                            }
                        })
                    });
                } else {
                    event.reply("孤寡孤寡孤寡孤寡孤寡孤寡!")
                }
            });
        } catch (error) {
            console.log(error)
        }
    },
    SignIn: (event, data) => {//签到
        try {
            console.log(start.bot.gml)
        } catch (error) {
            console.log(error)
        }
    },
    RightRaising: (event, data) => {//权限赋予（提权）
        try {
            event.reply("开始进行授权------请稍后......")
            if(data.Power == "all"){//全部
                connection.query('SELECT * FROM botserverlist WHERE ServerID = ?', [event.group_id], function (err, results, fields) {
                    const InsertAndUpdateStr = {
                        Daily : true,//日常
                        Demon : true,//金价
                        ShaPan : true,//沙盘
                        QiXue : true,//奇穴
                        Macro : true,//宏
                        Travel : true,//器物谱
                        PriceImage : true,//物价
                        AnAdventurePrint : true,//奇遇
                        Strategy : true,//攻略
                        SerendipityInfo : true,//查询
                        RandomS : true,//骚话
                        Random : true,//舔狗日记
                        Attribute : true,//属性
                        TeamCdList : true,//副本
                        History : true,//战绩
                        UpdateAnnouncement : true,//更新公告
                        Flower : true,//花价
                        Check : true,//开服
                        Achievement : true,//成就进度
                        Fireworks : true,//烟花
                        Eat : true,//吃什么
                        Drink : true,//喝什么
                        Hitokoto : true,//一言
                        TaiXu : true,//剑纯几日
                        BindLove : true,//绑定情缘
                        DelLove : true,//删除情缘
                        OnLove : true,//我的情缘
                        AddKeyImage : true,//上传图片功能
                        DailyGreetings:true,//每日问候
                        AdventurePush:true,//奇遇推送
                        FoalPush:true,//马驹推送
                        Fuyao:true,//扶摇推送
                    }
                    if (results != null && results.length > 0) {
                        connection.query('UPDATE botserverlist SET Config = ?,ServerName = ?,BotQQ = ? WHERE ServerID = ?', [JSON.stringify(InsertAndUpdateStr),data.Server,event.self_id,event.group_id], function (err, results, fields) {
                            if(err){
                                event.reply(err)
                            }else{
                                connection.query('SELECT * FROM botserverlist WHERE BotQQ = ? and Flag = 1 ', [event.self_id], function (err, results, fields) {
                                    if (results != null && results.length > 0) {
                                        var GroupList = results;
                                        GroupList.forEach(element => {
                                          element.Config = JSON.parse(element.Config);
                                        });
                                        global.GroupList = GroupList;
                                        event.reply('抓马、奇遇、扶摇以及查询功能开启成功！');
                                    } else {
                                    }
                                });              
                            }
                        });
                    }else{
                        connection.query('insert into botserverlist(ServerName,ServerID,BotQQ,Flag,Config,CreationTime) VALUES(?,?,?,?,?,?)', [data.Server,event.group_id,event.self_id,1,JSON.stringify(InsertAndUpdateStr),new Date()], function (err, results, fields) {
                            if(err){
                                event.reply(err)
                            }else{
                                connection.query('SELECT * FROM botserverlist WHERE BotQQ = ? and Flag = 1', [event.self_id], function (err, results, fields) {
                                    if (results != null && results.length > 0) {
                                        var GroupList = results;
                                        GroupList.forEach(element => {
                                          element.Config = JSON.parse(element.Config);
                                        });
                                        global.GroupList = GroupList;
                                        event.reply('抓马、奇遇、扶摇以及查询功能开启成功！');
                                    } else {
                                    }
                                });                             
                            }
                        });
                    }
                });
            }else if(data.Power == "select"){//查询
                connection.query('SELECT * FROM botserverlist WHERE ServerID = ?', [event.group_id], function (err, results, fields) {
                    const InsertAndUpdateStr = {
                        Daily : true,//日常
                        Demon : true,//金价
                        ShaPan : true,//沙盘
                        QiXue : true,//奇穴
                        Macro : true,//宏
                        Travel : true,//器物谱
                        PriceImage : true,//物价
                        AnAdventurePrint : true,//奇遇
                        Strategy : true,//攻略
                        SerendipityInfo : true,//查询
                        RandomS : true,//骚话
                        Random : true,//舔狗日记
                        Attribute : true,//属性
                        TeamCdList : true,//副本
                        History : true,//战绩
                        UpdateAnnouncement : true,//更新公告
                        Flower : true,//花价
                        Check : true,//开服
                        Achievement : true,//成就进度
                        Fireworks : true,//烟花
                        Eat : true,//吃什么
                        Drink : true,//喝什么
                        Hitokoto : true,//一言
                        TaiXu : true,//剑纯几日
                        BindLove : true,//绑定情缘
                        DelLove : true,//删除情缘
                        OnLove : true,//我的情缘
                        AddKeyImage : true,//上传图片功能
                    }
                    if (results != null && results.length > 0) {
                        connection.query('UPDATE botserverlist SET Config = ? , ServerName = ?,BotQQ = ? WHERE ServerID = ?', [JSON.stringify(InsertAndUpdateStr),data.Server,event.self_id,event.group_id], function (err, results, fields) {
                            if(err){
                                event.reply(err)
                            }else{
                                connection.query('SELECT * FROM botserverlist WHERE BotQQ = ? and Flag = 1', [event.self_id], function (err, results, fields) {
                                    if (results != null && results.length > 0) {
                                        var GroupList = results;
                                        GroupList.forEach(element => {
                                          element.Config = JSON.parse(element.Config);
                                        });
                                        global.GroupList = GroupList;
                                        event.reply('查询功能开启成功！');
                                    } else {
                                    }
                                });                               
                            }
                        });
                    }else{
                        connection.query('insert into botserverlist(ServerName,ServerID,BotQQ,Flag,Config,CreationTime) VALUES(?,?,?,?,?,?)', [data.Server,event.group_id,event.self_id,1,JSON.stringify(InsertAndUpdateStr),new Date()], function (err, results, fields) {
                            if(err){
                                event.reply(err)
                            }else{
                                connection.query('SELECT * FROM botserverlist WHERE BotQQ = ? and Flag = 1', [event.self_id], function (err, results, fields) {
                                    if (results != null && results.length > 0) {
                                        var GroupList = results;
                                        GroupList.forEach(element => {
                                          element.Config = JSON.parse(element.Config);
                                        });
                                        global.GroupList = GroupList;
                                        event.reply('查询功能开启成功！');
                                    } else {
                                    }
                                });                                
                            }
                        });
                    }
                });
            }else if(data.Power == "fuyao"){//扶摇
                connection.query('SELECT * FROM botserverlist WHERE ServerID = ?', [event.group_id], function (err, results, fields) {
                    const InsertAndUpdateStr = {
                        Daily : true,//日常
                        Demon : true,//金价
                        ShaPan : true,//沙盘
                        QiXue : true,//奇穴
                        Macro : true,//宏
                        Travel : true,//器物谱
                        PriceImage : true,//物价
                        AnAdventurePrint : true,//奇遇
                        Strategy : true,//攻略
                        SerendipityInfo : true,//查询
                        RandomS : true,//骚话
                        Random : true,//舔狗日记
                        Attribute : true,//属性
                        TeamCdList : true,//副本
                        History : true,//战绩
                        UpdateAnnouncement : true,//更新公告
                        Flower : true,//花价
                        Check : true,//开服
                        Achievement : true,//成就进度
                        Fireworks : true,//烟花
                        Eat : true,//吃什么
                        Drink : true,//喝什么
                        Hitokoto : true,//一言
                        TaiXu : true,//剑纯几日
                        BindLove : true,//绑定情缘
                        DelLove : true,//删除情缘
                        OnLove : true,//我的情缘
                        AddKeyImage : true,//上传图片功能
                        Fuyao:true,//扶摇推送
                    }
                    if (results != null && results.length > 0) {
                        connection.query('UPDATE botserverlist SET Config = ? , ServerName = ?,BotQQ = ? WHERE ServerID = ?', [JSON.stringify(InsertAndUpdateStr),data.Server,event.self_id,event.group_id], function (err, results, fields) {
                            if(err){
                                event.reply(err)
                            }else{
                                connection.query('SELECT * FROM botserverlist WHERE BotQQ = ? and Flag = 1', [event.self_id], function (err, results, fields) {
                                    if (results != null && results.length > 0) {
                                        var GroupList = results;
                                        GroupList.forEach(element => {
                                          element.Config = JSON.parse(element.Config);
                                        });
                                        global.GroupList = GroupList;
                                        event.reply('扶摇以及查询功能开启成功！');
                                    } else {
                                    }
                                });                               
                            }
                        });
                    }else{
                        connection.query('insert into botserverlist(ServerName,ServerID,BotQQ,Flag,Config,CreationTime) VALUES(?,?,?,?,?,?)', [data.Server,event.group_id,event.self_id,1,JSON.stringify(InsertAndUpdateStr),new Date()], function (err, results, fields) {
                            if(err){
                                event.reply(err)
                            }else{
                                connection.query('SELECT * FROM botserverlist WHERE BotQQ = ? and Flag = 1', [event.self_id], function (err, results, fields) {
                                    if (results != null && results.length > 0) {
                                        var GroupList = results;
                                        GroupList.forEach(element => {
                                          element.Config = JSON.parse(element.Config);
                                        });
                                        global.GroupList = GroupList;
                                        event.reply('扶摇以及查询功能开启成功！');
                                    } else {
                                    }
                                });                                
                            }
                        });
                    }
                });
            }else if(data.Power == "anadventure"){//奇遇
                connection.query('SELECT * FROM botserverlist WHERE ServerID = ?', [event.group_id], function (err, results, fields) {
                    const InsertAndUpdateStr = {
                        Daily : true,//日常
                        Demon : true,//金价
                        ShaPan : true,//沙盘
                        QiXue : true,//奇穴
                        Macro : true,//宏
                        Travel : true,//器物谱
                        PriceImage : true,//物价
                        AnAdventurePrint : true,//奇遇
                        Strategy : true,//攻略
                        SerendipityInfo : true,//查询
                        RandomS : true,//骚话
                        Random : true,//舔狗日记
                        Attribute : true,//属性
                        TeamCdList : true,//副本
                        History : true,//战绩
                        UpdateAnnouncement : true,//更新公告
                        Flower : true,//花价
                        Check : true,//开服
                        Achievement : true,//成就进度
                        Fireworks : true,//烟花
                        Eat : true,//吃什么
                        Drink : true,//喝什么
                        Hitokoto : true,//一言
                        TaiXu : true,//剑纯几日
                        BindLove : true,//绑定情缘
                        DelLove : true,//删除情缘
                        OnLove : true,//我的情缘
                        AddKeyImage : true,//上传图片功能
                        DailyGreetings:true,//每日问候
                        AdventurePush:true,//奇遇推送
                        Fuyao:true,//扶摇推送
                    }
                    if (results != null && results.length > 0) {
                        connection.query('UPDATE botserverlist SET Config = ? , ServerName = ?,BotQQ = ? WHERE ServerID = ?', [JSON.stringify(InsertAndUpdateStr),data.Server,event.self_id,event.group_id], function (err, results, fields) {
                            if(err){
                                event.reply(err)
                            }else{
                                connection.query('SELECT * FROM botserverlist WHERE BotQQ = ? and Flag = 1', [event.self_id], function (err, results, fields) {
                                    if (results != null && results.length > 0) {
                                        var GroupList = results;
                                        GroupList.forEach(element => {
                                          element.Config = JSON.parse(element.Config);
                                        });
                                        global.GroupList = GroupList;
                                        event.reply('奇遇、扶摇以及查询功能开启成功！');
                                    } else {
                                    }
                                });                               
                            }
                        });
                    }else{
                        connection.query('insert into botserverlist(ServerName,ServerID,BotQQ,Flag,Config,CreationTime) VALUES(?,?,?,?,?,?)', [data.Server,event.group_id,event.self_id,1,JSON.stringify(InsertAndUpdateStr),new Date()], function (err, results, fields) {
                            if(err){
                                event.reply(err)
                            }else{
                                connection.query('SELECT * FROM botserverlist WHERE BotQQ = ? and Flag = 1', [event.self_id], function (err, results, fields) {
                                    if (results != null && results.length > 0) {
                                        var GroupList = results;
                                        GroupList.forEach(element => {
                                          element.Config = JSON.parse(element.Config);
                                        });
                                        global.GroupList = GroupList;
                                        event.reply('奇遇、扶摇以及查询功能开启成功！');
                                    } else {
                                    }
                                });                                
                            }
                        });
                    }
                });
            }else if(data.Power == "foal"){//抓马
                connection.query('SELECT * FROM botserverlist WHERE ServerID = ?', [event.group_id], function (err, results, fields) {
                    const InsertAndUpdateStr = {
                        Daily : true,//日常
                        Demon : true,//金价
                        ShaPan : true,//沙盘
                        QiXue : true,//奇穴
                        Macro : true,//宏
                        Travel : true,//器物谱
                        PriceImage : true,//物价
                        AnAdventurePrint : true,//奇遇
                        Strategy : true,//攻略
                        SerendipityInfo : true,//查询
                        RandomS : true,//骚话
                        Random : true,//舔狗日记
                        Attribute : true,//属性
                        TeamCdList : true,//副本
                        History : true,//战绩
                        UpdateAnnouncement : true,//更新公告
                        Flower : true,//花价
                        Check : true,//开服
                        Achievement : true,//成就进度
                        Fireworks : true,//烟花
                        Eat : true,//吃什么
                        Drink : true,//喝什么
                        Hitokoto : true,//一言
                        TaiXu : true,//剑纯几日
                        BindLove : true,//绑定情缘
                        DelLove : true,//删除情缘
                        OnLove : true,//我的情缘
                        AddKeyImage : true,//上传图片功能
                        DailyGreetings:true,//每日问候
                        FoalPush:true,//马驹推送
                    }
                    if (results != null && results.length > 0) {
                        connection.query('UPDATE botserverlist SET Config = ? , ServerName = ?,BotQQ = ? WHERE ServerID = ?', [JSON.stringify(InsertAndUpdateStr),data.Server,event.self_id,event.group_id], function (err, results, fields) {
                            if(err){
                                event.reply(err)
                            }else{
                                connection.query('SELECT * FROM botserverlist WHERE BotQQ = ? and Flag = 1', [event.self_id], function (err, results, fields) {
                                    if (results != null && results.length > 0) {
                                        var GroupList = results;
                                        GroupList.forEach(element => {
                                          element.Config = JSON.parse(element.Config);
                                        });
                                        global.GroupList = GroupList;
                                        event.reply('抓马以及查询功能开启成功！');
                                    } else {
                                    }
                                });                               
                            }
                        });
                    }else{
                        connection.query('insert into botserverlist(ServerName,ServerID,BotQQ,Flag,Config,CreationTime) VALUES(?,?,?,?,?,?)', [data.Server,event.group_id,event.self_id,1,JSON.stringify(InsertAndUpdateStr),new Date()], function (err, results, fields) {
                            if(err){
                                event.reply(err)
                            }else{
                                connection.query('SELECT * FROM botserverlist WHERE BotQQ = ? and Flag = 1', [event.self_id], function (err, results, fields) {
                                    if (results != null && results.length > 0) {
                                        var GroupList = results;
                                        GroupList.forEach(element => {
                                          element.Config = JSON.parse(element.Config);
                                        });
                                        global.GroupList = GroupList;
                                        event.reply('抓马以及查询功能开启成功！');
                                    } else {
                                    }
                                });                                
                            }
                        });
                    }
                });
            }else if(data.Power == "close"){//关闭功能
                connection.query('SELECT * FROM botserverlist WHERE ServerID = ?', [event.group_id], function (err, results, fields) {
                    const InsertAndUpdateStr = {
                    }
                    if (results != null && results.length > 0) {
                        connection.query('UPDATE botserverlist SET Config = ? , ServerName = ?,BotQQ = ? WHERE ServerID = ?', [JSON.stringify(InsertAndUpdateStr),data.Server,event.self_id,event.group_id], function (err, results, fields) {
                            if(err){
                                event.reply(err)
                            }else{
                                connection.query('SELECT * FROM botserverlist WHERE BotQQ = ? and Flag = 1', [event.self_id], function (err, results, fields) {
                                    if (results != null && results.length > 0) {
                                        var GroupList = results;
                                        GroupList.forEach(element => {
                                          element.Config = JSON.parse(element.Config);
                                        });
                                        global.GroupList = GroupList;
                                        event.reply('机器人成功进入了混吃等死状态！');
                                    } else {
                                    }
                                });                               
                            }
                        });
                    }else{
                        connection.query('insert into botserverlist(ServerName,ServerID,BotQQ,Flag,Config,CreationTime) VALUES(?,?,?,?,?,?)', [data.Server,event.group_id,event.self_id,1,JSON.stringify(InsertAndUpdateStr),new Date()], function (err, results, fields) {
                            if(err){
                                event.reply(err)
                            }else{
                                connection.query('SELECT * FROM botserverlist WHERE BotQQ = ? and Flag = 1', [event.self_id], function (err, results, fields) {
                                    if (results != null && results.length > 0) {
                                        var GroupList = results;
                                        GroupList.forEach(element => {
                                          element.Config = JSON.parse(element.Config);
                                        });
                                        global.GroupList = GroupList;
                                        event.reply('机器人成功进入了混吃等死状态！');
                                    } else {
                                    }
                                });                                
                            }
                        });
                    }
                });
            }
        } catch (error) {
            event.reply(error)
        }
    },
}
module.exports = yc;
start.SqlLink = connection;