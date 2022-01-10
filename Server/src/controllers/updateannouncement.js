import {Jx3ApiPOST,Jx3DtPOST} from "../util/http";
import {Jx3ApiHttp} from "../config/Jx3Api";
export default async (ctx, next) => {
    var qdata = ctx.request.body.data;
    var data = await Jx3ApiPOST(Jx3ApiHttp.updateannouncement,qdata)
    return  ctx.body = data;
}