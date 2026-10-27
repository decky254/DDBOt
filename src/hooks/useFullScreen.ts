import { useState, useCallback } from 'react';

export const useFullScreen = () => {
    const [isFullScreen, setIsFullScreen] = useState(false);

    const toggleFullScreenMode = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen?.().catch(() => {});
            setIsFullScreen(true);
        } else {
            document.exitFullscreen?.().catch(() => {});
            setIsFullScreen(false);
        }
    }, []);

    return {
        isFullScreen,
        toggleFullScreen: toggleFullScreenMode,
        toggleFullScreenMode,
    };
};

export default useFullScreen;
