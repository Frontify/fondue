/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactElement, ReactNode, useRef, useState } from 'react';
import { useButton } from '@react-aria/button';
import { merge } from '@utilities/merge';
import { PressEvent } from '@react-types/shared';
import { mergeProps } from '@react-aria/utils';
import { useFocusRing } from '@react-aria/focus';
import { FOCUS_STYLE } from '@utilities/focusStyle';

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
        { elementType: 'div', onPress: (event: PressEvent) => onClick && onClick(event) },
        ref,
    );
    const { isFocusVisible, focusProps } = useFocusRing();

    const clickableProps = !!onClick ? mergeProps(buttonProps, focusProps) : {};

    React.useEffect(() => {
        ref.current?.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                setKeyDownTrue(true);
            }
        });
        ref.current?.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                setKeyDownTrue(false);
            }
        });

        return () => {
            ref.current?.removeEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    setKeyDownTrue(true);
                }
            });
            ref.current?.removeEventListener('keyup', (event) => {
                if (event.key === 'Enter') {
                    setKeyDownTrue(false);
                }
            });
        };
    });

    return (
        <div
            {...clickableProps}
            data-test-id={dataTestId}
            ref={ref}
            className={merge([
                'tw-w-full tw-outline-none tw-bg-white tw-border tw-border-line tw-rounded tw-overflow-hidden',
                hoverable ? 'hover:tw-border-line-xx-strong' : '',
                keyDownTrue && onClick ? 'tw-border-line-xx-strong tw-border-2 tw-ring-blue tw-ring-4' : '',
                onClick
                    ? 'tw-cursor-pointer active:tw-border-line-xx-strong active:tw-border-2'
                    : 'tw-cursor-default active:tw-border-line-xx-strong active:tw-border-2',
                isFocusVisible && FOCUS_STYLE && 'tw-border-line-xx-strong tw-ring-blue tw-ring-4',
            ])}
        >
            {children}
        </div>
    );
};
Card.displayName = 'FondueCard';
