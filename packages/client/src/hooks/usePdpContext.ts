import { useBlockContext } from '../BlockProvider';

export function usePdpContext() {
  const { pdpContext } = useBlockContext();

  return pdpContext || {};
}
