import React from 'react';

export const dummy = () => {};
export const Icon: React.FC<any> = ({ icon, className }: any) => {
    return React.createElement('span', {
        className: `dc-icon ${className || ''}`,
        'data-icon': icon,
    });
};

export default dummy;
