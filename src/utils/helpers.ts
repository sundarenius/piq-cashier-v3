import {
  Config,
  initialConfig,
  ConfigKeys,
  NotInitialCrucialConfig
} from 'types/globals';
import API from 'service/service'

export const urlParamsToObject = () => {
  const urlSearch = location.search.substring(1);
  const params = JSON.parse('{"' + decodeURI(urlSearch).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
  return params;
}

const filterValidConfig = (config: Record<string, any>, filterBy: string[]): Partial<Config> => {
  const validConfig: Partial<Config> = {}
  const validKeys: string[] = filterBy

  for (let key in config) {
    if (validKeys.includes(key)) {
      validConfig[key] = config[key]
    }
  }

  return validConfig
}

const getFetchConfig = async (configParameter: Config): Promise<{ config: Partial<Config>, css: string }> => {
  const {
    merchantId,
    userId,
    sessionId,
    method,
    locale,
    channelId,
    country,
  } = configParameter
  const fetchConfig = await API.fetchConfigService({
    merchantId,
    userId,
    sessionId,
    method,
    locale,
    channelId,
    country,
    queryAttributes: ''
  })

  const config = JSON.parse(fetchConfig.config)
  const css = fetchConfig.css

  const validConfig = filterValidConfig(config, Object.values(NotInitialCrucialConfig))

  return {
    config: validConfig,
    css
  }
}

export const setInitialConfigs = async (dispatch, contextActions) => {
  const validConfig = filterValidConfig(urlParamsToObject(), Object.values(ConfigKeys))

  const config: Config = {
    ...initialConfig,
    ...validConfig,
  }

  dispatch(contextActions.setDefaultConfig(config))

  if (config[ConfigKeys.FETCH_CONFIG]) {
    const {
      config: fetchConfig,
      css,
    } = await getFetchConfig(config)
    dispatch(contextActions.setConfig(fetchConfig))    
  } else {
    dispatch(contextActions.setConfig(config))
  }

};
