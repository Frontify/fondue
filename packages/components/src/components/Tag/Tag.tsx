/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

type TagProps = {
    children: ReactNode;
};

export const Tag = ({ children }: TagProps) => {
    return (
        <div className="tw-text-text tw-underline" data-test-id="fondue-tag">
            {children}
        </div>
    );
};
