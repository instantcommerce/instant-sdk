export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  ConnectionCursor: any;
  DateTime: any;
  Object: any;
  UUID: any;
  Upload: any;
};

export type AddOneDomainInput = {
  hostname: Scalars['String'];
};

/** Add to cart button behavior */
export enum AddToCartBehavior {
  Modal = 'MODAL',
  Sidebar = 'SIDEBAR'
}

export type AddToWishlistInput = {
  /** Required in Appmate integration. */
  listId?: InputMaybe<Scalars['String']>;
  productId: Scalars['String'];
  sessionId?: InputMaybe<Scalars['String']>;
  /** Required in Growave integration. */
  userId?: InputMaybe<Scalars['String']>;
  variantId?: InputMaybe<Scalars['String']>;
};

/** Additional details layout. */
export enum AdditionalDetailsLayout {
  Accordion = 'ACCORDION',
  Tabs = 'TABS'
}

export type AlgoliaIndex = {
  __typename?: 'AlgoliaIndex';
  indexName: Scalars['String'];
  label: Scalars['String'];
  translations: Array<LocalizedValue>;
};

export type AlgoliaMetadata = {
  __typename?: 'AlgoliaMetadata';
  applicationId?: Maybe<Scalars['String']>;
  indexes?: Maybe<Array<AlgoliaIndex>>;
  searchApiKey?: Maybe<Scalars['String']>;
};

export type AlgoliaPublicMetadata = {
  __typename?: 'AlgoliaPublicMetadata';
  applicationId?: Maybe<Scalars['String']>;
  indexes?: Maybe<Array<AlgoliaIndex>>;
  searchApiKey?: Maybe<Scalars['String']>;
};

export type AppmateMetadata = {
  __typename?: 'AppmateMetadata';
  _void: Scalars['Boolean'];
};

export type Asset = {
  __typename?: 'Asset';
  createdAt: Scalars['DateTime'];
  id: Scalars['UUID'];
  mimeType?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  type: AssetType;
  updatedAt: Scalars['DateTime'];
  url: Scalars['String'];
};

export type AssetAggregateGroupBy = {
  __typename?: 'AssetAggregateGroupBy';
  createdAt?: Maybe<Scalars['DateTime']>;
  type?: Maybe<AssetType>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type AssetConnection = {
  __typename?: 'AssetConnection';
  /** Array of edges. */
  edges: Array<AssetEdge>;
  /** Paging information */
  pageInfo: PageInfo;
};

export type AssetCountAggregate = {
  __typename?: 'AssetCountAggregate';
  createdAt?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['Int']>;
};

export type AssetDeleteFilter = {
  and?: InputMaybe<Array<AssetDeleteFilter>>;
  createdAt?: InputMaybe<DateFieldComparison>;
  or?: InputMaybe<Array<AssetDeleteFilter>>;
  type?: InputMaybe<AssetTypeFilterComparison>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type AssetDeleteResponse = {
  __typename?: 'AssetDeleteResponse';
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['UUID']>;
  mimeType?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<AssetType>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type AssetEdge = {
  __typename?: 'AssetEdge';
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor'];
  /** The node containing the Asset */
  node: Asset;
};

export type AssetFilter = {
  and?: InputMaybe<Array<AssetFilter>>;
  createdAt?: InputMaybe<DateFieldComparison>;
  or?: InputMaybe<Array<AssetFilter>>;
  type?: InputMaybe<AssetTypeFilterComparison>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type AssetMaxAggregate = {
  __typename?: 'AssetMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  type?: Maybe<AssetType>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type AssetMinAggregate = {
  __typename?: 'AssetMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  type?: Maybe<AssetType>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type AssetSort = {
  direction: SortDirection;
  field: AssetSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum AssetSortFields {
  CreatedAt = 'createdAt',
  Type = 'type',
  UpdatedAt = 'updatedAt'
}

export enum AssetType {
  Font = 'FONT'
}

export type AssetTypeFilterComparison = {
  eq?: InputMaybe<AssetType>;
  gt?: InputMaybe<AssetType>;
  gte?: InputMaybe<AssetType>;
  iLike?: InputMaybe<AssetType>;
  in?: InputMaybe<Array<AssetType>>;
  is?: InputMaybe<Scalars['Boolean']>;
  isNot?: InputMaybe<Scalars['Boolean']>;
  like?: InputMaybe<AssetType>;
  lt?: InputMaybe<AssetType>;
  lte?: InputMaybe<AssetType>;
  neq?: InputMaybe<AssetType>;
  notILike?: InputMaybe<AssetType>;
  notIn?: InputMaybe<Array<AssetType>>;
  notLike?: InputMaybe<AssetType>;
};

export type Auth0ListInput = {
  page?: InputMaybe<Scalars['Float']>;
};

export type Auth0ListInvitationsResponse = {
  __typename?: 'Auth0ListInvitationsResponse';
  invitations: Array<OrganizationMemberInvitation>;
  limit: Scalars['Float'];
  start: Scalars['Float'];
  total: Scalars['Float'];
};

export type Auth0ListUsersResponse = {
  __typename?: 'Auth0ListUsersResponse';
  limit: Scalars['Float'];
  members: Array<OrganizationMember>;
  start: Scalars['Float'];
  total: Scalars['Float'];
};

export type Auth0Role = {
  __typename?: 'Auth0Role';
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name: Scalars['String'];
};

export type AverageRating = {
  __typename?: 'AverageRating';
  /** Product id. */
  productId: Scalars['String'];
  /** Average rating of reviews. */
  rating: Scalars['Float'];
  /** Total number of reviews for each star. */
  reviewStars?: Maybe<ReviewStars>;
  /** Total number of reviews. */
  reviews: Scalars['Float'];
};

export type BillingAddress = {
  __typename?: 'BillingAddress';
  city: Scalars['String'];
  /** 2-letter country code (ISO 3166-1 alpha-2) */
  countryCode: Scalars['String'];
  line1: Scalars['String'];
  line2?: Maybe<Scalars['String']>;
  postalCode: Scalars['String'];
  state?: Maybe<Scalars['String']>;
};

export type BillingAddressInput = {
  city: Scalars['String'];
  /** 2-letter country code (ISO 3166-1 alpha-2) */
  countryCode: Scalars['String'];
  line1: Scalars['String'];
  line2?: InputMaybe<Scalars['String']>;
  postalCode: Scalars['String'];
  state?: InputMaybe<Scalars['String']>;
};

export type BillingDetails = {
  __typename?: 'BillingDetails';
  customer?: Maybe<CustomerDetails>;
  subscription?: Maybe<SubscriptionDetails>;
};

export type Block = {
  __typename?: 'Block';
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  version?: Maybe<BlockVersion>;
  versions: Array<BlockVersion>;
};


export type BlockVersionArgs = {
  tag?: InputMaybe<Scalars['Float']>;
};

export type BlockAggregateGroupBy = {
  __typename?: 'BlockAggregateGroupBy';
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type BlockConnection = {
  __typename?: 'BlockConnection';
  /** Array of edges. */
  edges: Array<BlockEdge>;
  /** Paging information */
  pageInfo: PageInfo;
};

export type BlockCountAggregate = {
  __typename?: 'BlockCountAggregate';
  createdAt?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['Int']>;
};

export type BlockDeleteResponse = {
  __typename?: 'BlockDeleteResponse';
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['UUID']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type BlockEdge = {
  __typename?: 'BlockEdge';
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor'];
  /** The node containing the Block */
  node: Block;
};

export type BlockFilter = {
  and?: InputMaybe<Array<BlockFilter>>;
  createdAt?: InputMaybe<DateFieldComparison>;
  or?: InputMaybe<Array<BlockFilter>>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type BlockMaxAggregate = {
  __typename?: 'BlockMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type BlockMinAggregate = {
  __typename?: 'BlockMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type BlockSort = {
  direction: SortDirection;
  field: BlockSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum BlockSortFields {
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt'
}

/** Block theme settings. */
export enum BlockTheme {
  Dark = 'DARK',
  Gray = 'GRAY',
  Light = 'LIGHT',
  Primary = 'PRIMARY',
  PrimaryLight = 'PRIMARY_LIGHT'
}

export type BlockVersion = {
  __typename?: 'BlockVersion';
  codeHash: Scalars['String'];
  codeUrl: Scalars['String'];
  contentSchema: ContentSchema;
  contentSchemaHash: Scalars['String'];
  createdAt: Scalars['DateTime'];
  customizerSchema: CustomizerSchema;
  customizerSchemaHash: Scalars['String'];
  id: Scalars['UUID'];
  tag: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type BlockquoteBlock = {
  __typename?: 'BlockquoteBlock';
  authorColor?: Maybe<Scalars['String']>;
  backgroundColor?: Maybe<Scalars['String']>;
  blockBackgroundColor?: Maybe<Scalars['String']>;
  blockBorderRadius?: Maybe<BorderRadius>;
  contentAlignment: TextAlignment;
  hasLeftBorder: Scalars['Boolean'];
  id: Scalars['UUID'];
  leftBorderColor?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  quoteColor?: Maybe<Scalars['String']>;
  quoteSize: FontSize;
  subtextColor?: Maybe<Scalars['String']>;
  textSize: FontSize;
  theme: BlockTheme;
};

export type BlogCardsColumnsBlock = {
  __typename?: 'BlogCardsColumnsBlock';
  backgroundColor?: Maybe<Scalars['String']>;
  cardBackgroundColor?: Maybe<Scalars['String']>;
  cardBorderRadius?: Maybe<BorderRadius>;
  cardContentAlignment: TextAlignment;
  cardContentSize: FontSize;
  /** @deprecated Should use `linkType` in the future instead. */
  cardLinkColor?: Maybe<Scalars['String']>;
  cardPretitleColor?: Maybe<Scalars['String']>;
  cardShadow?: Maybe<BoxShadow>;
  cardTextColor?: Maybe<Scalars['String']>;
  cardTitleColor?: Maybe<Scalars['String']>;
  dividerColor?: Maybe<Scalars['String']>;
  hasCardBackground: Scalars['Boolean'];
  hasDivider: Scalars['Boolean'];
  headerAlignment: TextAlignment;
  headerButtonType: ButtonType;
  headerPretitleColor?: Maybe<Scalars['String']>;
  headerSize: FontSize;
  headerSubtitleColor?: Maybe<Scalars['String']>;
  headerTitleColor?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  imageBorderRadius?: Maybe<BorderRadius>;
  name: Scalars['String'];
  theme: BlockTheme;
};

export type BlogCardsDefaultBlock = {
  __typename?: 'BlogCardsDefaultBlock';
  backgroundColor?: Maybe<Scalars['String']>;
  cardBackgroundColor?: Maybe<Scalars['String']>;
  cardBorderRadius?: Maybe<BorderRadius>;
  cardContentAlignment: TextAlignment;
  cardContentSize: FontSize;
  /** @deprecated Should use `linkType` in the future instead. */
  cardLinkColor?: Maybe<Scalars['String']>;
  cardPretitleColor?: Maybe<Scalars['String']>;
  cardShadow?: Maybe<BoxShadow>;
  cardTextColor?: Maybe<Scalars['String']>;
  cardTitleColor?: Maybe<Scalars['String']>;
  dividerColor?: Maybe<Scalars['String']>;
  hasCardBackground: Scalars['Boolean'];
  hasDivider: Scalars['Boolean'];
  headerAlignment: TextAlignment;
  headerPretitleColor?: Maybe<Scalars['String']>;
  headerSize: FontSize;
  headerSubtitleColor?: Maybe<Scalars['String']>;
  headerTitleColor?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  imageBorderRadius?: Maybe<BorderRadius>;
  name: Scalars['String'];
  theme: BlockTheme;
};

export type BlogDetailPage = {
  __typename?: 'BlogDetailPage';
  hasBreadcrumbs: Scalars['Boolean'];
};

export type BlogDetailPageInput = {
  hasBreadcrumbs?: InputMaybe<Scalars['Boolean']>;
};

export type BlogHeaderBlock = {
  __typename?: 'BlogHeaderBlock';
  backgroundColor?: Maybe<Scalars['String']>;
  containerWidth: ContainerWidth;
  contentAlignment: TextAlignment;
  headerSize: FontSize;
  iconSocialStyle: IconSocialStyle;
  id: Scalars['UUID'];
  imageBorderRadius?: Maybe<BorderRadius>;
  imageShadow?: Maybe<BoxShadow>;
  labelColor?: Maybe<Scalars['String']>;
  layout: BlogHeaderLayout;
  name: Scalars['String'];
  pretitleColor?: Maybe<Scalars['String']>;
  socialButtonType: ButtonType;
  subtitleColor?: Maybe<Scalars['String']>;
  textColor?: Maybe<Scalars['String']>;
  textSize: FontSize;
  theme: BlockTheme;
  titleColor?: Maybe<Scalars['String']>;
};

/** Blog header layout. */
export enum BlogHeaderLayout {
  Horizontal = 'HORIZONTAL',
  Vertical = 'VERTICAL'
}

export type BlogSliderBlock = {
  __typename?: 'BlogSliderBlock';
  backgroundColor?: Maybe<Scalars['String']>;
  cardBackgroundColor?: Maybe<Scalars['String']>;
  cardBorderRadius?: Maybe<BorderRadius>;
  cardContentAlignment: TextAlignment;
  cardContentSize: FontSize;
  cardPretitleColor?: Maybe<Scalars['String']>;
  cardShadow?: Maybe<BoxShadow>;
  cardTextColor?: Maybe<Scalars['String']>;
  cardTitleColor?: Maybe<Scalars['String']>;
  dividerColor?: Maybe<Scalars['String']>;
  hasCardBackground: Scalars['Boolean'];
  hasDivider: Scalars['Boolean'];
  headerAlignment: TextAlignment;
  headerPretitleColor?: Maybe<Scalars['String']>;
  headerSize: FontSize;
  headerSubtitleColor?: Maybe<Scalars['String']>;
  headerTitleColor?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  imageBorderRadius?: Maybe<BorderRadius>;
  name: Scalars['String'];
  theme: BlockTheme;
};

export type BooleanFieldComparison = {
  is?: InputMaybe<Scalars['Boolean']>;
  isNot?: InputMaybe<Scalars['Boolean']>;
};

/** Border radius. */
export enum BorderRadius {
  Large = 'LARGE',
  Medium = 'MEDIUM',
  None = 'NONE',
  Small = 'SMALL'
}

/** Border radius with full option. */
export enum BorderRadiusWithFull {
  Full = 'FULL',
  Large = 'LARGE',
  Medium = 'MEDIUM',
  None = 'NONE',
  Small = 'SMALL'
}

/** Box shadow. */
export enum BoxShadow {
  Large = 'LARGE',
  Medium = 'MEDIUM',
  None = 'NONE',
  Small = 'SMALL'
}

export type ButtonComponent = {
  __typename?: 'ButtonComponent';
  borderRadius: BorderRadiusWithFull;
  boxShadow: BoxShadow;
  fontWeight: FontWeight;
};

export type ButtonComponentInput = {
  borderRadius?: InputMaybe<BorderRadiusWithFull>;
  boxShadow?: InputMaybe<BoxShadow>;
  fontWeight?: InputMaybe<FontWeight>;
};

/** Button type. */
export enum ButtonType {
  Primary = 'PRIMARY',
  Secondary = 'SECONDARY',
  White = 'WHITE'
}

export type CardBlock = {
  __typename?: 'CardBlock';
  backgroundColor?: Maybe<Scalars['String']>;
  borderRadius?: Maybe<BorderRadius>;
  boxShadow?: Maybe<BoxShadow>;
  /** @deprecated Not used anywhere. */
  buttonType?: Maybe<ButtonType>;
  /** @deprecated Should use `borderRadius` instead. */
  cardBorderRadius?: Maybe<BorderRadius>;
  /** @deprecated Should use `boxShadow` instead. */
  cardShadow?: Maybe<BoxShadow>;
  cardTextColor?: Maybe<Scalars['String']>;
  cardTitleColor?: Maybe<Scalars['String']>;
  containerWidth: ContainerWidth;
  contentAlignment: TextAlignment;
  dividerColor?: Maybe<Scalars['String']>;
  hasDivider: Scalars['Boolean'];
  headerAlignment: TextAlignment;
  headerPretitleColor?: Maybe<Scalars['String']>;
  headerSize: FontSize;
  headerSubtitleColor?: Maybe<Scalars['String']>;
  headerTitleColor?: Maybe<Scalars['String']>;
  /** @deprecated Should use `headerTitleColor` instead. */
  headingColor?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  imageHeight: ImageHeight;
  name: Scalars['String'];
  /** @deprecated Should use `headerPretitleColor` instead. */
  pretitleColor?: Maybe<Scalars['String']>;
  /** @deprecated Should use `headerSubtitleColor` instead. */
  subtitleColor?: Maybe<Scalars['String']>;
  /** @deprecated Not used anywhere. */
  textColor?: Maybe<Scalars['String']>;
  textSize: FontSize;
  theme: BlockTheme;
  /** @deprecated Should use `headerTitleColor` instead. */
  titleColor?: Maybe<Scalars['String']>;
};

/** Nav cart button behavior */
export enum CartButtonBehavior {
  Page = 'PAGE',
  Sidebar = 'SIDEBAR'
}

export type CartPage = {
  __typename?: 'CartPage';
  addToCartBehavior: AddToCartBehavior;
  cartButtonBehavior: CartButtonBehavior;
  hasPaymentIconsPage: Scalars['Boolean'];
  hasPaymentIconsSidebar: Scalars['Boolean'];
  hasProductSuggestionsModal: Scalars['Boolean'];
  hasProductSuggestionsSidebar: Scalars['Boolean'];
};

export type CartPageInput = {
  addToCartBehavior?: InputMaybe<AddToCartBehavior>;
  cartButtonBehavior?: InputMaybe<CartButtonBehavior>;
  hasPaymentIconsPage?: InputMaybe<Scalars['Boolean']>;
  hasPaymentIconsSidebar?: InputMaybe<Scalars['Boolean']>;
  hasProductSuggestionsModal?: InputMaybe<Scalars['Boolean']>;
  hasProductSuggestionsSidebar?: InputMaybe<Scalars['Boolean']>;
};

export type CategoryBlock = {
  __typename?: 'CategoryBlock';
  backgroundColor?: Maybe<Scalars['String']>;
  /** @deprecated Should use `cardBorderRadius` instead. */
  blockBorderRadius?: Maybe<BorderRadius>;
  /** @deprecated Should use `cardShadow` instead. */
  blockShadow?: Maybe<BoxShadow>;
  cardBorderRadius?: Maybe<BorderRadius>;
  cardShadow?: Maybe<BoxShadow>;
  /** @deprecated Not used anywhere. */
  cardTextColor?: Maybe<Scalars['String']>;
  cardTitleColor?: Maybe<Scalars['String']>;
  containerWidth: ContainerWidth;
  contentAlignment: TextAlignment;
  dividerColor?: Maybe<Scalars['String']>;
  hasDivider: Scalars['Boolean'];
  headerAlignment: TextAlignment;
  headerPretitleColor?: Maybe<Scalars['String']>;
  headerSize: FontSize;
  headerSubtitleColor?: Maybe<Scalars['String']>;
  headerTitleColor?: Maybe<Scalars['String']>;
  /** @deprecated Should use `headerTitleColor` instead. */
  headingColor?: Maybe<Scalars['String']>;
  /** @deprecated Should use `imageHeight` instead. */
  height?: Maybe<ImageHeight>;
  id: Scalars['UUID'];
  imageHeight: ImageHeight;
  name: Scalars['String'];
  overlay?: Maybe<OverlayField>;
  /** @deprecated Should use `headerPretitleColor` instead. */
  pretitleColor?: Maybe<Scalars['String']>;
  /** @deprecated Should use `textSize` instead. */
  size?: Maybe<FontSize>;
  /** @deprecated Should use `headerSubtitleColor` instead. */
  subtitleColor?: Maybe<Scalars['String']>;
  /** @deprecated Should use `contentAlignment` instead. */
  textPosition: CategoryTextPosition;
  textSize: FontSize;
  theme: BlockTheme;
  /** @deprecated Should use `headerTitleColor` instead. */
  titleColor?: Maybe<Scalars['String']>;
};

export type CategorySliderBlock = {
  __typename?: 'CategorySliderBlock';
  backgroundColor?: Maybe<Scalars['String']>;
  buttonType: ButtonType;
  cardBorderRadius?: Maybe<BorderRadius>;
  cardShadow?: Maybe<BoxShadow>;
  /** @deprecated Not used anywhere. */
  cardTextColor?: Maybe<Scalars['String']>;
  cardTitleColor?: Maybe<Scalars['String']>;
  containerWidth: ContainerWidth;
  contentAlignment: TextAlignment;
  dividerColor?: Maybe<Scalars['String']>;
  hasDivider: Scalars['Boolean'];
  headerAlignment: TextAlignment;
  headerPretitleColor?: Maybe<Scalars['String']>;
  headerSize: FontSize;
  headerSubtitleColor?: Maybe<Scalars['String']>;
  headerTitleColor?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  imageHeight: ImageHeight;
  name: Scalars['String'];
  overlay?: Maybe<OverlayField>;
  /** @deprecated Should use `headerPretitleColor` instead. */
  pretitleColor?: Maybe<Scalars['String']>;
  /** @deprecated Should use `headerSubtitleColor` instead. */
  subtitleColor?: Maybe<Scalars['String']>;
  /** @deprecated Not used anywhere. */
  textColor?: Maybe<Scalars['String']>;
  textSize: FontSize;
  theme: BlockTheme;
  /** @deprecated Should use `headerTitleColor` instead. */
  titleColor?: Maybe<Scalars['String']>;
};

/** Category text position. */
export enum CategoryTextPosition {
  BottomLeft = 'BOTTOM_LEFT',
  CenterCenter = 'CENTER_CENTER'
}

export type ChangeAuth0PasswordInput = {
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};

export type CodeEmbedBlock = {
  __typename?: 'CodeEmbedBlock';
  backgroundColor?: Maybe<Scalars['String']>;
  codeEmbedBorderRadius?: Maybe<BorderRadius>;
  codeEmbedShadow?: Maybe<BoxShadow>;
  containerWidth: ContainerWidth;
  dividerColor?: Maybe<Scalars['String']>;
  hasDivider: Scalars['Boolean'];
  headerAlignment: TextAlignment;
  headerPretitleColor?: Maybe<Scalars['String']>;
  headerSize: FontSize;
  headerSubtitleColor?: Maybe<Scalars['String']>;
  headerTitleColor?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  name: Scalars['String'];
  theme: BlockTheme;
};

/** Collections location. */
export enum CollectionsLocation {
  None = 'NONE',
  Side = 'SIDE',
  SideAndTop = 'SIDE_AND_TOP',
  Top = 'TOP'
}

/** Color swatches size. */
export enum ColorOptionsSize {
  ExtraSmall = 'EXTRA_SMALL',
  Large = 'LARGE',
  Medium = 'MEDIUM',
  Small = 'SMALL'
}

/** Color swatches style. */
export enum ColorOptionsStyle {
  Round = 'ROUND',
  Square = 'SQUARE'
}

export type ColorShadesField = {
  __typename?: 'ColorShadesField';
  s50: Scalars['String'];
  s100: Scalars['String'];
  s200: Scalars['String'];
  s300: Scalars['String'];
  s400: Scalars['String'];
  s500: Scalars['String'];
  s600: Scalars['String'];
  s700: Scalars['String'];
  s800: Scalars['String'];
  s900: Scalars['String'];
};

export type ColorShadesFieldInput = {
  s50: Scalars['String'];
  s100: Scalars['String'];
  s200: Scalars['String'];
  s300: Scalars['String'];
  s400: Scalars['String'];
  s500: Scalars['String'];
  s600: Scalars['String'];
  s700: Scalars['String'];
  s800: Scalars['String'];
  s900: Scalars['String'];
};

export type ColorValue = {
  __typename?: 'ColorValue';
  firstColor?: Maybe<Scalars['String']>;
  gradient?: Maybe<ProductColorGradient>;
  secondColor?: Maybe<Scalars['String']>;
  type: ProductColorType;
};

export type ContactDetailsBlock = {
  __typename?: 'ContactDetailsBlock';
  backgroundColor?: Maybe<Scalars['String']>;
  cardBackgroundColor?: Maybe<Scalars['String']>;
  cardBorderRadius?: Maybe<BorderRadius>;
  cardContentAlignment: TextAlignment;
  cardContentSize: FontSize;
  cardShadow?: Maybe<BoxShadow>;
  cardTextColor?: Maybe<Scalars['String']>;
  cardTitleColor?: Maybe<Scalars['String']>;
  dividerColor?: Maybe<Scalars['String']>;
  hasDivider: Scalars['Boolean'];
  headerAlignment: TextAlignment;
  headerPretitleColor?: Maybe<Scalars['String']>;
  headerSize: FontSize;
  headerSubtitleColor?: Maybe<Scalars['String']>;
  headerTitleColor?: Maybe<Scalars['String']>;
  iconBackgroundColor?: Maybe<Scalars['String']>;
  iconColor?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  name: Scalars['String'];
  theme: BlockTheme;
};

export type ContactFormBlock = {
  __typename?: 'ContactFormBlock';
  backgroundColor?: Maybe<Scalars['String']>;
  buttonType: ButtonType;
  contentAlignment: TextAlignment;
  headerSize: FontSize;
  id: Scalars['UUID'];
  labelColor?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  pretitleColor?: Maybe<Scalars['String']>;
  subtitleColor?: Maybe<Scalars['String']>;
  textColor?: Maybe<Scalars['String']>;
  theme: BlockTheme;
  titleColor?: Maybe<Scalars['String']>;
};

export type ContactFormImageBlock = {
  __typename?: 'ContactFormImageBlock';
  backgroundColor?: Maybe<Scalars['String']>;
  buttonType: ButtonType;
  contentAlignment: TextAlignment;
  headerSize: FontSize;
  id: Scalars['UUID'];
  labelColor?: Maybe<Scalars['String']>;
  layout: ContactFormLayout;
  name: Scalars['String'];
  pretitleColor?: Maybe<Scalars['String']>;
  subtitleColor?: Maybe<Scalars['String']>;
  textColor?: Maybe<Scalars['String']>;
  theme: BlockTheme;
  titleColor?: Maybe<Scalars['String']>;
};

/** Contact form layout. */
export enum ContactFormLayout {
  ImageLeft = 'IMAGE_LEFT',
  ImageRight = 'IMAGE_RIGHT'
}

export type ContactStoreInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  message: Scalars['String'];
};

/** Container width. */
export enum ContainerWidth {
  Boxed = 'BOXED',
  FullWidth = 'FULL_WIDTH'
}

export type ContentSchema = {
  __typename?: 'ContentSchema';
  displayName?: Maybe<Scalars['String']>;
  fields: Array<ContentSchemaField>;
  name: Scalars['String'];
  subschemas?: Maybe<Array<ContentSubschema>>;
};

export type ContentSchemaDateField = {
  __typename?: 'ContentSchemaDateField';
  description?: Maybe<Scalars['String']>;
  isRequired: Scalars['Boolean'];
  isTranslatable: Scalars['Boolean'];
  label?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  withTime: Scalars['Boolean'];
};

export type ContentSchemaField = ContentSchemaDateField | ContentSchemaImageField | ContentSchemaLinkField | ContentSchemaRichTextField | ContentSchemaSelectField | ContentSchemaSubschemaField | ContentSchemaTextField;

export type ContentSchemaImageField = {
  __typename?: 'ContentSchemaImageField';
  description?: Maybe<Scalars['String']>;
  isRequired: Scalars['Boolean'];
  isTranslatable: Scalars['Boolean'];
  label?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type ContentSchemaInput = {
  displayName?: InputMaybe<Scalars['String']>;
  fields: Array<Scalars['Object']>;
  name: Scalars['String'];
  subschemas?: InputMaybe<Array<ContentSubschemaInput>>;
};

export type ContentSchemaLinkField = {
  __typename?: 'ContentSchemaLinkField';
  description?: Maybe<Scalars['String']>;
  isRequired: Scalars['Boolean'];
  isTranslatable: Scalars['Boolean'];
  label?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type ContentSchemaRichTextField = {
  __typename?: 'ContentSchemaRichTextField';
  description?: Maybe<Scalars['String']>;
  isRequired: Scalars['Boolean'];
  isTranslatable: Scalars['Boolean'];
  label?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  toolbar: Array<Scalars['String']>;
};

export type ContentSchemaSelectField = {
  __typename?: 'ContentSchemaSelectField';
  description?: Maybe<Scalars['String']>;
  isRequired: Scalars['Boolean'];
  isTranslatable: Scalars['Boolean'];
  label?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  options: Array<SelectOption>;
};

export type ContentSchemaSubschemaField = {
  __typename?: 'ContentSchemaSubschemaField';
  allowed: Array<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  isRequired: Scalars['Boolean'];
  isTranslatable: Scalars['Boolean'];
  label?: Maybe<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
};

export type ContentSchemaTextField = {
  __typename?: 'ContentSchemaTextField';
  description?: Maybe<Scalars['String']>;
  isRequired: Scalars['Boolean'];
  isTranslatable: Scalars['Boolean'];
  label?: Maybe<Scalars['String']>;
  maxLength?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
};

export type ContentSubschema = {
  __typename?: 'ContentSubschema';
  displayName?: Maybe<Scalars['String']>;
  fields: Array<ContentSchemaField>;
  name: Scalars['String'];
};

export type ContentSubschemaInput = {
  displayName?: InputMaybe<Scalars['String']>;
  fields: Array<Scalars['Object']>;
  name: Scalars['String'];
};

/** Cookie banner alignment. */
export enum CookieBannerAlignment {
  Center = 'CENTER',
  SpaceBetween = 'SPACE_BETWEEN'
}

export type CookieBannerComponent = {
  __typename?: 'CookieBannerComponent';
  alignment: CookieBannerAlignment;
  backgroundColor?: Maybe<Scalars['String']>;
  borderColor?: Maybe<Scalars['String']>;
  iconColor?: Maybe<Scalars['String']>;
  isEnabled: Scalars['Boolean'];
  layout: CookieBannerLayout;
  textColor?: Maybe<Scalars['String']>;
  theme: BlockTheme;
  titleColor?: Maybe<Scalars['String']>;
};

export type CookieBannerComponentInput = {
  alignment?: InputMaybe<CookieBannerAlignment>;
  backgroundColor?: InputMaybe<Scalars['String']>;
  borderColor?: InputMaybe<Scalars['String']>;
  iconColor?: InputMaybe<Scalars['String']>;
  isEnabled?: InputMaybe<Scalars['Boolean']>;
  layout?: InputMaybe<CookieBannerLayout>;
  textColor?: InputMaybe<Scalars['String']>;
  theme?: InputMaybe<BlockTheme>;
  titleColor?: InputMaybe<Scalars['String']>;
};

/** Cookie banner layout. */
export enum CookieBannerLayout {
  Floating = 'FLOATING',
  FullWidth = 'FULL_WIDTH'
}

export type CookiebotMetadata = {
  __typename?: 'CookiebotMetadata';
  domainGroupId?: Maybe<Scalars['String']>;
};

export type CreateAssetInput = {
  file: Scalars['Upload'];
};

export type CreateAuth0UserInput = {
  email: Scalars['String'];
  /** Auth0 role ids. */
  roles: Array<Scalars['String']>;
};

export type CreateBlockInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type CreateIntegrationInput = {
  type: IntegrationType;
};

export type CreateLanguageInput = {
  locale: Scalars['String'];
  localizedName: Scalars['String'];
  name: Scalars['String'];
  status?: InputMaybe<LanguageStatus>;
};

export type CreateManyIntegrationsInput = {
  /** Array of records to create */
  integrations: Array<CreateIntegrationInput>;
};

export type CreateOneBlockInput = {
  /** The record to create */
  block: CreateBlockInput;
};

export type CreateOneDomainInput = {
  /** The record to create */
  domain: AddOneDomainInput;
};

export type CreateOneGeolocationRedirectInput = {
  /** The record to create */
  geolocationRedirect: GeolocationRedirectInput;
};

export type CreateOneIntegrationInput = {
  /** The record to create */
  integration: CreateIntegrationInput;
};

export type CreateOneLanguageInput = {
  /** The record to create */
  language: CreateLanguageInput;
};

export type CreateOneProductFormInput = {
  /** The record to create */
  productForm: CreateProductFormInput;
};

export type CreateOneRedirectInput = {
  /** The record to create */
  redirect: CreateRedirectInput;
};

export type CreateOneSnippetInput = {
  /** The record to create */
  snippet: CreateSnippetInput;
};

export type CreateOneStoreInput = {
  /** The record to create */
  store: CreateStoreInput;
};

export type CreateOrFetchStoryInput = {
  story: StoryblokStoryInput;
};

export type CreateOrganizationInput = {
  maxStores?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
  slug: Scalars['String'];
};

export type CreateProductFormInput = {
  description?: InputMaybe<Scalars['String']>;
  fields: Array<ProductFormFieldInput>;
  label?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  products?: InputMaybe<Array<ProductFormProductInput>>;
};

export type CreateRedirectInput = {
  from: Scalars['String'];
  to: Scalars['String'];
  type: RedirectType;
};

export type CreateSnippetInput = {
  bypassCookieIntegration?: InputMaybe<Scalars['Boolean']>;
  code: Scalars['String'];
  isPrioritized?: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
  status?: InputMaybe<SnippetStatus>;
  type: SnippetType;
};

export type CreateStoreInput = {
  contactEmail?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  slug: Scalars['String'];
};

export type CreateSubscriptionInput = {
  storefrontAmount: Scalars['Float'];
};

export type CreateSubscriptionPayload = {
  __typename?: 'CreateSubscriptionPayload';
  id: Scalars['String'];
  storefrontAmount: Scalars['Float'];
};

export type CursorPaging = {
  /** Paginate after opaque cursor */
  after?: InputMaybe<Scalars['ConnectionCursor']>;
  /** Paginate before opaque cursor */
  before?: InputMaybe<Scalars['ConnectionCursor']>;
  /** Paginate first */
  first?: InputMaybe<Scalars['Int']>;
  /** Paginate last */
  last?: InputMaybe<Scalars['Int']>;
};

export type CustomBlock = {
  __typename?: 'CustomBlock';
  id: Scalars['UUID'];
  metadata: Scalars['Object'];
  name: Scalars['String'];
  refId: Scalars['String'];
};

export type CustomerData = {
  __typename?: 'CustomerData';
  billingAddress: BillingAddress;
  email: Scalars['String'];
  vatId: VatId;
};

export type CustomerDataInput = {
  billingAddress: BillingAddressInput;
  email: Scalars['String'];
  vatId: VatIdTypeInput;
};

export type CustomerDetails = {
  __typename?: 'CustomerDetails';
  accountName?: Maybe<Scalars['String']>;
  paymentMethod?: Maybe<PaymentMethodOutput>;
  upcomingInvoice?: Maybe<UpcomingInvoiceDetails>;
};

export type CustomerPortalSessionPayload = {
  __typename?: 'CustomerPortalSessionPayload';
  url: Scalars['String'];
};

export type CustomizerSchema = {
  __typename?: 'CustomizerSchema';
  fields: Array<CustomizerSchemaField>;
};

export type CustomizerSchemaField = CustomizerSchemaSelectField | CustomizerSchemaTextField;

export type CustomizerSchemaInput = {
  fields: Array<Scalars['Object']>;
};

export type CustomizerSchemaSelectField = {
  __typename?: 'CustomizerSchemaSelectField';
  description?: Maybe<Scalars['String']>;
  isRequired: Scalars['Boolean'];
  label?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  options: Array<SelectOption>;
};

export type CustomizerSchemaTextField = {
  __typename?: 'CustomizerSchemaTextField';
  description?: Maybe<Scalars['String']>;
  isRequired: Scalars['Boolean'];
  label?: Maybe<Scalars['String']>;
  maxLength?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
};

export type DateFieldComparison = {
  between?: InputMaybe<DateFieldComparisonBetween>;
  eq?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  is?: InputMaybe<Scalars['Boolean']>;
  isNot?: InputMaybe<Scalars['Boolean']>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  neq?: InputMaybe<Scalars['DateTime']>;
  notBetween?: InputMaybe<DateFieldComparisonBetween>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type DateFieldComparisonBetween = {
  lower: Scalars['DateTime'];
  upper: Scalars['DateTime'];
};

export type DeleteManyAssetsInput = {
  /** Filter to find records to delete */
  filter: AssetDeleteFilter;
};

export type DeleteManyIntegrationsInput = {
  /** Filter to find records to delete */
  filter: IntegrationDeleteFilter;
};

export type DeleteManyResponse = {
  __typename?: 'DeleteManyResponse';
  /** The number of records deleted. */
  deletedCount: Scalars['Int'];
};

export type DeleteOneAssetInput = {
  /** The id of the record to delete. */
  id: Scalars['ID'];
};

export type DeleteOneBlockInput = {
  /** The id of the record to delete. */
  id: Scalars['ID'];
};

export type DeleteOneDomainInput = {
  /** The id of the record to delete. */
  id: Scalars['ID'];
};

export type DeleteOneGeolocationRedirectInput = {
  /** The id of the record to delete. */
  id: Scalars['ID'];
};

export type DeleteOneIntegrationInput = {
  /** The id of the record to delete. */
  id: Scalars['ID'];
};

export type DeleteOneLanguageInput = {
  /** The id of the record to delete. */
  id: Scalars['ID'];
};

export type DeleteOneOrganizationInput = {
  /** The id of the record to delete. */
  id: Scalars['ID'];
};

export type DeleteOneProductColorInput = {
  /** The id of the record to delete. */
  id: Scalars['ID'];
};

export type DeleteOneProductFormInput = {
  /** The id of the record to delete. */
  id: Scalars['ID'];
};

export type DeleteOneRedirectInput = {
  /** The id of the record to delete. */
  id: Scalars['ID'];
};

export type DeleteOneSnippetInput = {
  /** The id of the record to delete. */
  id: Scalars['ID'];
};

export type DeleteOneStoreInput = {
  /** The id of the record to delete. */
  id: Scalars['ID'];
};

export type DnsRecord = {
  __typename?: 'DnsRecord';
  type: DnsRecordType;
  value: Scalars['String'];
};

/** Type of a given DNS records */
export enum DnsRecordType {
  A = 'A',
  Aaaa = 'AAAA',
  Cname = 'CNAME'
}

export type Domain = {
  __typename?: 'Domain';
  createdAt: Scalars['DateTime'];
  /** Current DNS records of the hostname. */
  currentDnsRecords: Array<DnsRecord>;
  hasSslAt?: Maybe<Scalars['DateTime']>;
  hostname: Scalars['String'];
  id: Scalars['UUID'];
  isCustomHostname: Scalars['Boolean'];
  isPrimary: Scalars['Boolean'];
  isRoot: Scalars['Boolean'];
  /** The preview URL fetches the draft version of the store. The value will always contain `null` for custom hostnames. */
  previewUrl?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  url: Scalars['String'];
  verifiedAt?: Maybe<Scalars['DateTime']>;
};

export type DomainAggregateGroupBy = {
  __typename?: 'DomainAggregateGroupBy';
  createdAt?: Maybe<Scalars['DateTime']>;
  isPrimary?: Maybe<Scalars['Boolean']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type DomainConnection = {
  __typename?: 'DomainConnection';
  /** Array of edges. */
  edges: Array<DomainEdge>;
  /** Paging information */
  pageInfo: PageInfo;
};

export type DomainCountAggregate = {
  __typename?: 'DomainCountAggregate';
  createdAt?: Maybe<Scalars['Int']>;
  isPrimary?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['Int']>;
};

export type DomainDeleteResponse = {
  __typename?: 'DomainDeleteResponse';
  createdAt?: Maybe<Scalars['DateTime']>;
  hasSslAt?: Maybe<Scalars['DateTime']>;
  hostname?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['UUID']>;
  isCustomHostname?: Maybe<Scalars['Boolean']>;
  isPrimary?: Maybe<Scalars['Boolean']>;
  isRoot?: Maybe<Scalars['Boolean']>;
  /** The preview URL fetches the draft version of the store. The value will always contain `null` for custom hostnames. */
  previewUrl?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  url?: Maybe<Scalars['String']>;
  verifiedAt?: Maybe<Scalars['DateTime']>;
};

export type DomainEdge = {
  __typename?: 'DomainEdge';
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor'];
  /** The node containing the Domain */
  node: Domain;
};

export type DomainFilter = {
  and?: InputMaybe<Array<DomainFilter>>;
  createdAt?: InputMaybe<DateFieldComparison>;
  isPrimary?: InputMaybe<BooleanFieldComparison>;
  or?: InputMaybe<Array<DomainFilter>>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type DomainMaxAggregate = {
  __typename?: 'DomainMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type DomainMinAggregate = {
  __typename?: 'DomainMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type DomainSort = {
  direction: SortDirection;
  field: DomainSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum DomainSortFields {
  CreatedAt = 'createdAt',
  IsPrimary = 'isPrimary',
  UpdatedAt = 'updatedAt'
}

export type EmailBannerBlock = {
  __typename?: 'EmailBannerBlock';
  backgroundColor?: Maybe<Scalars['String']>;
  buttonType: ButtonType;
  headerSize: FontSize;
  id: Scalars['UUID'];
  integrationType: IntegrationType;
  layout: EmailBannerLayout;
  name: Scalars['String'];
  pretitleColor?: Maybe<Scalars['String']>;
  subtitleColor?: Maybe<Scalars['String']>;
  textColor?: Maybe<Scalars['String']>;
  textSize: FontSize;
  theme: BlockTheme;
  titleColor?: Maybe<Scalars['String']>;
};

export type EmailBannerImageBlock = {
  __typename?: 'EmailBannerImageBlock';
  backgroundColor?: Maybe<Scalars['String']>;
  buttonType: ButtonType;
  containerWidth: ContainerWidth;
  contentAlignment: TextAlignment;
  headerSize: FontSize;
  id: Scalars['UUID'];
  imageBorderRadius?: Maybe<BorderRadius>;
  imageShadow?: Maybe<BoxShadow>;
  integrationType: IntegrationType;
  layout: EmailBannerImageLayout;
  name: Scalars['String'];
  pretitleColor?: Maybe<Scalars['String']>;
  subtitleColor?: Maybe<Scalars['String']>;
  textColor?: Maybe<Scalars['String']>;
  textSize: FontSize;
  theme: BlockTheme;
  titleColor?: Maybe<Scalars['String']>;
};

/** Email banner with image layout. */
export enum EmailBannerImageLayout {
  ImageLeft = 'IMAGE_LEFT',
  ImageRight = 'IMAGE_RIGHT'
}

/** Email banner layout. */
export enum EmailBannerLayout {
  Horizontal = 'HORIZONTAL',
  Vertical = 'VERTICAL'
}

export type EmailPopupComponent = {
  __typename?: 'EmailPopupComponent';
  backgroundColor?: Maybe<Scalars['String']>;
  borderRadius: BorderRadius;
  boxShadow: BoxShadow;
  buttonType: ButtonType;
  contentAlignment: TextAlignment;
  headerSize: FontSize;
  integrationType: IntegrationType;
  layout: EmailPopupLayout;
  position: EmailPopupPosition;
  /** You can turn the trigger on or off by toggling. The value is defined in pixels. */
  scrollTrigger?: Maybe<Scalars['Float']>;
  subtitleColor?: Maybe<Scalars['String']>;
  textSize: FontSize;
  theme: BlockTheme;
  /** You can turn the trigger on or off by toggling. The value is defined in seconds. */
  timeTrigger?: Maybe<Scalars['Float']>;
  titleColor?: Maybe<Scalars['String']>;
};

export type EmailPopupComponentInput = {
  backgroundColor?: InputMaybe<Scalars['String']>;
  borderRadius?: InputMaybe<BorderRadius>;
  boxShadow?: InputMaybe<BoxShadow>;
  buttonType?: InputMaybe<ButtonType>;
  contentAlignment?: InputMaybe<TextAlignment>;
  headerSize?: InputMaybe<FontSize>;
  integrationType?: InputMaybe<IntegrationType>;
  layout?: InputMaybe<EmailPopupLayout>;
  position?: InputMaybe<EmailPopupPosition>;
  /** You can turn the trigger on or off by toggling. The value is defined in pixels. */
  scrollTrigger?: InputMaybe<Scalars['Float']>;
  subtitleColor?: InputMaybe<Scalars['String']>;
  textSize?: InputMaybe<FontSize>;
  theme?: InputMaybe<BlockTheme>;
  /** You can turn the trigger on or off by toggling. The value is defined in seconds. */
  timeTrigger?: InputMaybe<Scalars['Float']>;
  titleColor?: InputMaybe<Scalars['String']>;
};

/** Email popup layout. */
export enum EmailPopupLayout {
  ImageLeft = 'IMAGE_LEFT',
  ImageRight = 'IMAGE_RIGHT',
  ImageTop = 'IMAGE_TOP'
}

/** Email popup position. */
export enum EmailPopupPosition {
  BottomLeft = 'BOTTOM_LEFT',
  Center = 'CENTER'
}

export type FaqBlock = {
  __typename?: 'FaqBlock';
  backgroundColor?: Maybe<Scalars['String']>;
  dividerColor?: Maybe<Scalars['String']>;
  hasDivider: Scalars['Boolean'];
  headerAlignment: TextAlignment;
  headerPretitleColor?: Maybe<Scalars['String']>;
  headerSize: FontSize;
  headerSubtitleColor?: Maybe<Scalars['String']>;
  headerTitleColor?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  itemContentTextColor?: Maybe<Scalars['String']>;
  itemContentTitleColor?: Maybe<Scalars['String']>;
  itemDividerColor?: Maybe<Scalars['String']>;
  itemIcon: FaqItemIcon;
  itemIconStyle: IconStyle;
  /** @deprecated Should use `itemTitleSize` and `itemTextSize` instead. */
  itemSize: FaqItemSize;
  /** @deprecated Should use `itemContentTextColor` instead. */
  itemTextColor?: Maybe<Scalars['String']>;
  itemTextSize: FontSize;
  itemTitleColor?: Maybe<Scalars['String']>;
  itemTitleSize: FontSize;
  name: Scalars['String'];
  theme: BlockTheme;
};

/** FAQ item icon. */
export enum FaqItemIcon {
  Chevron = 'CHEVRON',
  PlusMinus = 'PLUS_MINUS'
}

/** FAQ item size. */
export enum FaqItemSize {
  Large = 'LARGE',
  Medium = 'MEDIUM',
  Small = 'SMALL'
}

export type FasletMetadata = {
  __typename?: 'FasletMetadata';
  shopId?: Maybe<Scalars['String']>;
  sizeOptionName?: Maybe<Scalars['String']>;
};

export type FasletPublicMetadata = {
  __typename?: 'FasletPublicMetadata';
  shopId?: Maybe<Scalars['String']>;
  sizeOptionName?: Maybe<Scalars['String']>;
};

export type File = {
  __typename?: 'File';
  /** Height in pixels. */
  height?: Maybe<Scalars['Float']>;
  /** File URL. */
  url: Scalars['String'];
  /** Width in pixels. */
  width?: Maybe<Scalars['Float']>;
};

export type FileInput = {
  /** File. */
  file: Scalars['Upload'];
  /** Height in pixels. */
  height?: InputMaybe<Scalars['Float']>;
  /** Width in pixels. */
  width?: InputMaybe<Scalars['Float']>;
};

/** Fixed block position. */
export enum FixedBlockPosition {
  AfterDynamicBlocks = 'AFTER_DYNAMIC_BLOCKS',
  BeforeDynamicBlocks = 'BEFORE_DYNAMIC_BLOCKS',
  None = 'NONE'
}

/** Font size. */
export enum FontSize {
  Large = 'LARGE',
  Medium = 'MEDIUM',
  Small = 'SMALL'
}

/** Font weight. */
export enum FontWeight {
  Bold = 'BOLD',
  Medium = 'MEDIUM',
  Regular = 'REGULAR'
}

export type FooterComponent = {
  __typename?: 'FooterComponent';
  backgroundColor?: Maybe<Scalars['String']>;
  /** Show Instant Commerce link. */
  instantCommerceLink: Scalars['Boolean'];
  /** Show available payment methods. */
  paymentMethods: Scalars['Boolean'];
  theme: BlockTheme;
};

export type FooterComponentInput = {
  backgroundColor?: InputMaybe<Scalars['String']>;
  /** Show Instant Commerce link. */
  instantCommerceLink?: InputMaybe<Scalars['Boolean']>;
  /** Show available payment methods. */
  paymentMethods?: InputMaybe<Scalars['Boolean']>;
  theme?: InputMaybe<BlockTheme>;
};

/** Gallery layout. */
export enum GalleryLayout {
  LandscapePortrait = 'LANDSCAPE_PORTRAIT',
  PortraitLandscape = 'PORTRAIT_LANDSCAPE'
}

export type GeolocationBannerComponent = {
  __typename?: 'GeolocationBannerComponent';
  backgroundColor?: Maybe<Scalars['String']>;
  buttonType: ButtonType;
  contentColor?: Maybe<Scalars['String']>;
  theme: BlockTheme;
};

export type GeolocationBannerComponentInput = {
  backgroundColor?: InputMaybe<Scalars['String']>;
  buttonType?: InputMaybe<ButtonType>;
  contentColor?: InputMaybe<Scalars['String']>;
  theme?: InputMaybe<BlockTheme>;
};

export type GeolocationRedirect = {
  __typename?: 'GeolocationRedirect';
  /** Values are two-letter country codes (ISO 3166-1 alpha-2) */
  countries: Array<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  /** Requires a protocol being set. */
  customUrl?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  name: Scalars['String'];
  status: GeolocationRedirectStatus;
  storeId?: Maybe<Scalars['String']>;
  target: GeolocationRedirectTarget;
  updatedAt: Scalars['DateTime'];
  /** Returns the constructed redirect URL depending on the rule's type. */
  url: Scalars['String'];
};

export type GeolocationRedirectAggregateGroupBy = {
  __typename?: 'GeolocationRedirectAggregateGroupBy';
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type GeolocationRedirectConnection = {
  __typename?: 'GeolocationRedirectConnection';
  /** Array of edges. */
  edges: Array<GeolocationRedirectEdge>;
  /** Paging information */
  pageInfo: PageInfo;
};

export type GeolocationRedirectCountAggregate = {
  __typename?: 'GeolocationRedirectCountAggregate';
  createdAt?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['Int']>;
};

export type GeolocationRedirectDeleteResponse = {
  __typename?: 'GeolocationRedirectDeleteResponse';
  /** Values are two-letter country codes (ISO 3166-1 alpha-2) */
  countries?: Maybe<Array<Scalars['String']>>;
  createdAt?: Maybe<Scalars['DateTime']>;
  /** Requires a protocol being set. */
  customUrl?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['UUID']>;
  name?: Maybe<Scalars['String']>;
  status?: Maybe<GeolocationRedirectStatus>;
  storeId?: Maybe<Scalars['String']>;
  target?: Maybe<GeolocationRedirectTarget>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type GeolocationRedirectEdge = {
  __typename?: 'GeolocationRedirectEdge';
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor'];
  /** The node containing the GeolocationRedirect */
  node: GeolocationRedirect;
};

export type GeolocationRedirectFilter = {
  and?: InputMaybe<Array<GeolocationRedirectFilter>>;
  createdAt?: InputMaybe<DateFieldComparison>;
  or?: InputMaybe<Array<GeolocationRedirectFilter>>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type GeolocationRedirectInput = {
  /** Values are two-letter country codes (ISO 3166-1 alpha-2) */
  countries?: InputMaybe<Array<Scalars['String']>>;
  /** Requires a protocol being set. */
  customUrl?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  status: GeolocationRedirectStatus;
  storeId?: InputMaybe<Scalars['String']>;
  target: GeolocationRedirectTarget;
};

export type GeolocationRedirectMaxAggregate = {
  __typename?: 'GeolocationRedirectMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type GeolocationRedirectMinAggregate = {
  __typename?: 'GeolocationRedirectMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type GeolocationRedirectSort = {
  direction: SortDirection;
  field: GeolocationRedirectSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum GeolocationRedirectSortFields {
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt'
}

export enum GeolocationRedirectStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

export enum GeolocationRedirectTarget {
  CustomUrl = 'CUSTOM_URL',
  Store = 'STORE'
}

export type GetWishlistInput = {
  /** Refers to the Session ID (`sid`) for the Appmate integration */
  sessionId?: InputMaybe<Scalars['String']>;
  /** Refers to the e-mail address for the Growave integration, refers to the Customer ID (`cid`) for the Appmate integration */
  userId?: InputMaybe<Scalars['String']>;
};

export type GoogleTagManagerMetadata = {
  __typename?: 'GoogleTagManagerMetadata';
  containerId?: Maybe<Scalars['String']>;
  /** Whether the script should be loaded prioritized even if that has performance impacts. */
  isPrioritized?: Maybe<Scalars['Boolean']>;
};

export type GoogleTagManagerPublicMetadata = {
  __typename?: 'GoogleTagManagerPublicMetadata';
  containerId?: Maybe<Scalars['String']>;
  /** Whether the script should be loaded prioritized even if that has performance impacts. */
  isPrioritized?: Maybe<Scalars['Boolean']>;
};

export type GorgiasMetadata = {
  __typename?: 'GorgiasMetadata';
  chatApplicationId?: Maybe<Scalars['String']>;
};

export type GorgiasPublicMetadata = {
  __typename?: 'GorgiasPublicMetadata';
  chatApplicationId?: Maybe<Scalars['String']>;
};

export type GrowaveMetadata = {
  __typename?: 'GrowaveMetadata';
  clientId?: Maybe<Scalars['String']>;
  clientSecret?: Maybe<Scalars['String']>;
};

export type HeaderBlock = {
  __typename?: 'HeaderBlock';
  backgroundColor?: Maybe<Scalars['String']>;
  containerWidth: ContainerWidth;
  contentAlignment: TextAlignment;
  dividerColor?: Maybe<Scalars['String']>;
  hasDivider: Scalars['Boolean'];
  id: Scalars['UUID'];
  name: Scalars['String'];
  pretitleColor?: Maybe<Scalars['String']>;
  subtitleColor?: Maybe<Scalars['String']>;
  textSize: FontSize;
  theme: BlockTheme;
  titleColor?: Maybe<Scalars['String']>;
};

/** Header layout. */
export enum HeaderLayout {
  ImageAboveText = 'IMAGE_ABOVE_TEXT',
  ImageText = 'IMAGE_TEXT',
  Overlay = 'OVERLAY',
  TextAboveImage = 'TEXT_ABOVE_IMAGE',
  TextImage = 'TEXT_IMAGE',
  WithoutImage = 'WITHOUT_IMAGE'
}

export type HeadingField = {
  __typename?: 'HeadingField';
  fontSize: FontSize;
  hasSeparator: Scalars['Boolean'];
  textAlignment: TextAlignment;
};

export type HeadingFieldInput = {
  fontSize?: InputMaybe<FontSize>;
  hasSeparator?: InputMaybe<Scalars['Boolean']>;
  textAlignment?: InputMaybe<TextAlignment>;
};

export type HeroBlock = {
  __typename?: 'HeroBlock';
  backgroundColor?: Maybe<Scalars['String']>;
  containerWidth: ContainerWidth;
  contentAlignment: TextAlignment;
  firstButtonType: ButtonType;
  height: ImageHeight;
  id: Scalars['UUID'];
  layout: HeroLayout;
  name: Scalars['String'];
  overlay?: Maybe<OverlayField>;
  pretitleColor?: Maybe<Scalars['String']>;
  secondButtonType: ButtonType;
  /** @deprecated Should use `containerWidth` instead. */
  size: HeroSize;
  subtitleColor?: Maybe<Scalars['String']>;
  subtitleSize: FontSize;
  /** @deprecated Should use colors based on `theme` instead. */
  textColor: TextColorType;
  theme: BlockTheme;
  titleColor?: Maybe<Scalars['String']>;
  titleSize: FontSize;
};

/** Hero layout. */
export enum HeroLayout {
  ImageCover = 'IMAGE_COVER',
  ImageText = 'IMAGE_TEXT',
  TextImage = 'TEXT_IMAGE'
}

/** Hero size. */
export enum HeroSize {
  Boxed = 'BOXED',
  FullWidth = 'FULL_WIDTH'
}

export type HeroSliderBlock = {
  __typename?: 'HeroSliderBlock';
  /** You can turn autoplay on or off by toggling. The value is defined in seconds. */
  autoplayTrigger?: Maybe<Scalars['Float']>;
  backgroundColor?: Maybe<Scalars['String']>;
  containerWidth: ContainerWidth;
  contentAlignment: TextAlignment;
  firstButtonType: ButtonType;
  height: ImageHeight;
  id: Scalars['UUID'];
  layout: HeroSliderLayout;
  name: Scalars['String'];
  overlay?: Maybe<OverlayField>;
  pretitleColor?: Maybe<Scalars['String']>;
  secondButtonType: ButtonType;
  sliderButtonType: ButtonType;
  subtitleColor?: Maybe<Scalars['String']>;
  subtitleSize: FontSize;
  theme: BlockTheme;
  titleColor?: Maybe<Scalars['String']>;
  titleSize: FontSize;
};

/** Hero slider layout. */
export enum HeroSliderLayout {
  ImageCover = 'IMAGE_COVER',
  ImageText = 'IMAGE_TEXT',
  TextImage = 'TEXT_IMAGE'
}

export type HeroVideoBlock = {
  __typename?: 'HeroVideoBlock';
  backgroundColor?: Maybe<Scalars['String']>;
  containerWidth: ContainerWidth;
  contentAlignment: TextAlignment;
  disablePauseButton: Scalars['Boolean'];
  firstButtonType: ButtonType;
  height: ImageHeight;
  id: Scalars['UUID'];
  layout: HeroVideoLayout;
  name: Scalars['String'];
  overlay?: Maybe<OverlayField>;
  pretitleColor?: Maybe<Scalars['String']>;
  secondButtonType: ButtonType;
  subtitleColor?: Maybe<Scalars['String']>;
  subtitleSize: FontSize;
  theme: BlockTheme;
  titleColor?: Maybe<Scalars['String']>;
  titleSize: FontSize;
};

/** Hero video layout. */
export enum HeroVideoLayout {
  TextVideo = 'TEXT_VIDEO',
  VideoCover = 'VIDEO_COVER',
  VideoText = 'VIDEO_TEXT'
}

/** Social media icon style. */
export enum IconSocialStyle {
  Default = 'DEFAULT',
  Monotone = 'MONOTONE'
}

/** Icon style. */
export enum IconStyle {
  Outline = 'OUTLINE',
  Solid = 'SOLID'
}

/** Image aspect ratio. */
export enum ImageAspectRatio {
  Landscape = 'LANDSCAPE',
  Portrait = 'PORTRAIT',
  Square = 'SQUARE'
}

export type ImageDualBlock = {
  __typename?: 'ImageDualBlock';
  backgroundColor?: Maybe<Scalars['String']>;
  containerWidth: ContainerWidth;
  contentAlignment: TextAlignment;
  dividerColor?: Maybe<Scalars['String']>;
  hasDivider: Scalars['Boolean'];
  headerAlignment: TextAlignment;
  headerPretitleColor?: Maybe<Scalars['String']>;
  headerSize: FontSize;
  headerSubtitleColor?: Maybe<Scalars['String']>;
  headerTitleColor?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  imageBorderRadius?: Maybe<BorderRadius>;
  imageShadow?: Maybe<BoxShadow>;
  layout: GalleryLayout;
  name: Scalars['String'];
  textColor?: Maybe<Scalars['String']>;
  textSize: FontSize;
  theme: BlockTheme;
};

/** Image height. */
export enum ImageHeight {
  Large = 'LARGE',
  Medium = 'MEDIUM',
  Small = 'SMALL'
}

/** Image fill behavior. */
export enum ImageObjectFit {
  Contain = 'CONTAIN',
  Cover = 'COVER'
}

export type ImageSingleBlock = {
  __typename?: 'ImageSingleBlock';
  backgroundColor?: Maybe<Scalars['String']>;
  containerWidth: ContainerWidth;
  contentAlignment: TextAlignment;
  dividerColor?: Maybe<Scalars['String']>;
  hasDivider: Scalars['Boolean'];
  headerAlignment: TextAlignment;
  headerPretitleColor?: Maybe<Scalars['String']>;
  headerSize: FontSize;
  headerSubtitleColor?: Maybe<Scalars['String']>;
  headerTitleColor?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  imageBorderRadius?: Maybe<BorderRadius>;
  imageShadow?: Maybe<BoxShadow>;
  name: Scalars['String'];
  textColor?: Maybe<Scalars['String']>;
  textSize: FontSize;
  theme: BlockTheme;
};

export type ImageTripleBlock = {
  __typename?: 'ImageTripleBlock';
  backgroundColor?: Maybe<Scalars['String']>;
  containerWidth: ContainerWidth;
  contentAlignment: TextAlignment;
  dividerColor?: Maybe<Scalars['String']>;
  hasDivider: Scalars['Boolean'];
  headerAlignment: TextAlignment;
  headerPretitleColor?: Maybe<Scalars['String']>;
  headerSize: FontSize;
  headerSubtitleColor?: Maybe<Scalars['String']>;
  headerTitleColor?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  imageBorderRadius?: Maybe<BorderRadius>;
  imageShadow?: Maybe<BoxShadow>;
  name: Scalars['String'];
  textColor?: Maybe<Scalars['String']>;
  textSize: FontSize;
  theme: BlockTheme;
};

export type ImportRedirectsInput = {
  file: Scalars['Upload'];
  overwriteExisting?: InputMaybe<Scalars['Boolean']>;
};

export type ImportRedirectsPayload = {
  __typename?: 'ImportRedirectsPayload';
  skipped: Scalars['Float'];
  succeeded: Scalars['Float'];
  url: Scalars['String'];
};

export type InputComponent = {
  __typename?: 'InputComponent';
  borderRadius: BorderRadius;
};

export type InputComponentInput = {
  borderRadius?: InputMaybe<BorderRadius>;
};

export type Integration = {
  __typename?: 'Integration';
  createdAt: Scalars['DateTime'];
  errors: Array<ValidationMessage>;
  id: Scalars['UUID'];
  isActive: Scalars['Boolean'];
  metadata: IntegrationMetadata;
  type: IntegrationType;
  updatedAt: Scalars['DateTime'];
  verifiedAt?: Maybe<Scalars['DateTime']>;
  warnings: Array<ValidationMessage>;
};

export type IntegrationAggregateGroupBy = {
  __typename?: 'IntegrationAggregateGroupBy';
  createdAt?: Maybe<Scalars['DateTime']>;
  isActive?: Maybe<Scalars['Boolean']>;
  type?: Maybe<IntegrationType>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type IntegrationConnection = {
  __typename?: 'IntegrationConnection';
  /** Array of edges. */
  edges: Array<IntegrationEdge>;
  /** Paging information */
  pageInfo: PageInfo;
};

export type IntegrationCountAggregate = {
  __typename?: 'IntegrationCountAggregate';
  createdAt?: Maybe<Scalars['Int']>;
  isActive?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['Int']>;
};

export type IntegrationDeleteFilter = {
  and?: InputMaybe<Array<IntegrationDeleteFilter>>;
  createdAt?: InputMaybe<DateFieldComparison>;
  isActive?: InputMaybe<BooleanFieldComparison>;
  or?: InputMaybe<Array<IntegrationDeleteFilter>>;
  type?: InputMaybe<IntegrationTypeFilterComparison>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type IntegrationDeleteResponse = {
  __typename?: 'IntegrationDeleteResponse';
  createdAt?: Maybe<Scalars['DateTime']>;
  errors?: Maybe<Array<ValidationMessage>>;
  id?: Maybe<Scalars['UUID']>;
  isActive?: Maybe<Scalars['Boolean']>;
  metadata?: Maybe<IntegrationMetadata>;
  type?: Maybe<IntegrationType>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  verifiedAt?: Maybe<Scalars['DateTime']>;
  warnings?: Maybe<Array<ValidationMessage>>;
};

export type IntegrationEdge = {
  __typename?: 'IntegrationEdge';
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor'];
  /** The node containing the Integration */
  node: Integration;
};

export type IntegrationFilter = {
  and?: InputMaybe<Array<IntegrationFilter>>;
  createdAt?: InputMaybe<DateFieldComparison>;
  isActive?: InputMaybe<BooleanFieldComparison>;
  or?: InputMaybe<Array<IntegrationFilter>>;
  type?: InputMaybe<IntegrationTypeFilterComparison>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type IntegrationMaxAggregate = {
  __typename?: 'IntegrationMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  type?: Maybe<IntegrationType>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type IntegrationMetadata = AlgoliaMetadata | AppmateMetadata | CookiebotMetadata | FasletMetadata | GoogleTagManagerMetadata | GorgiasMetadata | GrowaveMetadata | JudgeMeMetadata | KiwiSizingMetadata | KlaviyoMetadata | MailchimpMetadata | ShopifyMetadata | StampedMetadata | StoremapperMetadata | StoryblokMetadata | TrustpilotMetadata | YotpoMetadata;

export type IntegrationMinAggregate = {
  __typename?: 'IntegrationMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  type?: Maybe<IntegrationType>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type IntegrationSort = {
  direction: SortDirection;
  field: IntegrationSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum IntegrationSortFields {
  CreatedAt = 'createdAt',
  IsActive = 'isActive',
  Type = 'type',
  UpdatedAt = 'updatedAt'
}

/** Integration type. */
export enum IntegrationType {
  Algolia = 'ALGOLIA',
  Appmate = 'APPMATE',
  Cookiebot = 'COOKIEBOT',
  Faslet = 'FASLET',
  GoogleTagManager = 'GOOGLE_TAG_MANAGER',
  Gorgias = 'GORGIAS',
  Growave = 'GROWAVE',
  JudgeMe = 'JUDGE_ME',
  KiwiSizing = 'KIWI_SIZING',
  Klaviyo = 'KLAVIYO',
  Mailchimp = 'MAILCHIMP',
  Shopify = 'SHOPIFY',
  Stamped = 'STAMPED',
  Storemapper = 'STOREMAPPER',
  Storyblok = 'STORYBLOK',
  Trustpilot = 'TRUSTPILOT',
  Yotpo = 'YOTPO'
}

export type IntegrationTypeFilterComparison = {
  eq?: InputMaybe<IntegrationType>;
  gt?: InputMaybe<IntegrationType>;
  gte?: InputMaybe<IntegrationType>;
  iLike?: InputMaybe<IntegrationType>;
  in?: InputMaybe<Array<IntegrationType>>;
  is?: InputMaybe<Scalars['Boolean']>;
  isNot?: InputMaybe<Scalars['Boolean']>;
  like?: InputMaybe<IntegrationType>;
  lt?: InputMaybe<IntegrationType>;
  lte?: InputMaybe<IntegrationType>;
  neq?: InputMaybe<IntegrationType>;
  notILike?: InputMaybe<IntegrationType>;
  notIn?: InputMaybe<Array<IntegrationType>>;
  notLike?: InputMaybe<IntegrationType>;
};

export type IntegrationUpdateFilter = {
  and?: InputMaybe<Array<IntegrationUpdateFilter>>;
  createdAt?: InputMaybe<DateFieldComparison>;
  isActive?: InputMaybe<BooleanFieldComparison>;
  or?: InputMaybe<Array<IntegrationUpdateFilter>>;
  type?: InputMaybe<IntegrationTypeFilterComparison>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type JudgeMeMetadata = {
  __typename?: 'JudgeMeMetadata';
  privateToken?: Maybe<Scalars['String']>;
  publicToken?: Maybe<Scalars['String']>;
};

export type KiwiSizingMetadata = {
  __typename?: 'KiwiSizingMetadata';
  sizeOptionName?: Maybe<Scalars['String']>;
};

export type KiwiSizingPublicMetadata = {
  __typename?: 'KiwiSizingPublicMetadata';
  sizeOptionName?: Maybe<Scalars['String']>;
};

export type KlaviyoMetadata = {
  __typename?: 'KlaviyoMetadata';
  enableBackInStockFlow?: Maybe<Scalars['Boolean']>;
  enableBackInStockMarketingOptIn?: Maybe<Scalars['Boolean']>;
  listId?: Maybe<Scalars['String']>;
  privateKey?: Maybe<Scalars['String']>;
  publicKey?: Maybe<Scalars['String']>;
};

export type KlaviyoPublicMetadata = {
  __typename?: 'KlaviyoPublicMetadata';
  enableBackInStockFlow?: Maybe<Scalars['Boolean']>;
  enableBackInStockMarketingOptIn?: Maybe<Scalars['Boolean']>;
  publicKey?: Maybe<Scalars['String']>;
};

export type Language = {
  __typename?: 'Language';
  createdAt: Scalars['DateTime'];
  id: Scalars['UUID'];
  isDefault: Scalars['Boolean'];
  locale: Scalars['String'];
  /** Name to display in the storefront language selector. */
  localizedName: Scalars['String'];
  name: Scalars['String'];
  status: LanguageStatus;
  updatedAt: Scalars['DateTime'];
};

export type LanguageAggregateGroupBy = {
  __typename?: 'LanguageAggregateGroupBy';
  createdAt?: Maybe<Scalars['DateTime']>;
  isDefault?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type LanguageConnection = {
  __typename?: 'LanguageConnection';
  /** Array of edges. */
  edges: Array<LanguageEdge>;
  /** Paging information */
  pageInfo: PageInfo;
};

export type LanguageCountAggregate = {
  __typename?: 'LanguageCountAggregate';
  createdAt?: Maybe<Scalars['Int']>;
  isDefault?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['Int']>;
};

export type LanguageDeleteResponse = {
  __typename?: 'LanguageDeleteResponse';
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['UUID']>;
  isDefault?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  /** Name to display in the storefront language selector. */
  localizedName?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  status?: Maybe<LanguageStatus>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type LanguageEdge = {
  __typename?: 'LanguageEdge';
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor'];
  /** The node containing the Language */
  node: Language;
};

export type LanguageFilter = {
  and?: InputMaybe<Array<LanguageFilter>>;
  createdAt?: InputMaybe<DateFieldComparison>;
  isDefault?: InputMaybe<BooleanFieldComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<LanguageFilter>>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type LanguageMaxAggregate = {
  __typename?: 'LanguageMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type LanguageMinAggregate = {
  __typename?: 'LanguageMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type LanguageSort = {
  direction: SortDirection;
  field: LanguageSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum LanguageSortFields {
  CreatedAt = 'createdAt',
  IsDefault = 'isDefault',
  Name = 'name',
  UpdatedAt = 'updatedAt'
}

/** Language status. */
export enum LanguageStatus {
  Archived = 'ARCHIVED',
  Draft = 'DRAFT',
  Published = 'PUBLISHED'
}

export type ListBlock = {
  __typename?: 'ListBlock';
  backgroundColor?: Maybe<Scalars['String']>;
  dividerColor?: Maybe<Scalars['String']>;
  hasDivider: Scalars['Boolean'];
  headerAlignment: TextAlignment;
  headerPretitleColor?: Maybe<Scalars['String']>;
  headerSize: FontSize;
  headerSubtitleColor?: Maybe<Scalars['String']>;
  headerTitleColor?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  isStriped: Scalars['Boolean'];
  listBackgroundColor?: Maybe<Scalars['String']>;
  listBorderColor?: Maybe<Scalars['String']>;
  listBorderRadius?: Maybe<BorderRadius>;
  listBoxShadow?: Maybe<BoxShadow>;
  listHeaderBackgroundColor?: Maybe<Scalars['String']>;
  listItemTextColor?: Maybe<Scalars['String']>;
  listItemTitleColor?: Maybe<Scalars['String']>;
  listStripeBackgroundColor?: Maybe<Scalars['String']>;
  listStripeTextColor?: Maybe<Scalars['String']>;
  listStripeTitleColor?: Maybe<Scalars['String']>;
  listSubtitleColor?: Maybe<Scalars['String']>;
  listTitleColor?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  theme: BlockTheme;
};

export type LocalizedColorValue = {
  __typename?: 'LocalizedColorValue';
  locale: Scalars['String'];
  name: Scalars['String'];
  value: ColorValue;
};

export type LocalizedValue = {
  __typename?: 'LocalizedValue';
  locale: Scalars['String'];
  value: Scalars['String'];
};

export type LocalizedValueInput = {
  locale: Scalars['String'];
  value: Scalars['String'];
};

export type MailchimpMetadata = {
  __typename?: 'MailchimpMetadata';
  apiKey?: Maybe<Scalars['String']>;
  /** Data center used for API requests. */
  dataCenter?: Maybe<Scalars['String']>;
  listId?: Maybe<Scalars['String']>;
};

export type MultiColumnRichTextBlock = {
  __typename?: 'MultiColumnRichTextBlock';
  backgroundColor?: Maybe<Scalars['String']>;
  containerWidth: ContainerWidth;
  contentImageBorderRadius?: Maybe<BorderRadius>;
  contentImageShadow?: Maybe<BoxShadow>;
  contentSize: FontSize;
  contentTextColor?: Maybe<Scalars['String']>;
  contentTitleColor?: Maybe<Scalars['String']>;
  dividerColor?: Maybe<Scalars['String']>;
  hasDivider: Scalars['Boolean'];
  headerAlignment: TextAlignment;
  headerPretitleColor?: Maybe<Scalars['String']>;
  headerSize: FontSize;
  headerSubtitleColor?: Maybe<Scalars['String']>;
  headerTitleColor?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  name: Scalars['String'];
  theme: BlockTheme;
};

export type Mutation = {
  __typename?: 'Mutation';
  addToWishlist: Scalars['Boolean'];
  changePassword: Scalars['Boolean'];
  contactStore: Scalars['Boolean'];
  createAsset: Asset;
  /** Creates a redirect url to the Stripe customer portal. */
  createCustomerPortalRedirect: CustomerPortalSessionPayload;
  createManyIntegrations: Array<Integration>;
  createOneBlock: Block;
  createOneDomain: Domain;
  createOneGeolocationRedirect: GeolocationRedirect;
  createOneIntegration: Integration;
  createOneLanguage: Language;
  /** Create a new organization */
  createOneOrganization: Organization;
  createOneProductForm: ProductForm;
  createOneRedirect: Redirect;
  createOneSnippet: Snippet;
  createOneStore: Store;
  /** Fetch story from Storyblok and if not present create one. */
  createOrFetchStory: StoryblokStory;
  /** Create a subscription in Stripe. */
  createSubscription: CreateSubscriptionPayload;
  createUser: Scalars['Boolean'];
  deleteInvitation: Scalars['Boolean'];
  deleteManyAssets: DeleteManyResponse;
  deleteManyIntegrations: DeleteManyResponse;
  deleteOneAsset: AssetDeleteResponse;
  deleteOneBlock: BlockDeleteResponse;
  deleteOneDomain: DomainDeleteResponse;
  deleteOneGeolocationRedirect: GeolocationRedirectDeleteResponse;
  deleteOneIntegration: IntegrationDeleteResponse;
  deleteOneLanguage: LanguageDeleteResponse;
  deleteOneOrganization: OrganizationDeleteResponse;
  deleteOneProductColor: ProductColorDeleteResponse;
  deleteOneProductForm: ProductFormDeleteResponse;
  deleteOneRedirect: RedirectDeleteResponse;
  deleteOneSnippet: SnippetDeleteResponse;
  deleteOneStore: StoreDeleteResponse;
  deleteUser: Scalars['Boolean'];
  /** Fetch product colors from shopify. */
  fetchProductColors: Scalars['Boolean'];
  importRedirects: ImportRedirectsPayload;
  logIntoOrganization: Scalars['Boolean'];
  logOutFromOrganization: Scalars['Boolean'];
  /** Add a new version to a given block. */
  publishBlockVersion: Block;
  /** Publishes draft storefront of the current store. */
  publishStorefront: Storefront;
  purgeCache: Scalars['Boolean'];
  removeFromWishlist: Scalars['Boolean'];
  /** Resends the invitation. */
  resendInvitation: OrganizationMemberInvitation;
  /** Set the default language for the current store. */
  setDefaultLanguage: Scalars['Boolean'];
  /** Set the primary domain for the current store. */
  setPrimaryDomain: Scalars['Boolean'];
  /** Subscribe to back in stock. */
  subscribeToBackInStock: Scalars['Boolean'];
  /** Subscribe to a newsletter. */
  subscribeToNewsletter: Scalars['Boolean'];
  undoVoteReview: Scalars['Boolean'];
  updateCustomerData: CustomerData;
  /** Updates the metadata of an integration. */
  updateIntegrationMetadata: Integration;
  updateManyIntegrations: UpdateManyResponse;
  /** Updates the member roles within the current organization. */
  updateMemberRoles: Array<Role>;
  updateOneBlock: Block;
  updateOneGeolocationRedirect: GeolocationRedirect;
  updateOneIntegration: Integration;
  updateOneLanguage: Language;
  updateOneOrganization: Organization;
  updateOneProductColor: ProductColor;
  updateOneProductForm: ProductForm;
  updateOneRedirect: Redirect;
  updateOneSnippet: Snippet;
  updateOneStore: Store;
  /** Create a redirect url to Stripe to set up payment methods. */
  updatePaymentMethod: UpdatePaymentPayload;
  /** Updates the current user profile in Auth0. */
  updateProfile: User;
  /** Updates draft storefront config of the current store. */
  updateStorefrontConfig: Storefront;
  /** Upgrade the amount of storefronts in a subscription in Stripe. */
  updateSubscription: UpdateSubscriptionPayload;
  /** Verify domain records. */
  verifyOneDomain: Domain;
  voteReview: Scalars['Boolean'];
  writeReview: Scalars['Boolean'];
};


export type MutationAddToWishlistArgs = {
  input: AddToWishlistInput;
};


export type MutationChangePasswordArgs = {
  input: ChangeAuth0PasswordInput;
};


export type MutationContactStoreArgs = {
  input: ContactStoreInput;
};


export type MutationCreateAssetArgs = {
  input: CreateAssetInput;
};


export type MutationCreateManyIntegrationsArgs = {
  input: CreateManyIntegrationsInput;
};


export type MutationCreateOneBlockArgs = {
  input: CreateOneBlockInput;
};


export type MutationCreateOneDomainArgs = {
  input: CreateOneDomainInput;
};


export type MutationCreateOneGeolocationRedirectArgs = {
  input: CreateOneGeolocationRedirectInput;
};


export type MutationCreateOneIntegrationArgs = {
  input: CreateOneIntegrationInput;
};


export type MutationCreateOneLanguageArgs = {
  input: CreateOneLanguageInput;
};


export type MutationCreateOneOrganizationArgs = {
  input: CreateOrganizationInput;
};


export type MutationCreateOneProductFormArgs = {
  input: CreateOneProductFormInput;
};


export type MutationCreateOneRedirectArgs = {
  input: CreateOneRedirectInput;
};


export type MutationCreateOneSnippetArgs = {
  input: CreateOneSnippetInput;
};


export type MutationCreateOneStoreArgs = {
  input: CreateOneStoreInput;
};


export type MutationCreateOrFetchStoryArgs = {
  input: CreateOrFetchStoryInput;
};


export type MutationCreateSubscriptionArgs = {
  input: CreateSubscriptionInput;
};


export type MutationCreateUserArgs = {
  input: CreateAuth0UserInput;
};


export type MutationDeleteInvitationArgs = {
  id: Scalars['String'];
};


export type MutationDeleteManyAssetsArgs = {
  input: DeleteManyAssetsInput;
};


export type MutationDeleteManyIntegrationsArgs = {
  input: DeleteManyIntegrationsInput;
};


export type MutationDeleteOneAssetArgs = {
  input: DeleteOneAssetInput;
};


export type MutationDeleteOneBlockArgs = {
  input: DeleteOneBlockInput;
};


export type MutationDeleteOneDomainArgs = {
  input: DeleteOneDomainInput;
};


export type MutationDeleteOneGeolocationRedirectArgs = {
  input: DeleteOneGeolocationRedirectInput;
};


export type MutationDeleteOneIntegrationArgs = {
  input: DeleteOneIntegrationInput;
};


export type MutationDeleteOneLanguageArgs = {
  input: DeleteOneLanguageInput;
};


export type MutationDeleteOneOrganizationArgs = {
  input: DeleteOneOrganizationInput;
};


export type MutationDeleteOneProductColorArgs = {
  input: DeleteOneProductColorInput;
};


export type MutationDeleteOneProductFormArgs = {
  input: DeleteOneProductFormInput;
};


export type MutationDeleteOneRedirectArgs = {
  input: DeleteOneRedirectInput;
};


export type MutationDeleteOneSnippetArgs = {
  input: DeleteOneSnippetInput;
};


export type MutationDeleteOneStoreArgs = {
  input: DeleteOneStoreInput;
};


export type MutationDeleteUserArgs = {
  id: Scalars['String'];
};


export type MutationImportRedirectsArgs = {
  input: ImportRedirectsInput;
};


export type MutationLogIntoOrganizationArgs = {
  organizationId: Scalars['String'];
  roleId: Scalars['String'];
};


export type MutationPublishBlockVersionArgs = {
  input: PublishBlockVersionInput;
};


export type MutationRemoveFromWishlistArgs = {
  input: RemoveFromWishlistInput;
};


export type MutationResendInvitationArgs = {
  id: Scalars['String'];
};


export type MutationSetDefaultLanguageArgs = {
  id: Scalars['String'];
};


export type MutationSetPrimaryDomainArgs = {
  id: Scalars['String'];
};


export type MutationSubscribeToBackInStockArgs = {
  input: SubscribeBackInStockInput;
};


export type MutationSubscribeToNewsletterArgs = {
  input: SubscribeNewsletterInput;
};


export type MutationUndoVoteReviewArgs = {
  input: VoteReviewInput;
};


export type MutationUpdateCustomerDataArgs = {
  input: CustomerDataInput;
};


export type MutationUpdateIntegrationMetadataArgs = {
  input: UpdateIntegrationMetadataInput;
};


export type MutationUpdateManyIntegrationsArgs = {
  input: UpdateManyIntegrationsInput;
};


export type MutationUpdateMemberRolesArgs = {
  input: UpdateAuth0MemberRolesInput;
};


export type MutationUpdateOneBlockArgs = {
  input: UpdateOneBlockInput;
};


export type MutationUpdateOneGeolocationRedirectArgs = {
  input: UpdateOneGeolocationRedirectInput;
};


export type MutationUpdateOneIntegrationArgs = {
  input: UpdateOneIntegrationInput;
};


export type MutationUpdateOneLanguageArgs = {
  input: UpdateOneLanguageInput;
};


export type MutationUpdateOneOrganizationArgs = {
  input: UpdateOneOrganizationInput;
};


export type MutationUpdateOneProductColorArgs = {
  input: UpdateOneProductColorInput;
};


export type MutationUpdateOneProductFormArgs = {
  input: UpdateOneProductFormInput;
};


export type MutationUpdateOneRedirectArgs = {
  input: UpdateOneRedirectInput;
};


export type MutationUpdateOneSnippetArgs = {
  input: UpdateOneSnippetInput;
};


export type MutationUpdateOneStoreArgs = {
  input: UpdateOneStoreInput;
};


export type MutationUpdateProfileArgs = {
  input: UpdateAuth0ProfileInput;
};


export type MutationUpdateStorefrontConfigArgs = {
  input: UpdateStorefrontConfigInput;
};


export type MutationUpdateSubscriptionArgs = {
  input: UpdateSubscriptionInput;
};


export type MutationVerifyOneDomainArgs = {
  input: VerifyOneDomainInput;
};


export type MutationVoteReviewArgs = {
  input: VoteReviewInput;
};


export type MutationWriteReviewArgs = {
  input: WriteReviewInput;
};

/** Navigation alignment. */
export enum NavigationAlignment {
  LogoCenter = 'LOGO_CENTER',
  MenuCenter = 'MENU_CENTER',
  MenuLeft = 'MENU_LEFT'
}

export type NavigationComponent = {
  __typename?: 'NavigationComponent';
  alignment: NavigationAlignment;
  countrySelect: Scalars['Boolean'];
  /** Show search, account, and cart items as text. */
  iconLabels: Scalars['Boolean'];
  /** By making it sticky, the navigation bar stays at the top of the screen when you scroll further down the page. */
  isSticky: Scalars['Boolean'];
  languageSelect: Scalars['Boolean'];
  mainBackgroundColor?: Maybe<Scalars['String']>;
  menuItemsSize: FontSize;
  searchType: NavigationSearchType;
  /** @deprecated Should use `searchType` in the future instead. */
  showSearch: Scalars['Boolean'];
  theme: NavigationTheme;
  /** Overrides the theme background color of the top bar. Only relevant for `DOUBLE` variant. */
  topBarBackgroundColor?: Maybe<Scalars['String']>;
  variant: NavigationVariant;
};

export type NavigationComponentInput = {
  alignment?: InputMaybe<NavigationAlignment>;
  countrySelect?: InputMaybe<Scalars['Boolean']>;
  /** Show search, account, and cart items as text. */
  iconLabels?: InputMaybe<Scalars['Boolean']>;
  /** By making it sticky, the navigation bar stays at the top of the screen when you scroll further down the page. */
  isSticky?: InputMaybe<Scalars['Boolean']>;
  languageSelect?: InputMaybe<Scalars['Boolean']>;
  mainBackgroundColor?: InputMaybe<Scalars['String']>;
  menuItemsSize?: InputMaybe<FontSize>;
  searchType?: InputMaybe<NavigationSearchType>;
  showSearch?: InputMaybe<Scalars['Boolean']>;
  theme?: InputMaybe<NavigationTheme>;
  /** Overrides the theme background color of the top bar. Only relevant for `DOUBLE` variant. */
  topBarBackgroundColor?: InputMaybe<Scalars['String']>;
  variant?: InputMaybe<NavigationVariant>;
};

/** Navigation search type. */
export enum NavigationSearchType {
  Button = 'BUTTON',
  Inline = 'INLINE',
  None = 'NONE'
}

/** Navigation theme. */
export enum NavigationTheme {
  Dark = 'DARK',
  Light = 'LIGHT',
  Mixed = 'MIXED'
}

/** Navigation variant. */
export enum NavigationVariant {
  Double = 'DOUBLE',
  DoubleLogoTop = 'DOUBLE_LOGO_TOP',
  Single = 'SINGLE'
}

export type Organization = {
  __typename?: 'Organization';
  createdAt: Scalars['DateTime'];
  id: Scalars['UUID'];
  maxStores: Scalars['Float'];
  name: Scalars['String'];
  slug: Scalars['String'];
  /** Stripe subscription ID. */
  stripeSubscriptionId?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type OrganizationAggregateGroupBy = {
  __typename?: 'OrganizationAggregateGroupBy';
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type OrganizationConnection = {
  __typename?: 'OrganizationConnection';
  /** Array of edges. */
  edges: Array<OrganizationEdge>;
  /** Paging information */
  pageInfo: PageInfo;
};

export type OrganizationCountAggregate = {
  __typename?: 'OrganizationCountAggregate';
  createdAt?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['Int']>;
};

export type OrganizationDeleteResponse = {
  __typename?: 'OrganizationDeleteResponse';
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['UUID']>;
  maxStores?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type OrganizationEdge = {
  __typename?: 'OrganizationEdge';
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor'];
  /** The node containing the Organization */
  node: Organization;
};

export type OrganizationFilter = {
  and?: InputMaybe<Array<OrganizationFilter>>;
  createdAt?: InputMaybe<DateFieldComparison>;
  or?: InputMaybe<Array<OrganizationFilter>>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type OrganizationMaxAggregate = {
  __typename?: 'OrganizationMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type OrganizationMember = {
  __typename?: 'OrganizationMember';
  email: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  picture: Scalars['String'];
  roles?: Maybe<Array<Role>>;
};

export type OrganizationMemberInvitation = {
  __typename?: 'OrganizationMemberInvitation';
  email: Scalars['String'];
  expiresAt: Scalars['String'];
  id: Scalars['String'];
};

export type OrganizationMinAggregate = {
  __typename?: 'OrganizationMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type OrganizationSort = {
  direction: SortDirection;
  field: OrganizationSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum OrganizationSortFields {
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt'
}

export type OverlayField = {
  __typename?: 'OverlayField';
  color: Scalars['String'];
  /** Max 2 decimals */
  opacity: Scalars['Float'];
};

export type OverlayFieldInput = {
  color?: InputMaybe<Scalars['String']>;
  /** Max 2 decimals */
  opacity?: InputMaybe<Scalars['Float']>;
};

/** Padding size. */
export enum PaddingSize {
  Large = 'LARGE',
  Medium = 'MEDIUM',
  None = 'NONE',
  Small = 'SMALL'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  /** The cursor of the last returned record. */
  endCursor?: Maybe<Scalars['ConnectionCursor']>;
  /** true if paging forward and there are more records. */
  hasNextPage?: Maybe<Scalars['Boolean']>;
  /** true if paging backwards and there are more records. */
  hasPreviousPage?: Maybe<Scalars['Boolean']>;
  /** The cursor of the first returned record. */
  startCursor?: Maybe<Scalars['ConnectionCursor']>;
};

export type Pagination = {
  __typename?: 'Pagination';
  /** Current page. */
  page: Scalars['Float'];
  /** Total number of items across all pages. */
  totalItems: Scalars['Float'];
};

/** Payment icon. */
export enum PaymentIcon {
  Affirm = 'AFFIRM',
  Afterpay = 'AFTERPAY',
  Alipay = 'ALIPAY',
  Amex = 'AMEX',
  ApplePay = 'APPLE_PAY',
  Bancontact = 'BANCONTACT',
  DinersClub = 'DINERS_CLUB',
  Discover = 'DISCOVER',
  Eps = 'EPS',
  Giropay = 'GIROPAY',
  GooglePay = 'GOOGLE_PAY',
  Ideal = 'IDEAL',
  Klarna = 'KLARNA',
  Maestro = 'MAESTRO',
  Mastercard = 'MASTERCARD',
  Paypal = 'PAYPAL',
  SepaDirectDebit = 'SEPA_DIRECT_DEBIT',
  ShopPay = 'SHOP_PAY',
  Sofort = 'SOFORT',
  Visa = 'VISA',
  WechatPay = 'WECHAT_PAY'
}

export type PaymentIconAsset = {
  __typename?: 'PaymentIconAsset';
  displayName: Scalars['String'];
  name: Scalars['String'];
  url: Scalars['String'];
};

export type PaymentIconsComponent = {
  __typename?: 'PaymentIconsComponent';
  selectedIcons: Array<PaymentIcon>;
  selectedIconsUrls: Array<PaymentIconAsset>;
};

export type PaymentIconsInput = {
  selectedIcons?: InputMaybe<Array<PaymentIcon>>;
};

export type PaymentMethodCard = {
  __typename?: 'PaymentMethodCard';
  /** Card brand. Can be "amex", "diners", "discover", "jcb", "mastercard", "unionpay", "visa", or "unknown". */
  brand: Scalars['String'];
  id: Scalars['String'];
  /** The last four digits of the card. */
  last4: Scalars['String'];
  type: Scalars['String'];
};

export type PaymentMethodOutput = PaymentMethodCard | PaymentMethodSepaDebit | PaymentMethodUnknown;

export type PaymentMethodSepaDebit = {
  __typename?: 'PaymentMethodSepaDebit';
  /** Two-letter ISO code representing the country the bank account is located in. */
  country?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  /** Last four characters of the IBAN. */
  last4?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type PaymentMethodUnknown = {
  __typename?: 'PaymentMethodUnknown';
  id: Scalars['String'];
  type: Scalars['String'];
};

export type PricingDetails = {
  __typename?: 'PricingDetails';
  /** Values are bound to an organization and in Euro cents. */
  basePrice: Scalars['Float'];
  /** Values are bound to an organization and in Euro cents. */
  pricePerAdditionalStore: Scalars['Float'];
};

export type ProductBadgeComponent = {
  __typename?: 'ProductBadgeComponent';
  borderRadius: BorderRadiusWithFull;
  customBackgroundColor?: Maybe<Scalars['String']>;
  customTextColor?: Maybe<Scalars['String']>;
  onSaleBackgroundColor?: Maybe<Scalars['String']>;
  onSaleTextColor?: Maybe<Scalars['String']>;
  outOfStockBackgroundColor?: Maybe<Scalars['String']>;
  outOfStockTextColor?: Maybe<Scalars['String']>;
  size: FontSize;
  textTransform: TextTransform;
};

export type ProductBadgeComponentInput = {
  borderRadius?: InputMaybe<BorderRadiusWithFull>;
  customBackgroundColor?: InputMaybe<Scalars['String']>;
  customTextColor?: InputMaybe<Scalars['String']>;
  onSaleBackgroundColor?: InputMaybe<Scalars['String']>;
  onSaleTextColor?: InputMaybe<Scalars['String']>;
  outOfStockBackgroundColor?: InputMaybe<Scalars['String']>;
  outOfStockTextColor?: InputMaybe<Scalars['String']>;
  size?: InputMaybe<FontSize>;
  textTransform?: InputMaybe<TextTransform>;
};

/** Product label position. */
export enum ProductBadgePosition {
  BelowImage = 'BELOW_IMAGE',
  BottomLeftImage = 'BOTTOM_LEFT_IMAGE',
  None = 'NONE',
  TopLeftImage = 'TOP_LEFT_IMAGE'
}

export type ProductCardComponent = {
  __typename?: 'ProductCardComponent';
  contentAlignment: TextAlignment;
  description: ProductDescription;
  descriptionColor?: Maybe<Scalars['String']>;
  /** Show product rating. */
  hasRating: Scalars['Boolean'];
  hoverEffect: ProductHoverEffect;
  imageAspectRatio: ImageAspectRatio;
  imageBorderRadius?: Maybe<BorderRadius>;
  imageBoxShadow?: Maybe<BoxShadow>;
  imageObjectFit: ImageObjectFit;
  /** Used when there is a discount on the product. */
  oldPriceColor?: Maybe<Scalars['String']>;
  pretitle: ProductCardPretitle;
  pretitleColor?: Maybe<Scalars['String']>;
  priceColor?: Maybe<Scalars['String']>;
  productBadgePosition: ProductBadgePosition;
  /** The color swatches size is only applicable when color swatches are enabled. */
  productColorOptionsSize: ColorOptionsSize;
  productColorOptionsStyle?: Maybe<ColorOptionsStyle>;
  textSize: FontSize;
  titleColor?: Maybe<Scalars['String']>;
};

export type ProductCardComponentInput = {
  contentAlignment?: InputMaybe<TextAlignment>;
  description?: InputMaybe<ProductDescription>;
  descriptionColor?: InputMaybe<Scalars['String']>;
  /** Show product rating. */
  hasRating?: InputMaybe<Scalars['Boolean']>;
  hoverEffect?: InputMaybe<ProductHoverEffect>;
  imageAspectRatio?: InputMaybe<ImageAspectRatio>;
  imageBorderRadius?: InputMaybe<BorderRadius>;
  imageBoxShadow?: InputMaybe<BoxShadow>;
  imageObjectFit?: InputMaybe<ImageObjectFit>;
  /** Used when there is a discount on the product. */
  oldPriceColor?: InputMaybe<Scalars['String']>;
  pretitle?: InputMaybe<ProductCardPretitle>;
  pretitleColor?: InputMaybe<Scalars['String']>;
  priceColor?: InputMaybe<Scalars['String']>;
  productBadgePosition?: InputMaybe<ProductBadgePosition>;
  /** The color swatches size is only applicable when color swatches are enabled. */
  productColorOptionsSize?: InputMaybe<ColorOptionsSize>;
  productColorOptionsStyle?: InputMaybe<ColorOptionsStyle>;
  textSize?: InputMaybe<FontSize>;
  titleColor?: InputMaybe<Scalars['String']>;
};

/** Product card pretitle type. */
export enum ProductCardPretitle {
  None = 'NONE',
  ProductType = 'PRODUCT_TYPE',
  Vendor = 'VENDOR'
}

export type ProductColor = {
  __typename?: 'ProductColor';
  createdAt: Scalars['DateTime'];
  firstColor?: Maybe<Scalars['String']>;
  gradient?: Maybe<ProductColorGradient>;
  id: Scalars['UUID'];
  name: Scalars['String'];
  secondColor?: Maybe<Scalars['String']>;
  translations: Array<LocalizedValue>;
  type: ProductColorType;
  updatedAt: Scalars['DateTime'];
};

export type ProductColorAggregateGroupBy = {
  __typename?: 'ProductColorAggregateGroupBy';
  createdAt?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ProductColorConnection = {
  __typename?: 'ProductColorConnection';
  /** Array of edges. */
  edges: Array<ProductColorEdge>;
  /** Paging information */
  pageInfo: PageInfo;
};

export type ProductColorCountAggregate = {
  __typename?: 'ProductColorCountAggregate';
  createdAt?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['Int']>;
};

export type ProductColorDeleteResponse = {
  __typename?: 'ProductColorDeleteResponse';
  createdAt?: Maybe<Scalars['DateTime']>;
  firstColor?: Maybe<Scalars['String']>;
  gradient?: Maybe<ProductColorGradient>;
  id?: Maybe<Scalars['UUID']>;
  name?: Maybe<Scalars['String']>;
  secondColor?: Maybe<Scalars['String']>;
  translations?: Maybe<Array<LocalizedValue>>;
  type?: Maybe<ProductColorType>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ProductColorEdge = {
  __typename?: 'ProductColorEdge';
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor'];
  /** The node containing the ProductColor */
  node: ProductColor;
};

export type ProductColorFilter = {
  and?: InputMaybe<Array<ProductColorFilter>>;
  createdAt?: InputMaybe<DateFieldComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<ProductColorFilter>>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

/** Product color gradient. */
export enum ProductColorGradient {
  Conic = 'CONIC',
  Linear = 'LINEAR',
  Radial = 'RADIAL'
}

export type ProductColorMaxAggregate = {
  __typename?: 'ProductColorMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ProductColorMinAggregate = {
  __typename?: 'ProductColorMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ProductColorSort = {
  direction: SortDirection;
  field: ProductColorSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ProductColorSortFields {
  CreatedAt = 'createdAt',
  Name = 'name',
  UpdatedAt = 'updatedAt'
}

/** Product color type. */
export enum ProductColorType {
  Duotone = 'DUOTONE',
  Gradient = 'GRADIENT',
  Solid = 'SOLID'
}

/** Product description type. */
export enum ProductDescription {
  Description = 'DESCRIPTION',
  None = 'NONE'
}

/** Gallery images aspect ratio. */
export enum ProductDetailGalleryImageAspectRatio {
  ExtraTall = 'EXTRA_TALL',
  Landscape = 'LANDSCAPE',
  Portrait = 'PORTRAIT',
  Square = 'SQUARE'
}

/** Gallery layout desktop. */
export enum ProductDetailGalleryLayoutDesktop {
  Lg1Lg1Lg1 = 'LG1_LG1_LG1',
  Lg1Md2 = 'LG1_MD2',
  Lg1Xs5Col = 'LG1_XS5_COL',
  Lg1Xs6 = 'LG1_XS6',
  Md2Md2 = 'MD2_MD2',
  Md2Sm3 = 'MD2_SM3'
}

/** Gallery layout mobile. */
export enum ProductDetailGalleryLayoutMobile {
  SliderLg1 = 'SLIDER_LG1',
  SliderLg1Xs6 = 'SLIDER_LG1_XS6'
}

export type ProductDetailPage = {
  __typename?: 'ProductDetailPage';
  additionalDetailsLayout: AdditionalDetailsLayout;
  galleryImageAspectRatioMobile: ProductDetailGalleryImageAspectRatio;
  galleryImageBorderRadiusDesktop: BorderRadius;
  galleryImageBorderRadiusMobile: BorderRadius;
  galleryLayoutDesktop: ProductDetailGalleryLayoutDesktop;
  galleryLayoutMobile: ProductDetailGalleryLayoutMobile;
  galleryThumbnailAspectRatioDesktop: ProductDetailGalleryImageAspectRatio;
  galleryThumbnailAspectRatioMobile: ProductDetailGalleryImageAspectRatio;
  galleryThumbnailBorderRadiusDesktop: BorderRadius;
  galleryThumbnailBorderRadiusMobile: BorderRadius;
  hasPaymentIcons: Scalars['Boolean'];
  /** @deprecated Should use `hasProductSuggestionsModal` in the cart page instead. */
  hasProductRecommendationsInCartModal: Scalars['Boolean'];
  hasQuantitySelect: Scalars['Boolean'];
  hasStickyAddToCartBarDesktop: Scalars['Boolean'];
  hasStickyAddToCartBarMobile: Scalars['Boolean'];
  /** The color swatches size is only applicable when color swatches are enabled. */
  productColorOptionsSize: ColorOptionsSize;
  productColorOptionsStyle?: Maybe<ColorOptionsStyle>;
  /** @deprecated Should use `sections` instead. */
  productRecommendationsBlockPosition?: Maybe<FixedBlockPosition>;
  /** The sections are displayed in the order they are specified. */
  sections: Array<ProductDetailSection>;
  stickyAddToCartItemsDesktop: Array<ProductDetailStickyAddToCartItem>;
  stickyAddToCartItemsMobile: Array<ProductDetailStickyAddToCartItem>;
  titleFontSize: FontSize;
  wishlistButtonLayout: WishlistButtonLayout;
};

export type ProductDetailPageInput = {
  additionalDetailsLayout?: InputMaybe<AdditionalDetailsLayout>;
  galleryImageAspectRatioMobile?: InputMaybe<ProductDetailGalleryImageAspectRatio>;
  galleryImageBorderRadiusDesktop?: InputMaybe<BorderRadius>;
  galleryImageBorderRadiusMobile?: InputMaybe<BorderRadius>;
  galleryLayoutDesktop?: InputMaybe<ProductDetailGalleryLayoutDesktop>;
  galleryLayoutMobile?: InputMaybe<ProductDetailGalleryLayoutMobile>;
  galleryThumbnailAspectRatioDesktop?: InputMaybe<ProductDetailGalleryImageAspectRatio>;
  galleryThumbnailAspectRatioMobile?: InputMaybe<ProductDetailGalleryImageAspectRatio>;
  galleryThumbnailBorderRadiusDesktop?: InputMaybe<BorderRadius>;
  galleryThumbnailBorderRadiusMobile?: InputMaybe<BorderRadius>;
  hasPaymentIcons?: InputMaybe<Scalars['Boolean']>;
  hasProductRecommendationsInCartModal?: InputMaybe<Scalars['Boolean']>;
  hasQuantitySelect?: InputMaybe<Scalars['Boolean']>;
  hasStickyAddToCartBarDesktop?: InputMaybe<Scalars['Boolean']>;
  hasStickyAddToCartBarMobile?: InputMaybe<Scalars['Boolean']>;
  /** The color swatches size is only applicable when color swatches are enabled. */
  productColorOptionsSize?: InputMaybe<ColorOptionsSize>;
  productColorOptionsStyle?: InputMaybe<ColorOptionsStyle>;
  productRecommendationsBlockPosition?: InputMaybe<FixedBlockPosition>;
  /** The sections are displayed in the order they are specified. */
  sections?: InputMaybe<Array<ProductDetailSection>>;
  stickyAddToCartItemsDesktop?: InputMaybe<Array<ProductDetailStickyAddToCartItem>>;
  stickyAddToCartItemsMobile?: InputMaybe<Array<ProductDetailStickyAddToCartItem>>;
  titleFontSize?: InputMaybe<FontSize>;
  wishlistButtonLayout?: InputMaybe<WishlistButtonLayout>;
};

/** Product detail section. */
export enum ProductDetailSection {
  CustomContentBlocks = 'CUSTOM_CONTENT_BLOCKS',
  Recommendations = 'RECOMMENDATIONS',
  Reviews = 'REVIEWS'
}

/** Product detail sticky add to card item. */
export enum ProductDetailStickyAddToCartItem {
  Options = 'OPTIONS',
  Price = 'PRICE',
  Thumbnail = 'THUMBNAIL',
  Title = 'TITLE'
}

export type ProductForm = {
  __typename?: 'ProductForm';
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  fields: Array<ProductFormField>;
  id: Scalars['UUID'];
  label?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  products?: Maybe<Array<ProductFormProduct>>;
  updatedAt: Scalars['DateTime'];
};

export type ProductFormAggregateGroupBy = {
  __typename?: 'ProductFormAggregateGroupBy';
  createdAt?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ProductFormColorOption = {
  __typename?: 'ProductFormColorOption';
  firstColor: Scalars['String'];
  gradient?: Maybe<ProductFormGradientType>;
  secondColor?: Maybe<Scalars['String']>;
  type: ProductFormColorOptionType;
  value: Scalars['String'];
};

export type ProductFormColorOptionInput = {
  firstColor: Scalars['String'];
  gradient?: InputMaybe<ProductFormGradientType>;
  secondColor?: InputMaybe<Scalars['String']>;
  type: ProductFormColorOptionType;
  value: Scalars['String'];
};

/** Product form color option type. */
export enum ProductFormColorOptionType {
  Duotone = 'DUOTONE',
  Gradient = 'GRADIENT',
  Solid = 'SOLID'
}

export type ProductFormConnection = {
  __typename?: 'ProductFormConnection';
  /** Array of edges. */
  edges: Array<ProductFormEdge>;
  /** Paging information */
  pageInfo: PageInfo;
};

export type ProductFormCountAggregate = {
  __typename?: 'ProductFormCountAggregate';
  createdAt?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['Int']>;
};

export type ProductFormDeleteResponse = {
  __typename?: 'ProductFormDeleteResponse';
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<ProductFormField>>;
  id?: Maybe<Scalars['UUID']>;
  label?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  products?: Maybe<Array<ProductFormProduct>>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ProductFormEdge = {
  __typename?: 'ProductFormEdge';
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor'];
  /** The node containing the ProductForm */
  node: ProductForm;
};

export type ProductFormField = {
  __typename?: 'ProductFormField';
  /** Only relevant for `TEXT` fields. */
  allowEmojis?: Maybe<Scalars['Boolean']>;
  /** Only relevant for `TEXT` fields. */
  allowLetters?: Maybe<Scalars['Boolean']>;
  /** Only relevant for `TEXT` fields. */
  allowNumbers?: Maybe<Scalars['Boolean']>;
  /** Only relevant for `TEXT` fields. */
  allowSpecialCharacters?: Maybe<Scalars['Boolean']>;
  colors?: Maybe<Array<ProductFormColorOption>>;
  description?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  /** Only relevant for `TEXT` fields. */
  maxLength?: Maybe<Scalars['Int']>;
  /** Only relevant for `TEXT` fields. */
  minLength?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  options?: Maybe<Array<ProductFormTextOption>>;
  /** Only relevant for `TEXT` and `SELECT` fields. */
  placeholder?: Maybe<Scalars['String']>;
  required: Scalars['Boolean'];
  /** Only relevant for `TEXT` fields. */
  transform?: Maybe<ProductFormFieldTransform>;
  type: ProductFormFieldType;
};

export type ProductFormFieldInput = {
  /** Only relevant for `TEXT` fields. */
  allowEmojis?: InputMaybe<Scalars['Boolean']>;
  /** Only relevant for `TEXT` fields. */
  allowLetters?: InputMaybe<Scalars['Boolean']>;
  /** Only relevant for `TEXT` fields. */
  allowNumbers?: InputMaybe<Scalars['Boolean']>;
  /** Only relevant for `TEXT` fields. */
  allowSpecialCharacters?: InputMaybe<Scalars['Boolean']>;
  colors?: InputMaybe<Array<ProductFormColorOptionInput>>;
  description?: InputMaybe<Scalars['String']>;
  label?: InputMaybe<Scalars['String']>;
  /** Only relevant for `TEXT` fields. */
  maxLength?: InputMaybe<Scalars['Int']>;
  /** Only relevant for `TEXT` fields. */
  minLength?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
  options?: InputMaybe<Array<ProductFormTextOptionInput>>;
  /** Only relevant for `TEXT` and `SELECT` fields. */
  placeholder?: InputMaybe<Scalars['String']>;
  required?: InputMaybe<Scalars['Boolean']>;
  /** Only relevant for `TEXT` fields. */
  transform?: InputMaybe<ProductFormFieldTransform>;
  type: ProductFormFieldType;
};

/** Product form field transform. */
export enum ProductFormFieldTransform {
  Lowercase = 'LOWERCASE',
  Uppercase = 'UPPERCASE'
}

/** Product form field type. */
export enum ProductFormFieldType {
  Boolean = 'BOOLEAN',
  Color = 'COLOR',
  Select = 'SELECT',
  Text = 'TEXT'
}

export type ProductFormFilter = {
  and?: InputMaybe<Array<ProductFormFilter>>;
  createdAt?: InputMaybe<DateFieldComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<ProductFormFilter>>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

/** Product color gradient. */
export enum ProductFormGradientType {
  Conic = 'CONIC',
  Linear = 'LINEAR',
  Radial = 'RADIAL'
}

export type ProductFormMaxAggregate = {
  __typename?: 'ProductFormMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ProductFormMinAggregate = {
  __typename?: 'ProductFormMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ProductFormProduct = {
  __typename?: 'ProductFormProduct';
  id: Scalars['String'];
  variants?: Maybe<Array<Scalars['String']>>;
};

export type ProductFormProductInput = {
  id: Scalars['String'];
  variants?: InputMaybe<Array<Scalars['String']>>;
};

export type ProductFormSort = {
  direction: SortDirection;
  field: ProductFormSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ProductFormSortFields {
  CreatedAt = 'createdAt',
  Name = 'name',
  UpdatedAt = 'updatedAt'
}

export type ProductFormTextOption = {
  __typename?: 'ProductFormTextOption';
  value: Scalars['String'];
};

export type ProductFormTextOptionInput = {
  value: Scalars['String'];
};

/** Product image hover effect. */
export enum ProductHoverEffect {
  None = 'NONE',
  SecondImage = 'SECOND_IMAGE',
  Zoom = 'ZOOM'
}

export type ProductListingPage = {
  __typename?: 'ProductListingPage';
  activeBreadcrumbColor?: Maybe<Scalars['String']>;
  backgroundColor?: Maybe<Scalars['String']>;
  breadcrumbsColor?: Maybe<Scalars['String']>;
  collectionsDesktopLocation: CollectionsLocation;
  collectionsMobileLocation: CollectionsLocation;
  filtersOpenByDefault: Scalars['Boolean'];
  hasBreadcrumbs: Scalars['Boolean'];
  hasFilters: Scalars['Boolean'];
  headerLayout: HeaderLayout;
  headerWidth: ContainerWidth;
  /** @deprecated Header does not support separator. */
  heading?: Maybe<HeadingField>;
  imageBorderRadius?: Maybe<BorderRadius>;
  imageBoxShadow?: Maybe<BoxShadow>;
  imageHeight: ImageHeight;
  imageOverlay?: Maybe<OverlayField>;
  /** The color swatches size is only applicable when color swatches are enabled. */
  productColorOptionsSize: ColorOptionsSize;
  productColorOptionsStyle?: Maybe<ColorOptionsStyle>;
  productGridColumnsDesktop: Scalars['Int'];
  productGridColumnsMobile: Scalars['Int'];
  productGridWidth: ContainerWidth;
  sidebarOpenByDefault: Scalars['Boolean'];
  subtitleColor?: Maybe<Scalars['String']>;
  textAlignment: TextAlignment;
  textSize: FontSize;
  theme: BlockTheme;
  titleColor?: Maybe<Scalars['String']>;
};

export type ProductListingPageInput = {
  activeBreadcrumbColor?: InputMaybe<Scalars['String']>;
  backgroundColor?: InputMaybe<Scalars['String']>;
  breadcrumbsColor?: InputMaybe<Scalars['String']>;
  collectionsDesktopLocation?: InputMaybe<CollectionsLocation>;
  collectionsMobileLocation?: InputMaybe<CollectionsLocation>;
  filtersOpenByDefault?: InputMaybe<Scalars['Boolean']>;
  hasBreadcrumbs?: InputMaybe<Scalars['Boolean']>;
  hasFilters?: InputMaybe<Scalars['Boolean']>;
  headerLayout?: InputMaybe<HeaderLayout>;
  headerWidth?: InputMaybe<ContainerWidth>;
  heading?: InputMaybe<HeadingFieldInput>;
  imageBorderRadius?: InputMaybe<BorderRadius>;
  imageBoxShadow?: InputMaybe<BoxShadow>;
  imageHeight?: InputMaybe<ImageHeight>;
  imageOverlay?: InputMaybe<OverlayFieldInput>;
  /** The color swatches size is only applicable when color swatches are enabled. */
  productColorOptionsSize?: InputMaybe<ColorOptionsSize>;
  productColorOptionsStyle?: InputMaybe<ColorOptionsStyle>;
  productGridColumnsDesktop?: InputMaybe<Scalars['Int']>;
  productGridColumnsMobile?: InputMaybe<Scalars['Int']>;
  productGridWidth?: InputMaybe<ContainerWidth>;
  sidebarOpenByDefault?: InputMaybe<Scalars['Boolean']>;
  subtitleColor?: InputMaybe<Scalars['String']>;
  textAlignment?: InputMaybe<TextAlignment>;
  textSize?: InputMaybe<FontSize>;
  theme?: InputMaybe<BlockTheme>;
  titleColor?: InputMaybe<Scalars['String']>;
};

export type ProductSliderBlock = {
  __typename?: 'ProductSliderBlock';
  backgroundColor?: Maybe<Scalars['String']>;
  buttonType: ButtonType;
  containerWidth: ContainerWidth;
  headerAlignment: TextAlignment;
  headerPretitleColor?: Maybe<Scalars['String']>;
  headerSize: FontSize;
  headerSubtitleColor?: Maybe<Scalars['String']>;
  headerTitleColor?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  name: Scalars['String'];
  theme: BlockTheme;
};

export type PublicAsset = {
  __typename?: 'PublicAsset';
  id: Scalars['UUID'];
  mimeType?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  type: AssetType;
  url: Scalars['String'];
};

export type PublicCookieBannerIntegrationMetadata = {
  __typename?: 'PublicCookieBannerIntegrationMetadata';
  domainId: Scalars['String'];
  provider: IntegrationType;
};

export type PublicDomain = {
  __typename?: 'PublicDomain';
  hostname: Scalars['String'];
  url: Scalars['String'];
};

export type PublicGeolocationRedirect = {
  __typename?: 'PublicGeolocationRedirect';
  /** Values are two-letter country codes (ISO 3166-1 alpha-2) */
  countries: Array<Scalars['String']>;
  /** Requires a protocol being set. */
  customUrl?: Maybe<Scalars['String']>;
  storeId?: Maybe<Scalars['String']>;
  target: GeolocationRedirectTarget;
  /** Returns the constructed redirect URL depending on the rule's type. */
  url: Scalars['String'];
};

export type PublicIntegrationMetadata = {
  __typename?: 'PublicIntegrationMetadata';
  algolia?: Maybe<AlgoliaPublicMetadata>;
  cookieBanner?: Maybe<PublicCookieBannerIntegrationMetadata>;
  faslet?: Maybe<FasletPublicMetadata>;
  googleTagManager?: Maybe<GoogleTagManagerPublicMetadata>;
  gorgias?: Maybe<GorgiasPublicMetadata>;
  kiwiSizing?: Maybe<KiwiSizingPublicMetadata>;
  klaviyo?: Maybe<KlaviyoPublicMetadata>;
  review?: Maybe<PublicReviewIntegrationMetadata>;
  shopify?: Maybe<ShopifyPublicMetadata>;
  storemapper?: Maybe<StoremapperPublicMetadata>;
  storyblok?: Maybe<StoryblokPublicMetadata>;
  wishlist?: Maybe<IntegrationType>;
};

export type PublicLanguage = {
  __typename?: 'PublicLanguage';
  isDefault: Scalars['Boolean'];
  locale: Scalars['String'];
  /** Name to display in the storefront language selector. */
  localizedName: Scalars['String'];
};

export type PublicOrganization = {
  __typename?: 'PublicOrganization';
  id: Scalars['UUID'];
  name: Scalars['String'];
  slug: Scalars['String'];
};

export type PublicProductColors = {
  __typename?: 'PublicProductColors';
  optionName?: Maybe<Scalars['String']>;
  optionNamesLocalized: Array<LocalizedValue>;
  values: Array<LocalizedColorValue>;
};

export type PublicProductForm = {
  __typename?: 'PublicProductForm';
  description?: Maybe<Scalars['String']>;
  fields: Array<ProductFormField>;
  label?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  products?: Maybe<Array<ProductFormProduct>>;
};

export type PublicProductGroup = {
  __typename?: 'PublicProductGroup';
  optionName?: Maybe<Scalars['String']>;
  translatedOptionNames: Array<LocalizedValue>;
};

export type PublicRedirect = {
  __typename?: 'PublicRedirect';
  from: Scalars['String'];
  to: Scalars['String'];
  type: RedirectType;
};

export type PublicReviewIntegrationMetadata = {
  __typename?: 'PublicReviewIntegrationMetadata';
  abilities: Array<ReviewIntegrationAbility>;
  productIdentifier: ReviewProductIdentifier;
  provider: IntegrationType;
};

export type PublicSnippet = {
  __typename?: 'PublicSnippet';
  /** Indicates if the script should bypass cookie integrations. Only relevant for JS snippets. */
  bypassCookieIntegration?: Maybe<Scalars['Boolean']>;
  id: Scalars['UUID'];
  /** Whether the script should be loaded prioritized even if that has performance impacts. Only relevant for JS snippets. */
  isPrioritized?: Maybe<Scalars['Boolean']>;
  type: SnippetType;
  url: Scalars['String'];
};

export type PublicStore = {
  __typename?: 'PublicStore';
  assets: Array<PublicAsset>;
  estimatedVatPercentage?: Maybe<Scalars['Float']>;
  geolocationRedirects: Array<PublicGeolocationRedirect>;
  id: Scalars['UUID'];
  integrations: PublicIntegrationMetadata;
  languages: Array<PublicLanguage>;
  name: Scalars['String'];
  organization: PublicOrganization;
  primaryDomain: PublicDomain;
  productColors: PublicProductColors;
  productForms: Array<PublicProductForm>;
  productGroup: PublicProductGroup;
  redirectTrafficToPrimaryDomain: Scalars['Boolean'];
  /** @deprecated Redirect logic should be handled server-side by redirectByUrl query */
  redirects: Array<PublicRedirect>;
  slug: Scalars['String'];
  snippets: Array<PublicSnippet>;
  storefront: Storefront;
};

export type PublishBlockVersionInput = {
  code: Scalars['Upload'];
  contentSchema: ContentSchemaInput;
  customizerSchema: CustomizerSchemaInput;
  /** ID of the block */
  id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  /** Returns all available payment icons. */
  allPaymentIcons: Array<PaymentIconAsset>;
  asset?: Maybe<Asset>;
  assets: AssetConnection;
  auth0Roles: Array<Auth0Role>;
  averageRatings: Array<AverageRating>;
  billingDetails: BillingDetails;
  block?: Maybe<Block>;
  blocks: BlockConnection;
  /** Get current bulk operation. */
  currentBulkOperation?: Maybe<ShopifyBulkOperation>;
  /** Fetches current organization */
  currentOrganization: Organization;
  /** Retrieves the default payment method. */
  defaultPaymentMethod: PaymentMethodOutput;
  domain?: Maybe<Domain>;
  domains: DomainConnection;
  geolocationRedirect?: Maybe<GeolocationRedirect>;
  geolocationRedirects: GeolocationRedirectConnection;
  /** Fetches the storefront config schema. */
  getConfigSchemas: Scalars['Object'];
  integration?: Maybe<Integration>;
  /** Fetches the integration metadata schemas. */
  integrationMetadataSchemas: Scalars['Object'];
  integrations: IntegrationConnection;
  language?: Maybe<Language>;
  languages: LanguageConnection;
  listInvitations: Auth0ListInvitationsResponse;
  listUsers: Auth0ListUsersResponse;
  me: User;
  organization?: Maybe<Organization>;
  organizations: OrganizationConnection;
  /** Fetch a draft store by it's connected domain (without caching). */
  previewStoreByHostname: PublicStore;
  productColor?: Maybe<ProductColor>;
  productColors: ProductColorConnection;
  productForm?: Maybe<ProductForm>;
  productForms: ProductFormConnection;
  /** Fetch a store containing only public data by it's connected domain. */
  publicStoreByHostname: PublicStore;
  redirect?: Maybe<Redirect>;
  redirectByUrl?: Maybe<PublicRedirect>;
  redirects: RedirectConnection;
  reviews: ReviewResponse;
  shopifyBulkOperation?: Maybe<ShopifyBulkOperation>;
  shopifyBulkOperations: ShopifyBulkOperationConnection;
  /** Fetches collections from Shopify. */
  shopifyCollections: ShopifyCollectionConnection;
  /** Fetches or creates a delegate access token. */
  shopifyDelegateAccessToken: Scalars['String'];
  /** Fetches product from Shopify including variants. */
  shopifyProduct?: Maybe<ShopifyProductWithVariants>;
  /** Fetches products from Shopify. */
  shopifyProducts: ShopifyProductConnection;
  /** Fetches products from Shopify by a list of ids. */
  shopifyProductsByIds: Array<ShopifyProduct>;
  snippet?: Maybe<Snippet>;
  snippets: SnippetConnection;
  store?: Maybe<Store>;
  storeBySlug?: Maybe<Store>;
  stores: StoreConnection;
  /** Fetches a single user within the current organization. */
  user: User;
  wishlist: Wishlist;
};


export type QueryAssetArgs = {
  id: Scalars['ID'];
};


export type QueryAssetsArgs = {
  filter?: InputMaybe<AssetFilter>;
  paging?: InputMaybe<CursorPaging>;
  sorting?: InputMaybe<Array<AssetSort>>;
};


export type QueryAverageRatingsArgs = {
  productIds: Array<Scalars['String']>;
};


export type QueryBlockArgs = {
  id: Scalars['ID'];
};


export type QueryBlocksArgs = {
  filter?: InputMaybe<BlockFilter>;
  paging?: InputMaybe<CursorPaging>;
  sorting?: InputMaybe<Array<BlockSort>>;
};


export type QueryCurrentBulkOperationArgs = {
  check?: InputMaybe<Scalars['Boolean']>;
  type: Scalars['String'];
};


export type QueryDomainArgs = {
  id: Scalars['ID'];
};


export type QueryDomainsArgs = {
  filter?: InputMaybe<DomainFilter>;
  paging?: InputMaybe<CursorPaging>;
  sorting?: InputMaybe<Array<DomainSort>>;
};


export type QueryGeolocationRedirectArgs = {
  id: Scalars['ID'];
};


export type QueryGeolocationRedirectsArgs = {
  filter?: InputMaybe<GeolocationRedirectFilter>;
  paging?: InputMaybe<CursorPaging>;
  sorting?: InputMaybe<Array<GeolocationRedirectSort>>;
};


export type QueryIntegrationArgs = {
  id: Scalars['ID'];
};


export type QueryIntegrationsArgs = {
  filter?: InputMaybe<IntegrationFilter>;
  paging?: InputMaybe<CursorPaging>;
  sorting?: InputMaybe<Array<IntegrationSort>>;
};


export type QueryLanguageArgs = {
  id: Scalars['ID'];
};


export type QueryLanguagesArgs = {
  filter?: InputMaybe<LanguageFilter>;
  paging?: InputMaybe<CursorPaging>;
  sorting?: InputMaybe<Array<LanguageSort>>;
};


export type QueryListInvitationsArgs = {
  input: Auth0ListInput;
};


export type QueryListUsersArgs = {
  input: Auth0ListInput;
};


export type QueryOrganizationArgs = {
  id: Scalars['ID'];
};


export type QueryOrganizationsArgs = {
  filter?: InputMaybe<OrganizationFilter>;
  paging?: InputMaybe<CursorPaging>;
  sorting?: InputMaybe<Array<OrganizationSort>>;
};


export type QueryPreviewStoreByHostnameArgs = {
  hostname: Scalars['String'];
};


export type QueryProductColorArgs = {
  id: Scalars['ID'];
};


export type QueryProductColorsArgs = {
  filter?: InputMaybe<ProductColorFilter>;
  paging?: InputMaybe<CursorPaging>;
  sorting?: InputMaybe<Array<ProductColorSort>>;
};


export type QueryProductFormArgs = {
  id: Scalars['ID'];
};


export type QueryProductFormsArgs = {
  filter?: InputMaybe<ProductFormFilter>;
  paging?: InputMaybe<CursorPaging>;
  sorting?: InputMaybe<Array<ProductFormSort>>;
};


export type QueryPublicStoreByHostnameArgs = {
  hostname: Scalars['String'];
};


export type QueryRedirectArgs = {
  id: Scalars['ID'];
};


export type QueryRedirectByUrlArgs = {
  url: Scalars['String'];
};


export type QueryRedirectsArgs = {
  filter?: InputMaybe<RedirectFilter>;
  paging?: InputMaybe<CursorPaging>;
  sorting?: InputMaybe<Array<RedirectSort>>;
};


export type QueryReviewsArgs = {
  input: ReviewsInput;
};


export type QueryShopifyBulkOperationArgs = {
  id: Scalars['ID'];
};


export type QueryShopifyBulkOperationsArgs = {
  filter?: InputMaybe<ShopifyBulkOperationFilter>;
  paging?: InputMaybe<CursorPaging>;
  sorting?: InputMaybe<Array<ShopifyBulkOperationSort>>;
};


export type QueryShopifyCollectionsArgs = {
  paging: ShopifyPagingInput;
  query?: InputMaybe<Scalars['String']>;
  transform?: InputMaybe<ShopifyTransformInput>;
};


export type QueryShopifyProductArgs = {
  id: Scalars['String'];
  paging: ShopifyPagingInput;
  transform?: InputMaybe<ShopifyTransformInput>;
};


export type QueryShopifyProductsArgs = {
  paging: ShopifyPagingInput;
  query?: InputMaybe<Scalars['String']>;
  transform?: InputMaybe<ShopifyTransformInput>;
};


export type QueryShopifyProductsByIdsArgs = {
  ids: Array<Scalars['String']>;
  transform?: InputMaybe<ShopifyTransformInput>;
};


export type QuerySnippetArgs = {
  id: Scalars['ID'];
};


export type QuerySnippetsArgs = {
  filter?: InputMaybe<SnippetFilter>;
  paging?: InputMaybe<CursorPaging>;
  sorting?: InputMaybe<Array<SnippetSort>>;
};


export type QueryStoreArgs = {
  id: Scalars['ID'];
};


export type QueryStoreBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryStoresArgs = {
  filter?: InputMaybe<StoreFilter>;
  paging?: InputMaybe<CursorPaging>;
  sorting?: InputMaybe<Array<StoreSort>>;
};


export type QueryUserArgs = {
  id: Scalars['String'];
};


export type QueryWishlistArgs = {
  input: GetWishlistInput;
};

export type QuoteBlock = {
  __typename?: 'QuoteBlock';
  authorColor?: Maybe<Scalars['String']>;
  backgroundColor?: Maybe<Scalars['String']>;
  contentAlignment: TextAlignment;
  iconColor?: Maybe<Scalars['String']>;
  iconStyle: IconStyle;
  id: Scalars['UUID'];
  name: Scalars['String'];
  quoteColor?: Maybe<Scalars['String']>;
  quoteSize: FontSize;
  subtextColor?: Maybe<Scalars['String']>;
  textSize: FontSize;
  theme: BlockTheme;
};

export type Redirect = {
  __typename?: 'Redirect';
  createdAt: Scalars['DateTime'];
  from: Scalars['String'];
  hits: Scalars['Float'];
  id: Scalars['UUID'];
  to: Scalars['String'];
  type: RedirectType;
  updatedAt: Scalars['DateTime'];
};

export type RedirectAggregateGroupBy = {
  __typename?: 'RedirectAggregateGroupBy';
  createdAt?: Maybe<Scalars['DateTime']>;
  type?: Maybe<RedirectType>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type RedirectConnection = {
  __typename?: 'RedirectConnection';
  /** Array of edges. */
  edges: Array<RedirectEdge>;
  /** Paging information */
  pageInfo: PageInfo;
};

export type RedirectCountAggregate = {
  __typename?: 'RedirectCountAggregate';
  createdAt?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['Int']>;
};

export type RedirectDeleteResponse = {
  __typename?: 'RedirectDeleteResponse';
  createdAt?: Maybe<Scalars['DateTime']>;
  from?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['UUID']>;
  to?: Maybe<Scalars['String']>;
  type?: Maybe<RedirectType>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type RedirectEdge = {
  __typename?: 'RedirectEdge';
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor'];
  /** The node containing the Redirect */
  node: Redirect;
};

export type RedirectFilter = {
  and?: InputMaybe<Array<RedirectFilter>>;
  createdAt?: InputMaybe<DateFieldComparison>;
  or?: InputMaybe<Array<RedirectFilter>>;
  type?: InputMaybe<RedirectTypeFilterComparison>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type RedirectMaxAggregate = {
  __typename?: 'RedirectMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  type?: Maybe<RedirectType>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type RedirectMinAggregate = {
  __typename?: 'RedirectMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  type?: Maybe<RedirectType>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type RedirectSort = {
  direction: SortDirection;
  field: RedirectSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum RedirectSortFields {
  CreatedAt = 'createdAt',
  Type = 'type',
  UpdatedAt = 'updatedAt'
}

/** Redirect type. */
export enum RedirectType {
  Permanent = 'PERMANENT',
  Temporary = 'TEMPORARY'
}

export type RedirectTypeFilterComparison = {
  eq?: InputMaybe<RedirectType>;
  gt?: InputMaybe<RedirectType>;
  gte?: InputMaybe<RedirectType>;
  iLike?: InputMaybe<RedirectType>;
  in?: InputMaybe<Array<RedirectType>>;
  is?: InputMaybe<Scalars['Boolean']>;
  isNot?: InputMaybe<Scalars['Boolean']>;
  like?: InputMaybe<RedirectType>;
  lt?: InputMaybe<RedirectType>;
  lte?: InputMaybe<RedirectType>;
  neq?: InputMaybe<RedirectType>;
  notILike?: InputMaybe<RedirectType>;
  notIn?: InputMaybe<Array<RedirectType>>;
  notLike?: InputMaybe<RedirectType>;
};

export type RemoveFromWishlistInput = {
  itemId: Scalars['String'];
  /** Required in Appmate integration. */
  listId?: InputMaybe<Scalars['String']>;
  sessionId?: InputMaybe<Scalars['String']>;
  /** Required in Growave integration. */
  userId?: InputMaybe<Scalars['String']>;
};

export type Review = {
  __typename?: 'Review';
  /** Review attachments uploaded by the reviewer. */
  attachments?: Maybe<Array<ReviewAttachment>>;
  /** Review content. */
  content: Scalars['String'];
  /** External review id. */
  id?: Maybe<Scalars['String']>;
  /** Whether the reviewer is verified. */
  isReviewerVerified: Scalars['Boolean'];
  /** Merchant's reply to the review. */
  reply?: Maybe<ReviewReply>;
  /** Review date. */
  reviewedAt: Scalars['DateTime'];
  /** Reviewer name. */
  reviewer: Scalars['String'];
  /** Stars given by the reviewer. */
  stars: Scalars['Float'];
  /** Review title. */
  title?: Maybe<Scalars['String']>;
  /** Up and down votes given by other people. */
  votes?: Maybe<ReviewVotes>;
};

export type ReviewAttachment = {
  __typename?: 'ReviewAttachment';
  large: Scalars['String'];
  mimeType: Scalars['String'];
  thumbnail: Scalars['String'];
  /** @deprecated Use `thumbnail` or `large` instead. */
  url: Scalars['String'];
};

export enum ReviewIntegrationAbility {
  Read = 'READ',
  Vote = 'VOTE',
  Write = 'WRITE'
}

export enum ReviewProductIdentifier {
  ProductId = 'PRODUCT_ID',
  Sku = 'SKU'
}

export type ReviewReply = {
  __typename?: 'ReviewReply';
  content: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
};

export type ReviewResponse = {
  __typename?: 'ReviewResponse';
  pagination: Pagination;
  reviews: Array<Review>;
};

export type ReviewStars = {
  __typename?: 'ReviewStars';
  /** Total number of five star reviews. */
  five: Scalars['Float'];
  /** Total number of four star reviews. */
  four: Scalars['Float'];
  /** Total number of one star reviews. */
  one: Scalars['Float'];
  /** Total number of three star reviews. */
  three: Scalars['Float'];
  /** Total number of two star reviews. */
  two: Scalars['Float'];
};

export type ReviewVotes = {
  __typename?: 'ReviewVotes';
  /** Represents how many people found the review unhelpful. */
  down: Scalars['Float'];
  /** Represents how many people found the review helpful. */
  up: Scalars['Float'];
};

export type ReviewsInput = {
  limit?: InputMaybe<Scalars['Float']>;
  page?: InputMaybe<Scalars['Float']>;
  productId: Scalars['String'];
};

export type RichTextBlock = {
  __typename?: 'RichTextBlock';
  backgroundColor?: Maybe<Scalars['String']>;
  contentImageBorderRadius?: Maybe<BorderRadius>;
  contentImageShadow?: Maybe<BoxShadow>;
  contentTextColor?: Maybe<Scalars['String']>;
  contentTitleColor?: Maybe<Scalars['String']>;
  dividerColor?: Maybe<Scalars['String']>;
  hasDivider: Scalars['Boolean'];
  headerAlignment: TextAlignment;
  headerPretitleColor?: Maybe<Scalars['String']>;
  headerSize: FontSize;
  headerSubtitleColor?: Maybe<Scalars['String']>;
  headerTitleColor?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  name: Scalars['String'];
  theme: BlockTheme;
};

/** Represents a role defined in Auth0. */
export type Role = {
  __typename?: 'Role';
  description: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
};

/** Scroll direction. */
export enum ScrollDirection {
  Horizontal = 'HORIZONTAL',
  Vertical = 'VERTICAL'
}

export type SelectOption = {
  __typename?: 'SelectOption';
  label: Scalars['String'];
  value: Scalars['String'];
};

export type SelectOptionInput = {
  label: Scalars['String'];
  value: Scalars['String'];
};

export type ShopifyBulkOperation = {
  __typename?: 'ShopifyBulkOperation';
  createdAt: Scalars['DateTime'];
  id: Scalars['UUID'];
  /** Represents what kind of bulk operation this is. */
  kind: ShopifyBulkOperationKind;
  status: ShopifyBulkOperationStatus;
  type: ShopifyBulkOperationType;
  updatedAt: Scalars['DateTime'];
};

export type ShopifyBulkOperationAggregateGroupBy = {
  __typename?: 'ShopifyBulkOperationAggregateGroupBy';
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ShopifyBulkOperationConnection = {
  __typename?: 'ShopifyBulkOperationConnection';
  /** Array of edges. */
  edges: Array<ShopifyBulkOperationEdge>;
  /** Paging information */
  pageInfo: PageInfo;
};

export type ShopifyBulkOperationCountAggregate = {
  __typename?: 'ShopifyBulkOperationCountAggregate';
  createdAt?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['Int']>;
};

export type ShopifyBulkOperationEdge = {
  __typename?: 'ShopifyBulkOperationEdge';
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor'];
  /** The node containing the ShopifyBulkOperation */
  node: ShopifyBulkOperation;
};

export type ShopifyBulkOperationFilter = {
  and?: InputMaybe<Array<ShopifyBulkOperationFilter>>;
  createdAt?: InputMaybe<DateFieldComparison>;
  or?: InputMaybe<Array<ShopifyBulkOperationFilter>>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

/** Kind of Shopify bulk operation. */
export enum ShopifyBulkOperationKind {
  FetchProductColors = 'FETCH_PRODUCT_COLORS'
}

export type ShopifyBulkOperationMaxAggregate = {
  __typename?: 'ShopifyBulkOperationMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ShopifyBulkOperationMinAggregate = {
  __typename?: 'ShopifyBulkOperationMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ShopifyBulkOperationSort = {
  direction: SortDirection;
  field: ShopifyBulkOperationSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ShopifyBulkOperationSortFields {
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt'
}

/** Shopify bulk operation status. */
export enum ShopifyBulkOperationStatus {
  Completed = 'COMPLETED',
  Created = 'CREATED',
  Failed = 'FAILED'
}

/** Shopify bulk operation type. */
export enum ShopifyBulkOperationType {
  Mutation = 'MUTATION',
  Query = 'QUERY'
}

export type ShopifyCollection = {
  __typename?: 'ShopifyCollection';
  handle: Scalars['String'];
  id: Scalars['String'];
  image?: Maybe<ShopifyImage>;
  productsCount: Scalars['Int'];
  title: Scalars['String'];
};

export type ShopifyCollectionConnection = {
  __typename?: 'ShopifyCollectionConnection';
  edges: Array<ShopifyCollectionEdge>;
  pageInfo: ShopifyPageInfo;
};

export type ShopifyCollectionEdge = {
  __typename?: 'ShopifyCollectionEdge';
  cursor: Scalars['String'];
  node: ShopifyCollection;
};

export type ShopifyImage = {
  __typename?: 'ShopifyImage';
  url: Scalars['String'];
};

export type ShopifyMetadata = {
  __typename?: 'ShopifyMetadata';
  apiPassword?: Maybe<Scalars['String']>;
  delegateAccessToken?: Maybe<Scalars['String']>;
  shopId?: Maybe<Scalars['String']>;
  storefrontAccessToken?: Maybe<Scalars['String']>;
};

export type ShopifyPageInfo = {
  __typename?: 'ShopifyPageInfo';
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
};

export type ShopifyPagingInput = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type ShopifyProduct = {
  __typename?: 'ShopifyProduct';
  handle: Scalars['String'];
  id: Scalars['String'];
  image?: Maybe<ShopifyImage>;
  status: Scalars['String'];
  title: Scalars['String'];
  totalVariants: Scalars['Int'];
};

export type ShopifyProductConnection = {
  __typename?: 'ShopifyProductConnection';
  edges: Array<ShopifyProductEdge>;
  pageInfo: ShopifyPageInfo;
};

export type ShopifyProductEdge = {
  __typename?: 'ShopifyProductEdge';
  cursor: Scalars['String'];
  node: ShopifyProduct;
};

export type ShopifyProductVariant = {
  __typename?: 'ShopifyProductVariant';
  displayName: Scalars['String'];
  id: Scalars['String'];
  image?: Maybe<ShopifyImage>;
  sku: Scalars['String'];
  title: Scalars['String'];
};

export type ShopifyProductVariantConnection = {
  __typename?: 'ShopifyProductVariantConnection';
  edges: Array<ShopifyProductVariantEdge>;
  pageInfo: ShopifyPageInfo;
};

export type ShopifyProductVariantEdge = {
  __typename?: 'ShopifyProductVariantEdge';
  node: ShopifyProductVariant;
};

export type ShopifyProductWithVariants = {
  __typename?: 'ShopifyProductWithVariants';
  handle: Scalars['String'];
  id: Scalars['String'];
  image?: Maybe<ShopifyImage>;
  status: Scalars['String'];
  title: Scalars['String'];
  totalVariants: Scalars['Int'];
  variants: ShopifyProductVariantConnection;
};

export type ShopifyPublicMetadata = {
  __typename?: 'ShopifyPublicMetadata';
  shopId?: Maybe<Scalars['String']>;
  storefrontAccessToken?: Maybe<Scalars['String']>;
};

export type ShopifyTransformInput = {
  /** Crop the image according to the specified region. */
  crop: Scalars['String'];
  /** Image height in pixels between 1 and 5760. */
  maxHeight: Scalars['Float'];
  /** Image width in pixels between 1 and 5760. */
  maxWidth: Scalars['Float'];
  /** Convert the source image into the preferred content type. Supported conversions: .svg to .png, any file type to .jpg, and any file to .webp. */
  preferredContentType: Scalars['String'];
  /** Image size multiplier for high-resolution retina displays. Must be within 1..3. */
  scale?: InputMaybe<Scalars['Float']>;
};

export type Snippet = {
  __typename?: 'Snippet';
  /** Indicates if the script should bypass cookie integrations. Only relevant for JS snippets. */
  bypassCookieIntegration?: Maybe<Scalars['Boolean']>;
  code: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['UUID'];
  /** Whether the script should be loaded prioritized even if that has performance impacts. Only relevant for JS snippets. */
  isPrioritized?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  status: SnippetStatus;
  type: SnippetType;
  updatedAt: Scalars['DateTime'];
  url: Scalars['String'];
};

export type SnippetAggregateGroupBy = {
  __typename?: 'SnippetAggregateGroupBy';
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type SnippetConnection = {
  __typename?: 'SnippetConnection';
  /** Array of edges. */
  edges: Array<SnippetEdge>;
  /** Paging information */
  pageInfo: PageInfo;
};

export type SnippetCountAggregate = {
  __typename?: 'SnippetCountAggregate';
  createdAt?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['Int']>;
};

export type SnippetDeleteResponse = {
  __typename?: 'SnippetDeleteResponse';
  /** Indicates if the script should bypass cookie integrations. Only relevant for JS snippets. */
  bypassCookieIntegration?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['UUID']>;
  /** Whether the script should be loaded prioritized even if that has performance impacts. Only relevant for JS snippets. */
  isPrioritized?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  status?: Maybe<SnippetStatus>;
  type?: Maybe<SnippetType>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  url?: Maybe<Scalars['String']>;
};

export type SnippetEdge = {
  __typename?: 'SnippetEdge';
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor'];
  /** The node containing the Snippet */
  node: Snippet;
};

export type SnippetFilter = {
  and?: InputMaybe<Array<SnippetFilter>>;
  createdAt?: InputMaybe<DateFieldComparison>;
  or?: InputMaybe<Array<SnippetFilter>>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type SnippetMaxAggregate = {
  __typename?: 'SnippetMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type SnippetMinAggregate = {
  __typename?: 'SnippetMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type SnippetSort = {
  direction: SortDirection;
  field: SnippetSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum SnippetSortFields {
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt'
}

/** Snippet status. */
export enum SnippetStatus {
  Archived = 'ARCHIVED',
  Draft = 'DRAFT',
  Published = 'PUBLISHED'
}

/** Snippet type. */
export enum SnippetType {
  Css = 'CSS',
  Html = 'HTML',
  Js = 'JS'
}

export type SocialGalleryBlock = {
  __typename?: 'SocialGalleryBlock';
  backgroundColor?: Maybe<Scalars['String']>;
  buttonType: ButtonType;
  containerWidth: ContainerWidth;
  dividerColor?: Maybe<Scalars['String']>;
  hasDivider: Scalars['Boolean'];
  headerAlignment: TextAlignment;
  headerPretitleColor?: Maybe<Scalars['String']>;
  headerSize: FontSize;
  headerSubtitleColor?: Maybe<Scalars['String']>;
  headerTitleColor?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  imageBorderRadius?: Maybe<BorderRadius>;
  imageShadow?: Maybe<BoxShadow>;
  name: Scalars['String'];
  overlay?: Maybe<OverlayField>;
  padding: PaddingSize;
  textColor?: Maybe<Scalars['String']>;
  theme: BlockTheme;
};

export type SocialProofBlock = {
  __typename?: 'SocialProofBlock';
  backgroundColor?: Maybe<Scalars['String']>;
  containerWidth: ContainerWidth;
  contentAlignment: TextAlignment;
  dividerColor?: Maybe<Scalars['String']>;
  hasDivider: Scalars['Boolean'];
  headerAlignment: TextAlignment;
  headerPretitleColor?: Maybe<Scalars['String']>;
  headerSize: FontSize;
  headerSubtitleColor?: Maybe<Scalars['String']>;
  headerTitleColor?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  mobileScrollDirection: ScrollDirection;
  name: Scalars['String'];
  theme: BlockTheme;
};

/** Sort Directions */
export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

/** Sort Nulls Options */
export enum SortNulls {
  NullsFirst = 'NULLS_FIRST',
  NullsLast = 'NULLS_LAST'
}

export type StampedMetadata = {
  __typename?: 'StampedMetadata';
  privateToken?: Maybe<Scalars['String']>;
  publicToken?: Maybe<Scalars['String']>;
  storeHash?: Maybe<Scalars['String']>;
};

export type StatisticsBlock = {
  __typename?: 'StatisticsBlock';
  backgroundColor?: Maybe<Scalars['String']>;
  containerWidth: ContainerWidth;
  contentAlignment: TextAlignment;
  dividerColor?: Maybe<Scalars['String']>;
  hasDivider: Scalars['Boolean'];
  headerAlignment: TextAlignment;
  headerPretitleColor?: Maybe<Scalars['String']>;
  headerSize: FontSize;
  headerSubtitleColor?: Maybe<Scalars['String']>;
  headerTitleColor?: Maybe<Scalars['String']>;
  highlightedTextColor?: Maybe<Scalars['String']>;
  highlightedTextSize: FontSize;
  id: Scalars['UUID'];
  name: Scalars['String'];
  subtitleColor?: Maybe<Scalars['String']>;
  subtitleSize: FontSize;
  theme: BlockTheme;
  titleColor?: Maybe<Scalars['String']>;
  titleSize: FontSize;
};

export type Store = {
  __typename?: 'Store';
  contactEmail?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  /** Connected domains. */
  domains: Array<Domain>;
  /** Preview storefront. */
  draftStorefront?: Maybe<Storefront>;
  estimatedVatPercentage?: Maybe<Scalars['Float']>;
  hasUnpublishedStorefrontChanges: Scalars['Boolean'];
  id: Scalars['UUID'];
  name: Scalars['String'];
  /** Represents the name of the option for colors in Shopify. */
  productColorOptionName?: Maybe<Scalars['String']>;
  productColorOptionNameTranslations: Array<LocalizedValue>;
  /** Represents the name of the option used for the multi product variants. */
  productGroupOptionName?: Maybe<Scalars['String']>;
  productGroupOptionNameTranslations: Array<LocalizedValue>;
  redirectTrafficToPrimaryDomain: Scalars['Boolean'];
  slug: Scalars['String'];
  /** Published storefront. */
  storefront?: Maybe<Storefront>;
  /** Last 50 archived storefronts. */
  storefrontHistory: Array<Storefront>;
  updatedAt: Scalars['DateTime'];
};

export type StoreAggregateGroupBy = {
  __typename?: 'StoreAggregateGroupBy';
  createdAt?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type StoreConnection = {
  __typename?: 'StoreConnection';
  /** Array of edges. */
  edges: Array<StoreEdge>;
  /** Paging information */
  pageInfo: PageInfo;
};

export type StoreCountAggregate = {
  __typename?: 'StoreCountAggregate';
  createdAt?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['Int']>;
  slug?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['Int']>;
};

export type StoreDeleteResponse = {
  __typename?: 'StoreDeleteResponse';
  contactEmail?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  estimatedVatPercentage?: Maybe<Scalars['Float']>;
  hasUnpublishedStorefrontChanges?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['UUID']>;
  name?: Maybe<Scalars['String']>;
  /** Represents the name of the option for colors in Shopify. */
  productColorOptionName?: Maybe<Scalars['String']>;
  productColorOptionNameTranslations?: Maybe<Array<LocalizedValue>>;
  /** Represents the name of the option used for the multi product variants. */
  productGroupOptionName?: Maybe<Scalars['String']>;
  productGroupOptionNameTranslations?: Maybe<Array<LocalizedValue>>;
  redirectTrafficToPrimaryDomain?: Maybe<Scalars['Boolean']>;
  slug?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type StoreEdge = {
  __typename?: 'StoreEdge';
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor'];
  /** The node containing the Store */
  node: Store;
};

export type StoreFilter = {
  and?: InputMaybe<Array<StoreFilter>>;
  createdAt?: InputMaybe<DateFieldComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<StoreFilter>>;
  slug?: InputMaybe<StringFieldComparison>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type StoreLocatorBlock = {
  __typename?: 'StoreLocatorBlock';
  backgroundColor?: Maybe<Scalars['String']>;
  containerWidth: ContainerWidth;
  dividerColor?: Maybe<Scalars['String']>;
  hasDivider: Scalars['Boolean'];
  headerAlignment: TextAlignment;
  headerPreTitleBackgroundColor?: Maybe<Scalars['String']>;
  headerPretitleColor?: Maybe<Scalars['String']>;
  headerSize: FontSize;
  headerSubtitleColor?: Maybe<Scalars['String']>;
  headerTitleColor?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  imageBorderRadius?: Maybe<BorderRadius>;
  imageBoxShadow?: Maybe<BoxShadow>;
  locationNameColor?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  paragraphColor?: Maybe<Scalars['String']>;
  theme: BlockTheme;
};

export type StoreMaxAggregate = {
  __typename?: 'StoreMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type StoreMinAggregate = {
  __typename?: 'StoreMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type StoreSort = {
  direction: SortDirection;
  field: StoreSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum StoreSortFields {
  CreatedAt = 'createdAt',
  Name = 'name',
  Slug = 'slug',
  UpdatedAt = 'updatedAt'
}

export type Storefront = {
  __typename?: 'Storefront';
  config: StorefrontConfig;
  createdAt: Scalars['DateTime'];
  id: Scalars['UUID'];
  status: StorefrontStatus;
  updatedAt: Scalars['DateTime'];
};

export type StorefrontBlock = BlockquoteBlock | BlogCardsColumnsBlock | BlogCardsDefaultBlock | BlogHeaderBlock | BlogSliderBlock | CardBlock | CategoryBlock | CategorySliderBlock | CodeEmbedBlock | ContactDetailsBlock | ContactFormBlock | ContactFormImageBlock | CustomBlock | EmailBannerBlock | EmailBannerImageBlock | FaqBlock | HeaderBlock | HeroBlock | HeroSliderBlock | HeroVideoBlock | ImageDualBlock | ImageSingleBlock | ImageTripleBlock | ListBlock | MultiColumnRichTextBlock | ProductSliderBlock | QuoteBlock | RichTextBlock | SocialGalleryBlock | SocialProofBlock | StatisticsBlock | StoreLocatorBlock | StoremapperBlock | TableBlock | TextImageBlock | UspsBlock | VideoBlock;

export type StorefrontComponents = {
  __typename?: 'StorefrontComponents';
  button: ButtonComponent;
  cookieBanner: CookieBannerComponent;
  emailPopup: EmailPopupComponent;
  footer: FooterComponent;
  geolocationBanner: GeolocationBannerComponent;
  input: InputComponent;
  navigation: NavigationComponent;
  paymentIcons: PaymentIconsComponent;
  productBadge: ProductBadgeComponent;
  productCard: ProductCardComponent;
  topBanner: TopBannerComponent;
  wishlist: WishlistComponent;
};

export type StorefrontComponentsInput = {
  button?: InputMaybe<ButtonComponentInput>;
  cookieBanner?: InputMaybe<CookieBannerComponentInput>;
  emailPopup?: InputMaybe<EmailPopupComponentInput>;
  footer?: InputMaybe<FooterComponentInput>;
  geolocationBanner?: InputMaybe<GeolocationBannerComponentInput>;
  input?: InputMaybe<InputComponentInput>;
  navigation?: InputMaybe<NavigationComponentInput>;
  paymentIcons?: InputMaybe<PaymentIconsInput>;
  productBadge?: InputMaybe<ProductBadgeComponentInput>;
  productCard?: InputMaybe<ProductCardComponentInput>;
  topBanner?: InputMaybe<TopBannerComponentInput>;
  wishlist?: InputMaybe<WishlistComponentInput>;
};

export type StorefrontConfig = {
  __typename?: 'StorefrontConfig';
  blocks: Array<StorefrontBlock>;
  components: StorefrontComponents;
  pages: StorefrontPages;
  theme: StorefrontTheme;
};

export type StorefrontPages = {
  __typename?: 'StorefrontPages';
  blogDetail: BlogDetailPage;
  cart: CartPage;
  productDetail: ProductDetailPage;
  productListing: ProductListingPage;
  wishlist: WishlistPage;
};

export type StorefrontPagesInput = {
  blogDetail?: InputMaybe<BlogDetailPageInput>;
  cart?: InputMaybe<CartPageInput>;
  productDetail?: InputMaybe<ProductDetailPageInput>;
  productListing?: InputMaybe<ProductListingPageInput>;
  wishlist?: InputMaybe<WishlistPageInput>;
};

/** Storefront status. */
export enum StorefrontStatus {
  Archived = 'ARCHIVED',
  Draft = 'DRAFT',
  Published = 'PUBLISHED'
}

export type StorefrontTheme = {
  __typename?: 'StorefrontTheme';
  colors: ThemeColors;
  favicon?: Maybe<Scalars['String']>;
  logo: ThemeLogo;
  typography: ThemeTypography;
};

export type StorefrontThemeInput = {
  colors?: InputMaybe<ThemeColorsInput>;
  favicon?: InputMaybe<Scalars['Upload']>;
  logo?: InputMaybe<ThemeLogoInput>;
  typography?: InputMaybe<ThemeTypographyInput>;
};

export type StoremapperBlock = {
  __typename?: 'StoremapperBlock';
  backgroundColor?: Maybe<Scalars['String']>;
  containerWidth: ContainerWidth;
  dividerColor?: Maybe<Scalars['String']>;
  hasDivider: Scalars['Boolean'];
  headerAlignment: TextAlignment;
  headerPretitleColor?: Maybe<Scalars['String']>;
  headerSize: FontSize;
  headerSubtitleColor?: Maybe<Scalars['String']>;
  headerTitleColor?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  name: Scalars['String'];
  theme: BlockTheme;
};

export type StoremapperMetadata = {
  __typename?: 'StoremapperMetadata';
  storemapperId?: Maybe<Scalars['String']>;
};

export type StoremapperPublicMetadata = {
  __typename?: 'StoremapperPublicMetadata';
  storemapperId?: Maybe<Scalars['String']>;
};

export type StoryContentInput = {
  component: StoryblokContentType;
};

/** Storyblok content type. */
export enum StoryblokContentType {
  Collection = 'COLLECTION',
  Product = 'PRODUCT'
}

export type StoryblokMetadata = {
  __typename?: 'StoryblokMetadata';
  oauthToken?: Maybe<Scalars['String']>;
  previewKey?: Maybe<Scalars['String']>;
  publicKey?: Maybe<Scalars['String']>;
  spaceId?: Maybe<Scalars['Float']>;
};

export type StoryblokPublicMetadata = {
  __typename?: 'StoryblokPublicMetadata';
  publicKey?: Maybe<Scalars['String']>;
};

export type StoryblokStory = {
  __typename?: 'StoryblokStory';
  /** Story id */
  id: Scalars['String'];
};

export type StoryblokStoryInput = {
  content: StoryContentInput;
  name: Scalars['String'];
  slug: Scalars['String'];
};

export type StringFieldComparison = {
  eq?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  iLike?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  is?: InputMaybe<Scalars['Boolean']>;
  isNot?: InputMaybe<Scalars['Boolean']>;
  like?: InputMaybe<Scalars['String']>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  neq?: InputMaybe<Scalars['String']>;
  notILike?: InputMaybe<Scalars['String']>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  notLike?: InputMaybe<Scalars['String']>;
};

export type SubscribeBackInStockInput = {
  email: Scalars['String'];
  isMarketingOptIn?: InputMaybe<Scalars['Boolean']>;
  productVariantId: Scalars['Float'];
};

export type SubscribeNewsletterInput = {
  email: Scalars['String'];
  type: IntegrationType;
};

export type SubscriptionDetails = {
  __typename?: 'SubscriptionDetails';
  pricing?: Maybe<PricingDetails>;
  storefrontAmount?: Maybe<Scalars['Float']>;
};

export type TableBlock = {
  __typename?: 'TableBlock';
  backgroundColor?: Maybe<Scalars['String']>;
  dividerColor?: Maybe<Scalars['String']>;
  hasDivider: Scalars['Boolean'];
  headerAlignment: TextAlignment;
  headerPretitleColor?: Maybe<Scalars['String']>;
  headerSize: FontSize;
  headerSubtitleColor?: Maybe<Scalars['String']>;
  headerTitleColor?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  isStriped: Scalars['Boolean'];
  name: Scalars['String'];
  tableBackgroundColor?: Maybe<Scalars['String']>;
  tableBorderColor?: Maybe<Scalars['String']>;
  tableBorderRadius?: Maybe<BorderRadius>;
  tableBoxShadow?: Maybe<BoxShadow>;
  tableHeadBackgroundColor?: Maybe<Scalars['String']>;
  tableHeadTextColor?: Maybe<Scalars['String']>;
  tableStripeBackgroundColor?: Maybe<Scalars['String']>;
  tableStripeTextColor?: Maybe<Scalars['String']>;
  tableSubtitleColor?: Maybe<Scalars['String']>;
  tableTextColor?: Maybe<Scalars['String']>;
  tableTitleColor?: Maybe<Scalars['String']>;
  theme: BlockTheme;
};

/** Text alignment. */
export enum TextAlignment {
  Center = 'CENTER',
  Left = 'LEFT'
}

/** Text color type. */
export enum TextColorType {
  Dark = 'DARK',
  Light = 'LIGHT'
}

export type TextField = {
  __typename?: 'TextField';
  /** font name must either be an asset ID or a Google Font. */
  font: Scalars['String'];
  transform: TextTransform;
};

export type TextFieldInput = {
  /** font name must either be an asset ID or a Google Font. */
  font?: InputMaybe<Scalars['String']>;
  transform?: InputMaybe<TextTransform>;
};

export type TextImageBlock = {
  __typename?: 'TextImageBlock';
  backgroundColor?: Maybe<Scalars['String']>;
  buttonType: ButtonType;
  containerWidth: ContainerWidth;
  contentAlignment: TextAlignment;
  headingColor?: Maybe<Scalars['String']>;
  headingSize: FontSize;
  id: Scalars['UUID'];
  imageBorderRadius?: Maybe<BorderRadius>;
  imageShadow?: Maybe<BoxShadow>;
  layout: TextImageLayout;
  name: Scalars['String'];
  textColor?: Maybe<Scalars['String']>;
  textSize: FontSize;
  theme: BlockTheme;
};

/** Text image layout. */
export enum TextImageLayout {
  ImageLeft = 'IMAGE_LEFT',
  ImageRight = 'IMAGE_RIGHT'
}

/** Text transform. */
export enum TextTransform {
  Lowercase = 'LOWERCASE',
  None = 'NONE',
  Uppercase = 'UPPERCASE'
}

export type ThemeColors = {
  __typename?: 'ThemeColors';
  grayscale: ColorShadesField;
  primary: ColorShadesField;
  /** Text color type when the primary color is used as background. */
  text: TextColorType;
};

export type ThemeColorsInput = {
  grayscale?: InputMaybe<ColorShadesFieldInput>;
  primary?: InputMaybe<ColorShadesFieldInput>;
  /** Text color type when the primary color is used as background. */
  text?: InputMaybe<TextColorType>;
};

export type ThemeLogo = {
  __typename?: 'ThemeLogo';
  color?: Maybe<File>;
  dark?: Maybe<File>;
  light?: Maybe<File>;
};

export type ThemeLogoInput = {
  color?: InputMaybe<FileInput>;
  dark?: InputMaybe<FileInput>;
  light?: InputMaybe<FileInput>;
};

export type ThemeTypography = {
  __typename?: 'ThemeTypography';
  display: TextField;
  heading: TextField;
  paragraph: TextField;
};

export type ThemeTypographyInput = {
  display?: InputMaybe<TextFieldInput>;
  heading?: InputMaybe<TextFieldInput>;
  paragraph?: InputMaybe<TextFieldInput>;
};

/** Top banner alignment. */
export enum TopBannerAlignment {
  Center = 'CENTER',
  SpaceBetween = 'SPACE_BETWEEN'
}

export type TopBannerComponent = {
  __typename?: 'TopBannerComponent';
  alignment: TopBannerAlignment;
  backgroundColor?: Maybe<Scalars['String']>;
  isDismissable: Scalars['Boolean'];
  theme: BlockTheme;
};

export type TopBannerComponentInput = {
  alignment?: InputMaybe<TopBannerAlignment>;
  backgroundColor?: InputMaybe<Scalars['String']>;
  isDismissable?: InputMaybe<Scalars['Boolean']>;
  theme?: InputMaybe<BlockTheme>;
};

export type TrustpilotMetadata = {
  __typename?: 'TrustpilotMetadata';
  apiKey?: Maybe<Scalars['String']>;
  businessUnitId?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  productIdentifier?: Maybe<ReviewProductIdentifier>;
  useImportedReviews?: Maybe<Scalars['Boolean']>;
};

export type UpcomingInvoiceDetails = {
  __typename?: 'UpcomingInvoiceDetails';
  /** The UNIX timestamp of the invoice's period ending date. */
  periodEnd: Scalars['Float'];
  /** The UNIX timestamp of the invoice's period starting date. */
  periodStart: Scalars['Float'];
  /** The total amount without taxes in Euro cents. */
  subtotal: Scalars['Float'];
  /** The UNIX timestamp of the next time the customer will be charged. */
  timestamp?: Maybe<Scalars['Float']>;
  /** The total amount with taxes in Euro cents. */
  total: Scalars['Float'];
};

export type UpdateAuth0MemberRolesInput = {
  /** The Auth0 role ids to add. */
  rolesToAdd?: InputMaybe<Array<Scalars['String']>>;
  /** The Auth0 role ids to remove. */
  rolesToRemove?: InputMaybe<Array<Scalars['String']>>;
  /** The Auth0 user id. */
  userId: Scalars['String'];
};

export type UpdateAuth0ProfileInput = {
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
};

export type UpdateBlockInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type UpdateIntegrationInput = {
  isActive: Scalars['Boolean'];
};

export type UpdateIntegrationMetadataInput = {
  id: Scalars['UUID'];
  metadata: Scalars['Object'];
};

export type UpdateLanguageInput = {
  locale?: InputMaybe<Scalars['String']>;
  localizedName?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<LanguageStatus>;
};

export type UpdateManyIntegrationsInput = {
  /** Filter used to find fields to update */
  filter: IntegrationUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateIntegrationInput;
};

export type UpdateManyResponse = {
  __typename?: 'UpdateManyResponse';
  /** The number of records updated. */
  updatedCount: Scalars['Int'];
};

export type UpdateOneBlockInput = {
  /** The id of the record to update */
  id: Scalars['ID'];
  /** The update to apply. */
  update: UpdateBlockInput;
};

export type UpdateOneGeolocationRedirectInput = {
  /** The id of the record to update */
  id: Scalars['ID'];
  /** The update to apply. */
  update: GeolocationRedirectInput;
};

export type UpdateOneIntegrationInput = {
  /** The id of the record to update */
  id: Scalars['ID'];
  /** The update to apply. */
  update: UpdateIntegrationInput;
};

export type UpdateOneLanguageInput = {
  /** The id of the record to update */
  id: Scalars['ID'];
  /** The update to apply. */
  update: UpdateLanguageInput;
};

export type UpdateOneOrganizationInput = {
  /** The id of the record to update */
  id: Scalars['ID'];
  /** The update to apply. */
  update: UpdateOrganizationInput;
};

export type UpdateOneProductColorInput = {
  /** The id of the record to update */
  id: Scalars['ID'];
  /** The update to apply. */
  update: UpdateProductColorInput;
};

export type UpdateOneProductFormInput = {
  /** The id of the record to update */
  id: Scalars['ID'];
  /** The update to apply. */
  update: UpdateProductFormInput;
};

export type UpdateOneRedirectInput = {
  /** The id of the record to update */
  id: Scalars['ID'];
  /** The update to apply. */
  update: UpdateRedirectInput;
};

export type UpdateOneSnippetInput = {
  /** The id of the record to update */
  id: Scalars['ID'];
  /** The update to apply. */
  update: UpdateSnippetInput;
};

export type UpdateOneStoreInput = {
  /** The id of the record to update */
  id: Scalars['ID'];
  /** The update to apply. */
  update: UpdateStoreInput;
};

export type UpdateOrganizationInput = {
  maxStores?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
  slug: Scalars['String'];
};

export type UpdatePaymentPayload = {
  __typename?: 'UpdatePaymentPayload';
  url: Scalars['String'];
};

export type UpdateProductColorInput = {
  firstColor: Scalars['String'];
  gradient?: InputMaybe<ProductColorGradient>;
  secondColor?: InputMaybe<Scalars['String']>;
  translations: Array<LocalizedValueInput>;
  type: ProductColorType;
};

export type UpdateProductFormInput = {
  description?: InputMaybe<Scalars['String']>;
  fields?: InputMaybe<Array<ProductFormFieldInput>>;
  label?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  products?: InputMaybe<Array<ProductFormProductInput>>;
};

export type UpdateRedirectInput = {
  from?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<RedirectType>;
};

export type UpdateSnippetInput = {
  bypassCookieIntegration?: InputMaybe<Scalars['Boolean']>;
  code?: InputMaybe<Scalars['String']>;
  isPrioritized?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<SnippetStatus>;
};

export type UpdateStoreInput = {
  contactEmail?: InputMaybe<Scalars['String']>;
  estimatedVatPercentage?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  productColorOptionName?: InputMaybe<Scalars['String']>;
  productColorOptionNameTranslations?: InputMaybe<Array<LocalizedValueInput>>;
  productGroupOptionName?: InputMaybe<Scalars['String']>;
  productGroupOptionNameTranslations?: InputMaybe<Array<LocalizedValueInput>>;
  redirectTrafficToPrimaryDomain?: InputMaybe<Scalars['Boolean']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type UpdateStorefrontConfigInput = {
  blocks?: InputMaybe<Array<Scalars['Object']>>;
  components?: InputMaybe<StorefrontComponentsInput>;
  pages?: InputMaybe<StorefrontPagesInput>;
  theme?: InputMaybe<StorefrontThemeInput>;
};

export type UpdateSubscriptionInput = {
  storefrontAmount: Scalars['Float'];
};

export type UpdateSubscriptionPayload = {
  __typename?: 'UpdateSubscriptionPayload';
  id: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  isEmailVerified?: Maybe<Scalars['Boolean']>;
  lastLogin?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  organizations: Array<UserOrganization>;
  /** The roles the user has within the current organization. Returns `null` if there is no current organization. */
  roles?: Maybe<Array<Role>>;
  username?: Maybe<Scalars['String']>;
};

export type UserOrganization = {
  __typename?: 'UserOrganization';
  id: Scalars['UUID'];
  name: Scalars['String'];
  roles: Array<Role>;
  slug: Scalars['String'];
};

export type UspsBlock = {
  __typename?: 'UspsBlock';
  backgroundColor?: Maybe<Scalars['String']>;
  containerWidth: ContainerWidth;
  contentAlignment: TextAlignment;
  dividerColor?: Maybe<Scalars['String']>;
  hasDivider: Scalars['Boolean'];
  headerAlignment: TextAlignment;
  headerPretitleColor?: Maybe<Scalars['String']>;
  headerSize: FontSize;
  headerSubtitleColor?: Maybe<Scalars['String']>;
  headerTitleColor?: Maybe<Scalars['String']>;
  iconColor?: Maybe<Scalars['String']>;
  iconSize: FontSize;
  id: Scalars['UUID'];
  name: Scalars['String'];
  textColor?: Maybe<Scalars['String']>;
  textSize: FontSize;
  theme: BlockTheme;
  titleColor?: Maybe<Scalars['String']>;
  titleSize: FontSize;
};

export type ValidationMessage = {
  __typename?: 'ValidationMessage';
  code: Scalars['String'];
  message: Scalars['String'];
  prop?: Maybe<Scalars['String']>;
};

export type VatId = {
  __typename?: 'VatId';
  type: VatIdType;
  value: Scalars['String'];
};

/** Represents the type of the VAT Id according to Stripe. */
export enum VatIdType {
  AeTrn = 'ae_trn',
  AuAbn = 'au_abn',
  AuArn = 'au_arn',
  BrCnpj = 'br_cnpj',
  BrCpf = 'br_cpf',
  CaBn = 'ca_bn',
  CaGstHst = 'ca_gst_hst',
  CaPstBc = 'ca_pst_bc',
  CaPstMb = 'ca_pst_mb',
  CaPstSk = 'ca_pst_sk',
  CaQst = 'ca_qst',
  ChVat = 'ch_vat',
  ClTin = 'cl_tin',
  EsCif = 'es_cif',
  EuVat = 'eu_vat',
  GbVat = 'gb_vat',
  GeVat = 'ge_vat',
  HkBr = 'hk_br',
  IdNpwp = 'id_npwp',
  IlVat = 'il_vat',
  InGst = 'in_gst',
  JpCn = 'jp_cn',
  JpRn = 'jp_rn',
  KrBrn = 'kr_brn',
  LiUid = 'li_uid',
  MxRfc = 'mx_rfc',
  MyFrp = 'my_frp',
  MyItn = 'my_itn',
  MySst = 'my_sst',
  NoVat = 'no_vat',
  NzGst = 'nz_gst',
  RuInn = 'ru_inn',
  RuKpp = 'ru_kpp',
  SaVat = 'sa_vat',
  SgGst = 'sg_gst',
  SgUen = 'sg_uen',
  ThVat = 'th_vat',
  TwVat = 'tw_vat',
  UaVat = 'ua_vat',
  UsEin = 'us_ein',
  ZaVat = 'za_vat'
}

export type VatIdTypeInput = {
  type: VatIdType;
  value: Scalars['String'];
};

export type VerifyOneDomainInput = {
  id: Scalars['UUID'];
};

export type VideoBlock = {
  __typename?: 'VideoBlock';
  backgroundColor?: Maybe<Scalars['String']>;
  containerWidth: ContainerWidth;
  dividerColor?: Maybe<Scalars['String']>;
  hasDivider: Scalars['Boolean'];
  headerAlignment: TextAlignment;
  headerPretitleColor?: Maybe<Scalars['String']>;
  headerSize: FontSize;
  headerSubtitleColor?: Maybe<Scalars['String']>;
  headerTitleColor?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  name: Scalars['String'];
  theme: BlockTheme;
  videoBorderRadius?: Maybe<BorderRadius>;
  videoShadow?: Maybe<BoxShadow>;
};

export type VoteReviewInput = {
  reviewId: Scalars['String'];
  voteType: VoteReviewType;
};

/** Review vote type. */
export enum VoteReviewType {
  Down = 'DOWN',
  Up = 'UP'
}

export type Wishlist = {
  __typename?: 'Wishlist';
  /** Wish list id. Relevant for Appmate integration. */
  id?: Maybe<Scalars['String']>;
  products: Array<WishlistProduct>;
  userId: Scalars['String'];
};

/** Wishlist button background style. */
export enum WishlistButtonBackgroundStyle {
  Default = 'DEFAULT',
  None = 'NONE',
  Transparant = 'TRANSPARANT'
}

/** Wishlist button layout. */
export enum WishlistButtonLayout {
  ButtonAlignBottom = 'BUTTON_ALIGN_BOTTOM',
  ButtonAlignRight = 'BUTTON_ALIGN_RIGHT',
  ButtonAlignStretch = 'BUTTON_ALIGN_STRETCH',
  ButtonAlignTitle = 'BUTTON_ALIGN_TITLE'
}

export type WishlistComponent = {
  __typename?: 'WishlistComponent';
  activeColor?: Maybe<Scalars['String']>;
  backgroundBorder: Scalars['Boolean'];
  backgroundStyle: WishlistButtonBackgroundStyle;
  borderRadius: BorderRadius;
  defaultOutlineColor?: Maybe<Scalars['String']>;
  textTransform: TextTransform;
};

export type WishlistComponentInput = {
  activeColor?: InputMaybe<Scalars['String']>;
  backgroundBorder?: InputMaybe<Scalars['Boolean']>;
  backgroundStyle?: InputMaybe<WishlistButtonBackgroundStyle>;
  borderRadius?: InputMaybe<BorderRadius>;
  defaultOutlineColor?: InputMaybe<Scalars['String']>;
  textTransform?: InputMaybe<TextTransform>;
};

export type WishlistPage = {
  __typename?: 'WishlistPage';
  /** Select the heading style that will be shown on the wishlist page */
  headerAlignment: TextAlignment;
  /** Select your heading size */
  headerSize: FontSize;
};

export type WishlistPageInput = {
  /** Select the heading style that will be shown on the wishlist page */
  headerAlignment?: InputMaybe<TextAlignment>;
  /** Select your heading size */
  headerSize?: InputMaybe<FontSize>;
};

export type WishlistProduct = {
  __typename?: 'WishlistProduct';
  /** Wish list item id. Relevant for Appmate integration. */
  id?: Maybe<Scalars['String']>;
  productId: Scalars['String'];
  variantId?: Maybe<Scalars['String']>;
};

export type WriteReviewInput = {
  /** Review content. */
  content: Scalars['String'];
  /** Reviewer e-mail address. */
  email: Scalars['String'];
  /** Reviewer name. */
  name: Scalars['String'];
  productId: Scalars['String'];
  productTitle?: InputMaybe<Scalars['String']>;
  productUrl?: InputMaybe<Scalars['String']>;
  /** Stars given by the reviewer. */
  stars: Scalars['Float'];
  /** Review title. */
  title?: InputMaybe<Scalars['String']>;
  type: IntegrationType;
};

export type YotpoMetadata = {
  __typename?: 'YotpoMetadata';
  appKey?: Maybe<Scalars['String']>;
};

export type BlockFragmentFragment = { __typename?: 'Block', id: any, name: string, version?: { __typename?: 'BlockVersion', tag: number } | null };

export type CreateOneBlockMutationVariables = Exact<{
  input: CreateOneBlockInput;
}>;


export type CreateOneBlockMutation = { __typename?: 'Mutation', createOneBlock: { __typename?: 'Block', id: any, name: string, version?: { __typename?: 'BlockVersion', tag: number } | null } };

export type PublishBlockVersionMutationVariables = Exact<{
  input: PublishBlockVersionInput;
}>;


export type PublishBlockVersionMutation = { __typename?: 'Mutation', publishBlockVersion: { __typename?: 'Block', id: any, name: string, version?: { __typename?: 'BlockVersion', tag: number } | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', firstName?: string | null, lastName?: string | null, email?: string | null, organizations: Array<{ __typename?: 'UserOrganization', slug: string, name: string }> } };

export type StoresQueryVariables = Exact<{ [key: string]: never; }>;


export type StoresQuery = { __typename?: 'Query', stores: { __typename?: 'StoreConnection', edges: Array<{ __typename?: 'StoreEdge', node: { __typename?: 'Store', id: any, name: string, slug: string, domains: Array<{ __typename?: 'Domain', isPrimary: boolean, hostname: string }> } }> } };

export type UserWithOrgsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserWithOrgsQuery = { __typename?: 'Query', me: { __typename?: 'User', organizations: Array<{ __typename?: 'UserOrganization', id: any, name: string, slug: string }> } };
