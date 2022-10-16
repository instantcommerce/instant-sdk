import axios from "axios";
import { Auth0DeviceCodeResponse } from "./abstractions";

/**
 * Get device code with verification details from Auth0.
 *
 * @returns Device code response
 */
export const getDeviceCode = async (): Promise<Auth0DeviceCodeResponse> => {
  const res = await axios.post(
    `https://${process.env["AUTH0_DOMAIN"]}/oauth/device/code`,
    {
      client_id: process.env["AUTH0_CLIENT_ID"],
      audience: `https://${process.env["AUTH0_DOMAIN"]}/api/v2/`,
    },
    {
      headers: { "content-type": "application/x-www-form-urlencoded" },
    }
  );

  return res.data;
};
