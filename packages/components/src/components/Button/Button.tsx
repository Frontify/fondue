/* (c) Copyright Frontify Ltd., all rights reserved. */

import { forwardRef, type ForwardedRef, type KeyboardEvent, type MouseEvent, type ReactNode } from 'react';

import { FOCUS_OUTLINE } from '#/utilities/focusStyle';
import { cn } from '#/utilities/styleUtilities';

import { buttonStyles } from './styles/buttonStyles';
import { iconStyles } from './styles/iconStyles';
import { textStyles } from './styles/textStyles';

type ButtonRounding = 'medium' | 'full';

type ButtonStyle = 'default' | 'positive' | 'negative' | 'danger' | 'loud';

type ButtonSize = 'small' | 'medium' | 'large';

type ButtonType = 'button' | 'submit' | 'reset';

type ButtonEmphasis = 'default' | 'weak' | 'strong';

type ButtonAspect = 'default' | 'square';

type PressEvent = MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>;

export type ButtonProps = {
    /**
     * @default null
     */
    type?: ButtonType;
    /**
     * @default null
     */
    title?: string;
    /**
     * @default 'default'
     */
    style?: ButtonStyle;
    /**
     * @default 'strong'
     */
    emphasis?: ButtonEmphasis;
    /**
     * @default 'medium'
     */
    size?: ButtonSize;
    /**
     * @default 'medium'
     */
    rounding?: ButtonRounding;
    /**
     * @default false
     */
    disabled?: boolean;
    /**
     * @default 'default'
     */
    aspect?: ButtonAspect;
    /**
     * @default true
     */
    hugWidth?: boolean;
    children?: ReactNode;
    onPress?: (event?: PressEvent) => void;
    'aria-label'?: string;
    'aria-describedby'?: string;
    'data-test-id'?: string;
    className?: string;
};

export const Button = forwardRef<HTMLButtonElement | null, ButtonProps>(
    (
        {
            children,
            style,
            size = 'medium',
            'data-test-id': dataTestId = 'fondue-button',
            className = '',
            onPress = () => {},
            ...props
        }: ButtonProps,
        ref: ForwardedRef<HTMLButtonElement | null>,
    ) => {
        return (
            <button
                ref={ref}
                data-test-id={dataTestId}
                className={cn(
                    buttonStyles({ size, style, ...props }),
                    textStyles({ style, ...props }),
                    iconStyles({ style, ...props }),
                    className,
                    FOCUS_OUTLINE,
                )}
                onClick={onPress}
                onKeyDown={(e: KeyboardEvent<HTMLButtonElement>) => {
                    e.key === 'Enter' && onPress(e);
                }}
                {...props}
            >
                {children}
            </button>
        );
    },
);

Button.displayName = 'Button';
