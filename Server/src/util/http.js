const axios = require("axios");
const Qs = require("qs");
import config from "../config/index"
console.log(config)

var Jx3ApiPOST = async function (url,param) {
    console.log(config.Jx3Api.url+url)
    let response = await axios({
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded","token":config.Jx3Api.token},
        url: config.Jx3Api.url+url,
        data: Qs.stringify(param),
     })
     
     console.log(response)
    return response.data.data;
}
var Jx3DtPOST = async function (url,param,Cookie) {
    
    let response = await axios({
        method: "GET",
        headers: Cookie,
        url: url,
        params:param
     })
     
    //  console.log(response.data)
     return response.data.data;
}
var HttpGet = async function (url,param,Cookie) {
    
    let response = await axios({
        method: "GET",
        headers: Cookie,
        url: url,
        params:param
     })
     console.log(response.data)
     return response.data;
}
var Jx3FireworksGet = async function (url,param,Cookie) {
     return response.data.code=='200'?response.data.result:{};
}
export default {Jx3ApiPOST,Jx3DtPOST,Jx3FireworksGet,HttpGet}