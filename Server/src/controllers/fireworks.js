import {Jx3ApiPOST,Jx3DtPOST,Jx3FireworksGet} from "../util/http";
import {Jx3ApiHttp} from "../config/Jx3Api"
export default async (ctx, next) => {
    var qdata = ctx.request.body.data
    var data = await Jx3FireworksGet(Jx3ApiHttp.fireworks,qdata,{});
    console.log(data)
    return  ctx.body = data;
}