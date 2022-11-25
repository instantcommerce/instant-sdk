import { createContext } from 'react';

export interface BlockState {
  content?: any;
  customizations?: any;
}

export interface Instant {
  cart: {
    addLine?(params: any & { productId: string }): Promise<any>;
    externalId?: string;
    lines: {
      attributes?: { key: string; value?: string | null }[];
      id: string;
      product: {
        id: string;
        handle: string;
        title: string;
      };
      quantity: number;
      variant: {
        id: string;
        title: string;
      };
    }[];
    updateLines?(params: any): Promise<any>;
  };
  customer: {
    id: string;
    email?: string | null | undefined;
    firstName?: string | null | undefined;
    lastName?: string | null | undefined;
    phone?: string | null | undefined;
  } | null;
  /** Added by worker */
  request: {
    /** Country code in ISO 3166-1 Alpha 2 format */
    country: string;
    /**
     * Unicode locale identifier
     * @see https://www.unicode.org/reports/tr35/#Unicode_locale_identifier
     */
    locale: string;
  };
  Toast: any;
}

export type BlockContextValue = BlockState & {
  instantObject: Instant;
  store: any;
};

export const BlockContext = createContext<BlockContextValue | null>(null);
