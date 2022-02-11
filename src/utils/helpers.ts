export const setInitialConfigs = async (dispatch, contextActions) => {
  console.log('setInitialConfigs')
  const config = {
    dummyVal: 1,
    anotherDummyVal: 2
  }

  // Handle potential fetchConfig
  await new Promise((resolve) => { setTimeout(() => { resolve(null) }, 1000) })

  dispatch(contextActions.setConfig(config))
};
