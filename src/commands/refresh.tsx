import React, { useEffect, useState } from "react";
import { render, Text } from "ink";
import { Auth0AccessTokenResponse, Auth0ErrorResponse, refreshAccessToken } from "~/lib/auth0";
import { config } from "~/config";
import { CommandModule } from "yargs";

export const Refresh = () => {
  const refreshToken = config.get("refreshToken");
  const [refreshTokenResult, setRefreshTokenResult] = useState<Auth0AccessTokenResponse | Auth0ErrorResponse>();

  useEffect(() => {
    if (refreshToken) {
      refreshAccessToken(refreshToken as string)
        .then((data) => setRefreshTokenResult(data))
        .catch((err) => setRefreshTokenResult(err.response.data));
    }
  }, []);

  if (!refreshToken) {
    /** END: No refresh token in persistent storage */
    return <Text>No refresh token found.</Text>;
  }

  if (!refreshTokenResult) {
    /** Waiting for refresh token call to Auth0 to resolve */
    return <Text>Refreshing...</Text>;
  }

  if ("access_token" in refreshTokenResult) {
    /** Persist new tokens */
    config.set("accessToken", refreshTokenResult.access_token);
    if (refreshTokenResult.refresh_token) {
      config.set("refreshToken", refreshTokenResult.refresh_token);
    }

    /** END: Successfully refreshed tokens */
    return <Text>Successfully refreshed your tokens</Text>;
  }

  /** END: Failed to refresh token, display error message */
  return (
    <Text>
      Failed to refresh token:{" "}
      {"error_description" in refreshTokenResult
        ? refreshTokenResult.error_description
        : "An unexpected error occurred"}
    </Text>
  );
};

export const refresh: CommandModule = {
  command: "refresh",
  describe: "Refresh your access token",
  handler: () => {
    render(<Refresh />);
  },
};
