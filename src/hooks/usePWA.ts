export const usePWA = () => {
    return {
        isPWA: false,
        isInstalled: false,
        canInstall: false,
        installPWA: async () => {},
        install: async () => false,
        isIOS: false,
        isAndroid: false,
        isPWALaunch: false,
    };
};

export const usePWAUpdate = () => {
    return {
        showUpdatePrompt: false,
        handleUpdate: () => {},
        dismissUpdate: () => {},
    };
};

export default usePWA;
