import React, { useEffect, useState } from 'react';

const MARKETS = [
    'Volatility 10 (1s) Index',
    'Volatility 25 (1s) Index',
    'Volatility 50 (1s) Index',
    'Volatility 75 (1s) Index',
    'Volatility 100 (1s) Index',
    'Volatility 100 Index',
];

const AnalysisTool = () => {
    const [selectedMarket, setSelectedMarket] = useState(MARKETS[4]);
    const [lastDigits, setLastDigits] = useState<number[]>([4, 7, 2, 9, 0, 5, 8, 1, 6, 3, 7, 4, 2, 8, 5, 9, 1, 3, 6, 0]);
    const [currentPrice, setCurrentPrice] = useState<number>(1428.54);

    useEffect(() => {
        const interval = setInterval(() => {
            const delta = (Math.random() - 0.49) * 1.8;
            setCurrentPrice(prev => {
                const next = Math.max(100, Number((prev + delta).toFixed(2)));
                const lastDigit = Number(next.toFixed(2).slice(-1));
                setLastDigits(d => [...d.slice(-49), lastDigit]);
                return next;
            });
        }, 1200);
        return () => clearInterval(interval);
    }, [selectedMarket]);

    const digitCounts = Array.from({ length: 10 }, (_, digit) => {
        const count = lastDigits.filter(d => d === digit).length;
        const pct = lastDigits.length ? Math.round((count / lastDigits.length) * 100) : 10;
        return { digit, count, pct };
    });

    const evenCount = lastDigits.filter(d => d % 2 === 0).length;
    const evenPct = lastDigits.length ? Math.round((evenCount / lastDigits.length) * 100) : 50;
    const oddPct = 100 - evenPct;

    return (
        <div
            className='analysis-tool-page'
            style={{
                padding: '2.4rem',
                height: 'var(--tab-content-height, calc(100vh - 16.6rem))',
                overflowY: 'auto',
                color: 'var(--text-general, #333)',
            }}
        >
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
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
                            Live Digit & Tick Analysis Tool
                        </h2>
                        <p style={{ fontSize: '1.4rem', color: 'var(--text-less-prominent, #6e6e6e)' }}>
                            Real-time last-digit frequency distribution and Even/Odd parity monitor.
                        </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                        <select
                            value={selectedMarket}
                            onChange={e => setSelectedMarket(e.target.value)}
                            style={{
                                padding: '0.8rem 1.2rem',
                                borderRadius: '0.6rem',
                                border: '1px solid var(--border-normal, #d6dadb)',
                                background: 'var(--general-main-1, #ffffff)',
                                color: 'var(--text-general, #333)',
                                fontSize: '1.4rem',
                            }}
                        >
                            {MARKETS.map(m => (
                                <option key={m} value={m}>
                                    {m}
                                </option>
                            ))}
                        </select>
                        <div
                            style={{
                                padding: '0.8rem 1.6rem',
                                borderRadius: '0.6rem',
                                background: '#00a79e',
                                color: '#fff',
                                fontWeight: 700,
                                fontSize: '1.5rem',
                            }}
                        >
                            Spot: {currentPrice.toFixed(2)}
                        </div>
                    </div>
                </div>

                <div
                    style={{
                        background: 'var(--general-main-1, #ffffff)',
                        border: '1px solid var(--border-normal, #e6e9e9)',
                        borderRadius: '0.8rem',
                        padding: '2rem',
                        marginBottom: '2rem',
                    }}
                >
                    <h3 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '1.6rem' }}>
                        Digit Distribution (Last {lastDigits.length} Ticks)
                    </h3>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(10, minmax(60px, 1fr))',
                            gap: '1rem',
                            alignItems: 'end',
                        }}
                    >
                        {digitCounts.map(({ digit, pct }) => {
                            const isCurrent = lastDigits[lastDigits.length - 1] === digit;
                            return (
                                <div key={digit} style={{ textAlign: 'center' }}>
                                    <div
                                        style={{
                                            height: '120px',
                                            display: 'flex',
                                            alignItems: 'flex-end',
                                            justifyContent: 'center',
                                            marginBottom: '0.8rem',
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: '100%',
                                                maxWidth: '42px',
                                                height: `${Math.max(12, pct * 3)}px`,
                                                background: isCurrent ? '#ff444f' : '#00a79e',
                                                borderRadius: '0.4rem 0.4rem 0 0',
                                                transition: 'height 0.25s ease',
                                            }}
                                        />
                                    </div>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>{pct}%</div>
                                    <div
                                        style={{
                                            marginTop: '0.4rem',
                                            width: '3.2rem',
                                            height: '3.2rem',
                                            lineHeight: '3.2rem',
                                            borderRadius: '50%',
                                            margin: '0.4rem auto 0',
                                            background: isCurrent ? '#ff444f' : 'var(--general-section-1, #f2f3f4)',
                                            color: isCurrent ? '#fff' : 'var(--text-general, #333)',
                                            fontWeight: 700,
                                            fontSize: '1.4rem',
                                        }}
                                    >
                                        {digit}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '1.6rem',
                    }}
                >
                    <div
                        style={{
                            background: 'var(--general-main-1, #ffffff)',
                            border: '1px solid var(--border-normal, #e6e9e9)',
                            borderRadius: '0.8rem',
                            padding: '2rem',
                        }}
                    >
                        <h3 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '1.2rem' }}>
                            Even vs Odd Parity
                        </h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.4rem', marginBottom: '0.8rem' }}>
                            <span>Even: <strong>{evenPct}%</strong></span>
                            <span>Odd: <strong>{oddPct}%</strong></span>
                        </div>
                        <div style={{ height: '1.2rem', borderRadius: '0.6rem', background: '#ff444f', overflow: 'hidden' }}>
                            <div style={{ width: `${evenPct}%`, height: '100%', background: '#00a79e' }} />
                        </div>
                    </div>

                    <div
                        style={{
                            background: 'var(--general-main-1, #ffffff)',
                            border: '1px solid var(--border-normal, #e6e9e9)',
                            borderRadius: '0.8rem',
                            padding: '2rem',
                        }}
                    >
                        <h3 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '1.2rem' }}>
                            Recent Tick Digits
                        </h3>
                        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                            {lastDigits.slice(-14).map((d, i) => (
                                <span
                                    key={i}
                                    style={{
                                        width: '2.8rem',
                                        height: '2.8rem',
                                        lineHeight: '2.8rem',
                                        textAlign: 'center',
                                        borderRadius: '0.4rem',
                                        fontWeight: 700,
                                        fontSize: '1.3rem',
                                        background: d % 2 === 0 ? 'rgba(0, 167, 158, 0.15)' : 'rgba(255, 68, 79, 0.15)',
                                        color: d % 2 === 0 ? '#00a79e' : '#ff444f',
                                    }}
                                >
                                    {d}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalysisTool;
