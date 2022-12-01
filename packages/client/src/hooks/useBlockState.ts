import { useBlockContext } from '../BlockProvider';

export function useBlockState<
  T extends { content: any; customizations: any } = {
    content: any;
    customizations: any;
  },
>() {
  const { content, customizations } = useBlockContext();

  return { content, customizations } as {
    content: T['content'];
    customizations: T['customizations'];
  };
}
