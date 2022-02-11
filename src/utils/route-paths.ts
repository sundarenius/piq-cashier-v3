import type { FC } from 'react';
import { lazy } from 'react';
import { Paths } from 'types/globals';

const ListPaymentMethods = lazy(() => import('pages/ListPaymentMethods'));
const PaymentMethod = lazy(() => import('pages/PaymentMethod'));
const Status = lazy(() => import('pages/Status'));

interface RouteData {
  path: Paths,
  cmpnt: FC,
  initLoader?: boolean
}

export const routes = (): RouteData[] => ([
  {
    path: Paths.LIST_PAYMENT_METHODS,
    cmpnt: ListPaymentMethods
  },
  {
    path: Paths.PAYMENT_METHOD,
    cmpnt: PaymentMethod
  },
  {
    path: Paths.STATUS,
    cmpnt: Status,
    initLoader: false
  }
]);
