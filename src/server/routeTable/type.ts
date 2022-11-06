/**
 * 路由表结构定义
 */
export type Method = 'get' | 'post';
type GroupInfoChildrenItem = [string, Method, string];
export interface RouteTableItem {
  name: string; //路由名称
  method?: Method;
  operate?: string;
  children?: RouteTableItem[]; //子节点
}
export interface RouteTableRoot extends RouteTableItem {
  isRoot: true; //是否是根节点
}
export interface RouteTableGroupRoot extends RouteTableItem {
  isGroupRoot: true; //是否是组节点
}
export interface GroupInfo {
  groupRoot: string; //组根节点
  children: GroupInfoChildrenItem[]; //组子节点
}

export enum AllGroupsName {
  /**
   * 用户权限中心
   */
  AuthCenter = 'auth_center'
}
export enum RequestType {
  /**
   * post请求
   */
  POST = 'post',
  /**
   * get请求
   */
  GET = 'get'
}
