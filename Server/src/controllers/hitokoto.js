import {Jx3ApiPOST,Jx3DtPOST,Jx3FireworksGet,HttpGet} from "../util/http";
import {Jx3ApiHttp} from "../config/Jx3Api"
export default async (ctx, next) => {
    var qdata = ctx.request.body.data
    console.log(Jx3ApiHttp.hitokoto)
    var data = await HttpGet(Jx3ApiHttp.hitokoto,{
        c:qdata.type,
        encode:"json",
        charset:"utf-8"
    });
    return  ctx.body = data;
}