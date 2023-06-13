/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconPlus } from '@foundation/Icon/Generated';
import { IconSize } from '@foundation/Icon/IconSize';
import { useButton } from '@react-aria/button';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import { FOCUS_STYLE } from '@utilities/focusStyle';
import { merge } from '@utilities/merge';
import React, { ReactElement, useRef } from 'react';

export enum AddBlockButtonDirection {
    Horizontal = 'Horizontal',
    Vertical = 'Vertical',
}

export enum ButtonDirection {
    Left = 'Left',
    Top = 'Top',
    Bottom = 'Bottom',
    Right = 'Right',
}

export type AddBlockButtonProps = {
    onClick: () => void;
    title?: string;
    /** @deprecated use direction with ButtonDirection */
    orientation?: AddBlockButtonDirection;
    direction?: ButtonDirection;
    'data-test-id'?: string;
};

export const AddBlockButton = ({
    onClick,
    title,
    direction = ButtonDirection.Right,
    orientation = AddBlockButtonDirection.Horizontal,
    'data-test-id': dataTestId = 'add-block-button',
}: AddBlockButtonProps): ReactElement => {
    const { isFocusVisible, focusProps } = useFocusRing();
    const ref = useRef<HTMLButtonElement | null>(null);
    const { buttonProps } = useButton({ onPress: () => onClick() }, ref);

    return (
        <button
            {...mergeProps(buttonProps, focusProps)}
            title={title}
            data-test-id={dataTestId}
            className={merge([
                'tw-group tw-leading-none tw-rounded-sm tw-outline-none',
                isFocusVisible && FOCUS_STYLE,
                orientation === AddBlockButtonDirection.Vertical ? 'tw-rotate-90' : 'tw-rotate-0',
                direction === ButtonDirection.Right && 'tw-rotate-0',
                direction === ButtonDirection.Left && 'tw-rotate-180',
                direction === ButtonDirection.Bottom && 'tw-rotate-90',
                direction === ButtonDirection.Top && 'tw-rotate-[270deg]',
            ])}
        >
            <span
                className={
                    'tw-text-box-selected-strong-inverse tw-bg-box-selected-strong tw-rounded tw-inline-flex tw-items-center tw-w-7 tw-h-6 tw-relative tw-p-1 tw-transition-colors hover:tw-bg-box-selected-strong-hover hover:tw-text-box-selected-strong-inverse-hover group-active:tw-bg-box-selected-strong-pressed group-active:tw-text-bg-box-selected-strong-inverse-pressed'
                }
                style={{
                    clipPath: `path(
                        "M27.3333 10.9369L21.7246 2C20.5 0.5 19.5 0 18 0H4C1.79086 0 0 1.79086 0 4V20C0 22.2091 1.79086 24 4 24H18C19.5 24 20.5 23.5 21.7246 22L27.3333 13.0631C27.7412 12.4131 27.7412 11.5869 27.3333 10.9369Z"
                    )`,
                }}
            >
                <IconPlus size={IconSize.Size16} />
            </span>
        </button>
    );
};
AddBlockButton.displayName = 'FondueAddBlockButton';
