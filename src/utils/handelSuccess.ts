import AppCode from './appCode';
import HttpStatusCode from './HttpStatusCode';

/**
 * 成功返回数据标准格式
 */
class AppSuccess {
  /**
   * 响应Http状态码
   */
  statusCode: HttpStatusCode;
  /**
   * 信息，可空字符串
   */
  msg: string;
  /**
   * APP状态码，需从AppCode取
   *
   */
  appCode: AppCode;
  /**
   * 返回数据，可选
   */
  data: any;
  /**
   *
   * @param msg 信息，可空字符串默认为success
   * @param appCode APP响应码，需从AppCode取
   * @param data 返回数据，可选
   */
  constructor(msg: string /**信息，可空字符串 */, appCode: AppCode /**APP状态码，需从AppCode取 */, data?: any /**返回数据，可选 */) {
    this.msg = msg ? msg : 'success';
    this.statusCode = HttpStatusCode.OK;
    this.appCode = appCode;
    this.data = data;
  }
}
export default AppSuccess;
