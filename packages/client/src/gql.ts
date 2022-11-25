import { gql as gqlTag } from 'graphql-tag';

/**
 * Use this homebaked gql implementation in prod instead of graphql-tag,
 * to reduce bundlesize of worker especially (±35kb).
 */
export const gql = import.meta.env.DEV
  ? gqlTag
  : (s: TemplateStringsArray, ...args: any[]) =>
      s
        .map((ss, i) => `${ss}${args[i] || ''}`)
        .join('')
        .replace(/\s+#.*$/gm, '') // Remove GQL comments
        .replace(/\s+/gm, ' ') // Minify spaces
        .trim();
