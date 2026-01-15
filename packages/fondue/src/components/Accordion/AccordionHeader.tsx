/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactElement, cloneElement, isValidElement, useState } from 'react';

import { merge } from '@utilities/merge';

import { AccordionHeaderIcon } from './AccordionHeaderIcon';
import { type AccordionHeaderProps } from './types';

/**
 * @deprecated Please use updated Accordion component from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#accordion the migration guide}.
 */
const ACCORDION_HEADER_TEST_ID = 'fondue-accordion-header';

/**
 * @deprecated Please use updated Accordion component from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#accordion the migration guide}.
 */
export const AccordionHeader = ({
    isOpen = false,
    decorator,
    disabled = false,
    children,
    'data-test-id': dataTestId = ACCORDION_HEADER_TEST_ID,
}: AccordionHeaderProps) => {
    const [headingRef, setHeadingRef] = useState<HTMLSpanElement | null>(null);
    const icon = <AccordionHeaderIcon isOpen={isOpen} />;

    return (
        <span data-test-id={dataTestId} className="tw-block tw-px-8 tw-py-6">
            <span
                data-test-id={`${dataTestId}-container`}
                role="navigation"
                aria-label={`${headingRef?.innerText || ''}`}
                className={merge([
                    'tw-flex tw-items-center tw-gap-x-1.5 tw-w-full tw-flex-row',
                    !disabled && isOpen && 'tw-text-text',
                    !disabled && !isOpen && 'tw-text-text-weak hover:tw-text-text',
                    disabled && 'tw-text-text-disabled',
                ])}
            >
                {isValidElement(decorator) && (
                    <span data-test-id={`${dataTestId}-decorator`} className="tw-shrink-0 tw-leading-4">
                        {cloneElement(decorator as ReactElement, {
                            size: 16,
                        })}
                    </span>
                )}
                <span
                    ref={setHeadingRef}
                    data-test-id={`${dataTestId}-text`}
                    className="tw-text-left tw-text-m tw-font-normal"
                >
                    {children}
                </span>
                {icon && (
                    <span data-test-id={`${dataTestId}-icon-container`} className="tw-ml-auto tw-shrink-0">
                        {icon}
                    </span>
                )}
            </span>
        </span>
    );
};
AccordionHeader.displayName = 'FondueAccordionHeader';
