import { AllGroupsName, RequestType } from './type';
import { RouteTableGroupRoot } from './type';
/**
 * auth_center
 * 用户登录，注册，登出系统路由
 * @signIn 登录
 * @signOut 登出
 * @signUp 注册
 */
export enum AuthCenterRouteTableOperate {
  /**
   * 登录
   */
  signIn = 'signIn',
  /**
   * 登出
   */
  signOut = 'signOut',
  /**
   * 注册
   */
  signUp = 'signUp'
}

// console.log(AllGroupsName.AuthCenter);

// export type AuthCenterRouteTableOperateType = 'signIn' | 'signOut' | 'signUp';
const auth_center_route_table: RouteTableGroupRoot = {
  name: AllGroupsName.AuthCenter,
  isGroupRoot: true,
  // eslint-disable-next-line max-len
  children: [
    {
      name: AuthCenterRouteTableOperate.signIn /* 登录*/,
      method: RequestType.POST,
      operate: AuthCenterRouteTableOperate.signIn
    },
    {
      name: AuthCenterRouteTableOperate.signOut /* 登出*/,
      method: RequestType.GET,
      operate: AuthCenterRouteTableOperate.signOut
    },
    {
      name: AuthCenterRouteTableOperate.signUp /* 注册*/,
      method: RequestType.POST,
      operate: AuthCenterRouteTableOperate.signUp
    }
  ]
};

export default auth_center_route_table;
