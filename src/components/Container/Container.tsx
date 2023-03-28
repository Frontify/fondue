/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';

export type PaddingType = 0 | 4 | 8 | 12 | 16 | 20 | 24 | 28 | 32 | 36 | 40;
export type ContainerProps = {
    children?: React.ReactNode;
    minWidth?: number;
    maxWidth?: number;
    padding?: PaddingType;
    ['data-test-id']?: string;
};

export const Container = ({ children, minWidth, maxWidth, padding = 0, ...props }: ContainerProps) => {
    const acceptablePaddingInput: PaddingType[] = [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40];
    const paddingMap = {
        0: 'tw-p-0',
        4: 'tw-p-1',
        8: 'tw-p-2',
        12: 'tw-p-3',
        16: 'tw-p-4',
        20: 'tw-p-5',
        24: 'tw-p-6',
        28: 'tw-p-7',
        32: 'tw-p-8',
        36: 'tw-p-9',
        40: 'tw-p-10',
    };

    const paddingClassName = acceptablePaddingInput.includes(padding) ? paddingMap[padding] : paddingMap[0];

    return (
        <div
            data-test-id={props['data-test-id'] ? `fondue-${props['data-test-id']}` : 'fondue-container'}
            className={paddingClassName}
            style={{
                maxWidth,
                minWidth,
            }}
        >
            {children}
        </div>
    );
};
Container.displayName = 'FondueContainer';
