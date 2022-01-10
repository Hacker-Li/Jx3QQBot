const logic = require("../logic/logic")
const { createClient, segment, cqcode } = require("oicq");
const request = require("request");
const fs = require("fs");
let ChatData = [];
let ChatStr = [];

var qqQUN = function (event, server, GroupDataList) {
    try {
        //console.log("QQ群名称："+event.group_name + "\nQQ群号："+event.group_id+"\n用户名称："+event.sender.nickname+"\n用户QQ号："+event.user_id+"\n消息内容："+event.raw_message+"\n---------------------------------")
        var timestamp = new Date();
        var msg = event.raw_message.split(/       |      |     |    |   |  | /);
        if (msg == "RightRaising" || msg[0] == "RightRaising") {
            logic.RightRaising(event, {
                Power: msg[1],
                Server: msg[2],
                ServerList: GroupDataList
            })
        }
        else if (typeof (GroupDataList) != "undefined" && (typeof (GroupDataList.Config.Daily) != "undefined" && GroupDataList.Config.Daily != null) && (msg == "日常" || msg[0] == "日常")) {
            logic.daily(event, msg[1] == null ? { server: GroupDataList.ServerName } : { server: msg[1] })
        }
        else if (typeof (GroupDataList) != "undefined" && (typeof (GroupDataList.Config.Demon) != "undefined" && GroupDataList.Config.Demon != null) && (msg == "金价" || msg[0] == "金价")) {
            logic.demon(event, msg[1] == null ? { server: GroupDataList.ServerName } : { server: msg[1] })
        }
        else if (typeof (GroupDataList) != "undefined" && (typeof (GroupDataList.Config.ShaPan) != "undefined" && GroupDataList.Config.ShaPan != null) && (msg == "沙盘" || msg[0] == "沙盘")) {
            logic.shapan(event, msg[1] == null ? { server: GroupDataList.ServerName } : { server: msg[1] })
        }
        else if (typeof (GroupDataList) != "undefined" && (typeof (GroupDataList.Config.QiXue) != "undefined" && GroupDataList.Config.QiXue != null) && (msg == "奇穴" || msg[0] == "奇穴")) {
            logic.qixue(event, msg[1])
        }
        else if (typeof (GroupDataList) != "undefined" && (typeof (GroupDataList.Config.Macro) != "undefined" && GroupDataList.Config.Macro != null) && (msg == "宏" || msg[0] == "宏")) {
            logic.macro(event, msg[1])
        }
        else if (typeof (GroupDataList) != "undefined" && (GroupDataList.Config.Travel != null && typeof (GroupDataList.Config.Travel) != "undefined") && (msg == "器物谱" || msg[0] == "器物谱")) {
            logic.travel(event, msg[1])
        }
        else if (typeof (GroupDataList) != "undefined" && (GroupDataList.Config.PriceImage != null && typeof (GroupDataList.Config.PriceImage) != "undefined") && (msg == "物价" || msg[0] == "物价")) {
            //logic.price(event,msg[1])
            logic.priceImage(event, { name: msg[1] });
        }
        else if (typeof (GroupDataList) != "undefined" && (GroupDataList.Config.AnAdventurePrint != null && typeof (GroupDataList.Config.AnAdventurePrint) != "undefined") && (msg == "奇遇" || msg[0] == "奇遇")) {
            if (msg[1] != null) {
                logic.AnAdventurePrint(event, {
                    name: msg[2] == null ? msg[1] : msg[2],
                    server: msg[2] == null ? GroupDataList.ServerName : msg[1]
                });
            } else {
                event.reply("请输入正确的侠士名称！");
            }
        }
        else if (typeof (GroupDataList) != "undefined" && (GroupDataList.Config.Strategy != null && typeof (GroupDataList.Config.Strategy) != "undefined") && (msg == "攻略" || msg[0] == "攻略")) {
            if (msg[1] != null) {
                logic.strategy(event, {
                    name: msg[1]
                });
            } else {
                event.reply("请输入正确的奇遇名称！");
            }
        }
        else if (typeof (GroupDataList) != "undefined" && (GroupDataList.Config.SerendipityInfo != null && typeof (GroupDataList.Config.SerendipityInfo) != "undefined") && (msg == "查询" || msg[0] == "查询")) {
            logic.SerendipityInfo(event, {
                name: msg[2] == null ? msg[1] : msg[2],
                server: msg[2] == null ? GroupDataList.ServerName : msg[1]
            })
        }
        else if (typeof (GroupDataList) != "undefined" && (GroupDataList.Config.RandomS != null && typeof (GroupDataList.Config.RandomS) != "undefined") && (msg == "骚话" || msg[0] == "骚话")) {
            logic.RandomS(event, {});
        }
        else if (typeof (GroupDataList) != "undefined" && (GroupDataList.Config.Random != null && typeof (GroupDataList.Config.Random) != "undefined") && (msg == "舔狗日记" || msg[0] == "舔狗日记")) {
            logic.Random(event, {});
        }
        else if (typeof (GroupDataList) != "undefined" && (GroupDataList.Config.Attribute != null && typeof (GroupDataList.Config.Attribute) != "undefined") && (msg == "属性" || msg[0] == "属性")) {
            logic.Attribute(event, {
                name: msg[2] == null ? msg[1] : msg[2],
                server: msg[2] == null ? GroupDataList.ServerName : msg[1]
            })
        }
        else if (typeof (GroupDataList) != "undefined" && (GroupDataList.Config.TeamCdList != null && typeof (GroupDataList.Config.TeamCdList) != "undefined") && (msg == "副本" || msg[0] == "副本")) {
            logic.TeamCdList(event, {
                name: msg[2] == null ? msg[1] : msg[2],
                server: msg[2] == null ? GroupDataList.ServerName : msg[1]
            })
        }
        else if (typeof (GroupDataList) != "undefined" && (GroupDataList.Config.History != null && typeof (GroupDataList.Config.History) != "undefined") && (msg == "战绩" || msg[0] == "战绩")) {
            logic.History(event, {
                name: msg[2] == null ? msg[1] : msg[2],
                server: msg[2] == null ? GroupDataList.ServerName : msg[1],
                match: 33,
            })
        }
        else if (typeof (GroupDataList) != "undefined" && (GroupDataList.Config.UpdateAnnouncement != null && typeof (GroupDataList.Config.UpdateAnnouncement) != "undefined") && (msg == "更新公告" || msg[0] == "更新公告")) {
            logic.UpdateAnnouncement(event, {

            })
        }
        else if (typeof (GroupDataList) != "undefined" && (GroupDataList.Config.Flower != null && typeof (GroupDataList.Config.Flower) != "undefined") && (msg == "花价" || msg[0] == "花价")) {
            logic.flower(event, {
                server: msg[2] == null ? GroupDataList.ServerName : msg[1],
                flower: msg[2] == null ? msg[1] : msg[2],
                map: "广陵邑"
            })
        }
        else if (typeof (GroupDataList) != "undefined" && (GroupDataList.Config.Check != null && typeof (GroupDataList.Config.Check) != "undefined") && (msg == "ping" || msg[0] == "ping" || msg == "开服" || msg[0] == "开服")) {
            logic.check(event, {
                server: msg[1] == null ? GroupDataList.ServerName : msg[1],
            })
        }
        else if (typeof (GroupDataList) != "undefined" && (GroupDataList.Config.Achievement != null && typeof (GroupDataList.Config.Achievement) != "undefined") && (msg == "成就进度" || msg[0] == "成就进度")) {
            if (msg[1] == null) {
                event.reply("请输入用户名称！")
            } else if (msg[2] == null) {
                event.reply("请输入成就地图！")
            } else {
                logic.achievement(event, {
                    "server": msg[3] == null ? GroupDataList.ServerName : msg[1],
                    "role": msg[3] == null ? msg[1] : msg[2],
                    "name": msg[3] == null ? msg[2] : msg[3]
                })
            }
        }
        else if (typeof (GroupDataList) != "undefined" && (GroupDataList.Config.Fireworks != null && typeof (GroupDataList.Config.Fireworks) != "undefined") && (msg == "烟花" || msg[0] == "烟花" || msg == "烟花查询" || msg[0] == "烟花查询" || msg == "Fireworks" || msg[0] == "Fireworks")) {

            logic.Fireworks(event, {
                "server": msg[1],
                "name": msg[2]
            })

        }
        else if (typeof (GroupDataList) != "undefined" && (GroupDataList.Config.Eat != null && typeof (GroupDataList.Config.Eat) != "undefined") && (msg == "吃什么" || msg[0] == "吃什么")) {
            logic.Eat(event, {});
        }
        else if (typeof (GroupDataList) != "undefined" && (GroupDataList.Config.Drink != null && typeof (GroupDataList.Config.Drink) != "undefined") && (msg == "喝什么" || msg[0] == "喝什么" || msg == "喝什么？" || msg[0] == "喝什么？")) {
            logic.Drink(event, {});
        }
        else if (typeof (GroupDataList) != "undefined" && (GroupDataList.Config.Hitokoto != null && typeof (GroupDataList.Config.Hitokoto) != "undefined") && (msg == "一言" || msg[0] == "一言")) {
            logic.hitokoto(event, {
                "type": "j",
                "Str": null
            });
        }
        else if (msg == "功能" || msg[0] == "功能") {
            event.reply("【腾讯文档】狗蛋-功能\nhttps://docs.qq.com/doc/DSG1NSGZZT0djR051");

        }
        else if (typeof (GroupDataList) != "undefined" && (GroupDataList.Config.TaiXu != null && typeof (GroupDataList.Config.TaiXu) != "undefined") && (msg == "剑纯日记" || msg[0] == "剑纯日记")) {
            logic.TaiXu(event, {
            });
        }
        else if (typeof (GroupDataList) != "undefined" && (GroupDataList.Config.BindLove != null && typeof (GroupDataList.Config.BindLove) != "undefined") && (msg == "绑定情缘" || msg[0] == "绑定情缘")) {
            logic.BindLove(event, {
                BindersName: msg[1],
                BoundPersonName: msg[2],
                BindersTime: msg[3]
            })
        }
        else if (typeof (GroupDataList) != "undefined" && (GroupDataList.Config.DelLove != null && typeof (GroupDataList.Config.DelLove) != "undefined") && (msg == "解绑情缘" || msg[0] == "解绑情缘")) {
            logic.DelLove(event, {
            })
        }
        else if (typeof (GroupDataList) != "undefined" && (GroupDataList.Config.OnLove != null && typeof (GroupDataList.Config.OnLove) != "undefined") && (msg == "我的情缘" || msg[0] == "我的情缘")) {
            logic.OnLove(event, {
            })
        }
        else if (typeof (GroupDataList) != "undefined" && (GroupDataList.Config.AddKeyImage != null && typeof (GroupDataList.Config.AddKeyImage) != "undefined") && (msg == "上传" || msg[0] == "上传")) {
            if (msg[1].indexOf("[") != -1) {
                msg[1] = msg[1].split("[")[0]
            }
            msg[1] = msg[1].replace(/[\r\n]/g, "");
            logic.AddKeyImage(event, {
                ImageType: msg[1]
            });
        }
        else {//智能闲聊//防闪照

            Array.prototype.baoremove = function (dx) {
                if (isNaN(dx) || dx > this.length) { return false; }
                this.splice(dx, 1);
            }
            ChatData.push({ server: event.group_id, msg: msg[0] })
            var menu_node1 = ChatData.filter(function (e) { return e.server == event.group_id; });
            var menu_node2 = ChatStr.filter(function (e) { return e.server == event.group_id; });
            if (menu_node1.length >= 3) {
                if (menu_node1[0].msg == msg[0] && menu_node1[1].msg == msg[0] && menu_node1[2].msg == msg[0]) {
                    if (menu_node2.length == 0) {
                        if (event.raw_message.indexOf("CQ:") == -1) {
                            event.reply(event.raw_message);
                            ChatStr.push({ server: event.group_id, msg: event.raw_message });
                        } else {
                        }
                    } else if (msg[0] != menu_node2[menu_node2.length - 1].msg) {
                        if (event.raw_message.indexOf("CQ:") == -1) {
                            event.reply(event.raw_message);
                            var index2 = ChatStr.indexOf(menu_node2[0]);
                            ChatStr.baoremove(index2);
                            ChatStr.push({ server: event.group_id, msg: event.raw_message });
                        }
                    }
                } else {
                    logic.OnKeyImage(event, {
                        MsgType: msg[0]
                    });
                }
                var index = ChatData.indexOf(menu_node1[0]);
                ChatData.baoremove(index);
            } else {
                logic.OnKeyImage(event, {
                    MsgType: msg[0]
                });
            }
        }
    } catch (e) {
        console.log("错误信息" + e)
    }

}
var qqHao = function (event, server) {

    var msg = event.raw_message.split(/       |      |     |    |   |  | /);
    if (msg == "日常" || msg[0] == "日常") {
        logic.daily(event, msg[1] == null ? { server: "破阵子" } : { server: msg[1] })
    }
    else if (msg == "金价" || msg[0] == "金价") {
        logic.demon(event, msg[1] == null ? { server: "破阵子" } : { server: msg[1] })
    }
    else if (msg == "沙盘" || msg[0] == "沙盘") {
        logic.shapan(event, msg[1] == null ? { server: "破阵子" } : { server: msg[1] })
    }
    else if (msg == "奇穴" || msg[0] == "奇穴") {
        logic.qixue(event, msg[1])
    }
    else if (msg == "宏" || msg[0] == "宏") {
        logic.macro(event, msg[1])
    }
    else if (msg == "器物谱" || msg[0] == "器物谱") {
        logic.travel(event, msg[1])
    }
    else if (msg == "物价" || msg[0] == "物价") {
        logic.priceImage(event, { name: msg[1] });
    }
    else if (msg == "奇遇" || msg[0] == "奇遇") {
        if (msg[1] != null) {
            logic.AnAdventurePrint(event, {
                name: msg[2] == null ? msg[1] : msg[2],
                server: msg[2] == null ? "破阵子" : msg[1]
            });
        } else {
            event.reply("请输入正确的侠士名称！");
        }
    }
    else if (msg == "攻略" || msg[0] == "攻略") {
        if (msg[1] != null) {
            logic.strategy(event, {
                name: msg[1]
            });
        } else {
            event.reply("请输入正确的奇遇名称！");
        }
    }
    else if (msg == "查询" || msg[0] == "查询") {
        logic.SerendipityInfo(event, {
            name: msg[2] == null ? msg[1] : msg[2],
            server: msg[2] == null ? "破阵子" : msg[1]
        })
    }
    else if (msg == "骚话" || msg[0] == "骚话") {
        logic.RandomS(event, {});
    }
    else if (msg == "舔狗日记" || msg[0] == "舔狗日记") {
        logic.Random(event, {});
    }
    else if (msg == "剑纯日记" || msg[0] == "剑纯日记") {
        logic.TaiXu(event, {
        });
    }
    else if (msg == "属性" || msg[0] == "属性") {
        logic.Attribute(event, {
            name: msg[2] == null ? msg[1] : msg[2],
            server: msg[2] == null ? "破阵子" : msg[1]
        })
    }
    else if (msg == "副本" || msg[0] == "副本") {
        logic.TeamCdList(event, {
            name: msg[2] == null ? msg[1] : msg[2],
            server: msg[2] == null ? "破阵子" : msg[1]
        })
    }
    else if (msg == "战绩" || msg[0] == "战绩") {
        logic.History(event, {
            name: msg[2] == null ? msg[1] : msg[2],
            server: msg[2] == null ? "破阵子" : msg[1],
            match: 33,
        })
    }
    else if (msg == "更新公告" || msg[0] == "更新公告") {
        logic.UpdateAnnouncement(event, {

        })
    }
    else if (msg == "花价" || msg[0] == "花价") {
        logic.flower(event, {
            server: msg[2] == null ? "破阵子" : msg[1],
            flower: msg[2] == null ? msg[1] : msg[2],
            map: "广陵邑"
        })
    }
    else if (msg == "ping" || msg[0] == "ping" || msg == "开服" || msg[0] == "开服") {
        logic.check(event, {
            server: msg[1] == null ? "破阵子" : msg[1],
        })
    }
    else if (msg == "成就进度" || msg[0] == "成就进度") {
        if (msg[1] == null) {
            event.reply("请输入用户名称！")
        } else if (msg[2] == null) {
            event.reply("请输入成就地图！")
        } else {
            logic.achievement(event, {
                "server": msg[3] == null ? "破阵子" : msg[1],
                "role": msg[3] == null ? msg[1] : msg[2],
                "name": msg[3] == null ? msg[2] : msg[3]
            })
        }
    }
    else if (msg == "烟花" || msg[0] == "烟花" || msg == "烟花查询" || msg[0] == "烟花查询" || msg == "Fireworks" || msg[0] == "Fireworks") {
        logic.Fireworks(event, {
            "server": msg[1],
            "name": msg[2]
        })

    }
    else if (msg == "吃什么" || msg[0] == "吃什么") {
        logic.Eat(event, {});
    }
    else if (msg == "一言" || msg[0] == "一言") {
        logic.hitokoto(event, {
            "type": "j",
            "Str": null
        });
    }
    else if (msg == "绑定情缘" || msg[0] == "绑定情缘") {
        logic.BindLove(event, {
            BindersName: msg[1],
            BoundPersonName: msg[2],
            BindersTime: msg[3]
        })
    }
    else if (msg == "解绑情缘" || msg[0] == "解绑情缘") {
        logic.DelLove(event, {
        })
    }
    else if (msg == "我的情缘" || msg[0] == "我的情缘") {
        logic.OnLove(event, {
        })
    }
    else if (msg == "签到" || msg[0] == "签到" || msg == "/SignIn" || msg[0] == "/SignIn") {
        logic.SignIn(event, {
        })
    }
    else if (msg == "功能" || msg[0] == "功能") {
        event.reply("【腾讯文档】狗蛋-功能\nhttps://docs.qq.com/doc/DSG1NSGZZT0djR051");

    }
    else if (msg == "上传" || msg[0] == "上传") {
        if (msg[1].indexOf("[") != -1) {
            msg[1] = msg[1].split("[")[0]
        }
        msg[1] = msg[1].replace(/[\r\n]/g, "");
        logic.AddKeyImage(event, {
            ImageType: msg[1]
        });
    }
    else {//智能闲聊//防闪照
        Array.prototype.baoremove = function (dx) {
            if (isNaN(dx) || dx > this.length) { return false; }
            this.splice(dx, 1);
        }
        ChatData.push({ server: event.group_id, msg: msg[0] })
        var menu_node1 = ChatData.filter(function (e) { return e.server == event.group_id; });
        var menu_node2 = ChatStr.filter(function (e) { return e.server == event.group_id; });
        if (menu_node1.length >= 3) {
            if (menu_node1[0].msg == msg[0] && menu_node1[1].msg == msg[0] && menu_node1[2].msg == msg[0]) {
                if (menu_node2.length == 0) {
                    if (event.raw_message.indexOf("CQ:") == -1) {
                        event.reply(event.raw_message);
                        ChatStr.push({ server: event.group_id, msg: event.raw_message });
                    } else {
                    }
                } else if (msg[0] != menu_node2[menu_node2.length - 1].msg) {
                    if (event.raw_message.indexOf("CQ:") == -1) {
                        event.reply(event.raw_message);
                        var index2 = ChatStr.indexOf(menu_node2[0]);
                        ChatStr.baoremove(index2);
                        ChatStr.push({ server: event.group_id, msg: event.raw_message });
                    }
                }
            } else {
                logic.OnKeyImage(event, {
                    MsgType: msg[0]
                });
            }
            var index = ChatData.indexOf(menu_node1[0]);
            ChatData.baoremove(index);
        } else {
            logic.OnKeyImage(event, {
                MsgType: msg[0]
            });
        }
    }

}
module.exports = {
    qqHao,
    qqQUN
}