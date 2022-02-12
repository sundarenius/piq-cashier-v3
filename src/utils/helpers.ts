import type { Config } from 'types/globals';
import {
  initialConfig,
  ConfigKeys,
  NotInitialCrucialConfig,
  Paths,
} from 'types/globals';
import API from 'service/service';
import { store } from 'redux/store';

export const urlParamsToObject = () => {
  const urlSearch = window.location.search.substring(1);
  const params = JSON.parse(`{"${decodeURI(urlSearch).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"')}"}`);
  return params;
};

const filterValidConfig = (config: Record<string, any>, filterBy: string[]): Partial<Config> => {
  const validConfig: Partial<Config> = {};
  const validKeys: string[] = filterBy;
  const configKeys: any[] = Object.keys(config);

  configKeys.forEach((key) => {
    if (validKeys.includes(key)) {
      validConfig[key] = config[key];
    }
  });

  return validConfig;
};

const getFetchConfig = async (configParameter: Config): Promise<{ config: Partial<Config>, css: string }> => {
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

  const validConfig = filterValidConfig(config, Object.values(NotInitialCrucialConfig));

  return {
    config: validConfig,
    css,
  };
};

export const setInitialConfigs = async (dispatch, contextActions) => {
  const validConfig = filterValidConfig(urlParamsToObject(), Object.values(ConfigKeys));

  const config: Config = {
    ...initialConfig,
    ...validConfig,
  };

  dispatch(contextActions.setDefaultConfig(config));

  if (config[ConfigKeys.FETCH_CONFIG]) {
    const {
      config: fetchConfig,
      // css,
    } = await getFetchConfig(config);
    dispatch(contextActions.setConfig(fetchConfig));
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

const handleInitialApiRequests = async (initRequestsCallback) => {
  // Handle all API requests and add to store
  const res = await initRequestsCallback();
  return res;
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

  const res = await handleInitialApiRequests(initRequestsCallback);

  console.log('res all done');
  console.log(res);

  setShouldLoadApp(Boolean(config));
};

export const getMinDate = () => {
  const { txDateRange } = store.getState().context;
  const date = new Date();
  const fromDate = date.setDate(date.getDate() - txDateRange);
  const fromDateFormatted = new Date(fromDate).toISOString().substring(0, 10);

  return `${fromDateFormatted}+00:00:00`;
};
