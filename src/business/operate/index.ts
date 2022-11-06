import { NextFunction } from 'express';
import { exReq, exRes } from '../../declear';
import { routeTable } from '../../server/routeTable';
import { AllGroupsName } from '../../server/routeTable/type';
import { routeRootParser } from '../../utils/route_utils';
import { auth_center } from './auth_center';

const operate: { [key: string]: { [key: string]: (req: exReq, res: exRes, next: NextFunction) => void } } = {};

const allGroup = routeRootParser(routeTable);

allGroup?.forEach(item => {
  switch (item) {
    case AllGroupsName.AuthCenter:
      operate[item] = { ...auth_center };
  }
});
export default operate;
