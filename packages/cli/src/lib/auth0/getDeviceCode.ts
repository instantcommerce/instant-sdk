import axios from 'axios';
import { Auth0DeviceCodeResponse } from './abstractions';
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID } from './auth0.constants';

/**
 * Get device code with verification details from Auth0.
 *
 * @returns Device code response
 */
export const getDeviceCode = async (): Promise<Auth0DeviceCodeResponse> => {
  const res = await axios.post(
    `https://${AUTH0_DOMAIN}/oauth/device/code`,
    {
      client_id: AUTH0_CLIENT_ID,
      audience: `https://${AUTH0_DOMAIN}/api/v2/`,
      scope: 'offline_access',
    },
    {
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
    },
  );

  return res.data;
};
