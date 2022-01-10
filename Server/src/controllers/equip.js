import {Jx3ApiPOST,Jx3DtPOST} from "../util/http";
import {Jx3ApiHttp} from "../config/Jx3Api"
export default async (ctx, next) => {
    console.log(ctx.request.body)
    var qdata = ctx.request.body
    
    var name = {name:"冰心诀"}
    if(qdata.name!=undefined){
        name.name = qdata.name;
    }
    console.log("服务器名称："+name.name)
    var data = await Jx3ApiPOST(Jx3ApiHttp.equip,name)
 

    return  ctx.body = data;
}