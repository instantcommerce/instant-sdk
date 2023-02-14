import {
  BlockSubtype,
  BlockType,
  ProductFormField,
  PublicProductForm,
} from '../../../types/api';
import { useBlockContext } from '../BlockProvider';

interface GraphQLConnection<T> {
  edges?: { node: T }[];
}

/**
 * The three-letter currency codes that represent the world currencies used in stores. These include standard ISO 4217 codes, legacy codes,
 * and non-standard codes.
 *
 */
export enum CurrencyCode {
  /** United Arab Emirates Dirham (AED). */
  Aed = 'AED',
  /** Afghan Afghani (AFN). */
  Afn = 'AFN',
  /** Albanian Lek (ALL). */
  All = 'ALL',
  /** Armenian Dram (AMD). */
  Amd = 'AMD',
  /** Netherlands Antillean Guilder. */
  Ang = 'ANG',
  /** Angolan Kwanza (AOA). */
  Aoa = 'AOA',
  /** Argentine Pesos (ARS). */
  Ars = 'ARS',
  /** Australian Dollars (AUD). */
  Aud = 'AUD',
  /** Aruban Florin (AWG). */
  Awg = 'AWG',
  /** Azerbaijani Manat (AZN). */
  Azn = 'AZN',
  /** Bosnia and Herzegovina Convertible Mark (BAM). */
  Bam = 'BAM',
  /** Barbadian Dollar (BBD). */
  Bbd = 'BBD',
  /** Bangladesh Taka (BDT). */
  Bdt = 'BDT',
  /** Bulgarian Lev (BGN). */
  Bgn = 'BGN',
  /** Bahraini Dinar (BHD). */
  Bhd = 'BHD',
  /** Burundian Franc (BIF). */
  Bif = 'BIF',
  /** Bermudian Dollar (BMD). */
  Bmd = 'BMD',
  /** Brunei Dollar (BND). */
  Bnd = 'BND',
  /** Bolivian Boliviano (BOB). */
  Bob = 'BOB',
  /** Brazilian Real (BRL). */
  Brl = 'BRL',
  /** Bahamian Dollar (BSD). */
  Bsd = 'BSD',
  /** Bhutanese Ngultrum (BTN). */
  Btn = 'BTN',
  /** Botswana Pula (BWP). */
  Bwp = 'BWP',
  /** Belarusian Ruble (BYN). */
  Byn = 'BYN',
  /**
   * Belarusian Ruble (BYR).
   * @deprecated `BYR` is deprecated. Use `BYN` available from version `2021-01` onwards instead.
   */
  Byr = 'BYR',
  /** Belize Dollar (BZD). */
  Bzd = 'BZD',
  /** Canadian Dollars (CAD). */
  Cad = 'CAD',
  /** Congolese franc (CDF). */
  Cdf = 'CDF',
  /** Swiss Francs (CHF). */
  Chf = 'CHF',
  /** Chilean Peso (CLP). */
  Clp = 'CLP',
  /** Chinese Yuan Renminbi (CNY). */
  Cny = 'CNY',
  /** Colombian Peso (COP). */
  Cop = 'COP',
  /** Costa Rican Colones (CRC). */
  Crc = 'CRC',
  /** Cape Verdean escudo (CVE). */
  Cve = 'CVE',
  /** Czech Koruny (CZK). */
  Czk = 'CZK',
  /** Djiboutian Franc (DJF). */
  Djf = 'DJF',
  /** Danish Kroner (DKK). */
  Dkk = 'DKK',
  /** Dominican Peso (DOP). */
  Dop = 'DOP',
  /** Algerian Dinar (DZD). */
  Dzd = 'DZD',
  /** Egyptian Pound (EGP). */
  Egp = 'EGP',
  /** Eritrean Nakfa (ERN). */
  Ern = 'ERN',
  /** Ethiopian Birr (ETB). */
  Etb = 'ETB',
  /** Euro (EUR). */
  Eur = 'EUR',
  /** Fijian Dollars (FJD). */
  Fjd = 'FJD',
  /** Falkland Islands Pounds (FKP). */
  Fkp = 'FKP',
  /** United Kingdom Pounds (GBP). */
  Gbp = 'GBP',
  /** Georgian Lari (GEL). */
  Gel = 'GEL',
  /** Ghanaian Cedi (GHS). */
  Ghs = 'GHS',
  /** Gibraltar Pounds (GIP). */
  Gip = 'GIP',
  /** Gambian Dalasi (GMD). */
  Gmd = 'GMD',
  /** Guinean Franc (GNF). */
  Gnf = 'GNF',
  /** Guatemalan Quetzal (GTQ). */
  Gtq = 'GTQ',
  /** Guyanese Dollar (GYD). */
  Gyd = 'GYD',
  /** Hong Kong Dollars (HKD). */
  Hkd = 'HKD',
  /** Honduran Lempira (HNL). */
  Hnl = 'HNL',
  /** Croatian Kuna (HRK). */
  Hrk = 'HRK',
  /** Haitian Gourde (HTG). */
  Htg = 'HTG',
  /** Hungarian Forint (HUF). */
  Huf = 'HUF',
  /** Indonesian Rupiah (IDR). */
  Idr = 'IDR',
  /** Israeli New Shekel (NIS). */
  Ils = 'ILS',
  /** Indian Rupees (INR). */
  Inr = 'INR',
  /** Iraqi Dinar (IQD). */
  Iqd = 'IQD',
  /** Iranian Rial (IRR). */
  Irr = 'IRR',
  /** Icelandic Kronur (ISK). */
  Isk = 'ISK',
  /** Jersey Pound. */
  Jep = 'JEP',
  /** Jamaican Dollars (JMD). */
  Jmd = 'JMD',
  /** Jordanian Dinar (JOD). */
  Jod = 'JOD',
  /** Japanese Yen (JPY). */
  Jpy = 'JPY',
  /** Kenyan Shilling (KES). */
  Kes = 'KES',
  /** Kyrgyzstani Som (KGS). */
  Kgs = 'KGS',
  /** Cambodian Riel. */
  Khr = 'KHR',
  /** Kiribati Dollar (KID). */
  Kid = 'KID',
  /** Comorian Franc (KMF). */
  Kmf = 'KMF',
  /** South Korean Won (KRW). */
  Krw = 'KRW',
  /** Kuwaiti Dinar (KWD). */
  Kwd = 'KWD',
  /** Cayman Dollars (KYD). */
  Kyd = 'KYD',
  /** Kazakhstani Tenge (KZT). */
  Kzt = 'KZT',
  /** Laotian Kip (LAK). */
  Lak = 'LAK',
  /** Lebanese Pounds (LBP). */
  Lbp = 'LBP',
  /** Sri Lankan Rupees (LKR). */
  Lkr = 'LKR',
  /** Liberian Dollar (LRD). */
  Lrd = 'LRD',
  /** Lesotho Loti (LSL). */
  Lsl = 'LSL',
  /** Lithuanian Litai (LTL). */
  Ltl = 'LTL',
  /** Latvian Lati (LVL). */
  Lvl = 'LVL',
  /** Libyan Dinar (LYD). */
  Lyd = 'LYD',
  /** Moroccan Dirham. */
  Mad = 'MAD',
  /** Moldovan Leu (MDL). */
  Mdl = 'MDL',
  /** Malagasy Ariary (MGA). */
  Mga = 'MGA',
  /** Macedonia Denar (MKD). */
  Mkd = 'MKD',
  /** Burmese Kyat (MMK). */
  Mmk = 'MMK',
  /** Mongolian Tugrik. */
  Mnt = 'MNT',
  /** Macanese Pataca (MOP). */
  Mop = 'MOP',
  /** Mauritanian Ouguiya (MRU). */
  Mru = 'MRU',
  /** Mauritian Rupee (MUR). */
  Mur = 'MUR',
  /** Maldivian Rufiyaa (MVR). */
  Mvr = 'MVR',
  /** Malawian Kwacha (MWK). */
  Mwk = 'MWK',
  /** Mexican Pesos (MXN). */
  Mxn = 'MXN',
  /** Malaysian Ringgits (MYR). */
  Myr = 'MYR',
  /** Mozambican Metical. */
  Mzn = 'MZN',
  /** Namibian Dollar. */
  Nad = 'NAD',
  /** Nigerian Naira (NGN). */
  Ngn = 'NGN',
  /** Nicaraguan Córdoba (NIO). */
  Nio = 'NIO',
  /** Norwegian Kroner (NOK). */
  Nok = 'NOK',
  /** Nepalese Rupee (NPR). */
  Npr = 'NPR',
  /** New Zealand Dollars (NZD). */
  Nzd = 'NZD',
  /** Omani Rial (OMR). */
  Omr = 'OMR',
  /** Panamian Balboa (PAB). */
  Pab = 'PAB',
  /** Peruvian Nuevo Sol (PEN). */
  Pen = 'PEN',
  /** Papua New Guinean Kina (PGK). */
  Pgk = 'PGK',
  /** Philippine Peso (PHP). */
  Php = 'PHP',
  /** Pakistani Rupee (PKR). */
  Pkr = 'PKR',
  /** Polish Zlotych (PLN). */
  Pln = 'PLN',
  /** Paraguayan Guarani (PYG). */
  Pyg = 'PYG',
  /** Qatari Rial (QAR). */
  Qar = 'QAR',
  /** Romanian Lei (RON). */
  Ron = 'RON',
  /** Serbian dinar (RSD). */
  Rsd = 'RSD',
  /** Russian Rubles (RUB). */
  Rub = 'RUB',
  /** Rwandan Franc (RWF). */
  Rwf = 'RWF',
  /** Saudi Riyal (SAR). */
  Sar = 'SAR',
  /** Solomon Islands Dollar (SBD). */
  Sbd = 'SBD',
  /** Seychellois Rupee (SCR). */
  Scr = 'SCR',
  /** Sudanese Pound (SDG). */
  Sdg = 'SDG',
  /** Swedish Kronor (SEK). */
  Sek = 'SEK',
  /** Singapore Dollars (SGD). */
  Sgd = 'SGD',
  /** Saint Helena Pounds (SHP). */
  Shp = 'SHP',
  /** Sierra Leonean Leone (SLL). */
  Sll = 'SLL',
  /** Somali Shilling (SOS). */
  Sos = 'SOS',
  /** Surinamese Dollar (SRD). */
  Srd = 'SRD',
  /** South Sudanese Pound (SSP). */
  Ssp = 'SSP',
  /**
   * Sao Tome And Principe Dobra (STD).
   * @deprecated `STD` is deprecated. Use `STN` available from version `2022-07` onwards instead.
   */
  Std = 'STD',
  /** Sao Tome And Principe Dobra (STN). */
  Stn = 'STN',
  /** Syrian Pound (SYP). */
  Syp = 'SYP',
  /** Swazi Lilangeni (SZL). */
  Szl = 'SZL',
  /** Thai baht (THB). */
  Thb = 'THB',
  /** Tajikistani Somoni (TJS). */
  Tjs = 'TJS',
  /** Turkmenistani Manat (TMT). */
  Tmt = 'TMT',
  /** Tunisian Dinar (TND). */
  Tnd = 'TND',
  /** Tongan Pa'anga (TOP). */
  Top = 'TOP',
  /** Turkish Lira (TRY). */
  Try = 'TRY',
  /** Trinidad and Tobago Dollars (TTD). */
  Ttd = 'TTD',
  /** Taiwan Dollars (TWD). */
  Twd = 'TWD',
  /** Tanzanian Shilling (TZS). */
  Tzs = 'TZS',
  /** Ukrainian Hryvnia (UAH). */
  Uah = 'UAH',
  /** Ugandan Shilling (UGX). */
  Ugx = 'UGX',
  /** United States Dollars (USD). */
  Usd = 'USD',
  /** Uruguayan Pesos (UYU). */
  Uyu = 'UYU',
  /** Uzbekistan som (UZS). */
  Uzs = 'UZS',
  /** Venezuelan Bolivares (VED). */
  Ved = 'VED',
  /**
   * Venezuelan Bolivares (VEF).
   * @deprecated `VEF` is deprecated. Use `VES` available from version `2020-10` onwards instead.
   */
  Vef = 'VEF',
  /** Venezuelan Bolivares (VES). */
  Ves = 'VES',
  /** Vietnamese đồng (VND). */
  Vnd = 'VND',
  /** Vanuatu Vatu (VUV). */
  Vuv = 'VUV',
  /** Samoan Tala (WST). */
  Wst = 'WST',
  /** Central African CFA Franc (XAF). */
  Xaf = 'XAF',
  /** East Caribbean Dollar (XCD). */
  Xcd = 'XCD',
  /** West African CFA franc (XOF). */
  Xof = 'XOF',
  /** CFP Franc (XPF). */
  Xpf = 'XPF',
  /** Unrecognized currency. */
  Xxx = 'XXX',
  /** Yemeni Rial (YER). */
  Yer = 'YER',
  /** South African Rand (ZAR). */
  Zar = 'ZAR',
  /** Zambian Kwacha (ZMW). */
  Zmw = 'ZMW',
}

export type ProductProviderFragmentFragment = {
  __typename?: 'Product';
  id: string;
  title: string;
  description: string;
  descriptionHtml: any;
  handle: string;
  vendor: string;
  productType: string;
  tags: Array<string>;
  seo: {
    __typename?: 'SEO';
    title?: string | null;
    description?: string | null;
  };
  images: {
    __typename?: 'ImageConnection';
    edges: Array<{
      __typename?: 'ImageEdge';
      node: {
        __typename: 'Image';
        id?: string | null;
        url: any;
        altText?: string | null;
        width?: number | null;
        height?: number | null;
      };
    }>;
  };
  compareAtPriceRange: {
    __typename?: 'ProductPriceRange';
    maxVariantPrice: {
      __typename?: 'MoneyV2';
      currencyCode: CurrencyCode;
      amount: any;
    };
    minVariantPrice: {
      __typename?: 'MoneyV2';
      currencyCode: CurrencyCode;
      amount: any;
    };
  };
  priceRange: {
    __typename?: 'ProductPriceRange';
    maxVariantPrice: {
      __typename?: 'MoneyV2';
      currencyCode: CurrencyCode;
      amount: any;
    };
    minVariantPrice: {
      __typename?: 'MoneyV2';
      currencyCode: CurrencyCode;
      amount: any;
    };
  };
  variants: {
    __typename?: 'ProductVariantConnection';
    edges: Array<{
      __typename?: 'ProductVariantEdge';
      node: {
        __typename?: 'ProductVariant';
        id: string;
        title: string;
        availableForSale: boolean;
        sku?: string | null;
        image?: {
          __typename: 'Image';
          id?: string | null;
          url: any;
          altText?: string | null;
          width?: number | null;
          height?: number | null;
        } | null;
        priceV2: {
          __typename?: 'MoneyV2';
          currencyCode: CurrencyCode;
          amount: any;
        };
        compareAtPriceV2?: {
          __typename?: 'MoneyV2';
          currencyCode: CurrencyCode;
          amount: any;
        } | null;
        selectedOptions: Array<{
          __typename?: 'SelectedOption';
          name: string;
          value: string;
        }>;
      };
    }>;
  };
};

/** The checkout charge when the full amount isn't charged at checkout. */
enum SellingPlanCheckoutChargeType {
  /** The checkout charge is a percentage of the product or variant price. */
  Percentage = 'PERCENTAGE',
  /** The checkout charge is a fixed price amount. */
  Price = 'PRICE',
}

type VariantFragmentFragment = {
  __typename?: 'ProductVariant';
  id: string;
  title: string;
  availableForSale: boolean;
  sku?: string | null;
  image?: {
    __typename: 'Image';
    id?: string | null;
    url: any;
    altText?: string | null;
    width?: number | null;
    height?: number | null;
  } | null;
  price: { __typename?: 'MoneyV2'; currencyCode: CurrencyCode; amount: any };
  compareAtPrice?: {
    __typename?: 'MoneyV2';
    currencyCode: CurrencyCode;
    amount: any;
  } | null;
  selectedOptions: Array<{
    __typename?: 'SelectedOption';
    name: string;
    value: string;
  }>;
  sellingPlanAllocations?: {
    __typename?: 'SellingPlanAllocationConnection';
    edges: Array<{
      __typename?: 'SellingPlanAllocationEdge';
      node: {
        __typename?: 'SellingPlanAllocation';
        priceAdjustments: Array<{
          __typename?: 'SellingPlanAllocationPriceAdjustment';
          compareAtPrice: {
            __typename?: 'MoneyV2';
            currencyCode: CurrencyCode;
            amount: any;
          };
          perDeliveryPrice: {
            __typename?: 'MoneyV2';
            currencyCode: CurrencyCode;
            amount: any;
          };
          price: {
            __typename?: 'MoneyV2';
            currencyCode: CurrencyCode;
            amount: any;
          };
          unitPrice?: {
            __typename?: 'MoneyV2';
            currencyCode: CurrencyCode;
            amount: any;
          } | null;
        }>;
        sellingPlan: {
          __typename?: 'SellingPlan';
          id: string;
          description?: string | null;
          name: string;
          recurringDeliveries: boolean;
          options: Array<{
            __typename?: 'SellingPlanOption';
            name?: string | null;
            value?: string | null;
          }>;
          priceAdjustments: Array<{
            __typename?: 'SellingPlanPriceAdjustment';
            orderCount?: number | null;
            adjustmentValue:
              | {
                  __typename?: 'SellingPlanFixedAmountPriceAdjustment';
                  adjustmentAmount: {
                    __typename?: 'MoneyV2';
                    currencyCode: CurrencyCode;
                    amount: any;
                  };
                }
              | {
                  __typename?: 'SellingPlanFixedPriceAdjustment';
                  price: {
                    __typename?: 'MoneyV2';
                    currencyCode: CurrencyCode;
                    amount: any;
                  };
                }
              | {
                  __typename?: 'SellingPlanPercentagePriceAdjustment';
                  adjustmentPercentage: number;
                };
          }>;
          checkoutCharge: {
            __typename?: 'SellingPlanCheckoutCharge';
            type: SellingPlanCheckoutChargeType;
            value:
              | {
                  __typename?: 'MoneyV2';
                  currencyCode: CurrencyCode;
                  amount: any;
                }
              | { __typename?: 'SellingPlanCheckoutChargePercentageValue' };
          };
        };
      };
    }>;
  };
};

type SellingPlanFragmentFragment = {
  __typename?: 'SellingPlan';
  id: string;
  description?: string | null;
  name: string;
  recurringDeliveries: boolean;
  options: Array<{
    __typename?: 'SellingPlanOption';
    name?: string | null;
    value?: string | null;
  }>;
  priceAdjustments: Array<{
    __typename?: 'SellingPlanPriceAdjustment';
    orderCount?: number | null;
    adjustmentValue:
      | {
          __typename?: 'SellingPlanFixedAmountPriceAdjustment';
          adjustmentAmount: {
            __typename?: 'MoneyV2';
            currencyCode: CurrencyCode;
            amount: any;
          };
        }
      | {
          __typename?: 'SellingPlanFixedPriceAdjustment';
          price: {
            __typename?: 'MoneyV2';
            currencyCode: CurrencyCode;
            amount: any;
          };
        }
      | {
          __typename?: 'SellingPlanPercentagePriceAdjustment';
          adjustmentPercentage: number;
        };
  }>;
};

type SellingPlanGroupsFragmentFragment = {
  __typename?: 'SellingPlanGroup';
  appName?: string | null;
  name: string;
  sellingPlans: {
    __typename?: 'SellingPlanConnection';
    edges: Array<{
      __typename?: 'SellingPlanEdge';
      node: {
        __typename?: 'SellingPlan';
        id: string;
        description?: string | null;
        name: string;
        recurringDeliveries: boolean;
        options: Array<{
          __typename?: 'SellingPlanOption';
          name?: string | null;
          value?: string | null;
        }>;
        priceAdjustments: Array<{
          __typename?: 'SellingPlanPriceAdjustment';
          orderCount?: number | null;
          adjustmentValue:
            | {
                __typename?: 'SellingPlanFixedAmountPriceAdjustment';
                adjustmentAmount: {
                  __typename?: 'MoneyV2';
                  currencyCode: CurrencyCode;
                  amount: any;
                };
              }
            | {
                __typename?: 'SellingPlanFixedPriceAdjustment';
                price: {
                  __typename?: 'MoneyV2';
                  currencyCode: CurrencyCode;
                  amount: any;
                };
              }
            | {
                __typename?: 'SellingPlanPercentagePriceAdjustment';
                adjustmentPercentage: number;
              };
        }>;
      };
    }>;
  };
  options: Array<{
    __typename?: 'SellingPlanGroupOption';
    name: string;
    values: Array<string>;
  }>;
};

// Variants can be partials, but they _must_ have the following
// fields in order to use the product options functionality:
// - id
// - selectedOptions
type Variant = Omit<
  Partial<VariantFragmentFragment>,
  'id' | 'selectedOptions' | 'metafields'
> & {
  id: VariantFragmentFragment['id'];
  selectedOptions: VariantFragmentFragment['selectedOptions'];
};

type SelectedOptions = {
  [key: string]: string;
};

type SelectVariantCallback = (variant: Variant) => void;

type SelectOptionCallback = (
  name: VariantFragmentFragment['selectedOptions'][0]['name'],
  value: VariantFragmentFragment['selectedOptions'][0]['value'],
) => void;

type SelectOptionsCallback = (options: SelectedOptions) => void;

type OptionsInStockCallback = (
  name: VariantFragmentFragment['selectedOptions'][0]['name'],
  value: VariantFragmentFragment['selectedOptions'][0]['value'],
) => boolean;

interface OptionWithValues {
  name: VariantFragmentFragment['selectedOptions'][0]['name'];
  values: VariantFragmentFragment['selectedOptions'][0]['value'][];
}

type SellingPlanGroup = Omit<
  Partial<SellingPlanGroupsFragmentFragment>,
  'options'
> & {
  options: SellingPlanGroupsFragmentFragment['options'];
};

// SellingPlans can be partials but they _must_ have an id in order
// to work with the product options functionality
type SellingPlan = Omit<Partial<SellingPlanFragmentFragment>, 'id'> & {
  id: SellingPlanFragmentFragment['id'];
};

// SellingPlanAllocations can be partial, but their sellingPlan _must_ have an id in order
// to work with the product options functionality
type SellingPlanAllocation = Omit<
  Partial<
    NonNullable<
      VariantFragmentFragment['sellingPlanAllocations']
    >['edges'][0]['node']
  >,
  'sellingPlan'
> & {
  sellingPlan: Omit<Partial<SellingPlanFragmentFragment>, 'id'> & {
    id: SellingPlanFragmentFragment['id'];
  };
};

export type SelectedSellingPlanCallback = (sellingPlan?: SellingPlan) => void;

interface Product
  extends Pick<
    ProductProviderFragmentFragment,
    | 'compareAtPriceRange'
    | 'description'
    | 'descriptionHtml'
    | 'handle'
    | 'id'
    | 'priceRange'
    | 'title'
    | 'vendor'
    | 'seo'
    | 'images'
    | 'tags'
  > {
  /** An array of the variant `nodes` from the `VariantConnection`. */
  variants: Variant[];
  variantsConnection?: GraphQLConnection<Variant>;
  /** An array of the product's options and values. */
  options: OptionWithValues[];
  /** The selected variant. */
  selectedVariant?: Variant;
  /** A callback to set the selected variant to the variant passed as an argument. */
  setSelectedVariant: SelectVariantCallback;
  selectedOptions: SelectedOptions;
  /** A callback to set the selected option. */
  setSelectedOption: SelectOptionCallback;
  /** A callback to set multiple selected options at once. */
  setSelectedOptions: SelectOptionsCallback;
  /** A callback that returns a boolean indicating if the option is in stock. */
  isOptionInStock: OptionsInStockCallback;
  /** A callback to set the selected selling plan to the one passed as an argument. */
  setSelectedSellingPlan: SelectedSellingPlanCallback;
  /** The selected selling plan. */
  selectedSellingPlan?: SellingPlan;
  /** The selected selling plan allocation. */
  selectedSellingPlanAllocation?: SellingPlanAllocation;
  /** The selling plan groups. */
  sellingPlanGroups?: (Omit<SellingPlanGroup, 'sellingPlans'> & {
    sellingPlans: SellingPlan[];
  })[];
  sellingPlanGroupsConnection?: GraphQLConnection<SellingPlanGroup>;
}

interface RichTextStoryblok {
  content?: RichTextStoryblok[];
  marks?: RichTextStoryblok[];
  attrs?: any;
  text?: string;
  type: string;
}

interface AddToCartParams {
  attributes?: { key: string; value: string }[];
  product: any;
  quantity?: number;
  showModalOnSuccess?: boolean;
  variantId: string;
}

interface PdpContext {
  addToCart: (params: AddToCartParams) => Promise<void>;
  openNotifyMeModal: () => void;
  personalizations?: PublicProductForm & {
    fields: Array<ProductFormField & { id: string }>;
  };
  product: Product;
  notificationMessage?: any;
  quantity: {
    value: number;
    setValue: (value: number) => void;
  };
  reviews?: {
    count: number;
    rating: number;
  };
  details?: {
    title: string;
    content: RichTextStoryblok;
  }[];
  usps?: {
    text: string;
  }[];
}

export function usePdpContext() {
  const { pageContext, type, subtype } = useBlockContext();

  if (type !== BlockType.Page || subtype !== BlockSubtype.Pdp) {
    throw new Error('usePdpContext can only be used inside a PDP block');
  }

  return (pageContext || {}) as PdpContext;
}
