"use strict";exports.__esModule = true;var _regenerator = require("babel-runtime/regenerator");var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);var _http = require("../util/http");
var _Jx3Api = require("../config/Jx3Api");
var _index = require("../config/index");var _index2 = _interopRequireDefault(_index);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}exports.default = function () {var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(
    function _callee(ctx, next) {var qdata, data;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                        qdata = ctx.request.body.data;
                        qdata.ticket = _index2.default.Jx3AppToken;_context.next = 4;return (
                            (0, _http.Jx3ApiPOST)(_Jx3Api.Jx3ApiHttp.priceimage, qdata));case 4:data = _context.sent;return _context.abrupt("return",
                        ctx.body = data);case 6:case "end":return _context.stop();}}}, _callee, undefined);}));return function (_x, _x2) {return _ref.apply(this, arguments);};}();module.exports = exports['default'];
//# sourceMappingURL=priceimage.js.map