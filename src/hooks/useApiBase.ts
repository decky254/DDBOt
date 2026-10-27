import { useStore } from './useStore';

export const useApiBase = () => {
    const store = useStore();
    const client = store?.client;
    return {
        isAuthorizing: false,
        isAuthorized: Boolean(client?.is_logged_in),
        connectionStatus: 'OPENED',
        accountList: (client?.account_list ?? []) as any[],
        activeLoginid: client?.is_logged_in ? client?.loginid || '' : '',
    };
};

