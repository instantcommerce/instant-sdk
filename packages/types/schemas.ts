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
} from './api';

type EnhancedContentSchemaField<
  T extends Omit<ContentSchemaField, 'withTime'>,
  Type,
> = Partial<Pick<T, 'isRequired' | 'isTranslatable'>> &
  Omit<T, '__typename' | 'name' | 'isRequired' | 'isTranslatable'> & {
    preview?: string;
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

type ContentTextField = EnhancedContentSchemaField<
  ContentSchemaTextField,
  'text'
>;

export type ContentSchemaInputField =
  | ContentDateField
  | ContentImageField
  | ContentRichTextField
  | ContentSelectField
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
  T extends CustomizerSchemaField,
  Type,
> = Partial<Pick<T, 'isRequired'>> &
  Omit<T, '__typename' | 'name' | 'isRequired'> & {
    preview?: string;
    type: Type;
  };

type CustomizerSelectField = EnhancedCustomizerSchemaField<
  CustomizerSchemaSelectField,
  'select'
>;

type CustomizerTextField = EnhancedCustomizerSchemaField<
  CustomizerSchemaTextField,
  'text'
>;

export type CustomizerSchemaInputField =
  | CustomizerSelectField
  | CustomizerTextField;

export interface DefineCustomizerSchema {
  fields: Record<string, CustomizerSchemaInputField>;
}
