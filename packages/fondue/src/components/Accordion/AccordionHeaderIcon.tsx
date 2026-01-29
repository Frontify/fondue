/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type FondueIconProps, IconCaretDown } from '@frontify/fondue-icons';
import { type ReactElement } from 'react';

import { merge } from '@utilities/merge';

import { type AccordionHeaderIconProps, type AccordionHeaderIconSize } from './types';

/**
 * @deprecated Please use updated Accordion component from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#accordion the migration guide}.
 */
const ACCORDION_HEADER_ICON_ID = 'fondue-accordion-header-icon';

const sizeMap: Record<AccordionHeaderIconSize, FondueIconProps['size']> = {
    small: 12,
    medium: 16,
    large: 20,
};

/**
 * @deprecated Please use updated Accordion component from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#accordion the migration guide}.
 */
export const AccordionHeaderIcon = ({
    size = 'medium',
    isOpen,
    'data-test-id': dataTestId = ACCORDION_HEADER_ICON_ID,
}: AccordionHeaderIconProps): ReactElement => (
    <span data-test-id={`${dataTestId}-wrapper`} className="tw-block">
        <span
            data-test-id={dataTestId}
            className={merge(['tw-block tw-transition-transform', isOpen && 'tw-rotate-180 tw-duration-300'])}
        >
            <IconCaretDown size={sizeMap[size]} />
        </span>
    </span>
);

AccordionHeaderIcon.displayName = 'FondueAccordionHeaderIcon';
