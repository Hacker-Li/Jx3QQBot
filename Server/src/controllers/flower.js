import { Jx3ApiPOST, Jx3DtPOST } from "../util/http";
import { Jx3ApiHttp } from "../config/Jx3Api"
export default async (ctx, next) => {
    var qdata = ctx.request.body.data
    var data = await Jx3ApiPOST(Jx3ApiHttp.flower, qdata)
    if (data.length > 0) {
        var ResText = "花价查询\n";
        for (var i = 0; i < data.length; i++) {
            ResText += "鲜花名称：" + data[i].name + "\n鲜花颜色：" + (data[i].color==undefined?"无颜色":data[i].color) + "\n鲜花出售倍数：" + data[i].price + "倍\n鲜花出售地址（广陵邑）：" + data[i].line[0] + "号\n"
        }

        return ctx.body = ResText;
    }else{
        return ctx.body = "查询不到相应信息";
    }
}