const axios = require("axios");
const Qs = require("qs");
const config = require("../config/config")

async function Jx3ApiPOST(url,param,fun) {
    console.log(url)
    let response = await axios({
        method: "Get",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        url: config.server.host+url,
        data: Qs.stringify(param)
     })
     console.log(response)
     fun(response.data);
}
module.exports = {
    Jx3ApiPOST
}