'use strict';exports.__esModule = true;var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var filter = function filter(ctx) {
    var url = ctx.url.split('?')[0].toLowerCase();
    var actions = url.split('/');
    var methodUrl = '../controllers/' + actions[1];
    var methodName = actions[1];
    return { methodUrl: methodUrl, methodName: methodName };
};exports.default = function () {var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(
    function _callee(ctx, next) {var _filter, methodUrl, methodName, obj;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                        console.log(ctx);_filter =
                        filter(ctx), methodUrl = _filter.methodUrl, methodName = _filter.methodName;_context.prev = 2;_context.next = 5;return (

                            require(methodUrl));case 5:obj = _context.sent;
                        console.log(methodName);_context.next = 9;return (
                            obj(ctx, next));case 9:_context.next = 15;break;case 11:_context.prev = 11;_context.t0 = _context['catch'](2);_context.next = 15;return (

                            next());case 15:case 'end':return _context.stop();}}}, _callee, undefined, [[2, 11]]);}));return function (_x, _x2) {return _ref.apply(this, arguments);};}();module.exports = exports['default'];
//# sourceMappingURL=index.js.map