"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express")); //express框架
var cors_1 = __importDefault(require("cors")); //跨域解决
var compression_1 = __importDefault(require("compression")); //压缩文件
var express_session_1 = __importDefault(require("express-session"));
var csurf_1 = __importDefault(require("csurf"));
var session_file_store_1 = __importDefault(require("session-file-store"));
//新建express服务
var app = (0, express_1.default)();
//app在那个端口启动
var port = 8089;
var SessionStore = (0, session_file_store_1.default)(express_session_1.default);
var store = new SessionStore();
var identityKey = 'JESONID';
//压缩规则
function shouldCompress(req, res) {
    if (req.headers['x-no-compression']) {
        // don't compress responses with this request header
        return false;
    }
    // fallback to standard filter function
    return compression_1.default.filter(req, res);
}
//解析JSON,压缩文件
app.use([
    express_1.default.json(),
    (0, compression_1.default)({ filter: shouldCompress }),
    (0, express_session_1.default)({
        name: identityKey,
        secret: 'chyingp',
        store: store,
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 3 * 60 * 1000 // 有效期，单位是毫秒
        }
    }),
    (0, cors_1.default)(),
    (0, csurf_1.default)()
]);
app.get('/login', function (req, res) {
    res.send('hello');
});
app.get('/', function (req, res) {
    //   const html = fs.readFileSync(path.resolve(__dirname, './webapp/app.html'), 'utf-8');
    var session = req.session; // 获得session
    req.session.regenerate(function (err) {
        if (err) {
            return res.json({ ret_code: 2, ret_msg: '登录失败' });
        }
        req.session.loginUser = 'user';
        res.json({ ret_code: 0, ret_msg: '登录成功' });
    });
    console.log(session);
    //   res.setHeader('set-cookies', session['key']); // 保存cookie在headers中(这里修改了session，服务器会自动生成set-cookie字段)
    //   res.end(html); // 发送给客户端
});
app.get('/home', function (req, res) {
    var session = req.session; // 获得session
    console.log(session);
    req.session.destroy(function (err) {
        if (err) {
            res.json({ ret_code: 2, ret_msg: '退出登录失败' });
            return;
        }
        // req.session.loginUser = null;
        res.clearCookie(identityKey);
        res.redirect('/login');
    });
    //   res.setHeader('set-cookies', session['key']); // 保存cookie在headers中(这里修改了session，服务器会自动生成set-cookie字段)
    //   res.send('hello'); // 发送给客户端
});
//启动服务
app.listen(port, function () {
    console.log('App listerning on port: ' + port);
});
//# sourceMappingURL=index.js.map