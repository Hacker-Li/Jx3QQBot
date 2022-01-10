import {Jx3ApiPOST,Jx3DtPOST} from "../util/http";
import {Jx3ApiHttp} from "../config/Jx3Api"
export default async (ctx, next) => {
    console.log(ctx.request.body.data)
    var qdata = ctx.request.body.data
    
    var data = await Jx3ApiPOST(Jx3ApiHttp.check,qdata)
    return  ctx.body = data;
}