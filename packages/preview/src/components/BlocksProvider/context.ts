import { createContext, MutableRefObject } from 'react';
import { DefineContentSchema, DefineCustomizerSchema } from 'types/schemas';

export type SchemaTypes = 'customizer' | 'content';

export interface BlocksContextValue {
  blocksManifest: Record<
    string,
    {
      name: string;
      path?: string;
      contentSchema?: DefineContentSchema;
      customizerSchema?: DefineCustomizerSchema;
    }
  >;
  previewRef: MutableRefObject<HTMLIFrameElement | null>;
  reloadPreview(): void;
  selectedBlock: string | null;
  setSelectedBlock(block: string): void;
  setPreviewValue(schema: SchemaTypes, name: string, value: any): void;
  previewValues: Record<string, Record<SchemaTypes, Record<string, string>>>;
}

export const BlocksContext = createContext<BlocksContextValue | null>(null);
