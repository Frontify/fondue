/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { PropsWithChildren } from 'react';
import { merge } from '@utilities/merge';
import { IconCaretDown } from '@foundation/Icon/Generated';
import { IconSize } from '@foundation/Icon/IconSize';
import { AccordionHeaderIconProps, AccordionHeaderIconSize } from './types';

const ACCORDION_ICON_CONTAINER_ID = 'accordion-icon-container';

const sizeMap: Record<AccordionHeaderIconSize, IconSize> = {
    small: IconSize.Size12,
    medium: IconSize.Size16,
    large: IconSize.Size20,
};

export const AccordionHeaderIcon = ({
    size = 'medium',
    isOpen,
    disabled = false,
}: PropsWithChildren<AccordionHeaderIconProps>) => {
    const props = {
        'aria-labelledby': '',
        size: sizeMap[size],
    };

    return (
        <span data-test-id="fondue-accordion-header-icon-wrapper" className="tw-block">
            <span
                data-test-id={ACCORDION_ICON_CONTAINER_ID}
                className={merge([
                    'tw-block tw-transition-transform',
                    isOpen && 'tw-rotate-180 tw-duration-300',
                    !disabled && isOpen && 'tw-text-black',
                    !disabled && !isOpen && 'tw-text-black-80',
                    disabled && 'tw-text-black-40',
                ])}
            >
                <IconCaretDown {...props} />
            </span>
        </span>
    );
};
AccordionHeaderIcon.displayName = 'FondueAccordionHeaderIcon';
