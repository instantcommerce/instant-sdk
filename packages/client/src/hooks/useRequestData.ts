import { useBlockContext } from '../BlockProvider';

export function useRequestData() {
  const { instantObject } = useBlockContext();

  return instantObject.request;
}
