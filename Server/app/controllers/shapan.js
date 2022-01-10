"use strict";exports.__esModule = true;var _regenerator = require("babel-runtime/regenerator");var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);var _http = require("../util/http");
var _Jx3Api = require("../config/Jx3Api");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}exports.default = function () {var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(
    function _callee(ctx, next) {var qdata, server, url, json, data;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                        console.log(ctx.request.body);
                        qdata = ctx.request.body;
                        server = { server: "破阵子" };
                        if (qdata.server != undefined) {
                            server.server = qdata.server;
                        }
                        console.log("服务器名称：" + server.server);_context.next = 7;return (
                            (0, _http.Jx3DtPOST)("https://www.j3sp.com/api/user/login", { account: "chinamars", password: "wangtai123" }));case 7:url = _context.sent;
                        console.log(url);
                        json = { "Content-Type": "application/x-www-form-urlencoded", "Cookie": "spc_token=" + url.userinfo.token };_context.next = 12;return (
                            (0, _http.Jx3DtPOST)("https://www.j3sp.com/api/sand", { serverName: server.server }, json));case 12:data = _context.sent;
                        console.log(data);return _context.abrupt("return",
                        ctx.body = data);case 15:case "end":return _context.stop();}}}, _callee, undefined);}));return function (_x, _x2) {return _ref.apply(this, arguments);};}();module.exports = exports['default'];
//# sourceMappingURL=shapan.js.map