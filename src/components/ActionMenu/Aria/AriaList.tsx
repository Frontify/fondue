/* (c) Copyright Frontify Ltd., all rights reserved. */

import { merge } from '@utilities/merge';
import React, { HTMLAttributes, ReactNode, forwardRef } from 'react';

export type AriaListProps = {
    ariaProps: HTMLAttributes<HTMLElement>;
    border?: boolean;
    children: ReactNode;
    scrollable?: boolean;
};

export const AriaList = forwardRef<HTMLUListElement | null, AriaListProps>(
    ({ ariaProps, children, scrollable = false, border = true }, ref) => (
        <ul
            {...ariaProps}
            ref={ref}
            className={merge([
                'tw-list-none tw-p-0 tw-m-0 tw-bg-white tw-z-20 focus-visible:tw-outline-none',
                border && 'tw-border tw-border-black-10 tw-rounded',
                scrollable && 'tw-overflow-y-auto',
            ])}
        >
            {children}
        </ul>
    ),
);

AriaList.displayName = 'AriaList';
