import React from 'react';
import { CurrencyIcon } from '@/components/currency/currency-icon';
import { addComma } from '@/components/shared';
import { useStore } from '@/hooks/useStore';
import { localize } from '@deriv-com/translations';

export const useActiveAccount = (_params?: any) => {
    const store = useStore();
    const client = store?.client;

    if (!client?.is_logged_in || !client?.loginid) {
        return { data: undefined as any };
    }

    const currency = client.currency || 'USD';
    const isVirtual = Boolean(client.is_virtual);
    const rawBalance =
        client.all_accounts_balance?.accounts?.[client.loginid]?.balance ?? Number(client.balance || 10000);

    return {
        data: {
            loginid: client.loginid,
            currency,
            currencyLabel: isVirtual ? localize('Demo') : currency,
            icon: React.createElement(CurrencyIcon, {
                currency: currency.toLowerCase(),
                isVirtual,
            }),
            isVirtual,
            isActive: true,
            is_disabled: 0,
            balance: addComma(Number(rawBalance).toFixed(2)),
        } as any,
    };
};

export default useActiveAccount;

