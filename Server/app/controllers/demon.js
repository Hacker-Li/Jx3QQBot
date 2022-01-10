"use strict";exports.__esModule = true;var _regenerator = require("babel-runtime/regenerator");var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);var _http = require("../util/http");
var _Jx3Api = require("../config/Jx3Api");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}exports.default = function () {var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(
    function _callee(ctx, next) {var qdata, server, data, j5173, j7881, wanbaolou, tieba, jdd373, juu898, time,

















        formatDate, dt, jinjia;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:formatDate = function formatDate(date) {
                            var date = new Date(date * 1000);
                            var YY = date.getFullYear() + '-';
                            var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                            var DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
                            var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
                            var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
                            var ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
                            return YY + MM + DD + " " + hh + mm + ss;
                        };console.log(ctx.request.body);qdata = ctx.request.body;server = { server: qdata.server };if (qdata.server != undefined) {server.server = qdata.server;}console.log("服务器名称：" + server.server);_context.next = 8;return (0, _http.Jx3ApiPOST)(_Jx3Api.Jx3ApiHttp.demon, server);case 8:data = _context.sent; // console.log(data)
                        j5173 = data[0]['5173'];j7881 = data[0]['7881'];wanbaolou = data[0]['wanbaolou'];tieba = data[0]['tieba'];jdd373 = data[0]['dd373'];juu898 = data[0]['uu898'];time = data[0]['time'];dt = formatDate(time);

                        jinjia = "\u25CB " + server.server + ("\u30FB\u91D1\u4EF7 \u25CB \n \u30105173\u3011 " +
                        j5173 + "\n \u30107881\u3011 " +
                        j7881 + "\n \u3010dd373\u3011 " +
                        jdd373 + "\n \u3010uu898\u3011 " +
                        juu898 + "\n \u3010\u4E07\u5B9D\u697C\u3011 " +
                        wanbaolou + "\n \u3010\u8D34\u5427\u3011 " +
                        tieba + "\n \u3010\u63D0\u9192\u3011\u8C28\u9632\u7535\u4FE1\u8BC8\u9A97\uFF01\n \u3010\u66F4\u65B0\u65F6\u95F4\u3011" +

                        dt + "\n ");return _context.abrupt("return",

                        ctx.body = jinjia);case 19:case "end":return _context.stop();}}}, _callee, undefined);}));return function (_x, _x2) {return _ref.apply(this, arguments);};}();module.exports = exports['default'];
//# sourceMappingURL=demon.js.map