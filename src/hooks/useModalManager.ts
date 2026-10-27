import { useState, useCallback } from 'react';

export const useModalManager = () => {
    const [activeModal, setActiveModal] = useState<string | null>(null);

    const showModal = useCallback((modalName: string) => {
        setActiveModal(modalName);
    }, []);

    const hideModal = useCallback(() => {
        setActiveModal(null);
    }, []);

    const isModalOpenFor = useCallback(
        (modalName: string) => activeModal === modalName,
        [activeModal]
    );

    return {
        hideModal,
        isModalOpenFor,
        showModal,
        isModalOpen: Boolean(activeModal),
        openModal: () => setActiveModal('default'),
        closeModal: hideModal,
    };
};

export default useModalManager;
