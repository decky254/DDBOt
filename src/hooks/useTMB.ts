export const useTMB = () => {
    const isTmbEnabled = async () => false;
    const onRenderTMBCheck = async (_fromLogin?: boolean) => {};
    return { isTmbEnabled, is_tmb_enabled: false, onRenderTMBCheck };
};

export default useTMB;
