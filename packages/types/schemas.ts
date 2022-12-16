import {
  InputMaybe,
  ContentSchemaDateField,
  ContentSchemaImageField,
  ContentSchemaRichTextField,
  ContentSchemaSelectField,
  ContentSchemaTextField,
  ContentSchemaLinkField,
  ContentSubschemaInput,
  ContentSchemaField,
  CustomizerSchemaSelectField,
  CustomizerSchemaTextField,
  CustomizerSchemaField,
  CustomizerSchemaNumberField,
  CustomizerSchemaColorField,
  ContentSchemaSubschemaField,
} from './api';

type EnhancedContentSchemaField<
  T extends Omit<ContentSchemaField, 'withTime'>,
  Type,
> = Partial<Pick<T, 'isRequired' | 'isTranslatable'>> &
  Omit<T, '__typename' | 'name' | 'isRequired' | 'isTranslatable'> & {
    type: Type;
  };

type ContentDateField = EnhancedContentSchemaField<
  Omit<ContentSchemaDateField, 'withTime'> & { withTime?: boolean },
  'date'
>;

type ContentImageField = EnhancedContentSchemaField<
  ContentSchemaImageField,
  'image'
>;

type ContentLinkField = EnhancedContentSchemaField<
  ContentSchemaLinkField,
  'link'
>;

type ContentRichTextField = EnhancedContentSchemaField<
  ContentSchemaRichTextField,
  'richText'
>;

type ContentSelectField = EnhancedContentSchemaField<
  ContentSchemaSelectField,
  'select'
>;

type ContentSubschemaField = EnhancedContentSchemaField<
  ContentSchemaSubschemaField,
  'subschema'
>;

type ContentTextField = EnhancedContentSchemaField<
  ContentSchemaTextField,
  'text'
>;

export type ContentSchemaInputField =
  | ContentDateField
  | ContentImageField
  | ContentRichTextField
  | ContentSelectField
  | ContentSubschemaField
  | ContentTextField
  | ContentLinkField;

type ContentSubschema = Pick<ContentSubschemaInput, 'displayName' | 'name'> & {
  fields: Record<string, ContentSchemaInputField>;
};

export interface DefineContentSchema {
  fields: Record<string, ContentSchemaInputField>;
  subschemas?: InputMaybe<Array<ContentSubschema>>;
}

type EnhancedCustomizerSchemaField<
  T extends Omit<CustomizerSchemaField, 'fractionDigits'>,
  Type,
> = Partial<Pick<T, 'isRequired'>> &
  Omit<T, '__typename' | 'name' | 'isRequired'> & {
    type: Type;
  };

type CustomizerColorField = EnhancedCustomizerSchemaField<
  CustomizerSchemaColorField,
  'color'
>;

type CustomizerNumberField = EnhancedCustomizerSchemaField<
  Omit<CustomizerSchemaNumberField, 'fractionDigits'> & {
    fractionDigits?: number;
  },
  'number'
>;

type CustomizerSelectField = EnhancedCustomizerSchemaField<
  CustomizerSchemaSelectField,
  'select'
>;

type CustomizerTextField = EnhancedCustomizerSchemaField<
  CustomizerSchemaTextField,
  'text'
>;

export type CustomizerSchemaInputField =
  | CustomizerColorField
  | CustomizerNumberField
  | CustomizerSelectField
  | CustomizerTextField;

export interface DefineCustomizerSchema {
  fields: Record<string, CustomizerSchemaInputField>;
}

/** @todo get from codegen backend */
export enum SchemaFieldType {
  COLOR = 'COLOR',
  DATE = 'DATE',
  IMAGE = 'IMAGE',
  LINK = 'LINK',
  NUMBER = 'NUMBER',
  RICH_TEXT = 'RICH_TEXT',
  SELECT = 'SELECT',
  SUBSCHEMA = 'SUBSCHEMA',
  TEXT = 'TEXT',
}
