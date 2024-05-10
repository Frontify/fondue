/* (c) Copyright Frontify Ltd., all rights reserved. */

import { forwardRef, type ForwardedRef, type MouseEvent, type ReactNode } from 'react';

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

export type ButtonProps = {
    /**
     * The function to be called when the button is clicked, tapped or triggered via keyboard
     *
     * @default () => {}
     */
    onPress?: (event?: MouseEvent<HTMLButtonElement>) => void;
    /**
     * @description The style of the button
     * @default default
     */
    style?: ButtonStyle;
    /**
     * @default strong
     */
    emphasis?: ButtonEmphasis;
    /**
     * @default medium
     */
    size?: ButtonSize;
    /**
     * @default medium
     */
    rounding?: ButtonRounding;
    /**
     * @default false
     */
    disabled?: boolean;
    /**
     * @default default
     */
    aspect?: ButtonAspect;
    /**
     * @default true
     */
    hugWidth?: boolean;
    /**
     * @default null
     */
    type?: ButtonType;
    /**
     * @required true
     * @description The title of the button
     * @default null
     */
    title?: string;
    'aria-label'?: string;
    'aria-describedby'?: string;
    'data-test-id'?: string;
    className?: string;
    children?: ReactNode;
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
                {...props}
            >
                {children}
            </button>
        );
    },
);

Button.displayName = 'Button';
