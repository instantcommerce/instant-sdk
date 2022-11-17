import React, { useEffect, useRef, useState } from "react";
import { Box, render, Text } from "ink";
import { CommandModule } from "yargs";
import { ExtractedApiError, extractApiError, useApiSdk } from "~/lib/api";
import { MeQuery } from "~/lib/api/sdk";
import { config } from "~/config";

export const WhoAmI = () => {
  const apiSdk = useApiSdk();

  const [meData, setMeData] = useState<MeQuery["me"]>();
  const [error, setError] = useState<ExtractedApiError>();
  const { current: organization } = useRef(config.get("organization"));

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

  return (
    <>
      <Text>
        Logged in as {meData?.firstName} {meData?.lastName} &lt;{meData?.email}
        &gt;
      </Text>

      <Box marginTop={1} flexDirection="column">
        <Text>Organizations:</Text>

        {meData?.organizations?.map(({ slug, name }) => {
          const isSelected = organization === slug;

          return (
            <Box key={slug}>
              <Text dimColor>&gt; </Text>
              <Text dimColor={!isSelected}>
                {name}
                {isSelected ? ` (selected)` : ""}
              </Text>
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export const whoami: CommandModule = {
  command: "whoami",
  describe: "Check current login status",
  handler: () => {
    render(<WhoAmI />);
  },
};
