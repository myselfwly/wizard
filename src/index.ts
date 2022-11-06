import express from 'express'; //express框架
import cors from 'cors'; //跨域解决
import compression from 'compression'; //压缩文件
import bodyParser from 'body-parser';
// import fs from 'fs'; //文件系统
import path from 'path'; //路径系统
import { exReq, exRes } from './declear'; //类型声明系统
import session from 'express-session'; //session系统
// import csurf from 'csurf';
import FileStore from 'session-file-store'; //session会话文件存储
import { routeTable } from './server/routeTable'; //路由表
import { routeRootParser } from './utils/route_utils'; //路由表解析器
import AppError from './utils/handleError'; //错误处理
import HttpStatusCode from './utils/HttpStatusCode'; // Http状态码
import appRoute from './server/router'; //路由系统
import multer from 'multer'; //form表单系统
import fs from 'fs';
import AppSuccess from './utils/handelSuccess';
import AppCode from './utils/appCode';
const upload = multer({ dest: path.resolve(__dirname, '../upload') });
//上传文件保存
//新建express服务
const app = express();
//app在那个端口启动
const port = 8089;
const SessionStore = FileStore(session);
const store = new SessionStore({ path: path.resolve(__dirname, '../sessions') });
const identityKey = 'JESONID';
//压缩规则
function shouldCompress(req: exReq, res: exRes): boolean {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false;
  }

  // fallback to standard filter function
  return compression.filter(req, res);
}
//压缩文件，解析JSON，session初始化，允许跨域
app.use([
  compression({ filter: shouldCompress }),
  bodyParser.urlencoded({ extended: true }),
  bodyParser.json(),
  session({
    name: identityKey,
    secret: 'chyingp', // 用来对session id相关的cookie进行签名
    store: store, // 本地存储session（文本文件，也可以选择其他store，比如redis的）
    saveUninitialized: false, // 是否自动保存未初始化的会话，建议false
    resave: false, // 是否每次都重新保存会话，建议false
    cookie: {
      maxAge: 3 * 60 * 1000 // 有效期，单位是毫秒
    },
    rolling: true
  }),
  cors()
  // csurf()
]);
app.get('/', (req, res) => {
  fs.readFile(path.resolve(__dirname, './webapp/app.html'), (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
      });
      res.end(data);
    }
  });
});
//未登录
app.all([/^(?!\/auth_center).*/], (req, res, next) => {
  if (!req.session.user) {
    res.status(HttpStatusCode.OK).json(new AppSuccess('No signIn !!! Please signIn!!', AppCode.NO_SIGNIN));
  } else {
    next();
  }
});
//路由系统遍历
const routeGroup = routeRootParser(routeTable);
routeGroup?.forEach(item => {
  // console.log('/' + item, appRoute[item]);
  app.use('/' + item, appRoute[item]);
});

app.get('/home', (req, res, next) => {
  res.status(HttpStatusCode.OK).json({ res: 'res' });
});
//所有路由走完还未找到返回404
app.all('*', (req, res, next) => {
  next(new AppError(`The URL ${req.originalUrl} does not exists`, HttpStatusCode.NOT_FOUND, AppCode.UNKNOW));
});
//启动服务
app.listen(port, () => {
  console.log('App listerning on port: ' + port + '\n' + 'click to look: http://localhost:' + port);
});
export { upload, identityKey };
