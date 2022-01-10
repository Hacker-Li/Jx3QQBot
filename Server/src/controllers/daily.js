import {Jx3ApiPOST,Jx3DtPOST} from "../util/http";
import {Jx3ApiHttp} from "../config/Jx3Api"
export default async (ctx, next) => {
    console.log(ctx.request.body)
    var qdata = ctx.request.body
    var server = {server:"破阵子"}
    if(qdata.server!=undefined){
        server.server = qdata.server;
    }
    console.log("服务器名称："+server.server)
    var data = await Jx3ApiPOST(Jx3ApiHttp.daily,server)
    var date = data.date;
    var dayCamp = data.dayCamp;
    var dayBattle = data.dayBattle;
    var dayWar = data.dayWar;
    var weekFive = data.weekFive;
    var weekTeam = data.weekTeam;
    var weekPublic = data.weekPublic;
    var dayPublic = data.dayPublic;
    var week = data.week;
    var dayMiindo = data.dayMiindo;
    console.log(week)
    var tx = "";//提醒
    var ri = "";
    if(week == "一"){
        ri = "【祭天】19:00-21:00"
        tx = "【提醒】记得注意帮会跑商什么时候开始！";
    }else if(week == "二"){
        ri = "【小攻防】20:00-22:00"
        tx = "【提醒】19:28记得卡攻防排队！";
    }else if(week == "三"){
        ri = "【世界BOSS】20:00 乱世少林・灵霄峡・宗朗、乱世七秀・戏龙岛・唐阙"
        tx = "【提醒】记得注意帮会跑商什么时候开始！";
    }else if(week == "四"){
        ri = "【小攻防】20:00-22:00"
        tx = "【提醒】19:28记得卡攻防排队！";
    }else if(week == "五"){
        ri = "【世界BOSS】20:00"
        tx = "【提醒】19:28记得卡攻防排队！";
    }else if(week == "六"){
        ri = "【大攻防】全体激情大攻防"
        tx = "【提醒】记得一起打攻防！";
    }else if(week == "日"){
        ri = "【大攻防】全体激情大攻防"
        tx = "【提醒】记得一起打攻防！";
    }
    var richang = 
`今天是${date}，星期${week}
【公共任务】${dayPublic}
【矿车】${dayCamp}
【战场】${dayBattle}
【大战】${dayWar}
【武林通鉴】${weekFive}
${weekTeam}
${weekPublic}
【战场】12:00-1:00
${ri}
${tx}`
    return  ctx.body = richang;
}