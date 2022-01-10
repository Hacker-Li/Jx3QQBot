"use strict";exports.__esModule = true;var _regenerator = require("babel-runtime/regenerator");var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);var _http = require("../util/http");
var _Jx3Api = require("../config/Jx3Api");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}exports.default = function () {var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(
    function _callee(ctx, next) {var qdata, name, data;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                        console.log(ctx.request.body);
                        qdata = ctx.request.body;

                        name = { name: "冰心诀" };
                        if (qdata.name != undefined) {
                            name.name = qdata.name;
                        }
                        console.log("服务器名称：" + name.name);_context.next = 7;return (
                            (0, _http.Jx3ApiPOST)(_Jx3Api.Jx3ApiHttp.equip, name));case 7:data = _context.sent;return _context.abrupt("return",


                        ctx.body = data);case 9:case "end":return _context.stop();}}}, _callee, undefined);}));return function (_x, _x2) {return _ref.apply(this, arguments);};}();module.exports = exports['default'];
//# sourceMappingURL=equip.js.map