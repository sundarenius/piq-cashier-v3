/* eslint-disable max-len */
import config from 'config';
import { getMinDate } from 'utils/helpers';

const runByCypress = () => false;
const getChannelId = (channelId) => (runByCypress() ? 'Mac' : channelId);

const formatAttributes = (queryAttributes) =>
  ((queryAttributes && queryAttributes[0] === '&') ? queryAttributes : `&${queryAttributes}`);

enum MethodTypes {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
}

const baseUrl = `${config[process.env.NODE_ENV].apiEndpoint}/`;

const buildUrl = (path) => {
  const token = () => window.localStorage.token || null;
  const getToken = token();
  if (getToken) {
    return `${baseUrl}${path}${path.includes('&') ? '&' : '?'}token=${token()}`;
  }
  return `${baseUrl}${path}`;
};

const fetchMethod = async (path, method, payload) => {
  try {
    const res = await fetch(buildUrl(path), {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      ...payload && { body: JSON.stringify(payload) },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log('failed');
    console.log(err);
    return false;
  }
};

const api = {
  fetchConfigService: async ({
    merchantId, userId, sessionId, method, locale, channelId, country, queryAttributes = '',
  }) => {
    const attributes = formatAttributes(queryAttributes);
    const path = `paymentiq/api/cashier/config/${merchantId}/${userId}?sessionId=${sessionId}&method=${method}&locale=${locale}&channelId=${getChannelId(channelId)}&market=${country}${attributes}`;
    const data = await fetchMethod(path, MethodTypes.GET, null);
    return data;
  },
  fetchPaymentMethods: async ({
    merchantId, userId, sessionId, method, locale = 'en_GB', channelId, queryAttributes = '',
  }) => {
    const attributes = formatAttributes(queryAttributes);
    const path = `cashier/${merchantId}/${userId}?locale=${locale}&method=${method}&sessionId=${sessionId}&channelId=${getChannelId(channelId)}${attributes}`;
    const data = await fetchMethod(path, MethodTypes.GET, null);
    return data;
  },
  fetchTransactionHistory: async ({
    merchantId, userId, sessionId, queryAttributes = '',
  }) => {
    const attributes = formatAttributes(queryAttributes);
    const path = `user/transaction/${merchantId}/${userId}?sessionId=${sessionId}&minDate=${getMinDate()}${attributes}`;
    const data = await fetchMethod(path, MethodTypes.GET, null);
    return data;
  },
  fetchTranslations: async ({ locale = 'en_GB', merchantId }) => {
    const path = `resource/translations?locale=${locale}&merchantId=${merchantId}`;
    const data = await fetchMethod(path, MethodTypes.GET, null);
    return data;
  },
};

export default api;
