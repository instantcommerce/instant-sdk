import { createContext, MutableRefObject } from 'react';
import { DefineContentSchema, DefineCustomizerSchema } from 'types/schemas';

export type SchemaTypes = 'customizer' | 'content';

type ValueOf<T> = T[keyof T];

export type BlockContentSchema = Omit<DefineContentSchema, 'fields'> & {
  fields: (ValueOf<DefineContentSchema['fields']> & {
    name: string;
  })[];
};

export type BlockCustomizerSchema = Omit<DefineCustomizerSchema, 'fields'> & {
  fields: (ValueOf<DefineCustomizerSchema['fields']> & { name: string })[];
};

export interface BlocksContextValue {
  blocksManifest: Record<
    string,
    {
      name: string;
      path?: string;
      contentSchema?: BlockContentSchema;
      customizerSchema?: BlockCustomizerSchema;
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
