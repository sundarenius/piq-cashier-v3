import type { FC } from 'react';
import { lazy } from 'react';
import { Paths, InitRequests } from 'types/globals';

const ListPaymentMethods = lazy(() => import('pages/ListPaymentMethods'));
const PaymentMethod = lazy(() => import('pages/PaymentMethod'));
const Status = lazy(() => import('pages/Status'));
const Transactions = lazy(() => import('pages/Transactions'));

interface RouteData {
  path: Paths,
  cmpnt: FC,
  initLoader?: boolean,
  initRequests: InitRequests[]
}

const standardInitRequests = [
  InitRequests.PAYMENT_METHODS,
  InitRequests.CONFIG,
  InitRequests.TRANSLATIONS
]

const transactions = [
  InitRequests.CONFIG,
  InitRequests.TRANSLATIONS,
  InitRequests.TRANSACTIONS
]

const status = [
  InitRequests.CONFIG,
  InitRequests.TRANSLATIONS,
]

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
    initRequests: status
  },
  {
    path: Paths.TRANSACTIONS,
    cmpnt: Transactions,
    initRequests: transactions
  }
]);
