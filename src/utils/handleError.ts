import AppCode from './appCode';
import HttpStatusCode from './HttpStatusCode';

class AppError extends Error {
  statusCode: HttpStatusCode;
  error: string;
  errorDes: any;
  isOperational: boolean;
  appCode: AppCode | undefined;
  /**
   *
   * @param msg 错误信息
   * @param statusCode 返回的Http状态码
   * @param appCode APP响应码
   * @param err 报错信息
   */
  constructor(msg: string, statusCode: HttpStatusCode, appCode: AppCode, err: any = 'no description') {
    super(msg);
    this.appCode = appCode;
    this.statusCode = statusCode;
    this.error = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    this.errorDes = err;
    Error.captureStackTrace(this, this.constructor);
  }
}
export default AppError;
