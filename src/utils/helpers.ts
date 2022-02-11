import {
  Config,
  initialConfig,
  ConfigKeys
} from 'types/globals';

export const urlParamsToObject = () => {
  const urlSearch = location.search.substring(1);
  const params = JSON.parse('{"' + decodeURI(urlSearch).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
  return params;
}

const filterValidConfig = (config: Record<string, any>): Partial<Config> => {
  const validConfig: Partial<Config> = {}
  const validKeys: string[] = Object.values(ConfigKeys)

  for (let key in config) {
    if (validKeys.includes(key)) {
      validConfig[key] = config[key]
    }
  }

  return validConfig
}

export const setInitialConfigs = async (dispatch, contextActions) => {
  const validConfig = filterValidConfig(urlParamsToObject())

  const config: Config = {
    ...initialConfig,
    ...validConfig,
  }

  dispatch(contextActions.setDefaultConfig(config))

  if (config[ConfigKeys.FETCH_CONFIG]) {
    await new Promise((resolve) => { setTimeout(() => { resolve(null) }, 1000) })
    // Should be a async call to fetchConfig and only take 'NotInitialCrucialConfig' configs
    dispatch(contextActions.setConfig(config))
  } else {
    dispatch(contextActions.setConfig(config))
  }

};
