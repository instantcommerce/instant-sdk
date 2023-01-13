import {
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
  SelectOption,
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
  Omit<ContentSchemaRichTextField, 'toolbar'> & {
    toolbar: Array<string> | ReadonlyArray<string>;
  },
  'richText'
>;

type ContentSelectField = EnhancedContentSchemaField<
  Omit<ContentSchemaSelectField, 'options'> & {
    options: Array<SelectOption> | ReadonlyArray<SelectOption>;
  },
  'select'
>;

type ContentSubschemaField<
  Subschemas extends Record<string, ContentSubschema>,
> = EnhancedContentSchemaField<
  Omit<ContentSchemaSubschemaField, 'allowed'> & {
    allowed: Array<keyof Subschemas> | ReadonlyArray<keyof Subschemas>;
  },
  'subschema'
>;

type ContentTextField = EnhancedContentSchemaField<
  ContentSchemaTextField,
  'text'
>;

export type ContentSchemaInputField<
  Subschemas extends Record<string, ContentSubschema> = {},
> =
  | ContentDateField
  | ContentImageField
  | ContentRichTextField
  | ContentSelectField
  | ContentSubschemaField<Subschemas>
  | ContentTextField
  | ContentLinkField;

type ContentSubschema = Pick<ContentSubschemaInput, 'displayName'> & {
  fields: Record<string, ContentSchemaInputField>;
};

export interface DefineContentSchema<
  Subschemas extends Record<string, ContentSubschema> = {},
> {
  fields: Record<string, ContentSchemaInputField<Subschemas>>;
  subschemas?: Subschemas;
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
  Omit<CustomizerSchemaSelectField, 'options'> & {
    options: Array<SelectOption> | ReadonlyArray<SelectOption>;
  },
  'select'
>;

type CustomizerTextField = EnhancedCustomizerSchemaField<
  CustomizerSchemaTextField,
  'text'
>;

type CustomizerToggleField = EnhancedCustomizerSchemaField<
  CustomizerSchemaTextField,
  'toggle'
>;

export type CustomizerSchemaInputField =
  | CustomizerColorField
  | CustomizerNumberField
  | CustomizerSelectField
  | CustomizerTextField
  | CustomizerToggleField;

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
  TOGGLE = 'TOGGLE',
}
