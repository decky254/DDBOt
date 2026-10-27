import React from 'react';
import { observer } from 'mobx-react-lite';
import LoadModal from '@/components/load-modal';
import RunPanel from '@/components/run-panel';
import Tabs from '@/components/shared_ui/tabs';
import TradingViewComponent from '@/components/trading-view-chart/trading-view';
import TradingViewModal from '@/components/trading-view-chart/trading-view-modal';
import { DBOT_TABS } from '@/constants/bot-contents';
import { useStore } from '@/hooks/useStore';
import { Localize, localize } from '@deriv-com/translations';
import AnalysisTool from '../analysis-tool';
import FreeBots from '../free-bots';

const DashboardTab = observer(() => {
    const { dashboard, load_modal } = useStore();

    const quickActions = [
        {
            title: localize('Local Computer'),
            description: localize('Import a bot XML strategy file from your device'),
            action: () => load_modal.toggleLoadModal(),
        },
        {
            title: localize('Pre-Built Free Bots'),
            description: localize('Browse 17 verified automated trading bots'),
            action: () => dashboard.setActiveTab(DBOT_TABS.FREE_BOTS),
        },
        {
            title: localize('Bot Builder Workspace'),
            description: localize('Create or customize block-based trading strategies'),
            action: () => dashboard.setActiveTab(DBOT_TABS.BOT_BUILDER),
        },
        {
            title: localize('Market Analysis Tool'),
            description: localize('Analyze live tick digits and volatility parity'),
            action: () => dashboard.setActiveTab(DBOT_TABS.ANALYSIS_TOOL),
        },
    ];

    return (
        <div
            style={{
                padding: '3.2rem 2.4rem',
                height: 'var(--tab-content-height, calc(100vh - 16.6rem))',
                overflowY: 'auto',
                color: 'var(--text-general, #333)',
            }}
        >
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <h1 style={{ fontSize: '2.8rem', fontWeight: 700, marginBottom: '0.8rem' }}>
                    <Localize i18n_default_text='Load or build your bot' />
                </h1>
                <p style={{ fontSize: '1.5rem', color: 'var(--text-less-prominent, #6e6e6e)', marginBottom: '3.2rem' }}>
                    <Localize i18n_default_text='Import a bot from your computer or Google Drive, build it from scratch, or start with a quick strategy or pre-built free bot.' />
                </p>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                        gap: '1.6rem',
                    }}
                >
                    {quickActions.map(item => (
                        <div
                            key={item.title}
                            onClick={item.action}
                            role='button'
                            tabIndex={0}
                            style={{
                                background: 'var(--general-main-1, #ffffff)',
                                border: '1px solid var(--border-normal, #e6e9e9)',
                                borderRadius: '0.8rem',
                                padding: '2.4rem',
                                cursor: 'pointer',
                                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                            }}
                        >
                            <h3 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.8rem' }}>
                                {item.title}
                            </h3>
                            <p style={{ fontSize: '1.3rem', color: 'var(--text-less-prominent, #6e6e6e)', lineHeight: 1.5 }}>
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});

const pillStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    background: '#151717',
    color: '#ffffff',
    padding: '0.35rem 0.9rem',
    borderRadius: '1.6rem',
    fontSize: '1.2rem',
    fontWeight: 600,
    border: '1px solid rgba(255,255,255,0.12)',
};

const subBlockRowStyle: React.CSSProperties = {
    background: '#e6e9e9',
    color: '#151717',
    padding: '0.85rem 1.2rem',
    borderRadius: '0.4rem',
    marginBottom: '0.4rem',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '0.6rem',
    fontSize: '1.25rem',
    fontWeight: 500,
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6)',
};

const BotBuilderWorkspace = observer(() => {
    const { dashboard, run_panel, load_modal } = useStore();
    const [zoom, setZoom] = React.useState(1);
    const strategyName = dashboard.selected_strategy_name || 'YB SpeedBot';
    const blocks = dashboard.selected_strategy_blocks;

    return (
        <div
            style={{
                display: 'flex',
                height: 'var(--tab-content-height, calc(100vh - 16.6rem))',
                overflow: 'hidden',
                background: '#0e131f',
                color: '#ffffff',
                maxWidth: '100vw',
            }}
        >
            {/* Left Blockly Workspace Toolbar */}
            <div
                style={{
                    width: '52px',
                    background: '#0b0f19',
                    borderRight: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '1.2rem 0',
                    gap: '1.4rem',
                    flexShrink: 0,
                }}
            >
                <button
                    title='Import Bot XML'
                    onClick={() => load_modal.toggleLoadModal()}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#c2c6d0',
                        fontSize: '1.8rem',
                        cursor: 'pointer',
                    }}
                >
                    📁
                </button>
                <button
                    title='Browse Free Bots'
                    onClick={() => dashboard.setActiveTab(DBOT_TABS.FREE_BOTS)}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#c2c6d0',
                        fontSize: '1.8rem',
                        cursor: 'pointer',
                    }}
                >
                    🤖
                </button>
                <button
                    title='Charts'
                    onClick={() => dashboard.setActiveTab(DBOT_TABS.CHART)}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#c2c6d0',
                        fontSize: '1.8rem',
                        cursor: 'pointer',
                    }}
                >
                    📈
                </button>
                <div style={{ width: '24px', height: '1px', background: 'rgba(255,255,255,0.12)' }} />
                <button
                    title='Zoom In'
                    onClick={() => setZoom(z => Math.min(1.25, Number((z + 0.08).toFixed(2))))}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#c2c6d0',
                        fontSize: '1.7rem',
                        cursor: 'pointer',
                    }}
                >
                    🔍+
                </button>
                <button
                    title='Zoom Out'
                    onClick={() => setZoom(z => Math.max(0.75, Number((z - 0.08).toFixed(2))))}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#c2c6d0',
                        fontSize: '1.7rem',
                        cursor: 'pointer',
                    }}
                >
                    🔍-
                </button>
                <button
                    title='Reset Zoom'
                    onClick={() => setZoom(1)}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#c2c6d0',
                        fontSize: '1.6rem',
                        cursor: 'pointer',
                    }}
                >
                    ↺
                </button>
            </div>

            {/* Main Blockly Canvas Area */}
            <div
                style={{
                    flex: 1,
                    overflowY: 'auto',
                    overflowX: 'auto',
                    padding: '1.6rem 2rem 6rem 2rem',
                    maxWidth: 'calc(100vw - 52px)',
                }}
            >
                {/* Loaded Bot Top Bar */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '1rem',
                        marginBottom: '1.6rem',
                        padding: '1rem 1.6rem',
                        background: '#151c2c',
                        border: '1px solid rgba(0, 167, 158, 0.45)',
                        borderRadius: '0.8rem',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span
                            style={{
                                background: '#00a79e',
                                color: '#fff',
                                fontSize: '1.1rem',
                                fontWeight: 700,
                                padding: '0.3rem 0.8rem',
                                borderRadius: '0.4rem',
                            }}
                        >
                            LOADED BOT
                        </span>
                        <span style={{ fontSize: '1.6rem', fontWeight: 700, color: '#ffffff' }}>{strategyName}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                        <button
                            onClick={() => load_modal.toggleLoadModal()}
                            style={{
                                padding: '0.6rem 1.2rem',
                                borderRadius: '0.5rem',
                                border: '1px solid rgba(255,255,255,0.2)',
                                background: '#1e2638',
                                color: '#ffffff',
                                fontSize: '1.2rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                            }}
                        >
                            Import XML
                        </button>
                        <button
                            onClick={() => dashboard.setActiveTab(DBOT_TABS.FREE_BOTS)}
                            style={{
                                padding: '0.6rem 1.2rem',
                                borderRadius: '0.5rem',
                                border: '1px solid #00a79e',
                                background: 'transparent',
                                color: '#00a79e',
                                fontSize: '1.2rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                            }}
                        >
                            Switch Free Bot
                        </button>
                        <button
                            onClick={() =>
                                run_panel.is_running ? run_panel.onStopBotClick() : run_panel.onRunButtonClick()
                            }
                            style={{
                                padding: '0.6rem 1.8rem',
                                borderRadius: '0.5rem',
                                border: 'none',
                                background: run_panel.is_running ? '#ff444f' : '#2563eb',
                                color: '#ffffff',
                                fontSize: '1.3rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                            }}
                        >
                            {run_panel.is_running ? '⏹ Stop' : '▶ Run'}
                        </button>
                    </div>
                </div>

                {/* Blockly Visual Blocks Container */}
                <div
                    style={{
                        transform: `scale(${zoom})`,
                        transformOrigin: 'top left',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2rem',
                        maxWidth: '760px',
                    }}
                >
                    {/* BLOCK 1: 1. Trade parameters */}
                    <div
                        style={{
                            background: '#0d5c75',
                            borderRadius: '0.6rem',
                            padding: '1.2rem 1.2rem 1.6rem 1.6rem',
                            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.35)',
                            borderLeft: '6px solid #094558',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.8rem',
                                fontSize: '1.5rem',
                                fontWeight: 700,
                                color: '#ffffff',
                                marginBottom: '1rem',
                            }}
                        >
                            <span>📋</span>
                            <span>1. Trade parameters</span>
                        </div>

                        {/* Market Sub-block */}
                        <div style={{ ...subBlockRowStyle, flexDirection: 'column', alignItems: 'flex-start' }}>
                            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.6rem' }}>
                                <span>Market:</span>
                                <span style={pillStyle}>synthetics ▾</span>
                                <span>&gt;</span>
                                <span style={pillStyle}>Continuous Indices ▾</span>
                                <span>&gt;</span>
                                <span style={pillStyle}>{blocks.symbol} ▾</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '0.4rem' }}>
                                <span>Alternate markets (Continuous Indices only):</span>
                                <input type='checkbox' readOnly checked={false} style={{ accentColor: '#151717' }} />
                            </div>
                        </div>

                        {/* Trade Type Sub-block */}
                        <div style={subBlockRowStyle}>
                            <span>Trade Type:</span>
                            <span style={pillStyle}>{blocks.tradeTypeCategory} ▾</span>
                            <span>&gt;</span>
                            <span style={pillStyle}>{blocks.tradeType} ▾</span>
                        </div>

                        {/* Contract Type Sub-block */}
                        <div style={subBlockRowStyle}>
                            <span>Contract Type:</span>
                            <span style={pillStyle}>{blocks.contractType} ▾</span>
                        </div>

                        {/* Default Candle Interval Sub-block */}
                        <div style={subBlockRowStyle}>
                            <span>Default Candle Interval:</span>
                            <span style={pillStyle}>{blocks.candleInterval} ▾</span>
                        </div>

                        {/* Restart buy/sell on error */}
                        <div style={subBlockRowStyle}>
                            <span>Restart buy/sell on error (disable for better performance):</span>
                            <input
                                type='checkbox'
                                readOnly
                                checked={blocks.restartBuySellOnError}
                                style={{ accentColor: '#151717' }}
                            />
                        </div>

                        {/* Restart last trade on error */}
                        <div style={subBlockRowStyle}>
                            <span>Restart last trade on error (bot ignores the unsuccessful trade):</span>
                            <input
                                type='checkbox'
                                readOnly
                                checked={blocks.restartLastTradeOnError}
                                style={{ accentColor: '#151717' }}
                            />
                        </div>

                        {/* Run once at start section */}
                        <div
                            style={{
                                fontSize: '1.45rem',
                                fontWeight: 700,
                                color: '#ffffff',
                                margin: '1.2rem 0 0.8rem 0',
                            }}
                        >
                            Run once at start:
                        </div>

                        {blocks.initVariables.map((v, idx) => (
                            <div
                                key={`${v.name}-${idx}`}
                                style={{
                                    ...subBlockRowStyle,
                                    width: 'fit-content',
                                    minWidth: '260px',
                                }}
                            >
                                <span>set</span>
                                <span style={pillStyle}>{v.name} ▾</span>
                                <span>to</span>
                                <span
                                    style={{
                                        ...pillStyle,
                                        background: isNaN(Number(v.value)) ? '#d0d5d8' : '#151717',
                                        color: isNaN(Number(v.value)) ? '#151717' : '#ffffff',
                                    }}
                                >
                                    {v.value}
                                </span>
                            </div>
                        ))}

                        {/* Trade options section */}
                        <div
                            style={{
                                fontSize: '1.45rem',
                                fontWeight: 700,
                                color: '#ffffff',
                                margin: '1.2rem 0 0.8rem 0',
                            }}
                        >
                            Trade options:
                        </div>

                        {blocks.isAccumulator ? (
                            <div style={subBlockRowStyle}>
                                <span>Growth Rate:</span>
                                <span style={pillStyle}>{blocks.growthRate} ▾</span>
                                <span>Stake: USD</span>
                                <span style={pillStyle}>{blocks.stakeDisplay}</span>
                                <span>Take Profit: USD</span>
                                <span style={pillStyle}>{blocks.takeProfit}</span>
                            </div>
                        ) : (
                            <div style={subBlockRowStyle}>
                                <span>Duration:</span>
                                <span style={pillStyle}>{blocks.durationType} ▾</span>
                                <span style={pillStyle}>{blocks.durationValue}</span>
                                <span>Stake: USD</span>
                                <span
                                    style={{
                                        ...pillStyle,
                                        background: isNaN(Number(blocks.stakeDisplay)) ? '#cfd4d7' : '#151717',
                                        color: isNaN(Number(blocks.stakeDisplay)) ? '#151717' : '#ffffff',
                                    }}
                                >
                                    {blocks.stakeDisplay} ▾
                                </span>
                                <span style={{ fontSize: '1.15rem', color: '#555' }}>(min: 0.35 - max: 50000)</span>
                                <span>Prediction:</span>
                                <span style={pillStyle}>{blocks.predictionDisplay}</span>
                            </div>
                        )}
                    </div>

                    {/* BLOCK 2: 2. Purchase conditions */}
                    <div
                        style={{
                            background: '#0d5c75',
                            borderRadius: '0.6rem',
                            padding: '1.2rem 1.2rem 1.6rem 1.6rem',
                            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.35)',
                            borderLeft: '6px solid #094558',
                            maxWidth: '520px',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.8rem',
                                fontSize: '1.5rem',
                                fontWeight: 700,
                                color: '#ffffff',
                                marginBottom: '1rem',
                            }}
                        >
                            <span>🛒</span>
                            <span>2. Purchase conditions</span>
                        </div>
                        <div style={subBlockRowStyle}>
                            <span>Purchase</span>
                            <span style={pillStyle}>{blocks.purchaseContract} ▾</span>
                        </div>
                    </div>

                    {/* BLOCK 4: 4. Restart trading conditions */}
                    <div
                        style={{
                            background: '#0d5c75',
                            borderRadius: '0.6rem',
                            padding: '1.2rem 1.2rem 1.6rem 1.6rem',
                            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.35)',
                            borderLeft: '6px solid #094558',
                            maxWidth: '620px',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.8rem',
                                fontSize: '1.5rem',
                                fontWeight: 700,
                                color: '#ffffff',
                                marginBottom: '1rem',
                            }}
                        >
                            <span>🔄</span>
                            <span>4. Restart trading conditions</span>
                        </div>
                        <div style={subBlockRowStyle}>
                            <span>if</span>
                            <span style={pillStyle}>Result is Win ▾</span>
                            <span>→ Reset</span>
                            <span style={pillStyle}>Stake ▾</span>
                            <span>to Base Stake</span>
                        </div>
                        <div style={subBlockRowStyle}>
                            <span>else (Loss) → Multiply Stake Recovery &amp; Check</span>
                            <span style={pillStyle}>Target Profit ({dashboard.selected_strategy_target_profit})</span>
                        </div>
                        <div style={{ ...subBlockRowStyle, width: 'fit-content' }}>
                            <span style={pillStyle}>Trade again</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

const TutorialsTab = () => (
    <div
        style={{
            padding: '2.4rem',
            height: 'var(--tab-content-height, calc(100vh - 16.6rem))',
            overflowY: 'auto',
            color: 'var(--text-general, #333)',
        }}
    >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 700, marginBottom: '1.6rem' }}>
                Deriv Bot Guides &amp; FAQ
            </h2>
            <div style={{ display: 'grid', gap: '1.6rem' }}>
                <div
                    style={{
                        background: 'var(--general-main-1, #ffffff)',
                        border: '1px solid var(--border-normal, #e6e9e9)',
                        borderRadius: '0.8rem',
                        padding: '2rem',
                    }}
                >
                    <h3 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.8rem' }}>
                        How do I load a pre-built Free Bot?
                    </h3>
                    <p style={{ fontSize: '1.4rem', color: 'var(--text-less-prominent, #6e6e6e)', lineHeight: 1.6 }}>
                        Open the Free Bots tab, choose a strategy category (Speed Trading, AI Trading, Pattern Analysis, or Accumulators), and click &ldquo;Load Bot into Builder&rdquo;.
                    </p>
                </div>
                <div
                    style={{
                        background: 'var(--general-main-1, #ffffff)',
                        border: '1px solid var(--border-normal, #e6e9e9)',
                        borderRadius: '0.8rem',
                        padding: '2rem',
                    }}
                >
                    <h3 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.8rem' }}>
                        How do I run and monitor my bot?
                    </h3>
                    <p style={{ fontSize: '1.4rem', color: 'var(--text-less-prominent, #6e6e6e)', lineHeight: 1.6 }}>
                        Use the Run Panel on the right side of the Bot Builder or Charts tab to start and stop your bot, inspect live contract summaries, and review transaction history.
                    </p>
                </div>
            </div>
        </div>
    </div>
);

const tabLabelStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.7rem',
};

const Main = observer(() => {
    const { dashboard } = useStore();
    const { active_tab, setActiveTab } = dashboard;

    return (
        <div className='main' style={{ position: 'relative' }}>
            <div className='main__container'>
                <Tabs active_index={active_tab} onTabItemClick={setActiveTab} top is_scrollable>
                    <div
                        label={
                            <span style={tabLabelStyle}>
                                <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                                    <path d='M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1V9.5z' />
                                </svg>
                                <Localize i18n_default_text='Dashboard' />
                            </span>
                        }
                        id='id-dbot-dashboard'
                    >
                        <DashboardTab />
                    </div>
                    <div
                        label={
                            <span style={tabLabelStyle}>
                                <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                                    <circle cx='12' cy='12' r='3' />
                                    <path d='M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z' />
                                </svg>
                                <Localize i18n_default_text='Bot Builder' />
                            </span>
                        }
                        id='id-bot-builder'
                    >
                        <BotBuilderWorkspace />
                    </div>
                    <div
                        label={
                            <span style={tabLabelStyle}>
                                <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='#38bdf8' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                                    <polyline points='22 12 18 12 15 21 9 3 6 12 2 12' />
                                </svg>
                                <Localize i18n_default_text='Charts' />
                            </span>
                        }
                        id='id-charts'
                    >
                        <div style={{ height: 'var(--tab-content-height, calc(100vh - 16.6rem))' }}>
                            <TradingViewComponent />
                        </div>
                    </div>
                    <div
                        label={
                            <span style={tabLabelStyle}>
                                <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='#a78bfa' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                                    <path d='M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z' />
                                    <path d='M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z' />
                                </svg>
                                <Localize i18n_default_text='Tutorials' />
                            </span>
                        }
                        id='id-tutorials'
                    >
                        <TutorialsTab />
                    </div>
                    <div
                        label={
                            <span style={tabLabelStyle}>
                                <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='#34d399' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                                    <path d='M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3L12 3z' />
                                </svg>
                                <Localize i18n_default_text='Free Bots' />
                            </span>
                        }
                        id='id-free-bots'
                    >
                        <FreeBots />
                    </div>
                    <div
                        label={
                            <span style={tabLabelStyle}>
                                <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='#fb923c' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                                    <path d='M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04z' />
                                    <path d='M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04z' />
                                </svg>
                                <Localize i18n_default_text='Analysis Tool' />
                            </span>
                        }
                        id='id-analysis-tool'
                    >
                        <AnalysisTool />
                    </div>
                </Tabs>
            </div>
            <RunPanel />
            <LoadModal />
            <TradingViewModal />
        </div>
    );
});

export default Main;
