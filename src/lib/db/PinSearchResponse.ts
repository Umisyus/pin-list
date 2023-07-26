export type PinSearchResponse = {
    resource_response?: ResourceResponse;
    clientContext?: ClientContext;
    resource?: Resource;
    requestIdentifier?: string;
}

export type ClientContext = {
    activeExperiments?: ActiveExperiments;
    analysisUa?: AnalysisUa;
    appTypeDetailed?: number;
    appVersion?: string;
    batchExp?: boolean;
    browserLocale?: string;
    browserName?: string;
    browserType?: number;
    browserVersion?: string;
    country?: string;
    countryFromHostname?: string;
    countryFromIP?: string;
    cspNonce?: string;
    currentURL?: string;
    debug?: boolean;
    deepLink?: string;
    enabledAdvertiserCountries?: string[];
    experimentHash?: string;
    facebookToken?: null;
    fullPath?: string;
    httpReferrer?: string;
    impersonatorUserID?: null;
    inviteCode?: string;
    inviteSenderID?: string;
    isAuthenticated?: boolean;
    isBot?: string;
    isInternalIP?: boolean;
    isFullPage?: boolean;
    isManagedAdvertiser?: boolean;
    isMobileAgent?: boolean;
    isShopThePinCampaignWhitelisted?: boolean;
    isSterlingOnSteroids?: boolean;
    isTabletAgent?: boolean;
    language?: string;
    locale?: string;
    origin?: string;
    path?: string;
    placedExperiences?: null;
    referrer?: null;
    regionFromIP?: string;
    requestHost?: string;
    requestIdentifier?: string;
    socialBot?: string;
    stage?: string;
    sterlingOnSteroidsLDAP?: null;
    sterlingOnSteroidsUserType?: null;
    triggerableExperiments?: { [key: string]: string };
    unauthID?: string;
    seoDebug?: boolean;
    userAgentCanUseNativeApp?: boolean;
    userAgentPlatform?: string;
    userAgentPlatformVersion?: null;
    userAgent?: string;
    user?: User;
    utmCampaign?: null;
    visibleURL?: string;
}

export type ActiveExperiments = {
    webLeadGenAds?: string;
    webLeadAdsStdBeta?: string;
}

export type AnalysisUa = {
    appType?: number;
    browserName?: string;
    browserVersion?: string;
    deviceType?: null;
    device?: string;
    osName?: string;
    osVersion?: string;
}

export type User = {
    phoneCountry?: null;
    unverifiedPhoneCountry?: null;
    isWriteBanned?: boolean;
    canEnableMfa?: boolean;
    facebookTimelineEnabled?: boolean;
    verifiedDomains?: any[];
    lastName?: string;
    isAnyWebsiteVerified?: boolean;
    connectedToGoogle?: boolean;
    connectedToEtsy?: boolean;
    verifiedUserWebsites?: any[];
    hasPassword?: boolean;
    excludeFromSearch?: boolean;
    domainVerified?: boolean;
    loginState?: number;
    gplusURL?: null;
    profileDiscoveredPublic?: null;
    connectedToDropbox?: boolean;
    facebookPublishStreamEnabled?: boolean;
    verifiedIdentity?: NagClass;
    connectedToInstagram?: boolean;
    isPartner?: boolean;
    allowMarketingCookies?: null;
    domainURL?: null;
    gender?: string;
    shouldShowMessaging?: boolean;
    optInPrivateAccount?: boolean;
    thirdPartyMarketingTrackingEnabled?: boolean;
    customGender?: null;
    allowSwitchBetweenPrivateAndPublicProfile?: boolean;
    ipCountry?: string;
    hasMfaEnabled?: boolean;
    imageMediumURL?: string;
    isAdsOnlyProfile?: boolean;
    id?: string;
    parentalControlAnonymizedEmail?: null;
    ageInYears?: number;
    personalizeFromOffsiteBrowsing?: boolean;
    isCandidateForParentalControlPasscode?: boolean;
    country?: string;
    phoneNumberEnd?: string;
    connectedToMicrosoft?: boolean;
    isUnder16?: boolean;
    imageLargeURL?: string;
    isUnder18?: boolean;
    isParentalControlPasscodeEnabled?: boolean;
    firstName?: string;
    twitterURL?: null;
    connectedToFacebook?: boolean;
    phoneNumber?: null;
    allowAnalyticCookies?: null;
    isEmployee?: boolean;
    imageXlargeURL?: string;
    imageSmallURL?: string;
    websiteURL?: null;
    ipRegion?: string;
    fullName?: string;
    isMaturedNewUser?: boolean;
    unverifiedPhoneNumberWithoutCountry?: string;
    connectedToYoutube?: boolean;
    epik?: string;
    unverifiedPhoneNumber?: null;
    username?: string;
    nags?: any[];
    listedWebsiteURL?: null;
    isPrivateProfile?: boolean;
    adsOnlyProfileSite?: null;
    pushPackageUserID?: string;
    isHighRisk?: boolean;
    facebookID?: string;
    twitterPublishEnabled?: boolean;
    createdAt?: string;
    allowPersonalizationCookies?: null;
    type?: string;
    resurrectionInfo?: null;
    email?: string;
}

export type NagClass = {
}

export type Resource = {
    name?: string;
    options?: Options;
}

export type Options = {
    bookmarks?: string[];
    article?: null;
    appliedFilters?: null;
    appliedProductFilters?: string;
    autoCorrectionDisabled?: boolean;
    corpus?: null;
    customizedRerankType?: null;
    filters?: null;
    query?: string;
    queryPinSigs?: null;
    reduxNormalizeFeed?: boolean;
    rs?: string;
    scope?: string;
    sourceID?: null;
}

export type ResourceResponse = {
    status?: string;
    code?: number;
    message?: string;
    endpointName?: string;
    data?: Data;
    bookmark?: string;
    searchNag?: SearchNag;
    oneBarModules?: OneBarModule[];
    modeIcon?: null;
    queryL1VerticalIDS?: number[];
    metadata?: ResourceResponseMetadata;
    xPinterestSLIEndpointName?: string;
    httpStatus?: number;
}

export type Data = {
    nag?: NagClass;
    shouldAppendGlobalSearch?: boolean;
    results?: Result[];
    sensitivity?: NagClass;
    oneBarModules?: OneBarModule[];
    modeIcon?: null;
    queryL1VerticalIDS?: number[];
    noGiftWrap?: boolean;
}

export type OneBarModule = {
    action?: OneBarModuleAction;
    display?: Display;
    moduleType?: number;
    type?: OneBarModuleType;
    id?: string;
    animation?: number;
}

export type OneBarModuleAction = {
    searchQuery?: null | string;
    type?: ActionType;
    feedURL?: null | string;
    filterType?: number;
    id?: string;
    filters?: Filter[];
    title?: null | string;
}

export type Filter = {
    action?: FilterAction;
    disabled?: boolean;
    display?: Display;
    type?: FilterType;
    isSelected?: boolean;
    id?: string;
}

export type FilterAction = {
    searchQuery?: null;
    type?: ActionType;
    feedURL?: string;
    id?: string;
    title?: null;
}

export type ActionType = "onebarmoduleaction" | "contenttypefiltermoduleaction";

export type Display = {
    icon?: number;
    imageMediumURL?: null;
    selectedBackgroundColorHex?: BackgroundColorHex[];
    displayText?: null | string;
    textColorHex?: TextColorHex[];
    type?: DisplayType;
    backgroundColorHex?: BackgroundColorHex[];
    isSelected?: boolean;
    selectedTextColorHex?: TextColorHex[];
    id?: string;
    imageUrls?: any[];
    iconURL?: null;
}

export type BackgroundColorHex = "#efefef" | "#292929" | "#ffe2eb" | "#ffe4c1" | "#fffd92" | "#cfffca" | "#dafff6" | "#d7edff" | "#dad4ff";

export type TextColorHex = "#111111" | "#ffffff";

export type DisplayType = "onebarmoduledisplay";

export type FilterType = "filteroption";

export type OneBarModuleType = "contenttyperfiltermodule" | "onebarmodule";

export type Result = {
    adMatchReason?: number;
    isUploaded?: boolean;
    carouselData?: null;
    videos?: Videos | null;
    isEligibleForRelatedProducts?: boolean;
    promotedLeadForm?: null;
    hasRequiredAttributionProvider?: boolean;
    reactionCounts?: { [key: string]: number };
    type?: ResultType;
    didIts?: any[];
    description?: string;
    isPromoted?: boolean;
    link?: null | string;
    imageCrop?: ImageCrop;
    title?: string;
    promoter?: Pinner | null;
    isEligibleForPDP?: boolean;
    debugInfoHTML?: null;
    linkDomain?: LinkDomain | null;
    isStaleProduct?: boolean;
    storyPinData?: StoryPinData | null;
    attribution?: null;
    altText?: null;
    board?: Board;
    pinner?: Pinner;
    id?: string;
    aggregatedPinData?: AggregatedPinData;
    callToActionText?: null | string;
    shoppingFlags?: number[];
    richSummary?: RichSummary | null;
    trackingParams?: TrackingParams;
    sponsorship?: null;
    imageSignature?: string;
    access?: any[];
    promotedIsRemovable?: boolean;
    promotedIsLeadAd?: boolean;
    isDownstreamPromotion?: boolean;
    isEligibleForWebCloseup?: boolean;
    createdAt?: string;
    isPrefetchEnabled?: boolean;
    embed?: null;
    isEligibleForFilters?: boolean;
    storyPinDataID?: null | string;
    isOosProduct?: boolean;
    images?: { [key: string]: Image };
    dominantColor?: string;
    gridTitle?: string;
    domain?: string;
    adDestinationURL?: string;
    adTargetingAttribution?: AdTargetingAttribution;
}

export type AdTargetingAttribution = {
    geoRegion?: string;
    matchedLocale?: string;
    matchedDevice?: string;
    isExpandTargetingMatched?: boolean;
    matchedAgeBucket?: string;
    matchedInterest?: string;
    isActalikeMatched?: boolean;
}

export type AggregatedPinData = {
    hasXyTags?: boolean;
}

export type Board = {
    name?: string;
    url?: string;
}

export type ImageCrop = {
    minY?: number;
    maxY?: number;
}

export type Image = {
    width?: number;
    height?: number;
    url?: string;
}

export type LinkDomain = {
    officialUser?: OfficialUser | null;
}

export type OfficialUser = {
    followerCount?: number;
    imageMediumURL?: string;
    fullName?: string;
    imageLargeURL?: string;
    verifiedIdentity?: OfficialUserVerifiedIdentity;
    isVerifiedMerchant?: boolean;
    username?: string;
    id?: string;
    isAdsOnlyProfile?: boolean;
    adsOnlyProfileSite?: null;
    imageSmallURL?: string;
}

export type OfficialUserVerifiedIdentity = {
    verified?: boolean;
    name?: string;
}

export type Pinner = {
    followerCount?: number;
    imageMediumURL?: string;
    fullName?: string;
    imageLargeURL?: string;
    verifiedIdentity?: PinnerVerifiedIdentity;
    isVerifiedMerchant?: boolean;
    username?: string;
    id?: string;
    isAdsOnlyProfile?: boolean;
    adsOnlyProfileSite?: null;
    imageSmallURL?: string;
}

export type PinnerVerifiedIdentity = {
    verified?: boolean;
}

export type RichSummary = {
    appleTouchIconLink?: null | string;
    appleTouchIconImages?: AppleTouchIconImages | null;
    faviconLink?: string;
    id?: string;
    url?: string;
    actions?: any[];
    displayDescription?: string;
    type?: RichSummaryType;
    displayName?: string;
    siteName?: string;
    faviconImages?: FaviconImages;
    products?: Product[];
    typeName?: TypeName;
    aggregateRating?: AggregateRating;
}

export type AggregateRating = {
    name?: null;
    type?: string;
    ratingDistribution?: any[];
    id?: string;
}

export type AppleTouchIconImages = {
    orig?: string;
}

export type FaviconImages = {
    orig?: string;
    the50X?: string;
}

export type Product = {
    hasMultiImages?: boolean;
    additionalImages?: null;
    id?: string;
    videos?: any[];
    offers?: Offer[];
    shippingInfo?: NagClass;
    name?: string;
    type?: string;
    additionalImagesPerSpec?: null;
    offerSummary?: OfferSummary;
    variantSet?: null;
    purchaseURL?: null;
    labelInfo?: NagClass;
}

export type OfferSummary = {
    priceVal?: number;
    currency?: string;
    price?: string;
    inStock?: boolean;
    availability?: number;
    condition?: number;
    standardPrice?: string;
    percentageOff?: string;
}

export type Offer = {
    minAdPrice?: null;
    name?: null;
    priceValue?: number;
    priceCurrency?: string;
    condition?: number | null;
    type?: string;
    id?: string;
    inStock?: boolean;
    availability?: number;
}

export type RichSummaryType = "richpingriddata";

export type TypeName = "classifier data" | "product" | "article";

export type StoryPinData = {
    pagesPreview?: Page[];
    type?: string;
    pageCount?: number;
    hasProductPins?: boolean;
    totalVideoDuration?: number;
    hasAffiliateProducts?: boolean;
    id?: string;
    staticPageCount?: number;
    metadata?: StoryPinDataMetadata;
    pages?: Page[];
    lastEdited?: null;
}

export type StoryPinDataMetadata = {
    showreelData?: null;
    pinImageSignature?: string;
    basics?: null;
    version?: string;
    templateType?: null;
    rootPinID?: string;
    isCompatible?: boolean;
    compatibleVersion?: string;
    rootUserID?: string;
    pinTitle?: null | string;
    isEditable?: boolean;
    diyData?: null;
    recipeData?: null;
    isPromotable?: boolean;
    canvasAspectRatio?: number;
}

export type Page = {
    imageSignature?: string;
    blocks?: Block[];
    layout?: number;
    imageSignatureAdjusted?: null | string;
    type?: PageType;
    video?: null;
    musicAttributions?: any[];
    shouldMute?: boolean;
    id?: string;
    image?: null;
    videoSignature?: null | string;
    style?: Style;
    imageAdjusted?: null;
}

export type Block = {
    imageSignature?: string;
    blockStyle?: BlockStyle;
    blockType?: number;
    trackingID?: string;
    image?: null;
    type?: BlockType;
    text?: string;
    video?: null;
    videoData?: null;
    videoSignature?: string;
}

export type BlockStyle = {
    height?: number;
    xCoord?: number;
    rotation?: number;
    yCoord?: number;
    cornerRadius?: number;
    width?: number;
}

export type BlockType = "story_pin_image_block" | "story_pin_video_block";

export type Style = {
    backgroundColor?: string;
    mediaFit?: null;
}

export type PageType = "storypinpage";

export type TrackingParams = "CwABAAAAEDUxMzMyMDU5NTI5Mzk4MTgGAAMACAsABwAAAApuZ2FwaS9wcm9kAA";

export type ResultType = "pin";

export type Videos = {
    id?: string;
    videoList?: VideoList;
}

export type VideoList = {
    vHlsv4?: VHlsv;
    vHlsv3Web?: VHlsv;
    vHlsv3Mobile?: VHlsv;
}

export type VHlsv = {
    url?: string;
    width?: number;
    height?: number;
    duration?: number;
    thumbnail?: string;
}

export type ResourceResponseMetadata = {
    rankedGuides?: RankedGuide[];
    useSensitivityFromStl?: boolean;
    oneBarModules?: OneBarModule[];
    modeIcon?: null;
    queryL1VerticalIDS?: number[];
}

export type RankedGuide = {
    term?: string;
    display?: string;
    position?: number;
    dominantColor?: string;
    source?: number;
    guideType?: number;
    imageMediumURL?: string;
}

export type SearchNag = {
    nag?: NagClass;
    theme?: null;
}
