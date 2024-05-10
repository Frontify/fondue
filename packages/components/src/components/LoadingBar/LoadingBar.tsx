/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as ProgressRadixPrimitive from '@radix-ui/react-progress';
import { forwardRef, type CSSProperties, type ElementRef } from 'react';

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
     * @default true
     */
    rounded?: boolean;
    /**
     * @default default
     */
    style?: 'default' | 'positive' | 'negative';
    /**
     * @default 'medium'
     */
    size?: 'small' | 'medium' | 'large' | 'x-large';
    getValueLabel?: (value: number, max: number) => string;
    /**
     * @default fondue-loading-bar
     */
    'data-test-id'?: string;
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
        },
        ref,
    ) => {
        return (
            <ProgressRadixPrimitive.Root
                ref={ref}
                data-test-id={dataTestId}
                className={loadingBarContainerStyles({ rounded, size, style })}
                aria-busy={value !== max}
                value={value}
                max={max}
                style={value ? ({ '--loading-bar-value': `${value}%` } as CSSProperties) : {}}
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
