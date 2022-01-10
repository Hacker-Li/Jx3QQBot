// https://www.nonebot.cn/next/qixue

import {Jx3ApiPOST,Jx3DtPOST} from "../util/http";
import {Jx3ApiHttp} from "../config/Jx3Api"
export default async (ctx, next) => {
    console.log(ctx.request.body)
    var qdata = ctx.request.body

    var data = await Jx3ApiPOST(Jx3ApiHttp.travel,{name:qdata.name})
    // var data = await Jx3ApiPOST(Jx3ApiHttp.price,{name:"蝶金"})
    return  ctx.body = data;
}