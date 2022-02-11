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
  ALLOW_CANCEL_PENDING_WITHDRAWAL  = 'allowCancelPendingWithdrawal'
}

export const ConfigKeys = {
  ...InitialCrucialConfig,
  ...NotInitialCrucialConfig
}

export enum Mode {
  GAMBLING = 'gambling',
  ECOMMERCE = 'ecommerce',
  ACCOUNT_VERIFICATION = 'accountVerification'
}

export enum Methods {
  DEPOSIT = 'deposit',
  WITHDRAWAL = 'withdrawal'
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
  [ConfigKeys.ALLOW_CANCEL_PENDING_WITHDRAWAL]: boolean
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
  [ConfigKeys.ALLOW_CANCEL_PENDING_WITHDRAWAL]: false
}


export enum InitRequests {
  PAYMENT_METHODS = 'payment methods',
  TRANSLATIONS = 'translations',
  TRANSACTIONS = 'transactions',
  FETCH_CONFIG = 'fetch config'
}
