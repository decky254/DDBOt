import { IconSize } from '@deriv/quill-icons';
import {
    CurrencyAudIcon,
    CurrencyBtcIcon,
    CurrencyEthIcon,
    CurrencyEurIcon,
    CurrencyGbpIcon,
    CurrencyUsdIcon,
} from '@deriv/quill-icons/Currencies';
import {
    PaymentMethodDerivDemoBrandDarkIcon,
    PaymentMethodLitecoinBrandIcon,
    PaymentMethodTetherUsdtBrandIcon,
    PaymentMethodUsdCoinBrandIcon,
} from '@deriv/quill-icons/Logo';
import { PaymentMethodXrpBrandIcon } from '@deriv/quill-icons/PaymentMethods';

const WALLET_ICONS = {
    IcWalletDerivDemoLight: PaymentMethodDerivDemoBrandDarkIcon,
    IcWalletDerivDemoDark: PaymentMethodDerivDemoBrandDarkIcon,
    IcWalletCurrencyUsdLight: CurrencyUsdIcon,
    IcWalletCurrencyUsdDark: CurrencyUsdIcon,
    IcWalletCurrencyEurLight: CurrencyEurIcon,
    IcWalletCurrencyEurDark: CurrencyEurIcon,
    IcWalletCurrencyAudLight: CurrencyAudIcon,
    IcWalletCurrencyAudDark: CurrencyAudIcon,
    IcWalletCurrencyGbpLight: CurrencyGbpIcon,
    IcWalletCurrencyGbpDark: CurrencyGbpIcon,
    IcWalletBitcoinLight: CurrencyBtcIcon,
    IcWalletBitcoinDark: CurrencyBtcIcon,
    IcWalletEthereumLight: CurrencyEthIcon,
    IcWalletEthereumDark: CurrencyEthIcon,
    IcWalletTetherLight: PaymentMethodTetherUsdtBrandIcon,
    IcWalletTetherDark: PaymentMethodTetherUsdtBrandIcon,
    IcWalletLiteCoinLight: PaymentMethodLitecoinBrandIcon,
    IcWalletLiteCoinDark: PaymentMethodLitecoinBrandIcon,
    IcWalletUsdCoinLight: PaymentMethodUsdCoinBrandIcon,
    IcWalletUsdCoinDark: PaymentMethodUsdCoinBrandIcon,
    IcWalletXrpLight: PaymentMethodXrpBrandIcon,
    IcWalletXrpDark: PaymentMethodXrpBrandIcon,
    unknown: CurrencyUsdIcon,
};

export const WalletIconList = ({ type, size }: { type: string; size?: IconSize }) => {
    const Icon = WALLET_ICONS[type as keyof typeof WALLET_ICONS] || WALLET_ICONS.unknown;

    return <Icon iconSize={size ?? 'xs'} />;
};

