/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Children, ReactElement, ReactNode, cloneElement, isValidElement } from 'react';
import { ButtonProps, ButtonSize } from '@components/Button';
import { merge } from '@utilities/merge';

export type ButtonGroupProps = { size: ButtonSize; children?: ReactNode; 'data-test-id'?: string };

const spacing: Record<ButtonSize, string> = {
    [ButtonSize.Small]: 'tw-gap-x-1',
    [ButtonSize.Medium]: 'tw-gap-x-2',
    [ButtonSize.Large]: 'tw-gap-x-3',
};

export const ButtonGroup = ({
    children,
    size,
    'data-test-id': dataTestId = 'button-group',
}: ButtonGroupProps): ReactElement => {
    return (
        <div data-test-id={dataTestId} className={merge(['tw-display tw-inline-flex tw-flex-row', spacing[size]])}>
            {Children.map(children, (child) => {
                if (!isValidElement(child)) {
                    return null;
                }

                return cloneElement(child as ReactElement<ButtonProps>, { size });
            })}
        </div>
    );
};
ButtonGroup.displayName = 'FondueButtonGroup';
