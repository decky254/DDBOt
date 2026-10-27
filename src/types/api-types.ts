export type TAuthData = {
    account_list?: Record<string, { currency: string; token?: string }>;
};

export type TLandingCompany = {
    financial_company?: { shortcode: string };
    gaming_company?: { shortcode: string };
};

export type TSocketResponseData<T extends string = string> = any;
