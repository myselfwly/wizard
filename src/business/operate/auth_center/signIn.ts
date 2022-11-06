import { NextFunction } from 'express';
import { exReq, exRes } from '../../../declear';
import AppCode from '../../../utils/appCode';
import AppSuccess from '../../../utils/handelSuccess';
import AppError from '../../../utils/handleError';
import HttpStatusCode from '../../../utils/HttpStatusCode';
import formDataParser from '../../../utils/operation/formDataParser';
import { auth_center_sql } from '../../../db/SQL/index';
import { appQuery } from '../../../db';
interface ResBodyType {
  userName: string;
  password: string;
  VerificationCode?: string;
}
interface DoSignInParam {
  userName: string;
  password: string;
  VerificationCode?: string;
}

const checkInfo = async (param: DoSignInParam) => {
  const { userName, password } = param;
  const sql = auth_center_sql.checkUser(userName, password);
  const resault: any[] = await appQuery(sql);
  return resault.length === 1;
};

/**
 * 设置Session
 * @param req request
 * @param res resault
 * @param userName  用户名
 */
const setSession = (req: exReq, res: exRes, userName: string, appSuccess: AppSuccess) => {
  const session = req.session; // 获得session
  req.session.regenerate(function (err) {
    if (err) {
      return res.json(new AppError('登录失败', HttpStatusCode.UNAUTHORIZED, AppCode.UNKNOW, err));
    }
    req.session.user = userName;
    res.json({ appSuccess });
  });

  // res.setHeader('set-cookies', session['key']); // 保存cookie在headers中(这里修改了session，服务器会自动生成set-cookie字段)
  //   res.end(html); // 发送给客户端
};
/**
 *
 * @param param 用户登录信息
 * @param req request
 * @param res result
 */
const doSigin = async (param: DoSignInParam, req: exReq, res: exRes) => {
  const resault = await checkInfo(param);
  let msg: string;
  let appCode: AppCode;
  if (resault) {
    msg = 'success';
    appCode = AppCode.OK;
    setSession(req, res, param.userName, new AppSuccess(msg, appCode));
  } else {
    msg = '用户名或密码错误！！';
    appCode = AppCode.PARM_ERR;
    res.json(new AppSuccess(msg, appCode));
  }
};
/**
 * 登陆接口入口
 * @param req
 * @param res
 * @param next
 */
export const signIn = async (req: exReq, res: exRes, next: NextFunction) => {
  const resault = await formDataParser<ResBodyType>(req, res);

  const { userName, password } = resault;
  await doSigin({ userName, password }, req, res);
};
