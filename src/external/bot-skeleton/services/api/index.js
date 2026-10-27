export * from './appId';
export * from './observables/connection-status-stream';

export const api_base = {
    init: async () => {},
    api: {
        time: async () => ({ time: Math.floor(Date.now() / 1000) }),
        websiteStatus: async () => ({ website_status: {} }),
        getSettings: async () => ({ get_settings: {} }),
        getAccountStatus: async () => ({ get_account_status: {} }),
        landingCompany: async () => ({ landing_company: {} }),
        onMessage: () => ({
            subscribe: (callback) => ({ unsubscribe: () => {} }),
        }),
    },
    account_info: {},
};

export const ApiHelpers = {
    instance: {
        active_symbols: {
            retrieveActiveSymbols: async () => {},
        },
    },
    setInstance: (store) => {},
};

export const ServerTime = {
    init: (common) => {},
};

export const getContractTypeName = (contract) => (contract && typeof contract === 'object' ? contract.contract_type || '' : '');

