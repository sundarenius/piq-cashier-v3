import type { FC } from 'react';
import { lazy } from 'react';
import { Paths, ConfigKeys } from 'types/globals';
import type { PageProps } from 'types/globals';
import API from 'service/service';
import { initTranslations } from 'utils/translations';
import {
  formatPaymentMethods,
} from 'utils/helpers';

const ListPaymentMethods = lazy(() => import('pages/ListPaymentMethods'));
const PaymentMethod = lazy(() => import('pages/PaymentMethod'));
const Status = lazy(() => import('pages/Status'));
const Transactions = lazy(() => import('pages/Transactions'));

interface RouteData {
  path: Paths,
  cmpnt: FC<PageProps>,
  initLoader?: boolean,
  initRequests: (params: any) => void,
  id: string
}

export const standardInitRequests = async ({ config, dispatch, contextActions }) => {
  const paymentMethodsRes = API.fetchPaymentMethods(config);
  const translationsRes = API.fetchTranslations(config);
  const [paymentMethods, translations] = await Promise.all([paymentMethodsRes, translationsRes]);
  initTranslations(translations);
  const paymentMethodsData = formatPaymentMethods(paymentMethods, config);

  if (config[ConfigKeys.AUTO_OPEN_FIRST_PAYMENT_METHOD]) {
    dispatch(contextActions.setActivePaymentMethod(paymentMethodsData[0]));
  }

  dispatch(contextActions.setPaymentMethods(paymentMethodsData));
  return true;
};

const statusInitRequests = async ({ config }) => {
  const translationsRes = API.fetchTranslations(config);
  const [translations] = await Promise.all([translationsRes]);
  initTranslations(translations);
  return true;
};

const transactionsInitRequests = async ({ config, dispatch, contextActions }) => {
  const translationsRes = API.fetchTranslations(config);
  const transactionsRes = API.fetchTransactionHistory(config);
  const [translations, transactions] = await Promise.all([translationsRes, transactionsRes]);
  initTranslations(translations);
  dispatch(contextActions.setTransactionsHistory(transactions));
  return true;
};

export const routes = (): RouteData[] => {
  const data = [
    {
      path: Paths.LIST_PAYMENT_METHODS,
      cmpnt: ListPaymentMethods,
      initRequests: standardInitRequests,
    },
    {
      path: Paths.PAYMENT_METHOD,
      cmpnt: PaymentMethod,
      initRequests: standardInitRequests,
    },
    {
      path: Paths.STATUS,
      cmpnt: Status,
      initLoader: false,
      initRequests: statusInitRequests,
    },
    {
      path: Paths.TRANSACTIONS,
      cmpnt: Transactions,
      initRequests: transactionsInitRequests,
    },
  ];

  return data.map((pathData: any) => ({
    ...pathData,
    id: `${pathData.path.replace('/', '').toLowerCase()}-container`,
  }));
};
