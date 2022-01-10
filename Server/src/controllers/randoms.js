import {Jx3ApiPOST,Jx3DtPOST} from "../util/http";
import {Jx3ApiHttp} from "../config/Jx3Api"
export default async (ctx, next) => {
    var data = await Jx3ApiPOST(Jx3ApiHttp.randoms,{})
    return  ctx.body = data;
}