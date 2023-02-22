/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useMenuSection } from '@react-aria/menu';
import React, { FC } from 'react';

export type AriaSectionProps = {
    ariaLabel?: string;
};

export const AriaSection: FC<AriaSectionProps> = ({ ariaLabel, children }) => {
    const { itemProps, groupProps } = useMenuSection({ 'aria-label': ariaLabel });

    return (
        <li
            {...itemProps}
            className="tw-border-b tw-border-b-black-10 last:tw-border-0"
            data-test-id="menu-block-divider"
        >
            <ul {...groupProps} className="tw-py-2 tw-px-0 tw-m-0 tw-list-none" data-test-id="menu-item-list">
                {children}
            </ul>
        </li>
    );
};
