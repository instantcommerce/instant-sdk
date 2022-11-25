import { createContext, MutableRefObject } from 'react';

export type SchemaTypes = 'customizer' | 'content';

export interface BlocksContextValue {
  blocksManifest: Record<
    string,
    {
      name: string;
      path?: string;
      contentSchema?: any;
      customizerSchema?: any;
    }
  >;
  previewRef: MutableRefObject<HTMLIFrameElement | null>;
  reloadPreview(): void;
  selectedBlock: string | null;
  setSelectedBlock(block: string): void;
  setPreviewValue(schema: SchemaTypes, name: string, value: string): void;
}

export const BlocksContext = createContext<BlocksContextValue | null>(null);
