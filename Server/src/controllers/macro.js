//https://www.nonebot.cn/next/macro

import {Jx3ApiPOST,Jx3DtPOST} from "../util/http";
import {Jx3ApiHttp} from "../config/Jx3Api"
export default async (ctx, next) => {
    console.log(ctx.request.body)
    var qdata = ctx.request.body

    var data = await Jx3ApiPOST(Jx3ApiHttp.macro,{name:qdata.name})
    var macro = data.macro;
    var qixue = data.qixue;

    var qxma=`${macro}`
    // macro = macro.split("\r\n");
   
    return  ctx.body =qdata.name+"\r"+ macro+"\r \n"+qixue;
}