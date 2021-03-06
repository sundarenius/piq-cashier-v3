export enum Paths {
  LIST_PAYMENT_METHODS = '/list-payment-methods',
  PAYMENT_METHOD = '/payment-method',
  STATUS = '/status',
  TRANSACTIONS = '/transactions'
}

export enum Environments {
  PRODUCTION = 'production',
  TEST = 'test',
  DEVELOPMENT = 'development',
}

export interface PageProps {
  id: string,
  path: Paths
}

enum InitialCrucialConfig {
  MERCHANT_ID = 'merchantId',
  USER_ID = 'userId',
  SESSION_ID = 'sessionId',
  ENVIRONMENT = 'environment',
  METHOD = 'method',
  CONTAINER_WIDTH = 'containerWidth',
  CONTAINER_HEIGHT = 'containerHeight',
  FETCH_CONFIG = 'fetchConfig',
}

export enum NotInitialCrucialConfig {
  MODE = 'mode',
  COUNTRY = 'country',
  LOCALE = 'locale',
  CHANNEL_ID = 'channelId',
  ALLOW_CANCEL_PENDING_WITHDRAWAL = 'allowCancelPendingWithdrawal',
  AUTO_OPEN_FIRST_PAYMENT_METHOD = 'autoOpenFirstPaymentMethod',
  LIST_TYPE = 'listType',
  SHOW_ACCOUNTS = 'showAccounts'
}

export const ConfigKeys = {
  ...InitialCrucialConfig,
  ...NotInitialCrucialConfig,
};

export enum Mode {
  GAMBLING = 'gambling',
  ECOMMERCE = 'ecommerce',
  ACCOUNT_VERIFICATION = 'accountVerification'
}

export enum Methods {
  DEPOSIT = 'deposit',
  WITHDRAWAL = 'withdrawal'
}

export enum ListTypes {
  LIST = 'list',
  GRID = 'grid'
}

export enum ShowAccounts {
  LIST_FIRST = 'list-first',
  LIST_WITH_PM = 'list-with-pm',
  INLINE = 'inline',
  FALSE = 'false'
}

type StringNumber = string|number

export interface Config {
  [ConfigKeys.MERCHANT_ID]: StringNumber,
  [ConfigKeys.USER_ID]: StringNumber,
  [ConfigKeys.SESSION_ID]: StringNumber,
  [ConfigKeys.ENVIRONMENT]: Environments,
  [ConfigKeys.METHOD]: Methods,
  [ConfigKeys.COUNTRY]: string,
  [ConfigKeys.LOCALE]: null|string,
  [ConfigKeys.CONTAINER_WIDTH]: string,
  [ConfigKeys.CONTAINER_HEIGHT]: string,
  [ConfigKeys.MODE]: Mode,
  [ConfigKeys.FETCH_CONFIG]: boolean,
  [ConfigKeys.CHANNEL_ID]: string|null,
  [ConfigKeys.ALLOW_CANCEL_PENDING_WITHDRAWAL]: boolean,
  [ConfigKeys.AUTO_OPEN_FIRST_PAYMENT_METHOD]: boolean,
  [ConfigKeys.LIST_TYPE]: ListTypes,
  [ConfigKeys.SHOW_ACCOUNTS]: ShowAccounts
}

export const initialConfig: Config = {
  [ConfigKeys.MERCHANT_ID]: 1000,
  [ConfigKeys.USER_ID]: 123,
  [ConfigKeys.SESSION_ID]: 123,
  [ConfigKeys.ENVIRONMENT]: Environments.TEST,
  [ConfigKeys.METHOD]: Methods.DEPOSIT,
  [ConfigKeys.COUNTRY]: 'swe',
  [ConfigKeys.LOCALE]: null,
  [ConfigKeys.CONTAINER_WIDTH]: '600px',
  [ConfigKeys.CONTAINER_HEIGHT]: '100%',
  [ConfigKeys.MODE]: Mode.GAMBLING,
  [ConfigKeys.FETCH_CONFIG]: false,
  [ConfigKeys.CHANNEL_ID]: null,
  [ConfigKeys.ALLOW_CANCEL_PENDING_WITHDRAWAL]: false,
  [ConfigKeys.AUTO_OPEN_FIRST_PAYMENT_METHOD]: true,
  [ConfigKeys.LIST_TYPE]: ListTypes.LIST,
  [ConfigKeys.SHOW_ACCOUNTS]: ShowAccounts.LIST_FIRST,
};

export enum TxDateRanges {
  TODAY = 0,
  YESTERDAY = 1,
  LAST_WEEK = 10,
  LAST_MONTH = 31
}
