import { useBlockContext } from '../BlockProvider';

export function useBlockState() {
  const { content, customizations } = useBlockContext();

  return { content, customizations };
}
