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
    bold = true,
    type,
    as: Heading = 'div',
}) => {
    const icon = (
        <AccordionHeaderIcon isOpen={isOpen} disabled={disabled} size={AccordionHeaderIconSize.Medium} type={type} />
    );
    return (
        <div className="tw-px-8 tw-py-6">
            <header
                data-test-id="fieldset-header"
                className={merge([
                    'tw-flex tw-items-center tw-gap-x-1.5 tw-w-full tw-flex-row',
                    disabled ? 'tw-text-black-40' : 'dark:tw-text-white',
                    !disabled && isOpen ? 'tw-text-black' : 'tw-text-black-80',
                ])}
            >
                {isValidElement(decorator) && (
                    <span className="tw-shrink-0">
                        {cloneElement(decorator as ReactElement<IconProps>, {
                            size: IconSize.Size16,
                        })}
                    </span>
                )}
                <Heading className={merge(['tw-text-left tw-text-m', bold ? 'tw-font-medium' : 'tw-font-normal'])}>
                    {children}
                </Heading>
                {icon && <span className="tw-ml-auto tw-shrink-0">{icon}</span>}
            </header>
        </div>
    );
};
