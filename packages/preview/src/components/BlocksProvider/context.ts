import { createContext, MutableRefObject } from 'react';
import { BlockType, BlockSubtype } from 'types/api';
import { DefineContentSchema, DefineCustomizerSchema } from 'types/schemas';

export type SchemaTypes = 'customizer' | 'content';

type ValueOf<T> = T[keyof T];

type Subschemas = ValueOf<NonNullable<DefineContentSchema['subschemas']>>;

export type BlockContentSchema = Omit<
  DefineContentSchema,
  'fields' | 'subschemas'
> & {
  fields: (ValueOf<DefineContentSchema['fields']> & {
    name: string;
  })[];
  subschemas?: (Omit<Subschemas, 'fields'> & {
    fields: (ValueOf<Subschemas['fields']> & {
      name: string;
    })[];
  } & {
    name: string;
  })[];
};

export type BlockCustomizerSchema = Omit<DefineCustomizerSchema, 'fields'> & {
  fields: (ValueOf<DefineCustomizerSchema['fields']> & { name: string })[];
};

type BlockBase = {
  name: string;
  path?: string;
  contentSchema?: BlockContentSchema;
  customizerSchema?: BlockCustomizerSchema;
};

export type BlockSection = BlockBase & {
  type: BlockType.Section;
  // subtype: BlockSubtype.All;
};

export type BlockPage = BlockBase & {
  type: BlockType.Page;
  // subtype: BlockSubtype.Pdp;
};

export type BlockComponent = BlockBase & {
  type: BlockType.Component;
  // subtype: BlockSubtype.CartSidebar;
};

export interface BlocksContextValue {
  blocksManifest: Record<string, BlockSection | BlockPage | BlockComponent>;
  previewRef: MutableRefObject<HTMLIFrameElement | null>;
  reloadPreview(): void;
  selectedBlock: string | null;
  setSelectedBlock(block: string): void;
  setPreviewValue(schema: SchemaTypes, name: string, value: any): void;
  previewValues: Record<
    string,
    Record<SchemaTypes, Record<string, string | any[]>>
  >;
}

export const BlocksContext = createContext<BlocksContextValue | null>(null);
