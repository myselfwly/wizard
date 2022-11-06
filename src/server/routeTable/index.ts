import auth_center from './auth_center';
import { RouteTableRoot } from './type';
/**
 * @routeTable 路由表
 *
 */
export const routeTable: RouteTableRoot = { name: '', isRoot: true, children: [{ ...auth_center }] };
