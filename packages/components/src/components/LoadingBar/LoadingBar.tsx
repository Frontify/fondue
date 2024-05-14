/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as ProgressRadixPrimitive from '@radix-ui/react-progress';
import { forwardRef, type CSSProperties, type ElementRef, type ForwardedRef } from 'react';

import { loadingBarContainerStyles, loadingBarStyles } from './styles/loadingBarStyles';

export type LoadingBarProps = {
    /**
     * The current value of the loading bar. If `null`, the loading bar will be in an indeterminate state.
     * @default null
     */
    value: number | null;
    /**
     * @default 100
     */
    max?: number;
    /**
     * @default 'fondue-loading-bar'
     */
    'data-test-id'?: string;
    /**
     * @default true
     */
    rounded?: boolean;
    /**
     * @default 'default'
     */
    style?: 'default' | 'positive' | 'negative';
    /**
     * @default 'medium'
     */
    size?: 'small' | 'medium' | 'large' | 'x-large';
    getValueLabel?: (value: number, max: number) => string;
} & ({ 'aria-label': string } | { 'aria-labelledby': string });

export const LoadingBar = forwardRef<ElementRef<typeof ProgressRadixPrimitive.Root>, LoadingBarProps>(
    (
        {
            value,
            max = 100,
            rounded = true,
            style = 'default',
            size = 'medium',
            'data-test-id': dataTestId = 'fondue-loading-bar',
            ...props
        }: LoadingBarProps,
        ref: ForwardedRef<ElementRef<typeof ProgressRadixPrimitive.Root>>,
    ) => {
        return (
            <ProgressRadixPrimitive.Root
                ref={ref}
                data-test-id={dataTestId}
                className={loadingBarContainerStyles({ rounded, size, style })}
                aria-busy={value !== max}
                value={value}
                max={max}
                style={
                    {
                        '--loading-bar-value': value,
                        '--loading-bar-max': max,
                        '--loading-bar-proportion': 'calc(var(--loading-bar-value) / var(--loading-bar-max))',
                    } as CSSProperties
                }
                {...props}
            >
                <ProgressRadixPrimitive.Indicator
                    className={loadingBarStyles({ style, indeterminateState: value === null })}
                />
            </ProgressRadixPrimitive.Root>
        );
    },
);
LoadingBar.displayName = 'LoadingBar';
