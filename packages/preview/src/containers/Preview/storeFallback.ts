import { PublicStore } from 'types/api';

export const storeFallback = {
  storefront: {
    config: {
      blocks: [
        {
          __typename: 'BlockquoteBlock',
          id: '123',
          // authorColor: '#000',
          // backgroundColor: 'yellow',
          // blockBackgroundColor: 'pink',
          blockBorderRadius: 'MEDIUM',
          contentAlignment: 'LEFT',
          hasLeftBorder: true,
          // leftBorderColor: 'purple',
          name: '123',
          textSize: 'MEDIUM',
          theme: 'PRIMARY',
        } as any,
      ],
      components: {
        button: {
          borderRadius: 'SMALL',
          boxShadow: 'LARGE',
          fontWeight: 'MEDIUM',
        },
        input: {
          borderRadius: 'SMALL',
        },
      },
    },
  },
} as any as PublicStore;
