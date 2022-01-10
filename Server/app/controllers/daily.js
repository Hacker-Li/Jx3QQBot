"use strict";exports.__esModule = true;var _regenerator = require("babel-runtime/regenerator");var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);var _http = require("../util/http");
var _Jx3Api = require("../config/Jx3Api");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}exports.default = function () {var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(
    function _callee(ctx, next) {var qdata, server, data, date, dayCamp, dayBattle, dayWar, weekFive, weekTeam, weekPublic, dayPublic, week, dayMiindo, tx, ri, richang;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                        console.log(ctx.request.body);
                        qdata = ctx.request.body;
                        server = { server: "破阵子" };
                        if (qdata.server != undefined) {
                            server.server = qdata.server;
                        }
                        console.log("服务器名称：" + server.server);_context.next = 7;return (
                            (0, _http.Jx3ApiPOST)(_Jx3Api.Jx3ApiHttp.daily, server));case 7:data = _context.sent;
                        date = data.date;
                        dayCamp = data.dayCamp;
                        dayBattle = data.dayBattle;
                        dayWar = data.dayWar;
                        weekFive = data.weekFive;
                        weekTeam = data.weekTeam;
                        weekPublic = data.weekPublic;
                        dayPublic = data.dayPublic;
                        week = data.week;
                        dayMiindo = data.dayMiindo;
                        console.log(week);
                        tx = ""; //提醒
                        ri = "";
                        if (week == "一") {
                            ri = "【祭天】19:00-21:00";
                            tx = "【提醒】记得注意帮会跑商什么时候开始！";
                        } else if (week == "二") {
                            ri = "【小攻防】20:00-22:00";
                            tx = "【提醒】19:28记得卡攻防排队！";
                        } else if (week == "三") {
                            ri = "【世界BOSS】20:00 乱世少林・灵霄峡・宗朗、乱世七秀・戏龙岛・唐阙";
                            tx = "【提醒】记得注意帮会跑商什么时候开始！";
                        } else if (week == "四") {
                            ri = "【小攻防】20:00-22:00";
                            tx = "【提醒】19:28记得卡攻防排队！";
                        } else if (week == "五") {
                            ri = "【世界BOSS】20:00";
                            tx = "【提醒】19:28记得卡攻防排队！";
                        } else if (week == "六") {
                            ri = "【大攻防】全体激情大攻防";
                            tx = "【提醒】记得一起打攻防！";
                        } else if (week == "日") {
                            ri = "【大攻防】全体激情大攻防";
                            tx = "【提醒】记得一起打攻防！";
                        }
                        richang = "\u4ECA\u5929\u662F" +
                        date + "\uFF0C\u661F\u671F" + week + "\n\u3010\u516C\u5171\u4EFB\u52A1\u3011" +
                        dayPublic + "\n\u3010\u77FF\u8F66\u3011" +
                        dayCamp + "\n\u3010\u6218\u573A\u3011" +
                        dayBattle + "\n\u3010\u5927\u6218\u3011" +
                        dayWar + "\n\u3010\u6B66\u6797\u901A\u9274\u3011" +
                        weekFive + "\n" +
                        weekTeam + "\n" +
                        weekPublic + "\n\u3010\u6218\u573A\u301112:00-1:00\n" +

                        ri + "\n" +
                        tx;return _context.abrupt("return",
                        ctx.body = richang);case 24:case "end":return _context.stop();}}}, _callee, undefined);}));return function (_x, _x2) {return _ref.apply(this, arguments);};}();module.exports = exports['default'];
//# sourceMappingURL=daily.js.map