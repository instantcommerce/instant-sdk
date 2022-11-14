import Conf from "conf";

interface ProjectConfigData {
  organization?: string;
  previewStoreId?: string;
  blocks: Record<string, { id: string }>;
}

export const getProjectConfig = (path: string) =>
  new Conf<ProjectConfigData>({
    cwd: path,
    configName: "instant.config",
    schema: {
      organization: { type: "string" },
      previewStoreId: { type: "string" },
      blocks: {
        type: "object",
        additionalProperties: {
          type: "object",
          properties: {
            id: { type: "string" },
          },
        },
      },
    },
  });
