export const useRemoteConfig = (_enabled?: boolean) => ({
    data: {
        cs_chat_whatsapp: true,
        cs_chat_livechat: true,
        is_deriv_go_enabled: false,
    } as any,
});

export default useRemoteConfig;
