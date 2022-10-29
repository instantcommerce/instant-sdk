import Conf from "conf";

interface ConfigData {
  accessToken?: string;
  refreshToken?: string;
  organization?: string;
  storeId?: string;
}

export const config = new Conf<ConfigData>({
  projectName: "instant-cli",
  schema: {
    accessToken: { type: "string" },
    refreshToken: { type: "string" },
    organization: { type: "string" },
    storeId: { type: "string" },
  },
});
