import { Router } from 'express';
import operate from '../../../business/operate';
import { routeGroupParser } from '../../../utils/route_utils';
// import { routeTable } from '../../routeTable';
import auth_center_route_table from '../../routeTable/auth_center';

const auth_center_route = Router();

const auth_center_group = routeGroupParser(auth_center_route_table);
// console.log(operate, auth_center_group.groupRoot);

auth_center_group?.children.forEach(item => {
  const [path, method, fun] = [...item];
  // eslint-disable-next-line max-len
  auth_center_route.route(path)[method](operate[auth_center_group.groupRoot][fun]);
});
export { auth_center_route };
