import { Router } from 'express';
import operate from '../../business/operate';
import { routeRootParser } from '../../utils/route_utils';
import { routeTable } from '../routeTable';
import { AllGroupsName } from '../routeTable/type';
import { auth_center_route } from './auth_center';

const appRoute: { [key: string]: Router } = {};
const allGroup = routeRootParser(routeTable);

allGroup?.forEach(item => {
  switch (item) {
    case AllGroupsName.AuthCenter:
      appRoute[item] = auth_center_route;
  }
});
export default appRoute;
