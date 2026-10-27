export const STRATEGIES = (): Record<string, { rs_strategy_name?: string }> => ({
    MARTINGALE: { rs_strategy_name: 'Martingale' },
    D_ALEMBERT: { rs_strategy_name: "D'Alembert" },
    OSCARS_GRIND: { rs_strategy_name: "Oscar's Grind" },
    REVERSE_MARTINGALE: { rs_strategy_name: 'Reverse Martingale' },
    REVERSE_D_ALEMBERT: { rs_strategy_name: "Reverse D'Alembert" },
    STRATEGY_1_3_2_6: { rs_strategy_name: '1-3-2-6' },
});
