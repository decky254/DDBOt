import { useEffect, useState } from 'react';

export const useNetworkStatus = () => {
    const [status, setStatus] = useState<'online' | 'offline'>('online');

    useEffect(() => {
        const handleOnline = () => setStatus('online');
        const handleOffline = () => setStatus('offline');

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return status;
};

export default useNetworkStatus;
