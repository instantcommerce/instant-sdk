import { useBlockContext } from '../BlockProvider';

export function useToast() {
  const { instantObject } = useBlockContext();

  return instantObject.Toast;
}
