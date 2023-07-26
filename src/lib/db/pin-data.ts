export interface PinData {
    appVersion: string;
    initialHandlerId: string;
    isAuthenticated: boolean;
    isBot: boolean;
    isMobile: boolean;
    isStrictModeEnabled: boolean;
    isUnderpoweredDevapp: boolean;
    isViewerCache: boolean;
    props: Props;
    renderMode: string;
    site: string;
}

export interface Props {
    adsAPIDomain: string;
    context: Context;
    inContextTranslation: boolean;
    initialReduxState: InitialReduxState;
    isAppShell: boolean;
    locale: Locale;
}

export interface Context {
    active_experiments: ActiveExperiments;
    analysis_ua: AnalysisUa;
    app_type_detailed: number;
    app_version: string;
    batch_exp: boolean;
    browser_locale: Locale;
    browser_name: string;
    browser_type: number;
    browser_version: string;
    country: string;
    country_from_hostname: string;
    country_from_ip: string;
    csp_nonce: string;
    current_url: string;
    debug: boolean;
    deep_link: string;
    enabled_advertiser_countries: string[];
    experiment_hash: string;
    facebook_token: null;
    full_path: string;
    http_referrer: string;
    impersonator_user_id: null;
    invite_code: string;
    invite_sender_id: string;
    is_authenticated: boolean;
    is_bot: string;
    is_internal_ip: boolean;
    is_full_page: boolean;
    is_mobile_agent: boolean;
    is_sterling_on_steroids: boolean;
    is_tablet_agent: boolean;
    language: string;
    locale: Locale;
    origin: string;
    path: string;
    placed_experiences: null;
    referrer: null;
    region_from_ip: string;
    request_host: string;
    request_identifier: string;
    social_bot: string;
    stage: string;
    sterling_on_steroids_ldap: null;
    sterling_on_steroids_user_type: null;
    triggerable_experiments: { [key: string]: string };
    unauth_id: string;
    seo_debug: boolean;
    user_agent_can_use_native_app: boolean;
    user_agent_platform: string;
    user_agent_platform_version: null;
    user_agent: string;
    user: User;
    utm_campaign: null;
    visible_url: string;
}

export interface ActiveExperiments {
    web_disable_keyword_redirect: string;
    dweb_unauth_slp_content: string;
    web_unauth_video_cover_image_preload: string;
    web_mweb_unauth_music_compliance_muting_attribution: string;
    closeup_dweb_unauth_onepin_title_and_description: string;
    epik_localstorage_redesign_written_control: string;
}

export interface AnalysisUa {
    app_type: number;
    browser_name: string;
    browser_version: string;
    device_type: null;
    device: string;
    os_name: string;
    os_version: string;
}

export enum Locale {
    DaDK = "da-DK",
    EnUS = "en-US",
}

export interface User {
    unauth_id: string;
    ip_country: string;
    ip_region: string;
    id?: string;
}


export interface InitialReduxState {
    pins: { [key: string]: pindata };
}

export interface pindata {
    pinned_to_board: null;
    is_playable: boolean;
    should_open_in_stream: boolean;
    story_pin_data_id: null;
    share_count: number;
    board: Board;
    closeup_user_note: string;
    alt_text: null;
    repin_count: number;
    should_redirect_id_only_url_to_text_url: boolean;
    hashtags: any[];
    rich_metadata: null;
    attribution: null;
    is_native: boolean;
    is_stale_product: boolean;
    is_eligible_for_pdp: boolean;
    videos: Videos;
    creator_class: null;
    should_mute: null;
    grid_title: string;
    click_through_link_quality: null;
    tracked_link: null;
    closeup_description: null;
    access: any[];
    tracking_params: string;
    pinner: CloseupAttribution;
    story_pin_data: StoryPinData;
    id: string;
    images: { [key: string]: Image };
    image_medium_url: string;
    is_eligible_for_aggregated_comments: boolean;
    seo_url: string;
    section: { name: string, id: string };
    is_hidden: boolean;
    seo_title: string;
    link: null;
    did_it_disabled: boolean;
    closeup_unified_description: string;
    promoted_is_removable: boolean;
    type: string;
    embed: { src: string | null };
    is_repin: boolean;
    image_signature: string;
    category: string;
    last_repin_date: null;
    auto_alt_text: null;
    dominant_color: string;
    price_value: number;
    sponsorship: null;
    description_html: string;

    buyable_product_availability: null;
    comments_disabled: boolean;
    mobile_link: null;
    shopping_flags: any[];
    is_eligible_for_brand_catalog: boolean;
    seo_noindex_reason: null;
    carousel_data: null;
    is_promoted: boolean;
    reaction_counts: { [key: string]: number };
    title: string;
    domain: string;
    can_delete_did_it_and_comments: boolean;
    link_domain: null;

    is_video: boolean;


}
export type StoryPinData = {
    id?: string;
    isDeleted?: boolean;
    pageCount?: number;
    pages?: Page[];
    hasAffiliateProducts?: boolean;
    hasProductPins?: boolean;
    // metadata?: Metadata;
    lastEdited?: null;
    mentionedUsers?: any[];
    type?: string;
}

export type Page = {
    video?: null;
    id?: string;
    shouldMute?: boolean;
    imageSignature?: string;
    imageSignatureAdjusted?: string;
    musicAttributions?: any[];
    blocks?: PageBlock[];
    type?: string;
    layout?: number;
    // image?: ImageAdjustedClass;
    // imageAdjusted?: ImageAdjustedClass;
    videoSignature?: null;
}

export type PageBlock = {
    video?: Video;
    blockStyle?: BlockStyle;
    blockType?: number;
    type?: string;
    videoSignature?: string;
}

export type Video = {
    video_list?: VideoList;
    id?: string;
    bitrates?: null;
}

export type BlockStyle = {
    height?: number;
    width?: number;
    yCoord?: number;
    cornerRadius?: number;
    rotation?: number;
    xCoord?: number;
}

export type VideoList = {
    V_720P: VExp3;
    V_EXP7?: VExp3;
    // vExp3?: VExp3;
    // vExp6?: VExp3;
    // vExp5?: VExp3;
    // vHlsv3Mobile?: VExp3;
    // vExp4?: VExp3;
}

export type VExp3 = {
    // width?: number;
    // height?: number;
    // duration?: number;
    url: string;
    // thumbnail?: string;
    // captionsUrls?: CaptionsUrls;
    // bestCaptionsURL?: null;
}
export type CaptionsUrls = {
    enZa?: string;
}

export type CloseupAttribution = {
    locale?: Locale;
    isVerifiedMerchant?: boolean;
    isDefaultImage?: boolean;
    followedByMe?: boolean;
    imageMediumURL?: string;
    username?: string;
    fullName?: string;
    indexed?: boolean;
    adsOnlyProfileSite?: null;
    domainURL?: null;
    blockedByMe?: boolean;
    id?: string;
    imageSmallURL?: string;
    firstName?: string;
    domainVerified?: boolean;
    followerCount?: number;
    isAdsOnlyProfile?: boolean;
    explicitlyFollowedByMe?: boolean;
}

export interface Board {
    id: string;
    is_collaborative: boolean;
    collaborated_by_me: boolean;
    name: string;
    category: null;
    access: any[];
    followed_by_me: boolean;
    type: string;
    image_thumbnail_url: string;
    description: string;
    pin_thumbnail_urls: string[];
    privacy: string;
    map_id: string;
    url: string;
    layout: string;
    image_cover_url: string;
}


export interface Image {
    width: number;
    height: number;
    url: string;
}

export interface Videos {
    id: string;
    video_list: VideoList;
}

export interface VideoList_1 {
    V_720P: V720_P;
    V_HLSV4: V720_P;
    V_HLSV3_WEB: V720_P;
    V_HLSV3_MOBILE: V720_P;
}

export interface V720_P {
    url: string;
    width: number;
    height: number;
    duration: number;
    thumbnail: string;
}
