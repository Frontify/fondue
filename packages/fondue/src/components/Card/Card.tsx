/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useButton } from '@react-aria/button';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import { type PressEvent } from '@react-types/shared';
import { type ReactElement, type ReactNode, useRef, useState } from 'react';

import { FOCUS_STYLE } from '@utilities/focusStyle';
import { merge } from '@utilities/merge';

export type CardProps = {
    children: ReactNode | ReactNode[];
    hoverable?: boolean;
    onClick?: (event: PressEvent) => void;
    'data-test-id'?: string;
};

export const Card = ({
    hoverable = false,
    children,
    onClick,
    'data-test-id': dataTestId = 'card',
}: CardProps): ReactElement => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [keyDownTrue, setKeyDownTrue] = useState(false);
    const { buttonProps } = useButton(
        {
            elementType: 'div',
            onPress: (event: PressEvent) => onClick?.(event),
            onPressChange: (isPressed) => {
                setKeyDownTrue(isPressed);
            },
        },
        ref,
    );
    const { isFocusVisible, focusProps } = useFocusRing();

    const clickableProps = onClick ? mergeProps(buttonProps, focusProps) : {};

    return (
        <div
            {...clickableProps}
            data-test-id={dataTestId}
            ref={ref}
            className={merge([
                'tw-w-full tw-bg-white tw-outline tw-outline-1 tw-outline-line tw-outline-offset--1 tw-rounded tw-overflow-hidden',
                (hoverable || onClick) && 'hover:tw-outline-line-xx-strong',
                onClick
                    ? 'active:tw-outline-line-xx-strong active:tw-outline-2 active:tw-outline-offset--2 tw-cursor-pointer'
                    : 'tw-cursor-default',
                isFocusVisible && FOCUS_STYLE,
                keyDownTrue && onClick ? 'tw-outline-line-xx-strong tw-outline-2 tw-outline-offset--2' : '',
            ])}
        >
            {children}
        </div>
    );
};
Card.displayName = 'FondueCard';
