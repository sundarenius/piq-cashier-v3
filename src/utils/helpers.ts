import type { Config } from 'types/globals';
import {
  initialConfig,
  ConfigKeys,
  NotInitialCrucialConfig,
  Paths,
  ShowAccounts,
} from 'types/globals';
import API from 'service/service';
import { store } from 'redux/store';
import { v4 as uuidv4 } from 'uuid';

export const urlParamsToObject = () => {
  const urlSearch = window.location.search.substring(1);
  const params = urlSearch
    ? JSON.parse(`{"${decodeURI(urlSearch).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"')}"}`)
    : '';
  return params;
};

const formatConfigValue = (value: string) => {
  switch (value) {
    case 'true':
      return true;
    case 'false':
      return false;
    default:
      return value;
  }
};

const filterValidConfig = (
  config: Record<string, any>,
  filterBy: string[],
): { validConfig: Partial<Config>, inValidConfig: Record<any, any>} => {
  const validConfig: Partial<Config> = {};
  const inValidConfig: Record<any, any> = {};
  const validKeys: string[] = filterBy;
  const configKeys: any[] = Object.keys(config);

  configKeys.forEach((key) => {
    if (validKeys.includes(key)) {
      validConfig[key] = formatConfigValue(config[key]);
    } else {
      inValidConfig[key] = formatConfigValue(config[key]);
    }
  });

  return {
    validConfig,
    inValidConfig,
  };
};

interface GetFetchConfigReturnConfig extends Partial<Config> {
  attributes?: Record<string, any>,
  theme?: Record<any, any>
}
interface GetFetchConfigReturn {
  config: GetFetchConfigReturnConfig,
  css: string
}
const getFetchConfig = async (configParameter: Config): Promise<GetFetchConfigReturn> => {
  const {
    merchantId,
    userId,
    sessionId,
    method,
    locale,
    channelId,
    country,
  } = configParameter;
  const fetchConfig = await API.fetchConfigService({
    merchantId,
    userId,
    sessionId,
    method,
    locale,
    channelId,
    country,
    queryAttributes: '',
  });

  const config = JSON.parse(fetchConfig.config);
  const { css } = fetchConfig;

  const { validConfig } = filterValidConfig(config, Object.values(NotInitialCrucialConfig));

  return {
    config: validConfig,
    css,
  };
};

const formatAttributesAndThemeConfigs = (configs): { attributes: Record<any, any>, themeConfigs: Record<string, any>} => {
  const themeConfigs: Record<string, any> = {};
  const attributes: Record<any, any> = {};
  const configEntries = Object.entries(configs);
  const configEntriesAsString: string = configEntries.flat().join(' ');

  // no need to loop if there is none of these
  if (!configEntriesAsString.includes('theme_') && !configEntriesAsString.includes('attributes.')) {
    return {
      attributes,
      themeConfigs,
    };
  }

  configEntries.forEach((val) => {
    const key: string = val[0];
    if (key.includes('theme_')) {
      const themeSplit = key.split('_').filter((v, i) => i > 0);
      const outerKey = themeSplit[0];
      const innerKey = themeSplit[1];
      if (!themeConfigs[outerKey]) {
        themeConfigs[outerKey] = {};
      }

      themeConfigs[outerKey][innerKey] = decodeURIComponent(val[1] as string);
    }
    if (key.includes('attributes.')) {
      const attributesSplit = key.split('.').filter((v, i) => i > 0);
      const attributeKey = attributesSplit[0];
      const value = val[1];
      attributes[attributeKey] = value;
    }
  });

  const data = {
    themeConfigs,
    attributes,
  };

  console.log(data);

  return data;
};

export const setInitialConfigs = async (dispatch, contextActions, themeActions) => {
  const urlParams = urlParamsToObject();
  // inValidConfig is probably config not belonging to standard config, like theme and attributes
  const { validConfig, inValidConfig } = filterValidConfig(urlParams, Object.values(ConfigKeys));
  const {
    themeConfigs,
    attributes,
  } = formatAttributesAndThemeConfigs(inValidConfig);

  const config: Config = {
    ...initialConfig,
    ...validConfig,
  };

  dispatch(themeActions.setTheme(themeConfigs));
  dispatch(contextActions.setAttributes(attributes));
  // The app reacts and loads once setDefaultConfig is set, then it will wait for config:
  dispatch(contextActions.setDefaultConfig(config));

  if (config[ConfigKeys.FETCH_CONFIG]) {
    const {
      config: fetchConfig,
      css = false,
    } = await getFetchConfig(config);
    if (css) addCssToHead(css, 'piq-fetch-config-css');

    if (fetchConfig.attributes) dispatch(contextActions.setAttributes(fetchConfig.attributes));
    if (fetchConfig.theme) dispatch(contextActions.setTheme(fetchConfig.theme));
    const { validConfig: validFetchConfig } = filterValidConfig(fetchConfig, Object.values(ConfigKeys));
    dispatch(contextActions.setConfig(validFetchConfig));
  } else {
    dispatch(contextActions.setConfig(config));
  }
};

const handleInitRoute = (config, historyPush) => {
  const paths: string[] = Object.values(Paths);
  const isValidPath: boolean = paths.includes(window.location.pathname);

  // Handle initial route here make this better and look for configs and make a switch
  if (!isValidPath) {
    historyPush(Paths.LIST_PAYMENT_METHODS);
  }
};

export const getShouldLoadApp = async ({
  setShouldLoadApp,
  config,
  currentRouteData,
  historyPush,
  dispatch,
  contextActions,
}) => {
  console.log(config);

  handleInitRoute(config, historyPush);

  const initRequestsCallback = async () => currentRouteData.initRequests({
    config,
    dispatch,
    contextActions,
  });

  await initRequestsCallback();

  setShouldLoadApp(Boolean(config));
};

export const getMinDate = () => {
  const { txDateRange } = store.getState().context;
  const date = new Date();
  const fromDate = date.setDate(date.getDate() - txDateRange);
  const fromDateFormatted = new Date(fromDate).toISOString().substring(0, 10);

  return `${fromDateFormatted}+00:00:00`;
};

export const addCssToHead = (css: string, id: string) => {
  const styleEl: HTMLElement = document.createElement('style');
  const head: HTMLElement|null = document.querySelector('head');
  styleEl.id = id;
  const cleanedCss = css.replace(/null/g, '');

  if (head) {
    head.innerHTML += `<style ${id ? `id=${id}` : ''}>${cleanedCss}</style>`;
  }
};

export const isUserMobile = () => {
  const navigatorData: any = window.navigator;
  const check = navigatorData.userAgentData.mobile;
  return check;
};

export const getPaymentMethodName = (method: any, t: any) => {
  const { service, providerType, type } = method;
  return (service && t(service.toLowerCase()))
    || (providerType && t(providerType.toLowerCase()))
    || (type && t(type.toLowerCase()));
};

export const getPaymentMethodSubheader = (method: any, t: any) => {
  const { service, providerType, type } = method;
  const getSubheader = (str: string) => t(`${str.toLowerCase()}_subheader`);
  return (service && getSubheader(service))
    || (providerType && getSubheader(providerType))
    || (type && getSubheader(type));
};

export const formatPaymentMethods = (paymentMethods: any, config: Config) => {
  const paymentMethodsData = paymentMethods.data[0].methods.map((method) => {
    const methodData = {
      ...method,
      uuid: uuidv4(),
    };
    if (methodData.accounts && methodData.accounts.length > 0) {
      methodData.accounts.forEach((account) => {
        account.uuid = uuidv4();
        if (methodData.logoUrl) account.logoUrl = methodData.logoUrl;
      });
    }
    return methodData;
  });

  console.log('config from formatPaymentMethods');
  console.log(config);

  return paymentMethodsAsConfig(paymentMethodsData, config);
};

const sortListFirstPaymentMethods = (paymentMethods: any) => {
  let result: any[] = [];

  paymentMethods.forEach((method: any) => {
    if (method.accounts && method.accounts.length > 0) {
      result = [
        ...result,
        ...method.accounts.filter((val) => val.status === 'ACTIVE') as any[],
      ];
    }
  });

  return [
    ...result,
    ...paymentMethods,
  ];
};

export const paymentMethodsAsConfig = (paymentMethods: any, config: Partial<Config>|null) => {
  const { showAccounts: sa } = config || {};
  const showAccounts = sa?.toString();

  switch (showAccounts) {
    default:
    case ShowAccounts.LIST_FIRST:
      return sortListFirstPaymentMethods(paymentMethods);
    case ShowAccounts.LIST_WITH_PM:
      return paymentMethods; // needs to sorted
    case ShowAccounts.INLINE:
      return paymentMethods; // as is
    case ShowAccounts.FALSE:
      return paymentMethods.map((method) => ({
        ...method,
        accounts: null,
      }));
  }
};

export const getLogoUrl = (paymentMethod: any) => {
  const { service, providerType, type, logoUrl } = paymentMethod;
  if (logoUrl) return logoUrl;

  // Fallback ...
  const baseUrl = 'https://static.paymentiq.io/';

  const formatUrl = (str: string) => `${baseUrl}${str.toLowerCase()}.png`;

  // Skip translations as in CashierV2, upload via BO2 only

  return (service && formatUrl(service))
    || (providerType && formatUrl(providerType))
    || (type && formatUrl(type));
};
