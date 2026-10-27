export const useOauth2 = ({ handleLogout }: { handleLogout?: () => void; client?: any } = {}) => {
    const oAuthLogout = async () => {
        if (handleLogout) {
            await handleLogout();
        }
    };
    return { oAuthLogout, isSingleLoggingIn: false };
};

export default useOauth2;
