/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useMenuSection } from '@react-aria/menu';
import { type ReactElement, type ReactNode } from 'react';

/**
 * @deprecated Use `Dropdown` from `@frontify/fondue/components` instead.
 */
export type AriaSectionProps = {
    ariaLabel?: string;
    children: ReactNode;
};

/**
 * @deprecated Use `Dropdown` from `@frontify/fondue/components` instead.
 */
export const AriaSection = ({ ariaLabel, children }: AriaSectionProps): ReactElement => {
    const { itemProps, groupProps } = useMenuSection({ 'aria-label': ariaLabel });

    return (
        <li {...itemProps} className="tw-border-b tw-border-line last:tw-border-0" data-test-id="menu-block-divider">
            <ul {...groupProps} className="tw-py-2 tw-px-0 tw-m-0 tw-list-none" data-test-id="menu-item-list">
                {children}
            </ul>
        </li>
    );
};
AriaSection.displayName = 'FondueAriaSection';
