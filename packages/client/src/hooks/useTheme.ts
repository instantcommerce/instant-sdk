import { useBlockContext } from '../BlockProvider';

/**
 * Get the current storefront's theme, consisting of colors and typography.
 */
export function useTheme() {
  const { store } = useBlockContext();

  return store?.storefront?.config?.theme;
}
