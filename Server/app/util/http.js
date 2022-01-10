"use strict";exports.__esModule = true;var _regenerator = require("babel-runtime/regenerator");var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _index = require("../config/index");var _index2 = _interopRequireDefault(_index);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var axios = require("axios");var Qs = require("qs");
console.log(_index2.default);

var Jx3ApiPOST = function () {var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(url, param) {var response;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                        console.log(_index2.default.Jx3Api.url + url);_context.next = 3;return (
                            axios({
                                method: "POST",
                                headers: { "Content-Type": "application/x-www-form-urlencoded", "token": _index2.default.Jx3Api.token },
                                url: _index2.default.Jx3Api.url + url,
                                data: Qs.stringify(param) }));case 3:response = _context.sent;


                        console.log(response);return _context.abrupt("return",
                        response.data.data);case 6:case "end":return _context.stop();}}}, _callee, this);}));return function Jx3ApiPOST(_x, _x2) {return _ref.apply(this, arguments);};}();

var Jx3DtPOST = function () {var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(url, param, Cookie) {var response;return _regenerator2.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return (

                            axios({
                                method: "GET",
                                headers: Cookie,
                                url: url,
                                params: param }));case 2:response = _context2.sent;return _context2.abrupt("return",



                        response.data.data);case 4:case "end":return _context2.stop();}}}, _callee2, this);}));return function Jx3DtPOST(_x3, _x4, _x5) {return _ref2.apply(this, arguments);};}();

var HttpGet = function () {var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(url, param, Cookie) {var response;return _regenerator2.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.next = 2;return (

                            axios({
                                method: "GET",
                                headers: Cookie,
                                url: url,
                                params: param }));case 2:response = _context3.sent;

                        console.log(response.data);return _context3.abrupt("return",
                        response.data);case 5:case "end":return _context3.stop();}}}, _callee3, this);}));return function HttpGet(_x6, _x7, _x8) {return _ref3.apply(this, arguments);};}();

var Jx3FireworksGet = function () {var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(url, param, Cookie) {var response;return _regenerator2.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:
                        console.log('https://www.jx3mm.com' + url + "?server=" + param.server + "&name=" + param.name);_context4.next = 3;return (
                            axios({
                                method: "GET",
                                headers: Cookie,
                                url: 'https://www.jx3mm.com' + url,
                                params: param }));case 3:response = _context4.sent;return _context4.abrupt("return",

                        response.data.code == '200' ? response.data.result : {});case 5:case "end":return _context4.stop();}}}, _callee4, this);}));return function Jx3FireworksGet(_x9, _x10, _x11) {return _ref4.apply(this, arguments);};}();exports.default =

{ Jx3ApiPOST: Jx3ApiPOST, Jx3DtPOST: Jx3DtPOST, Jx3FireworksGet: Jx3FireworksGet, HttpGet: HttpGet };module.exports = exports['default'];
//# sourceMappingURL=http.js.map