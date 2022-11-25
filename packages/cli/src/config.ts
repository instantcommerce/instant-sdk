import Conf from "conf";
import { fileURLToPath } from "url";

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

const resolvePath = (path: string) =>
  fileURLToPath(new URL(path, import.meta.url));

export const dirname = (resolvePath(process.env["FORCE_DIR"] || process.cwd()));
