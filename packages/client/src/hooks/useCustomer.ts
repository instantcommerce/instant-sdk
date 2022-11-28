import { useBlockContext } from '../BlockProvider';

export function useCustomer() {
  const { instantObject } = useBlockContext();

  return instantObject.customer;
}
