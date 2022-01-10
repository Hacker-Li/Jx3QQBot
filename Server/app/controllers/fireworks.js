"use strict";exports.__esModule = true;var _regenerator = require("babel-runtime/regenerator");var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);var _http = require("../util/http");
var _Jx3Api = require("../config/Jx3Api");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}exports.default = function () {var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(
    function _callee(ctx, next) {var qdata, json, data;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                        qdata = ctx.request.body.data;
                        console.log(_Jx3Api.Jx3ApiHttp.fireworks);
                        json = { "Cookie": "PHPSESSID=jd8ggjd78b7o52tqov1rgo04r1; think_var=zh-cn; uid=35465; token=8cc68062-dcd2-4cfd-a06d-2bdcf0af2a11" };_context.next = 5;return (
                            (0, _http.Jx3FireworksGet)(_Jx3Api.Jx3ApiHttp.fireworks, qdata, json));case 5:data = _context.sent;
                        console.log(data);return _context.abrupt("return",
                        ctx.body = data);case 8:case "end":return _context.stop();}}}, _callee, undefined);}));return function (_x, _x2) {return _ref.apply(this, arguments);};}();module.exports = exports['default'];
//# sourceMappingURL=fireworks.js.map