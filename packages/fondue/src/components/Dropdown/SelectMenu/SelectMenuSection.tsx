/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useListBoxSection } from '@react-aria/listbox';
import { ReactElement, ReactNode } from 'react';

type SelectMenuSectionProps = {
    ariaLabel?: string;
    children?: ReactNode;
};

export const SelectMenuSection = ({ ariaLabel, children }: SelectMenuSectionProps): ReactElement => {
    const { itemProps, groupProps } = useListBoxSection({ 'aria-label': ariaLabel });

    return (
        <li {...itemProps} className="tw-border-b tw-border-b-line last:tw-border-0" data-test-id="menu-block-divider">
            <ul {...groupProps} className="tw-py-2 tw-px-0 tw-m-0 tw-list-none" data-test-id="menu-item-list">
                {children}
            </ul>
        </li>
    );
};
SelectMenuSection.displayName = 'FondueSelectMenuSection';
