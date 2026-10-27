import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { DBOT_TABS } from '@/constants/bot-contents';
import { useStore } from '@/hooks/useStore';

export interface TBotTemplate {
    id: string;
    name: string;
    category: 'Speed Trading' | 'AI Trading' | 'Pattern Analysis' | 'Accumulators';
    description: string;
    winRate: string;
    recommendedMarket: string;
    tradeType: string;
    xmlFile: string;
    initialStake?: string;
    duration?: string;
    prediction?: string;
    targetProfit?: string;
}

export const FREE_BOT_TEMPLATES: TBotTemplate[] = [
    {
        id: 'mkorean-sv6-bot',
        name: 'MKOREAN SV6 Bot',
        category: 'Accumulators',
        description:
            '5% growth rate Accumulator strategy on Volatility 25 (1s) Index with $5.00 stake, $10.00 take-profit per contract, and $30.00 target profit.',
        winRate: '89%',
        recommendedMarket: 'Volatility 25 (1s) Index',
        tradeType: 'Accumulators',
        xmlFile: '/assets/aistudio/MKOREAN_SV6_BOT_241be37f.xml',
        initialStake: '5.00 USD (9.00 Recovery)',
        duration: '5% Growth Rate (Take Profit $10)',
        prediction: 'Accumulator (ACCU)',
        targetProfit: '30.00 USD',
    },
    {
        id: 'gle-hunter-bot',
        name: 'Gle Hunter Bot',
        category: 'Speed Trading',
        description:
            '1-tick Digit Under 8 speed hunter on Volatility 25 (1s) Index with $2.97 base stake, automated loss recovery, and $30.00 profit target.',
        winRate: '88%',
        recommendedMarket: 'Volatility 25 (1s) Index',
        tradeType: 'Over / Under',
        xmlFile: '/assets/aistudio/Gle_hunter_825103eb.xml',
        initialStake: '2.97 USD',
        duration: '1 Tick',
        prediction: 'Digit Under 8 (DIGITUNDER)',
        targetProfit: '30.00 USD',
    },
    {
        id: 'yb-speedbot',
        name: 'YB SpeedBot',
        category: 'Speed Trading',
        description:
            'High-speed 1-tick Digit Under 8 bot for Volatility 10 (1s) Index with $1.00 initial stake and dynamic stake recovery.',
        winRate: '87%',
        recommendedMarket: 'Volatility 10 (1s) Index',
        tradeType: 'Over / Under',
        xmlFile: '/assets/aistudio/YB_speedbot_3be64ddd.xml',
        initialStake: '1.00 USD',
        duration: '1 Tick',
        prediction: 'Digit Under 8 (DIGITUNDER)',
        targetProfit: '607.00 USD',
    },
    {
        id: 'yb-under-ars8-bot',
        name: 'YB Under ARs8 Bot',
        category: 'AI Trading',
        description:
            'Adaptive Digit Under strategy that dynamically shifts predictions between Under 8, Under 7, and Under 6 with 2.1x recovery and $15.00 stop-loss protection.',
        winRate: '90%',
        recommendedMarket: 'Volatility 25 (1s) Index',
        tradeType: 'Over / Under',
        xmlFile: '/assets/aistudio/YB_Under_ARs8_9147b189.xml',
        initialStake: '50.97 USD (Win Stake 5.97 USD)',
        duration: '1 Tick',
        prediction: 'Dynamic Under 8 / 6 / 7 (DIGITUNDER)',
        targetProfit: '25.00 USD (Stop Loss 15.00 USD)',
    },
    {
        id: 'yb-version-2-bot',
        name: 'YB Version 2 Bot',
        category: 'Pattern Analysis',
        description:
            '2-tick Digit Under 7 pattern strategy on Volatility 25 (1s) Index with $2.00 initial stake and automated recovery logic.',
        winRate: '86%',
        recommendedMarket: 'Volatility 25 (1s) Index',
        tradeType: 'Over / Under',
        xmlFile: '/assets/aistudio/YB_Version_2_9e948ee6.xml',
        initialStake: '2.00 USD',
        duration: '2 Ticks',
        prediction: 'Digit Under 7 (DIGITUNDER)',
        targetProfit: '607.00 USD',
    },
    {
        id: 'expert-speed-bot-2025',
        name: '2025 Updated Expert Speed Bot',
        category: 'Speed Trading',
        description: 'High-frequency tick speed bot optimized for Volatility 100 (1s) Index with dynamic stake recovery.',
        winRate: '84%',
        recommendedMarket: 'Volatility 100 (1s) Index',
        tradeType: 'Rise / Fall',
        xmlFile: '2_2025_Updated_Expert_Speed_Bot_Version_📉📉📉📈📈📈_1_1_1765711647656.xml',
    },
    {
        id: 'candle-mine-2025',
        name: '2025 Updated Candle Mine UK',
        category: 'Pattern Analysis',
        description: 'Candlestick pattern mining strategy that detects momentum reversals on 1-minute candles.',
        winRate: '81%',
        recommendedMarket: 'Volatility 75 Index',
        tradeType: 'Higher / Lower',
        xmlFile: '3_2025_Updated_Version_Of_Candle_Mine🇬🇧_1765711647657.xml',
    },
    {
        id: 'ai-entry-point',
        name: 'AI with Entry Point Bot',
        category: 'AI Trading',
        description: 'Automated entry-point detection bot that waits for digit cluster confirmation before placing trades.',
        winRate: '86%',
        recommendedMarket: 'Volatility 25 (1s) Index',
        tradeType: 'Over / Under',
        xmlFile: 'AI_with_Entry_Point_1765711647658.xml',
    },
    {
        id: 'alex-speed-bot-expro2',
        name: 'Alex SpeedBot ExPro 2',
        category: 'Speed Trading',
        description: 'Ultra-fast digit execution bot with built-in stop-loss and take-profit protection.',
        winRate: '83%',
        recommendedMarket: 'Volatility 10 (1s) Index',
        tradeType: 'Matches / Differs',
        xmlFile: 'ALEXSPEEDBOT__EXPRO2_(2)_(1)_1765711647659.xml',
    },
    {
        id: 'auto-c4-volt-ai',
        name: 'Auto C4 Volt 2 AI Premium Robot',
        category: 'AI Trading',
        description: 'Multi-indicator volatility scanner with smart Martingale split recovery.',
        winRate: '88%',
        recommendedMarket: 'Volatility 50 (1s) Index',
        tradeType: 'Over / Under',
        xmlFile: 'AUTO_C4_VOLT_🇬🇧_2_🇬🇧_AI_PREMIUM_ROBOT_(2)_(1)_1765711647660.xml',
    },
    {
        id: 'accumulators-pro-bot',
        name: 'Accumulators Pro Bot',
        category: 'Accumulators',
        description: 'Precision growth rate accumulator strategy with automated tick take-profit exit.',
        winRate: '85%',
        recommendedMarket: 'Volatility 100 Index',
        tradeType: 'Accumulators',
        xmlFile: 'Accumulators_Pro_Bot_1765711647657.xml',
    },
    {
        id: 'alpha-ai-two-predictions',
        name: 'Alpha AI Two Predictions',
        category: 'AI Trading',
        description: 'Dual-prediction digit contract strategy that alternates barrier targets based on tick parity.',
        winRate: '82%',
        recommendedMarket: 'Volatility 75 (1s) Index',
        tradeType: 'Over / Under',
        xmlFile: 'Alpha_Ai_Two_Predictions__1765711647659.xml',
    },
    {
        id: 'binarytool-even-odd-ai',
        name: 'BinaryTool Even & Odd AI Bot',
        category: 'Pattern Analysis',
        description: 'Tracks last 20 tick parity distribution to capture Even/Odd mean reversion streaks.',
        winRate: '80%',
        recommendedMarket: 'Volatility 50 Index',
        tradeType: 'Even / Odd',
        xmlFile: 'BINARYTOOL@EVEN&ODD_AI_BOT_(2)_1765711647663.xml',
    },
    {
        id: 'binarytool-thunder-ai-pro',
        name: 'BinaryTool Even Odd Thunder AI Pro',
        category: 'Speed Trading',
        description: 'Rapid Even/Odd streak follower with adaptive stake scaling.',
        winRate: '84%',
        recommendedMarket: 'Volatility 100 (1s) Index',
        tradeType: 'Even / Odd',
        xmlFile: 'BINARYTOOL@EVEN_ODD_THUNDER_AI_PRO_BOT_1765711647662.xml',
    },
    {
        id: 'binarytool-differ-v2',
        name: 'BinaryTool Differ v2.0',
        category: 'Pattern Analysis',
        description: 'Least-frequent digit analyzer for high-probability Digit Differs contracts.',
        winRate: '91%',
        recommendedMarket: 'Volatility 25 Index',
        tradeType: 'Matches / Differs',
        xmlFile: 'BINARYTOOL@_DIFFER_V2.0_(1)_(1)_1765711647662.xml',
    },
    {
        id: 'binarytool-wizard-ai',
        name: 'BinaryTool Wizard AI Bot',
        category: 'AI Trading',
        description: 'Adaptive volatility regime classifier combining RSI and Bollinger Band triggers.',
        winRate: '85%',
        recommendedMarket: 'Volatility 10 Index',
        tradeType: 'Rise / Fall',
        xmlFile: 'BINARYTOOL_WIZARD_AI_BOT_1765711647661.xml',
    },
    {
        id: 'binary-flipper-ai-plus',
        name: 'Binary Flipper AI Robot Plus+',
        category: 'Speed Trading',
        description: 'Bidirectional trend flipper that switches contract direction on consecutive momentum ticks.',
        winRate: '83%',
        recommendedMarket: 'Volatility 100 Index',
        tradeType: 'Rise / Fall',
        xmlFile: 'BINARY_FLIPPER_AI_ROBOT_PLUS_+_1765711647660.xml',
    },
];

const CATEGORIES = ['All', 'Speed Trading', 'AI Trading', 'Pattern Analysis', 'Accumulators'] as const;

const FreeBots = observer(() => {
    const { dashboard } = useStore();
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [loadingBotId, setLoadingBotId] = useState<string | null>(null);

    const filteredBots =
        selectedCategory === 'All'
            ? FREE_BOT_TEMPLATES
            : FREE_BOT_TEMPLATES.filter(bot => bot.category === selectedCategory);

    const handleLoadBot = async (bot: TBotTemplate) => {
        setLoadingBotId(bot.id);
        let xmlText = '';
        if (bot.xmlFile.startsWith('/assets/aistudio/')) {
            try {
                const response = await fetch(bot.xmlFile);
                if (response.ok) {
                    xmlText = await response.text();
                }
            } catch {
                xmlText = '';
            }
        }

        const isAccumulator = bot.tradeType === 'Accumulators';
        const isDigits =
            bot.tradeType === 'Over / Under' ||
            bot.tradeType === 'Matches / Differs' ||
            bot.tradeType === 'Even / Odd';

        dashboard.loadBotStrategy({
            name: bot.name,
            xml: xmlText,
            market: `Derived > Continuous Indices > ${bot.recommendedMarket}`,
            tradeType: bot.tradeType,
            stake: bot.initialStake || '1.00 USD',
            duration: bot.duration || (isAccumulator ? '5% Growth Rate' : '1 Tick'),
            prediction: bot.prediction || bot.tradeType,
            targetProfit: bot.targetProfit || '30.00 USD',
            fallbackBlocks: {
                symbol: bot.recommendedMarket,
                tradeTypeCategory: isAccumulator ? 'Accumulators' : isDigits ? 'Digits' : 'Up/Down',
                tradeType: bot.tradeType.replace(/\s+/g, ''),
                contractType: isAccumulator ? 'ACCU' : 'Both',
                candleInterval: '1 minute',
                isAccumulator,
                growthRate: '5%',
                takeProfit: '10',
                initVariables: [
                    { name: 'Initial Stake', value: (bot.initialStake || '1.00').split(' ')[0] },
                    { name: 'Martingale Multiplier', value: '2' },
                    { name: 'Current Stake', value: 'Initial Stake' },
                    { name: 'Target Profit', value: (bot.targetProfit || '30').split(' ')[0] },
                    { name: 'Stop Loss', value: '15' },
                ],
                durationType: 'Ticks',
                durationValue: (bot.duration || '1').split(' ')[0] || '1',
                stakeDisplay: 'Current Stake',
                predictionDisplay: isDigits ? '8' : '0',
                purchaseContract: isAccumulator
                    ? 'Accumulators (ACCU)'
                    : bot.tradeType === 'Over / Under'
                      ? 'Under (DIGITUNDER)'
                      : bot.tradeType === 'Even / Odd'
                        ? 'Even (DIGITEVEN)'
                        : bot.tradeType === 'Matches / Differs'
                          ? 'Differs (DIGITDIFF)'
                          : 'Rise (CALL)',
            },
        });
        setLoadingBotId(null);
    };

    return (
        <div
            className='free-bots-page'
            style={{
                padding: '2.4rem',
                height: 'var(--tab-content-height, calc(100vh - 16.6rem))',
                overflowY: 'auto',
                color: 'var(--text-general, #333)',
            }}
        >
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '1.6rem',
                        marginBottom: '2.4rem',
                    }}
                >
                    <div>
                        <h2 style={{ fontSize: '2.2rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                            Pre-Built Trading Bots
                        </h2>
                        <p style={{ fontSize: '1.4rem', color: 'var(--text-less-prominent, #6e6e6e)' }}>
                            Select any verified XML strategy below to load it directly into the Bot Builder workspace.
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                        {CATEGORIES.map(category => {
                            const isActive = selectedCategory === category;
                            return (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    style={{
                                        padding: '0.8rem 1.6rem',
                                        borderRadius: '0.6rem',
                                        border: isActive ? '1px solid #ff444f' : '1px solid var(--border-normal, #d6dadb)',
                                        background: isActive ? '#ff444f' : 'var(--general-main-1, #ffffff)',
                                        color: isActive ? '#ffffff' : 'var(--text-general, #333333)',
                                        fontSize: '1.3rem',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                    }}
                                >
                                    {category}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '1.6rem',
                    }}
                >
                    {filteredBots.map(bot => {
                        const isAttachedXml = bot.xmlFile.startsWith('/assets/aistudio/');
                        return (
                            <div
                                key={bot.id}
                                style={{
                                    background: 'var(--general-main-1, #ffffff)',
                                    border: isAttachedXml
                                        ? '1px solid rgba(0, 167, 158, 0.45)'
                                        : '1px solid var(--border-normal, #e6e9e9)',
                                    borderRadius: '0.8rem',
                                    padding: '2rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                                }}
                            >
                                <div>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginBottom: '1.2rem',
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontSize: '1.1rem',
                                                fontWeight: 700,
                                                padding: '0.3rem 0.8rem',
                                                borderRadius: '0.4rem',
                                                background: 'rgba(255, 68, 79, 0.1)',
                                                color: '#ff444f',
                                            }}
                                        >
                                            {bot.category}
                                        </span>
                                        <span
                                            style={{
                                                fontSize: '1.2rem',
                                                fontWeight: 700,
                                                color: '#00a79e',
                                            }}
                                        >
                                            {bot.winRate} Hist. Accuracy
                                        </span>
                                    </div>
                                    <h3 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.8rem' }}>
                                        {bot.name}
                                    </h3>
                                    <p
                                        style={{
                                            fontSize: '1.3rem',
                                            color: 'var(--text-less-prominent, #6e6e6e)',
                                            lineHeight: 1.5,
                                            marginBottom: '1.6rem',
                                        }}
                                    >
                                        {bot.description}
                                    </p>
                                </div>

                                <div>
                                    <div
                                        style={{
                                            fontSize: '1.2rem',
                                            borderTop: '1px solid var(--border-normal, #e6e9e9)',
                                            paddingTop: '1.2rem',
                                            marginBottom: '1.6rem',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            color: 'var(--text-less-prominent, #6e6e6e)',
                                        }}
                                    >
                                        <span>{bot.recommendedMarket}</span>
                                        <strong style={{ color: 'var(--text-general, #333)' }}>{bot.tradeType}</strong>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.8rem' }}>
                                        <button
                                            onClick={() => handleLoadBot(bot)}
                                            disabled={loadingBotId === bot.id}
                                            style={{
                                                flex: 1,
                                                padding: '1rem',
                                                borderRadius: '0.6rem',
                                                border: 'none',
                                                background: '#ff444f',
                                                color: '#ffffff',
                                                fontSize: '1.3rem',
                                                fontWeight: 700,
                                                cursor: 'pointer',
                                            }}
                                        >
                                            {loadingBotId === bot.id ? 'Loading...' : 'Load Bot into Builder'}
                                        </button>
                                        {isAttachedXml && (
                                            <a
                                                href={bot.xmlFile}
                                                download={`${bot.name.replace(/\s+/g, '_')}.xml`}
                                                style={{
                                                    padding: '1rem 1.2rem',
                                                    borderRadius: '0.6rem',
                                                    border: '1px solid #00a79e',
                                                    color: '#00a79e',
                                                    fontSize: '1.2rem',
                                                    fontWeight: 700,
                                                    textDecoration: 'none',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                XML
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
});

export default FreeBots;
