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

type EnhancedContentSchemaField<T extends ContentSchemaField, Type> = Partial<
  Pick<T, 'isRequired' | 'isTranslatable'>
> &
  Omit<T, '__typename' | 'isRequired' | 'isTranslatable'> & {
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

type ContentLinkField = EnhancedContentSchemaField<
  ContentSchemaLinkField,
  'url'
>;

type ContentSchemaInputField =
  | ContentDateField
  | ContentImageField
  | ContentRichTextField
  | ContentSelectField
  | ContentTextField
  | ContentLinkField;

type ContentSubschema = Pick<ContentSubschemaInput, 'displayName' | 'name'> & {
  fields: Array<ContentSchemaInputField>;
};

export interface DefineContentSchema {
  fields: Array<ContentSchemaInputField>;
  subschemas?: InputMaybe<Array<ContentSubschema>>;
}

type EnhancedCustomizerSchemaField<
  T extends CustomizerSchemaField,
  Type,
> = Partial<Pick<T, 'isRequired'>> &
  Omit<T, '__typename' | 'isRequired'> & {
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

type CustomizerSchemaInputField = CustomizerSelectField | CustomizerTextField;

export interface DefineCustomizerSchema {
  fields: Array<CustomizerSchemaInputField>;
}
