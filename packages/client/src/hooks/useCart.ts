import { useBlockContext } from '../BlockProvider';

export function useCart() {
  const { instantObject } = useBlockContext();

  return instantObject.cart;
}
