import { createContext } from 'react';

export interface BlockState {
  content?: any;
  customizations?: any;
}

export interface UnifiedCart {
  /** Shopify cart ID */
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
  _raw: any;
}

export interface Cart extends UnifiedCart {
  addLine(params: {
    /** Add attributes to the cart line */
    attributes?: Array<{ key: string; value: string }>;
    /** The Shopify product ID to add */
    productId: string;
    /** @default 1 */
    quantity?: number;
    showModalOnSuccess?: boolean;
    /** The Shopify product variant ID to add */
    variantId: string;
  }): Promise<UnifiedCart>;
  updateLines(params: {
    lines: Array<{
      /** Update cart line attributes, pass empty array to clear */
      attributes?: Array<{ key: string; value: string }>;
      /** Line ID of line to update */
      id: string;
      /** Update quantity */
      quantity?: number;
    }>;
  }): Promise<UnifiedCart>;
}

/**
 * A `Toast` a non-disruptive message that appears on top of the interface to
 * provide quick and short feedback on the outcome of an action.
 *
 * Use `Toast` to convey general confirmation for actions that aren’t
 * critical. For example, you might show a toast message to inform the
 * customer that their recent action was successful.
 */
export interface Toast {
  create: (options: {
    message: string;
    type?: 'info' | 'success' | 'warning' | 'error';
    position?:
      | 'top-left'
      | 'top-center'
      | 'top-right'
      | 'bottom-left'
      | 'bottom-center'
      | 'bottom-right';
    /**
     * Duration to show toast for, in ms
     * @default 8000
     */
    duration?: number;
    className?: string;
    id?: string;
    style?: React.CSSProperties;
  }) => {
    id: String;
    /** Dismiss the toast (plays exit animation) */
    dismiss: () => void;
    /** Remove the toast (immediate without animation) */
    remove: () => void;
  };
  /** Dismiss all toasts (plays exit animation) */
  dismissAll(): void;
  /** Remove all toasts (immediate without animation) */
  removeAll(): void;
}

export interface Instant {
  cart: Cart;
  customer: {
    id: string;
    email?: string | null | undefined;
    firstName?: string | null | undefined;
    lastName?: string | null | undefined;
    phone?: string | null | undefined;
  } | null;
  /** Information about visitor's request */
  request: {
    /**
     * Country code in ISO 3166-1 Alpha 2 format.
     *
     * In case the country could not be determined, the value will be "XX".
     * In case the visitor is on the TOR network, the value will be "T1".
     *
     * @see https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
     */
    country: string;
    /**
     * Unicode locale identifier
     * @see https://www.unicode.org/reports/tr35/#Unicode_locale_identifier
     */
    locale: string;
  };
  Toast: Toast;
}

export type BlockContextValue = BlockState & {
  instantObject: Instant;
  store: any;
};

export const BlockContext = createContext<BlockContextValue | null>(null);
