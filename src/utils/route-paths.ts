import type { FC } from 'react';
import { lazy } from 'react';
import { Paths } from 'types/globals';

const ListPaymentMethods = lazy(() => import('pages/ListPaymentMethods'));
const PaymentMethod = lazy(() => import('pages/PaymentMethod'));
const Status = lazy(() => import('pages/Status'));
const Transactions = lazy(() => import('pages/Transactions'));

interface RouteData {
  path: Paths,
  cmpnt: FC,
  initLoader?: boolean,
  initRequests: (params: any) => void
}

export const standardInitRequests = async ({config, dispatch, contextActions}) => {
  return 'heh'
}

const statusInitRequests = async ({config, dispatch, contextActions}) => {
  return 'heh'
}

const transactionsInitRequests = async ({config, dispatch, contextActions}) => {
  return 'heh'
}

export const routes = (): RouteData[] => ([
  {
    path: Paths.LIST_PAYMENT_METHODS,
    cmpnt: ListPaymentMethods,
    initRequests: standardInitRequests
  },
  {
    path: Paths.PAYMENT_METHOD,
    cmpnt: PaymentMethod,
    initRequests: standardInitRequests
  },
  {
    path: Paths.STATUS,
    cmpnt: Status,
    initLoader: false,
    initRequests: statusInitRequests
  },
  {
    path: Paths.TRANSACTIONS,
    cmpnt: Transactions,
    initRequests: transactionsInitRequests
  }
]);
