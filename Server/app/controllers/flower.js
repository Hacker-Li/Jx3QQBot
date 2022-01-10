"use strict";exports.__esModule = true;var _regenerator = require("babel-runtime/regenerator");var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);var _http = require("../util/http");
var _Jx3Api = require("../config/Jx3Api");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}exports.default = function () {var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(
    function _callee(ctx, next) {var qdata, data, ResText, i;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                        qdata = ctx.request.body.data;_context.next = 3;return (
                            (0, _http.Jx3ApiPOST)(_Jx3Api.Jx3ApiHttp.flower, qdata));case 3:data = _context.sent;if (!(
                        data.length > 0)) {_context.next = 10;break;}
                        ResText = "花价查询\n";
                        for (i = 0; i < data.length; i++) {
                            ResText += "鲜花名称：" + data[i].name + "\n鲜花颜色：" + (data[i].color == undefined ? "无颜色" : data[i].color) + "\n鲜花出售倍数：" + data[i].price + "倍\n鲜花出售地址（广陵邑）：" + data[i].line[0] + "号\n";
                        }return _context.abrupt("return",

                        ctx.body = ResText);case 10:return _context.abrupt("return",

                        ctx.body = "查询不到相应信息");case 11:case "end":return _context.stop();}}}, _callee, undefined);}));return function (_x, _x2) {return _ref.apply(this, arguments);};}();module.exports = exports['default'];
//# sourceMappingURL=flower.js.map