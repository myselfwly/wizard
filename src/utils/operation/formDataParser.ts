import { upload } from '../..';
import { exReq, exRes } from '../../declear';
/**
 * 处理文字类formData数据
 * @param req request 请求消息
 * @param res resault 返回消息
 * @returns promise 建议使用 async 函数 用 await 来接收结果
 */
function formDataParser<T>(req: exReq, res: exRes): Promise<T> {
  return new Promise(resolve => {
    upload.any()(req, res, err => {
      if (err) {
        console.log(err);
        resolve(err);
        return;
      }
      resolve({ ...req.body });
    });
  });
}

export default formDataParser;
