import { useState, useRef, useEffect } from 'react';

export const useHover = <T extends HTMLElement = any>(targetRef?: any, flag?: boolean) => {
    const [isHovered, setIsHovered] = useState(false);
    const ref = useRef<T>(null);

    useEffect(() => {
        const node = targetRef?.current || ref.current;
        if (node) {
            const handleMouseEnter = () => setIsHovered(true);
            const handleMouseLeave = () => setIsHovered(false);

            node.addEventListener('mouseenter', handleMouseEnter);
            node.addEventListener('mouseleave', handleMouseLeave);

            return () => {
                node.removeEventListener('mouseenter', handleMouseEnter);
                node.removeEventListener('mouseleave', handleMouseLeave);
            };
        }
    }, [ref, targetRef]);

    return [targetRef || ref, isHovered] as const;
};

export const useHoverCallback = () => {
    const ref = useRef<any>(null);
    return [ref, false] as const;
};

export default useHover;
