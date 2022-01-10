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
    var url = await Jx3DtPOST("https://www.j3sp.com/api/user/login",{account:"chinamars",password:"wangtai123"});
    console.log(url)
    var json = { "Content-Type": "application/x-www-form-urlencoded","Cookie": "spc_token="+url.userinfo.token }
    var data = await Jx3DtPOST("https://www.j3sp.com/api/sand",{serverName:server.server},json);
    console.log(data)
    return  ctx.body = data;
}