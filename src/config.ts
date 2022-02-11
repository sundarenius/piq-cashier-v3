import { Environments } from 'types/globals';

const config = {
  [Environments.PRODUCTION]: {
    apiEndpoint: 'https://api.paymentiq.io',
  },
  [Environments.TEST]: {
    apiEndpoint: 'https://test-api.paymentiq.io',
  },
  [Environments.DEVELOPMENT]: {
    apiEndpoint: 'https://test-api.paymentiq.io',
  },
};

export default config;
