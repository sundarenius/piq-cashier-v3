import { FC } from 'react';
import { Paths } from 'types/globals';
import ListPaymentMethods from 'pages/ListPaymentMethods';
import PaymentMethod from 'pages/PaymentMethod';
import Status from 'pages/Status';

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
