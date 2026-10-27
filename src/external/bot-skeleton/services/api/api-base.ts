export const api_base = {
    init: async (_force?: boolean) => {},
    api: {
        send: async (_payload?: any) => ({}),
        time: async () => ({ time: Math.floor(Date.now() / 1000) }),
        websiteStatus: async () => ({ website_status: {} }),
        getSettings: async () => ({ get_settings: {} }),
        getAccountStatus: async () => ({ get_account_status: {} }),
        landingCompany: async () => ({ landing_company: {} }),
        onMessage: () => ({
            subscribe: (_callback: any) => ({ unsubscribe: () => {} }),
        }),
    },
    account_info: {},
};

export default api_base;
