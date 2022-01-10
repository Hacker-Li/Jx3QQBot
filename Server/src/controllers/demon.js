import {Jx3ApiPOST,Jx3DtPOST} from "../util/http";
import {Jx3ApiHttp} from "../config/Jx3Api"
export default async (ctx, next) => {
    console.log(ctx.request.body)
    var qdata = ctx.request.body
    var server = {server:qdata.server}
    if(qdata.server!=undefined){
        server.server = qdata.server;
    }
    console.log("服务器名称："+server.server)
    var data = await Jx3ApiPOST(Jx3ApiHttp.demon,server)
             // console.log(data)
             var j5173 = data[0]['5173']
             var j7881 = data[0]['7881']
             var wanbaolou = data[0]['wanbaolou']
             var tieba = data[0]['tieba']
             var jdd373 = data[0]['dd373']
             var juu898 = data[0]['uu898']
             var time = data[0]['time']
        
             function formatDate(date) {
                 var date = new Date(date * 1000);
                 var YY = date.getFullYear() + '-';
                 var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                 var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
                 var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
                 var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
                 var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
                 return YY + MM + DD +" "+hh + mm + ss;
               }
             var dt = formatDate(time)
             
 var jinjia=`○ `+server.server+`・金价 ○ 
 【5173】 ${j5173}
 【7881】 ${j7881}
 【dd373】 ${jdd373}
 【uu898】 ${juu898}
 【万宝楼】 ${wanbaolou}
 【贴吧】 ${tieba}
 【提醒】谨防电信诈骗！
 【更新时间】${dt}
 `
    return  ctx.body = jinjia;
}