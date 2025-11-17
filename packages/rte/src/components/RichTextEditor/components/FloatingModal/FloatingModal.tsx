/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type CSSProperties, type ReactNode } from 'react';

export const FLOATING_MODAL_SELECTOR = '[data-floating-modal]';

export type FloatingModalWrapperProps = {
    children: ReactNode;
    minWidth: CSSProperties['minWidth'];
    padding: CSSProperties['padding'];
    'data-test-id'?: string;
};

export const FloatingModalWrapper = ({
    children,
    minWidth,
    padding,
    'data-test-id': dataTestId = 'floating-modal',
}: FloatingModalWrapperProps) => (
    <div
        data-test-id={dataTestId}
        className="tw-bg-white tw-rounded tw-shadow tw-overflow-y-auto"
        style={{ minWidth, padding }}
        data-floating-modal
    >
        {children}
    </div>
);
