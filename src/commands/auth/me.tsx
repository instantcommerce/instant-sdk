import React, { useEffect, useState } from "react";
import { render, Text } from "ink";
import { CommandModule } from "yargs";
import { ExtractedApiError, extractApiError, useApiSdk } from "~/lib/api";
import { MeQuery } from "~/lib/api/sdk";

export const Me = () => {
  const apiSdk = useApiSdk();

  const [meData, setMeData] = useState<MeQuery["me"]>();
  const [error, setError] = useState<ExtractedApiError>();

  useEffect(() => {
    apiSdk
      .me()
      .then((res) => setMeData(res.me))
      .catch((err) => setError(extractApiError(err)));
  }, []);

  if (!meData && !error) {
    return <Text>Fetching profile...</Text>;
  }

  if (error) {
    return <Text>Failed to fetch profile: {error.message}</Text>;
  }

  return <Text>Logged in as "{meData?.email}".</Text>;
};

export const cmdMe: CommandModule = {
  command: "me",
  describe: "Check current login status",
  handler: () => {
    render(<Me />);
  },
};
