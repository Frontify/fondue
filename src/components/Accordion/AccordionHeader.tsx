/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, ReactElement, cloneElement, isValidElement } from 'react';
import { IconProps, IconSize } from '@foundation/Icon';
import { merge } from '@utilities/merge';
import { AccordionHeaderIconSize, AccordionHeaderProps } from './types';
import { AccordionHeaderIcon } from './AccordionHeaderIcon';

export const AccordionHeader: FC<AccordionHeaderProps> = ({
    isOpen = false,
    decorator,
    disabled = false,
    children,
    size = AccordionHeaderIconSize.Medium,
    bold = true,
    type,
    as: Heading = 'div',
}) => {
    const icon = <AccordionHeaderIcon isOpen={isOpen} disabled={disabled} size={size} type={type} />;
    return (
        <div data-test-id="accordion-header" className="tw-px-8 tw-py-6">
            <header
                data-test-id="fieldset-header"
                className={merge([
                    'tw-flex tw-items-center tw-gap-x-1.5 tw-w-full tw-flex-row',
                    !disabled && isOpen ? 'tw-text-black' : 'tw-text-black-80',
                    disabled ? 'tw-text-black-40' : 'dark:tw-text-white',
                ])}
            >
                {isValidElement(decorator) && (
                    <span data-test-id="accordion-header-decorator" className="tw-shrink-0">
                        {cloneElement(decorator as ReactElement<IconProps>, {
                            size: IconSize.Size16,
                        })}
                    </span>
                )}
                <Heading
                    data-test-id="accordion-header-text"
                    className={merge(['tw-text-left tw-text-m', bold ? 'tw-font-medium' : 'tw-font-normal'])}
                >
                    {children}
                </Heading>
                {icon && (
                    <span data-test-id="header-icon-container" className="tw-ml-auto tw-shrink-0">
                        {icon}
                    </span>
                )}
            </header>
        </div>
    );
};
AccordionHeader.displayName = 'FondueAccordionHeader';
