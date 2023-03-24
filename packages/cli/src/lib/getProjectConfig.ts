import Conf from 'conf';
import { BlockType } from './api/sdk';

interface ProjectConfigData {
  organization?: string;
  blocks: Record<string, { id: string }>;
}

export const getProjectConfig = (path: string) =>
  new Conf<ProjectConfigData>({
    cwd: path,
    configName: 'instant.config',
    schema: {
      organization: { type: 'string' },
      blocks: {
        type: 'object',
        additionalProperties: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            type: {
              type: 'string',
              enum: [BlockType.Component, BlockType.Page, BlockType.Section],
              default: BlockType.Section,
            },
          },
        },
      },
    },
  });
