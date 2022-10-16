import axios from "axios";
import { Auth0AccessTokenResponse } from "./abstractions";

/**
 * Checks if given device code has been verified in Auth0.
 *
 * @param deviceCode The device code to validate
 * @returns Access token response
 */
export const checkDeviceCode = async (deviceCode: string): Promise<Auth0AccessTokenResponse> => {
  const res = await axios.post(
    `https://${process.env["AUTH0_DOMAIN"]}/oauth/token`,
    new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:device_code",
      device_code: deviceCode,
      client_id: process.env["AUTH0_CLIENT_ID"]!,
    }),
    {
      headers: { "content-type": "application/x-www-form-urlencoded" },
    }
  );

  return res.data;
};
