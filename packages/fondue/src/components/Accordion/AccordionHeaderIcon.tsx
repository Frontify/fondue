/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement } from 'react';
import { merge } from '@utilities/merge';
import { IconCaretDown } from '@foundation/Icon/Generated';
import { IconSize } from '@foundation/Icon/IconSize';
import { AccordionHeaderIconProps, AccordionHeaderIconSize } from './types';

export const ACCORDION_HEADER_ICON_ID = 'fondue-accordion-header-icon';

const sizeMap: Record<AccordionHeaderIconSize, IconSize> = {
    small: IconSize.Size12,
    medium: IconSize.Size16,
    large: IconSize.Size20,
};

export const AccordionHeaderIcon = ({
    size = 'medium',
    isOpen,
    'data-test-id': dataTestId = ACCORDION_HEADER_ICON_ID,
}: AccordionHeaderIconProps): ReactElement => {
    const props = {
        'aria-labelledby': '',
        size: sizeMap[size],
    };

    return (
        <span data-test-id={`${dataTestId}-wrapper`} className="tw-block">
            <span
                data-test-id={dataTestId}
                className={merge(['tw-block tw-transition-transform', isOpen && 'tw-rotate-180 tw-duration-300'])}
            >
                <IconCaretDown {...props} />
            </span>
        </span>
    );
};
AccordionHeaderIcon.displayName = 'FondueAccordionHeaderIcon';
