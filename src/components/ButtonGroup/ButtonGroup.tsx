/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { Children, FC, PropsWithChildren, cloneElement, isValidElement } from 'react';
import { ButtonSize } from '@components/Button/Button';
import { merge } from '@utilities/merge';

export type ButtonGroupProps = PropsWithChildren<{ size: ButtonSize }>;

const spacing: Record<ButtonSize, string> = {
    [ButtonSize.Small]: 'tw-gap-x-1',
    [ButtonSize.Medium]: 'tw-gap-x-2',
    [ButtonSize.Large]: 'tw-gap-x-3',
};

export const ButtonGroup: FC<ButtonGroupProps> = ({ children, size }) => {
    return (
        <div data-test-id="button-group" className={merge(['tw-display tw-inline-flex tw-flex-row', spacing[size]])}>
            {Children.map(children, (child) => {
                if (!isValidElement(child)) {
                    return null;
                }

                return cloneElement(child, { size });
            })}
        </div>
    );
};
