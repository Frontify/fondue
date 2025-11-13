/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Slot as RadixSlot } from '@radix-ui/react-slot';
import { forwardRef, type ForwardedRef, type MouseEvent, type ReactNode } from 'react';

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
     * @default "button"
     */
    type?: ButtonType;
    /**
     * @default null
     */
    title?: string;
    /**
     * @default "default"
     */
    variant?: ButtonStyle;
    /**
     * @default "strong"
     */
    emphasis?: ButtonEmphasis;
    /**
     * @default "medium"
     */
    size?: ButtonSize;
    /**
     * @default "medium"
     */
    rounding?: ButtonRounding;
    /**
     * @default false
     */
    disabled?: boolean;
    /**
     * @default "default"
     */
    aspect?: ButtonAspect;
    /**
     * @default true
     */
    hugWidth?: boolean;
    children?: ReactNode;
    onPress?: (event?: MouseEvent<HTMLButtonElement>) => void;
    form?: string;
    'aria-label'?: string;
    'aria-describedby'?: string;
    'data-test-id'?: string;
    asChild?: boolean;
    className?: string;
};

export const Button = forwardRef<HTMLButtonElement | null, ButtonProps>(
    (
        {
            children,
            type = 'button',
            variant,
            size = 'medium',
            form,
            'data-test-id': dataTestId = 'fondue-button',
            className = '',
            onPress = () => {},
            hugWidth = true,
            asChild,
            ...props
        }: ButtonProps,
        ref: ForwardedRef<HTMLButtonElement | null>,
    ) => {
        const Comp = asChild ? RadixSlot : 'button';

        return (
            <Comp
                ref={ref}
                type={type}
                form={form}
                data-test-id={dataTestId}
                className={cn(
                    buttonStyles({ size, variant, hugWidth, ...props }),
                    textStyles({ variant, ...props }),
                    iconStyles({ variant, ...props }),
                    className,
                )}
                {...props}
                onClick={(event) => {
                    // @ts-expect-error - Allows other components who use Button as a trigger to pass an action
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                    props.onClick?.(event);
                    onPress?.(event);
                }}
            >
                {children}
            </Comp>
        );
    },
);

Button.displayName = 'Button';
