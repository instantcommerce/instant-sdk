import type { CustomizerSchemaInput } from 'types/api';
import type { DefineCustomizerSchema } from 'types/schemas';

const formatField = (field: DefineCustomizerSchema['fields'][number]) => ({
  ...field,
  preview: undefined,
  type: field.type.toUpperCase(),
  /** Set optional booleans */
  isRequired: !!field.isRequired,
});

/**
 * Convert customizerSchema from format used by defineBlock,
 * to format expected by the API.
 */
export const parseCustomizerSchema = (
  input: DefineCustomizerSchema,
): CustomizerSchemaInput => {
  try {
    const fields = Object.entries(input.fields).map(([name, field]: any) =>
      formatField({ ...field, name }),
    );

    /** @todo remove when API type is correct */
    // @ts-ignore
    return {
      ...input,
      fields,
    };
  } catch (err) {
    throw new Error(
      `Failed to parse customizer schema: ${
        err?.toString?.() || 'Unknown error'
      }`,
    );
  }
};
