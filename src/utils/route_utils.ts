import { GroupInfo, Method, RouteTableGroupRoot, RouteTableItem, RouteTableRoot } from '../server/routeTable/type';
/**
 * @function routeTableToPath   路由表转路径
 * @param routeTable 路由表
 * @returns 路径数组
 */
function routeTableToPath(routeTable: RouteTableItem | RouteTableRoot | RouteTableGroupRoot): string[] {
  let routePathMap: string[] = [];
  const loop = (routeTable: RouteTableItem | RouteTableRoot | RouteTableGroupRoot, pathStr: string = '') => {
    let addPath = pathStr + (routeTable.name === '' ? '' : '/') + routeTable.name;
    if (routeTable.children && routeTable.children.length > 0) {
      routeTable.children.forEach(item => {
        loop(item, addPath);
      });
    } else {
      routePathMap.push(addPath);
    }
  };
  loop(routeTable);
  return routePathMap;
}
/**
 * @function routeGroupParser 解析路由表的组节点
 * @param routeTable 路由表组节点
 * @returns 组节点信息
 */
function routeGroupParser(routeTable: RouteTableGroupRoot): GroupInfo {
  let groupInfo: GroupInfo = {
    groupRoot: routeTable.name,
    children: []
  };
  const loop = (routes: RouteTableItem[], path: string = '') => {
    routes.forEach(item => {
      let routePath = path;
      routePath += '/' + item.name;
      if (item.children && item.children.length > 0) {
        loop(item.children, routePath);
      } else {
        groupInfo.children.push([routePath, item.method as Method, item.operate as string]);
      }
    });
  };
  loop(routeTable.children ?? []);
  return groupInfo;
}
/**
 * @function routeRootParser 解析路由表节点
 * @param routeTable 路由表
 * @returns 组节点
 */
function routeRootParser(routeTable: RouteTableRoot): string[] | undefined {
  return routeTable.children?.map(({ name }) => name);
}
export { routeTableToPath, routeGroupParser, routeRootParser };
