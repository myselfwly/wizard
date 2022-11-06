// eslint-disable-next-line max-len
import { NextFunction } from 'express';
import { exReq, exRes } from '../../../declear';
import auth_center_route_table, { AuthCenterRouteTableOperate } from '../../../server/routeTable/auth_center';
import { routeGroupParser } from '../../../utils/route_utils';
import { signIn } from './signIn';
import { signOut } from './signOut';
import { signUp } from './signUp';
let auth_center: {
  [AuthCenterRouteTableOperate.signIn]: (req: exReq, res: exRes, next: NextFunction) => void;
  [AuthCenterRouteTableOperate.signOut]: (req: exReq, res: exRes, next: NextFunction) => void;
  [AuthCenterRouteTableOperate.signUp]: (req: exReq, res: exRes, next: NextFunction) => void;
} = {
  [AuthCenterRouteTableOperate.signIn]: (req: exReq, res: exRes, next: NextFunction) => {},
  [AuthCenterRouteTableOperate.signOut]: (req: exReq, res: exRes, next: NextFunction) => {},
  [AuthCenterRouteTableOperate.signUp]: (req: exReq, res: exRes, next: NextFunction) => {}
};
const auth_center_group = routeGroupParser(auth_center_route_table);
auth_center_group.children.forEach(item => {
  switch (item[2]) {
    case AuthCenterRouteTableOperate.signIn:
      auth_center[item[2]] = signIn;
      break;
    case AuthCenterRouteTableOperate.signOut:
      auth_center[item[2]] = signOut;
      break;
    case AuthCenterRouteTableOperate.signUp:
      auth_center[item[2]] = signUp;
      break;
    default:
      new Error('please check code!');
  }
});
export { auth_center };
