import type { ContentSchemaInput } from 'types/api';
import type { DefineContentSchema } from 'types/schemas';

const formatField = (field: DefineContentSchema['fields'][number]) => ({
  ...field,
  preview: undefined,
  type: field.type.toUpperCase(),
  /** Set optional booleans */
  isRequired: !!field.isRequired,
  isTranslatable: !!field.isTranslatable,
  ...(field.type === 'date'
    ? {
        withTime: !!field.withTime,
      }
    : {}),
});

/**
 * Convert contentSchema from format used by defineBlock,
 * to format expected by the API.
 */
export const parseContentSchema = (
  input: DefineContentSchema,
): ContentSchemaInput => {
  try {
    const fields = input.fields.map(formatField);
    const subschemas = input.subschemas?.map((subschema) => ({
      ...subschema,
      fields: subschema.fields.map(formatField),
    }));

    /** @todo remove when API type is correct */
    // @ts-ignore
    return {
      ...input,
      fields,
      subschemas,
    };
  } catch (err) {
    throw new Error(
      `Failed to parse content schema: ${err?.toString?.() || 'Unknown error'}`,
    );
  }
};
