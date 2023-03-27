/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';

export type PaddingType = 0 | 4 | 8 | 12 | 16 | 20 | 24 | 28 | 32 | 36 | 40;
export type ContainerProps = {
    children?: React.ReactNode;
    minWidth?: number;
    maxWidth?: number;
    padding?: PaddingType;
    dataTestId?: string;
};

export const Container = ({ children, dataTestId, minWidth, maxWidth, padding = 0 }: ContainerProps) => {
    const acceptablePaddingInput: PaddingType[] = [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40];

    return (
        <div
            data-test-id={dataTestId ? dataTestId : 'fondue-container'}
            style={{
                maxWidth,
                minWidth,
                padding: acceptablePaddingInput.includes(padding) ? padding : 0,
            }}
        >
            {children}
        </div>
    );
};
Container.displayName = 'FondueContainer';
