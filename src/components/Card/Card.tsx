/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useButton } from '@react-aria/button';
import { merge } from '@utilities/merge';
import React, { ReactElement, ReactNode, useRef } from 'react';
import { PressEvent } from '@react-types/shared';
import { mergeProps } from '@react-aria/utils';
import { useFocusRing } from '@react-aria/focus';
import { FOCUS_STYLE } from '@utilities/focusStyle';

export type CardProps = {
    children: ReactNode | ReactNode[];
    hoverable?: boolean;
    onClick?: (event: PressEvent) => void;
};

export const Card = ({ hoverable = false, children, onClick }: CardProps): ReactElement => {
    const ref = useRef<HTMLDivElement | null>(null);
    const { buttonProps } = useButton(
        { elementType: 'div', onPress: (event: PressEvent) => onClick && onClick(event) },
        ref,
    );
    const { isFocusVisible, focusProps } = useFocusRing();

    const clickableProps = !!onClick ? mergeProps(buttonProps, focusProps) : {};

    return (
        <div
            {...clickableProps}
            data-test-id="card"
            ref={ref}
            className={merge([
                'tw-w-full tw-outline-none tw-bg-white tw-border tw-border-black-10 tw-rounded tw-overflow-hidden',
                hoverable ? 'hover:tw-border-black' : '',
                onClick ? 'tw-cursor-pointer' : 'tw-cursor-default',
                isFocusVisible && FOCUS_STYLE,
            ])}
        >
            {children}
        </div>
    );
};
Card.displayName = 'FondueCard';
