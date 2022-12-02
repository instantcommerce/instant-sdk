import { useBlockContext } from '../BlockProvider';

export function useBlockState() {
  const { content, customizer } = useBlockContext();

  return { content, customizer };
}
