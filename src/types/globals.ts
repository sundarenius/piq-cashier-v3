export enum Paths {
  LIST_PAYMENT_METHODS = '/list-payment-methods',
  PAYMENT_METHOD = '/payment-method',
  STATUS = '/status',
}

export enum Environments {
  PRODUCTION = 'production',
  TEST = 'test',
  DEVELOPMENT = 'development',
}

enum InitialCrucialConfig {
  CONTAINER_WIDTH = 'containerWidth',
  CONTAINER_HEIGHT = 'containerHeight',
  FETCH_CONFIG = 'fetchConfig',
}

enum NotInitialCrucialConfig {
  MODE = 'mode'
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

export interface Config {
  [ConfigKeys.CONTAINER_WIDTH]: string,
  [ConfigKeys.CONTAINER_HEIGHT]: string,
  [ConfigKeys.MODE]: Mode,
  [ConfigKeys.FETCH_CONFIG]: boolean,
}

export const initialConfig: Config = {
  [ConfigKeys.CONTAINER_WIDTH]: '600px',
  [ConfigKeys.CONTAINER_HEIGHT]: '100%',
  [ConfigKeys.MODE]: Mode.GAMBLING,
  [ConfigKeys.FETCH_CONFIG]: false
}
