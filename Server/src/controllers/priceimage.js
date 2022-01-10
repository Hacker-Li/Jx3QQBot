import {Jx3ApiPOST,Jx3DtPOST} from "../util/http";
import {Jx3ApiHttp} from "../config/Jx3Api";
import config from "../config/index";
export default async (ctx, next) => {
    var qdata = ctx.request.body.data
    qdata.ticket = config.Jx3AppToken;
    var data = await Jx3ApiPOST(Jx3ApiHttp.priceimage,qdata)
    return  ctx.body = data;
}