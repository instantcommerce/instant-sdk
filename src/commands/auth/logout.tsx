import React from "react";
import { render, Text } from "ink";
import { config } from "~/config";
import { CommandModule } from "yargs";

export const Logout = () => {
  config.delete("accessToken");
  config.delete("refreshToken");
  config.delete("organization");
  config.delete("storeId");

  return <Text>Successfully logged out.</Text>;
};

export const cmdLogout: CommandModule = {
  command: "logout",
  describe: "Logout of current account",
  handler: () => {
    render(<Logout />);
  },
};
