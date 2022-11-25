import axios from "axios";
import { Auth0AccessTokenResponse } from "./abstractions";
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID } from "./auth0.constants";

/**
 * Get new tokens from Auth0.
 *
 * @param refreshToken The current refresh token
 * @returns Access token response
 */
export const refreshAccessToken = async (refreshToken: string): Promise<Auth0AccessTokenResponse> => {
  const res = await axios.post(
    `https://${AUTH0_DOMAIN}/oauth/token`,
    new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: AUTH0_CLIENT_ID,
    }),
    {
      headers: { "content-type": "application/x-www-form-urlencoded" },
    }
  );

  return res.data;
};
