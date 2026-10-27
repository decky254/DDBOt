export interface TInitVariable {
    name: string;
    value: string;
}

export interface TParsedBotBlocks {
    symbol: string;
    tradeTypeCategory: string;
    tradeType: string;
    contractType: string;
    candleInterval: string;
    restartBuySellOnError: boolean;
    restartLastTradeOnError: boolean;
    initVariables: TInitVariable[];
    isAccumulator: boolean;
    growthRate: string;
    takeProfit: string;
    durationType: string;
    durationValue: string;
    stakeDisplay: string;
    predictionDisplay: string;
    purchaseContract: string;
}

const SYMBOL_LABELS: Record<string, string> = {
    '1HZ10V': 'Volatility 10 (1s) Index',
    '1HZ25V': 'Volatility 25 (1s) Index',
    '1HZ50V': 'Volatility 50 (1s) Index',
    '1HZ75V': 'Volatility 75 (1s) Index',
    '1HZ100V': 'Volatility 100 (1s) Index',
    R_10: 'Volatility 10 Index',
    R_25: 'Volatility 25 Index',
    R_50: 'Volatility 50 Index',
    R_75: 'Volatility 75 Index',
    R_100: 'Volatility 100 Index',
};

const CANDLE_LABELS: Record<string, string> = {
    '60': '1 minute',
    '120': '2 minutes',
    '180': '3 minutes',
    '300': '5 minutes',
    '600': '10 minutes',
    '900': '15 minutes',
    '1800': '30 minutes',
    '3600': '1 hour',
};

export const parseDbotXml = (xmlText: string, fallback?: Partial<TParsedBotBlocks>): TParsedBotBlocks => {
    const defaults: TParsedBotBlocks = {
        symbol: fallback?.symbol || 'Volatility 25 (1s) Index',
        tradeTypeCategory: fallback?.tradeTypeCategory || 'Digits',
        tradeType: fallback?.tradeType || 'Over/Under',
        contractType: fallback?.contractType || 'Both',
        candleInterval: fallback?.candleInterval || '1 minute',
        restartBuySellOnError: false,
        restartLastTradeOnError: true,
        initVariables: fallback?.initVariables || [
            { name: 'Initial Stake', value: '1' },
            { name: 'Target Profit', value: '30' },
            { name: 'Stop Loss', value: '15' },
        ],
        isAccumulator: fallback?.isAccumulator || false,
        growthRate: fallback?.growthRate || '5%',
        takeProfit: fallback?.takeProfit || '10',
        durationType: fallback?.durationType || 'Ticks',
        durationValue: fallback?.durationValue || '1',
        stakeDisplay: fallback?.stakeDisplay || 'Initial Stake',
        predictionDisplay: fallback?.predictionDisplay || '8',
        purchaseContract: fallback?.purchaseContract || 'Under (DIGITUNDER)',
    };

    if (!xmlText || typeof DOMParser === 'undefined') {
        return defaults;
    }

    try {
        const doc = new DOMParser().parseFromString(xmlText, 'text/xml');
        const getField = (name: string) =>
            doc.querySelector(`field[name="${name}"]`)?.textContent?.trim() || '';

        const symbolCode = getField('SYMBOL_LIST');
        if (symbolCode) {
            defaults.symbol = SYMBOL_LABELS[symbolCode] || symbolCode;
        }

        const catCode = getField('TRADETYPECAT_LIST').toLowerCase();
        const typeCode = getField('TRADETYPE_LIST').toLowerCase();
        if (catCode === 'accumulator' || typeCode === 'accumulator') {
            defaults.tradeTypeCategory = 'Accumulators';
            defaults.tradeType = 'Accumulators';
            defaults.isAccumulator = true;
        } else if (catCode === 'digits') {
            defaults.tradeTypeCategory = 'Digits';
            defaults.tradeType =
                typeCode === 'overunder'
                    ? 'Over/Under'
                    : typeCode === 'evenodd'
                      ? 'Even/Odd'
                      : typeCode === 'matchesdiffers'
                        ? 'Matches/Differs'
                        : 'Over/Under';
        } else if (catCode) {
            defaults.tradeTypeCategory = 'Up/Down';
            defaults.tradeType = typeCode === 'highlow' ? 'Higher/Lower' : 'Rise/Fall';
        }

        const contractCode = getField('TYPE_LIST');
        if (contractCode) {
            defaults.contractType =
                contractCode.toLowerCase() === 'both'
                    ? 'Both'
                    : contractCode === 'DIGITUNDER'
                      ? 'Under'
                      : contractCode === 'DIGITOVER'
                        ? 'Over'
                        : contractCode;
        }

        const candleCode = getField('CANDLEINTERVAL_LIST');
        if (candleCode) {
            defaults.candleInterval = CANDLE_LABELS[candleCode] || `${candleCode}s`;
        }

        defaults.restartBuySellOnError = getField('TIME_MACHINE_ENABLED') === 'TRUE';
        defaults.restartLastTradeOnError = getField('RESTARTONERROR') !== 'FALSE';

        const initStatement = doc.querySelector('statement[name="INITIALIZATION"]');
        if (initStatement) {
            const varBlocks = Array.from(initStatement.querySelectorAll('block[type="variables_set"]'));
            const parsedVars: TInitVariable[] = [];
            varBlocks.forEach(vb => {
                const varName = vb.querySelector(':scope > field[name="VAR"]')?.textContent?.trim();
                const numVal = vb.querySelector(':scope > value[name="VALUE"] field[name="NUM"]')?.textContent?.trim();
                const refVar = vb.querySelector(':scope > value[name="VALUE"] field[name="VAR"]')?.textContent?.trim();
                if (varName && (numVal || refVar)) {
                    parsedVars.push({
                        name: varName,
                        value: numVal || refVar || '0',
                    });
                }
            });
            if (parsedVars.length > 0) {
                defaults.initVariables = parsedVars;
            }
        }

        const submarket = doc.querySelector('statement[name="SUBMARKET"]');
        if (submarket) {
            const growthRate = submarket.querySelector('field[name="GROWTHRATE_LIST"]')?.textContent?.trim();
            if (growthRate) {
                defaults.isAccumulator = true;
                const pct = Math.round(Number(growthRate) * 100);
                defaults.growthRate = `${pct}%`;
                const amountVal =
                    submarket
                        .querySelector('block[type="trade_definition_accumulator"] > value[name="AMOUNT"] field[name="NUM"]')
                        ?.textContent?.trim() || '5';
                defaults.stakeDisplay = amountVal;
                const tpVal =
                    submarket.querySelector('block[type="accumulator_take_profit"] field[name="NUM"]')?.textContent?.trim() ||
                    '10';
                defaults.takeProfit = tpVal;
            } else {
                const durVal =
                    submarket.querySelector('value[name="DURATION"] field[name="NUM"]')?.textContent?.trim() || '1';
                defaults.durationValue = durVal;
                const amtVar =
                    submarket.querySelector('value[name="AMOUNT"] field[name="VAR"]')?.textContent?.trim();
                const amtNum =
                    submarket.querySelector('value[name="AMOUNT"] field[name="NUM"]')?.textContent?.trim();
                defaults.stakeDisplay = amtVar || amtNum || 'Stake';

                const predTernary = submarket.querySelector('value[name="PREDICTION"] block[type="logic_ternary"]');
                const predNum =
                    submarket.querySelector('value[name="PREDICTION"] field[name="NUM"]')?.textContent?.trim();
                if (predTernary) {
                    defaults.predictionDisplay = 'Dynamic (8 / 5)';
                } else if (predNum) {
                    defaults.predictionDisplay = predNum;
                }
            }
        }

        const purchaseField = doc
            .querySelector('statement[name="BEFOREPURCHASE_STACK"] field[name="PURCHASE_LIST"]')
            ?.textContent?.trim();
        if (purchaseField) {
            defaults.purchaseContract =
                purchaseField === 'DIGITUNDER'
                    ? 'Under (DIGITUNDER)'
                    : purchaseField === 'DIGITOVER'
                      ? 'Over (DIGITOVER)'
                      : purchaseField === 'ACCU'
                        ? 'Accumulators (ACCU)'
                        : purchaseField;
        }
    } catch {
        // Fallback to defaults if XML parsing fails
    }

    return defaults;
};
