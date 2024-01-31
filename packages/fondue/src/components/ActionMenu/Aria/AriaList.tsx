/* (c) Copyright Frontify Ltd., all rights reserved. */

import { merge } from '@utilities/merge';
import { HTMLAttributes, ReactNode, forwardRef } from 'react';

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
                'tw-list-none tw-p-0 tw-m-0 tw-bg-base tw-z-20 focus-visible:tw-outline-none',
                border && 'tw-border tw-border-line tw-rounded',
                scrollable && 'tw-overflow-y-auto',
            ])}
        >
            {children}
        </ul>
    ),
);

AriaList.displayName = 'FondueAriaList';
