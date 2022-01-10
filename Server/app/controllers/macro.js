"use strict";exports.__esModule = true;var _regenerator = require("babel-runtime/regenerator");var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _http = require("../util/http");
var _Jx3Api = require("../config/Jx3Api");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //https://www.nonebot.cn/next/macro
exports.default = function () {var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx, next) {var qdata, data, macro, qixue, qxma;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                        console.log(ctx.request.body);
                        qdata = ctx.request.body;_context.next = 4;return (

                            (0, _http.Jx3ApiPOST)(_Jx3Api.Jx3ApiHttp.macro, { name: qdata.name }));case 4:data = _context.sent;
                        macro = data.macro;
                        qixue = data.qixue;

                        qxma = "" + macro;
                        // macro = macro.split("\r\n");
                        return _context.abrupt("return",
                        ctx.body = qdata.name + "\r" + macro + "\r \n" + qixue);case 9:case "end":return _context.stop();}}}, _callee, undefined);}));return function (_x, _x2) {return _ref.apply(this, arguments);};}();module.exports = exports['default'];
//# sourceMappingURL=macro.js.map