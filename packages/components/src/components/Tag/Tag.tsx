/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

type TagProps = {
    children: ReactNode;
};

export const Tag = ({ children }: TagProps) => {
    return (
        <div
            className="tw-text-text tw-bg-box-selected tw-border-box-selected-strong tw-border-2 tw-p-2 tw-rounded tw-w-fit"
            data-test-id="fondue-tag"
        >
            {children}
        </div>
    );
};
