import React, { createContext, useContext } from 'react';
import { makeAutoObservable, runInAction } from 'mobx';
import moment from 'moment';
import { parseDbotXml, TParsedBotBlocks } from '@/utils/parse-dbot-xml';

export class RootStore {
    ui = {
        show_prompt: false,
        is_dark_mode_on: false,
        is_mobile: false,
        is_desktop: true,
        is_tablet: false,
        account_switcher_disabled_message: '',
        is_accounts_switcher_on: false,
        is_onscreen_keyboard_active: false,
        current_focus: null as string | null,
        is_trading_assessment_for_new_user_enabled: false,
        setDarkMode: (val: boolean) => {
            this.ui.is_dark_mode_on = val;
        },
        setDevice: (device: string) => {
            this.ui.is_mobile = device === 'mobile';
            this.ui.is_tablet = device === 'tablet';
            this.ui.is_desktop = device === 'desktop';
        },
        toggleAccountsDialog: (status?: boolean) => {
            this.ui.is_accounts_switcher_on = status ?? !this.ui.is_accounts_switcher_on;
        },
        setCurrentFocus: (val: string | null) => {
            this.ui.current_focus = val;
        },
        addToast: (_toast: any) => {},
        removeToast: (_key?: any) => {},
        setPromptHandler: (val: boolean) => {
            this.ui.show_prompt = val;
        },
    };

    common = {
        error: null as any,
        current_language: 'EN',
        is_socket_opened: true,
        server_time: moment(),
        setError: (err: any) => {
            this.common.error = err;
        },
        setSocketOpened: (val: boolean) => {
            this.common.is_socket_opened = val;
        },
        setCurrentLanguage: (lang: string) => {
            this.common.current_language = lang;
        },
        setServerTime: (time: any, _is_fallback?: boolean) => {
            this.common.server_time = time || moment();
        },
    };

    client = {
        is_logged_in: false,
        is_logging_out: false,
        loginid: '',
        virtual_account_loginid: 'VRTC100001',
        currency: 'USD',
        balance: '10000.00',
        is_virtual: true,
        is_eu: false,
        is_eu_country: false,
        is_cr_account: false,
        is_low_risk: false,
        is_high_risk: false,
        is_trading_experience_incomplete: false,
        content_flag: '',
        residence: 'svg',
        clients_country: 'svg',
        should_hide_header: false,
        accounts: {
            VRTC100001: {
                loginid: 'VRTC100001',
                currency: 'USD',
                is_virtual: 1,
                is_disabled: 0,
                balance: 10000,
                account_category: 'trading',
                account_type: 'trading',
            },
            CR100001: {
                loginid: 'CR100001',
                currency: 'USD',
                is_virtual: 0,
                is_disabled: 0,
                balance: 1000,
                account_category: 'trading',
                account_type: 'trading',
            },
        } as Record<string, any>,
        account_list: [
            {
                loginid: 'VRTC100001',
                currency: 'USD',
                is_virtual: 1,
                is_disabled: 0,
                account_type: 'trading',
                account_category: 'trading',
            },
            {
                loginid: 'CR100001',
                currency: 'USD',
                is_virtual: 0,
                is_disabled: 0,
                account_type: 'trading',
                account_category: 'trading',
            },
        ] as any[],
        account_settings: {
            email: 'demo@deriv.com',
            first_name: 'Demo',
            last_name: 'Trader',
            country_code: 'svg',
            residence: 'svg',
            preferred_language: 'EN',
        },
        account_status: {
            status: [] as string[],
            cashier_validation: [] as string[],
        } as any,
        landing_company_shortcode: 'svg',
        landing_companies: {} as any,
        website_status: {
            currencies_config: {
                USD: { name: 'US Dollar', type: 'fiat', fractional_digits: 2 },
            },
        } as any,
        is_landing_company_loaded: true,
        is_options_blocked: false,
        all_accounts_balance: {
            accounts: {
                VRTC100001: { balance: 10000.0 },
                CR100001: { balance: 1000.0 },
            },
        } as any,
        getCurrency: () => this.client.currency,
        setBalance: (bal: any) => {
            this.client.balance = String(bal);
            if (this.client.loginid && this.client.all_accounts_balance?.accounts?.[this.client.loginid]) {
                this.client.all_accounts_balance.accounts[this.client.loginid].balance = Number(bal);
            }
        },
        setCurrency: (curr: any) => {
            this.client.currency = curr;
        },
        setLoginId: (id: any) => {
            this.client.loginid = id;
        },
        setAccountList: (list: any) => {
            this.client.account_list = list || [];
        },
        setIsLoggedIn: (val: boolean) => {
            this.client.is_logged_in = val;
        },
        loginDemoAccount: () => {
            const accountsList = {
                VRTC100001: 'demo_token_vrtc100001',
                CR100001: 'real_token_cr100001',
            };
            localStorage.setItem('accountsList', JSON.stringify(accountsList));
            localStorage.setItem('clientAccounts', JSON.stringify(this.client.accounts));
            localStorage.setItem('active_loginid', 'VRTC100001');
            localStorage.setItem('authToken', accountsList.VRTC100001);
            this.client.loginid = 'VRTC100001';
            this.client.is_virtual = true;
            this.client.is_cr_account = false;
            this.client.currency = 'USD';
            this.client.balance = '10000.00';
            this.client.is_logged_in = true;
        },
        switchAccount: (loginId: string) => {
            const target = this.client.accounts[loginId];
            if (!target) return;
            this.client.loginid = loginId;
            this.client.is_virtual = Boolean(target.is_virtual);
            this.client.is_cr_account = loginId.startsWith('CR');
            this.client.currency = target.currency || 'USD';
            const bal = this.client.all_accounts_balance?.accounts?.[loginId]?.balance ?? target.balance ?? 0;
            this.client.balance = Number(bal).toFixed(2);
        },
        setWebsiteStatus: (status: any) => {
            this.client.website_status = status;
        },
        setAccountSettings: (settings: any) => {
            this.client.account_settings = { ...this.client.account_settings, ...settings };
        },
        setLandingCompany: (lc: any) => {
            this.client.landing_companies = lc;
        },
        setAccountStatus: (status: any) => {
            this.client.account_status = status;
        },
        setAllAccountsBalance: (bal: any) => {
            this.client.all_accounts_balance = bal;
        },
        updateSelfExclusion: async () => ({}),
        updateTncStatus: async () => ({}),
        logout: async () => {
            this.client.is_logged_in = false;
            this.client.loginid = '';
            localStorage.removeItem('active_loginid');
            localStorage.removeItem('authToken');
            localStorage.removeItem('accountsList');
            localStorage.removeItem('clientAccounts');
        },
    };

    app = {
        showDigitalOptionsMaltainvestError: (_client: any, _common: any) => {},
        setDBotEngineStores: () => {},
        api_helpers_store: {},
        dbot_store: {} as any,
        onMount: () => {},
        onUnmount: () => {},
    };

    dashboard = {
        active_tab: 0,
        active_tour: '',
        is_web_socket_intialised: true,
        is_trading_view_modal_visible: false,
        is_chart_modal_visible: false,
        is_preview_on_popup: false,
        selected_strategy_name: 'YB SpeedBot',
        selected_strategy_market: 'Derived > Continuous Indices > Volatility 10 (1s) Index',
        selected_strategy_trade_type: 'Over / Under',
        selected_strategy_stake: '1.00 USD',
        selected_strategy_duration: '1 Tick',
        selected_strategy_prediction: 'Digit Under 8 (DIGITUNDER)',
        selected_strategy_target_profit: '607.00 USD',
        selected_strategy_xml: '',
        selected_strategy_blocks: parseDbotXml('', {
            symbol: 'Volatility 10 (1s) Index',
            tradeTypeCategory: 'Digits',
            tradeType: 'Over/Under',
            contractType: 'Under',
            candleInterval: '1 minute',
            initVariables: [
                { name: 'Loss', value: '1000' },
                { name: 'Target Profit', value: '607' },
                { name: 'Stake', value: '1' },
                { name: 'stake 2', value: '1' },
            ],
            durationType: 'Ticks',
            durationValue: '1',
            stakeDisplay: 'Stake',
            predictionDisplay: '8',
            purchaseContract: 'Under (DIGITUNDER)',
        }),
        setActiveTab: (tab: number) => {
            runInAction(() => {
                this.dashboard.active_tab = tab;
            });
        },
        loadBotStrategy: (payload: {
            name: string;
            xml?: string;
            market?: string;
            tradeType?: string;
            stake?: string;
            duration?: string;
            prediction?: string;
            targetProfit?: string;
            fallbackBlocks?: Partial<TParsedBotBlocks>;
        }) => {
            const parsed = parseDbotXml(payload.xml || '', payload.fallbackBlocks);
            runInAction(() => {
                this.dashboard.selected_strategy_name = payload.name;
                this.dashboard.selected_strategy_market =
                    payload.market || `Derived > Continuous Indices > ${parsed.symbol}`;
                this.dashboard.selected_strategy_trade_type = payload.tradeType || parsed.tradeType;
                this.dashboard.selected_strategy_stake = payload.stake || `${parsed.stakeDisplay} USD`;
                this.dashboard.selected_strategy_duration =
                    payload.duration ||
                    (parsed.isAccumulator ? `${parsed.growthRate} Growth Rate` : `${parsed.durationValue} Tick(s)`);
                this.dashboard.selected_strategy_prediction = payload.prediction || parsed.purchaseContract;
                this.dashboard.selected_strategy_target_profit = payload.targetProfit || '30.00 USD';
                this.dashboard.selected_strategy_xml = payload.xml || '';
                this.dashboard.selected_strategy_blocks = parsed;
                this.blockly_store.has_active_bot = true;
                this.dashboard.active_tab = 1;
            });
        },
        setActiveTour: (tour: string) => {
            this.dashboard.active_tour = tour;
        },
        setTradingViewModalVisibility: () => {
            this.dashboard.is_trading_view_modal_visible = !this.dashboard.is_trading_view_modal_visible;
        },
        setPreviewOnPopup: (val: boolean) => {
            this.dashboard.is_preview_on_popup = val;
        },
        setOpenSettings: (_toast: any) => {},
        onZoomInOutClick: (_is_zoom_in: boolean) => {},
    };

    run_panel = {
        active_index: 0,
        is_drawer_open: true,
        is_running: false,
        is_statistics_info_modal_open: false,
        is_clear_stat_disabled: true,
        is_stop_button_visible: false,
        is_stop_button_disabled: false,
        is_sell_requested: false,
        contract_stage: 0,
        onClearStatClick: () => {
            this.transactions.transactions = [];
            this.transactions.statistics = {
                total_payout: 0,
                total_profit: 0,
                total_stake: 0,
                won_contracts: 0,
                lost_contracts: 0,
                number_of_runs: 0,
            };
            this.run_panel.is_clear_stat_disabled = true;
        },
        onMount: () => {},
        onUnmount: () => {},
        onRunButtonClick: () => {
            this.run_panel.is_running = true;
            this.run_panel.is_stop_button_visible = true;
            this.run_panel.contract_stage = 2;
        },
        onStopBotClick: () => {
            this.run_panel.is_running = false;
            this.run_panel.is_stop_button_visible = false;
            this.run_panel.contract_stage = 0;
        },
        onClickSell: () => {},
        performSelfExclusionCheck: async () => {},
        setActiveTabIndex: (idx: number) => {
            this.run_panel.active_index = idx;
        },
        toggleDrawer: (is_open?: boolean) => {
            this.run_panel.is_drawer_open = is_open ?? !this.run_panel.is_drawer_open;
        },
        toggleStatisticsInfoModal: () => {
            this.run_panel.is_statistics_info_modal_open = !this.run_panel.is_statistics_info_modal_open;
        },
    };

    transactions = {
        transactions: [] as any[],
        recovered_transactions: [] as string[],
        is_transaction_details_modal_open: false,
        statistics: {
            total_payout: 0,
            total_profit: 0,
            total_stake: 0,
            won_contracts: 0,
            lost_contracts: 0,
            number_of_runs: 0,
        },
        toggleTransactionDetailsModal: (is_open?: boolean) => {
            this.transactions.is_transaction_details_modal_open =
                is_open ?? !this.transactions.is_transaction_details_modal_open;
        },
        recoverPendingContracts: (_contract?: any) => {},
    };

    summary_card = {
        is_contract_completed: false,
        is_contract_loading: false,
        is_contract_inactive: true,
        is_bot_running: false,
        is_multiplier: false,
        is_accumulator: false,
        contract_info: null as any,
        profit: 0,
        setIsBotRunning: () => {},
        clear: () => {},
    };

    load_modal = {
        active_index: 0,
        is_load_modal_open: false,
        is_open_button_loading: false,
        is_open_button_disabled: false,
        is_explanation_expand: false,
        is_delete_modal_open: false,
        loaded_local_file: null as any,
        loaded_local_xml: '',
        imported_strategy_type: 'new',
        selected_strategy_id: '',
        tab_name: 'local_tab',
        recent_strategies: [] as any[],
        dashboard_strategies: [] as any[],
        onEntered: () => {},
        setActiveTabIndex: (idx: number) => {
            this.load_modal.active_index = idx;
        },
        toggleLoadModal: () => {
            this.load_modal.is_load_modal_open = !this.load_modal.is_load_modal_open;
        },
        toggleExplanationExpand: () => {
            this.load_modal.is_explanation_expand = !this.load_modal.is_explanation_expand;
        },
        loadStrategyOnBotBuilder: async () => {
            const fileName =
                this.load_modal.loaded_local_file?.name?.replace(/\.xml$/i, '') || 'Imported XML Strategy';
            this.dashboard.loadBotStrategy({
                name: fileName,
                xml: this.load_modal.loaded_local_xml,
            });
        },
        setLoadedLocalFile: (file: any) => {
            this.load_modal.loaded_local_file = file;
        },
        saveStrategyToLocalStorage: async () => {},
        handleFileChange: (e: any, _is_body?: boolean) => {
            const file = e?.target?.files?.[0] || e?.dataTransfer?.files?.[0];
            if (!file) return false;
            runInAction(() => {
                this.load_modal.loaded_local_file = file;
            });
            const reader = new FileReader();
            reader.onload = ev => {
                const xmlContent = String(ev.target?.result || '');
                runInAction(() => {
                    this.load_modal.loaded_local_xml = xmlContent;
                });
                this.dashboard.loadBotStrategy({
                    name: file.name.replace(/\.xml$/i, ''),
                    xml: xmlContent,
                });
                runInAction(() => {
                    this.load_modal.is_load_modal_open = false;
                    this.load_modal.loaded_local_file = null;
                });
            };
            reader.readAsText(file);
            return true;
        },
        getSaveType: (_type: any) => '',
        loadStrategyOnModalRecentPreview: (_id: string) => {},
        updateXmlValuesOnStrategySelection: () => {},
        onDriveOpen: async () => {},
    };

    blockly_store = {
        is_loading: false,
        has_active_bot: false,
        has_saved_bots: false,
        setLoading: (val: boolean) => {
            this.blockly_store.is_loading = val;
        },
        checkForSavedBots: async () => {},
    };

    quick_strategy = {
        is_open: false,
        setFormVisibility: (val: boolean) => {
            this.quick_strategy.is_open = val;
        },
    };

    flyout = {
        flyout_content: [] as any[],
        flyout_width: 400,
        is_help_content: false,
        is_search_flyout: false,
        is_visible: false,
        search_term: '',
        selected_category: null as any,
        first_get_variable_block_index: 0,
        onMount: () => {},
        onUnmount: () => {},
        initBlockWorkspace: (_el: any, _node: any) => {},
    };

    flyout_help = {
        active_helper: '',
        block_node: null as any,
        block_type: '',
        examples: [] as any[],
        help_string: null as any,
        should_next_disable: false,
        should_previous_disable: false,
        title: '',
        initFlyoutHelp: (_node: any, _type: string) => {},
        setHelpContent: (_node: any) => {},
        onBackClick: () => {},
        onSequenceClick: (_is_next: boolean) => {},
    };

    journal = {
        checked_filters: ['error', 'notify', 'system'] as string[],
        filters: [
            { id: 'error', label: 'Errors' },
            { id: 'notify', label: 'Notifications' },
            { id: 'system', label: 'System' },
        ],
        filtered_messages: [] as any[],
        unfiltered_messages: [] as any[],
        is_filter_dialog_visible: false,
        filterMessage: (_checked: boolean, _item_id: string) => {},
        toggleFilterDialog: () => {
            this.journal.is_filter_dialog_visible = !this.journal.is_filter_dialog_visible;
        },
    };

    self_exclusion = {
        is_restricted: false,
        initial_values: { run_limit: '' },
        api_max_losses: 0,
        run_limit: -1,
        resetSelfExclusion: () => {},
        setRunLimit: (val: any) => {
            this.self_exclusion.run_limit = val;
        },
    };

    google_drive = {
        is_authorised: false,
        signIn: async () => {},
        signOut: async () => {},
    };

    constructor() {
        makeAutoObservable(this);
    }
}

const rootStore = new RootStore();
export const mockStore = (_ws?: any) => new RootStore();
const StoreContext = createContext<RootStore>(rootStore);

export const StoreProvider: React.FC<{ children: React.ReactNode; mockStore?: RootStore }> = ({
    children,
    mockStore: customStore,
}) => {
    return <StoreContext.Provider value={customStore || rootStore}>{children}</StoreContext.Provider>;
};

export const useStore = () => useContext(StoreContext);
export default useStore;
