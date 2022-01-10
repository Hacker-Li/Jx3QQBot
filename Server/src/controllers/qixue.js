import {Jx3ApiPOST,Jx3DtPOST} from "../util/http";
import {Jx3ApiHttp} from "../config/Jx3Api"
export default async (ctx, next) => {
    var qdata = ctx.request.body
    var data = await Jx3ApiPOST(Jx3ApiHttp.qixue,{name:qdata.name})
  
    return  ctx.body = data;
}