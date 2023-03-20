import { useBlockContext } from '../BlockProvider';

export function useBlockState<
  T extends { content: any; customizer: any } = {
    content: any;
    customizer: any;
  },
>() {
  const { content, customizer } = useBlockContext();

  return { content, customizer } as {
    content: T['content'];
    customizer: T['customizer'];
  };
}
