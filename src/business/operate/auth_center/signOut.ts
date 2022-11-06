import { NextFunction } from 'express';
import { identityKey } from '../../..';
import { exReq, exRes } from '../../../declear';
import AppCode from '../../../utils/appCode';
import AppSuccess from '../../../utils/handelSuccess';
import HttpStatusCode from '../../../utils/HttpStatusCode';
const doSignOut = (req: exReq, res: exRes) => {
  req.session.destroy(function (err) {
    if (err) {
      res.json(new AppSuccess('error', AppCode.UNKNOW, err));
      return;
    }
    res.clearCookie(identityKey);
    res.status(HttpStatusCode.OK).json(new AppSuccess('', AppCode.OK));
  });
};
export const signOut = (req: exReq, res: exRes, next: NextFunction) => {
  doSignOut(req, res);
};
