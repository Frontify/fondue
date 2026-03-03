/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as ProgressRadixPrimitive from '@radix-ui/react-progress';
import { forwardRef, type CSSProperties, type ElementRef, type ForwardedRef } from 'react';

import styles from './styles/loadingBar.module.scss';

export type LoadingBarProps = {
    /**
     * The current progress value. Pass `null` for an indeterminate (unknown duration) state.
     * @default null
     */
    value: number | null;
    /**
     * The maximum value representing 100% completion.
     * @default 100
     */
    max?: number;
    'data-test-id'?: string;
    /**
     * Adds rounded corners to the bar ends.
     * @default true
     */
    rounded?: boolean;
    /**
     * Conveys the tone. `'default'` for neutral progress, `'positive'` for successful completion, `'negative'` for errors or warnings.
     * @default "default"
     */
    variant?: 'default' | 'positive' | 'negative';
    /**
     * Controls the bar height. `'small'` for inline indicators, `'medium'` for standard use, `'large'` and `'x-large'` for prominent displays.
     * @default "medium"
     */
    size?: 'small' | 'medium' | 'large' | 'x-large';
    /**
     * Custom function to generate an accessible value label. Receives the current value and max, returns a string like "42 of 100 files uploaded."
     */
    getValueLabel?: (value: number, max: number) => string;
} & ({ 'aria-label': string } | { 'aria-labelledby': string });

export const LoadingBar = forwardRef<ElementRef<typeof ProgressRadixPrimitive.Root>, LoadingBarProps>(
    (
        {
            value,
            max = 100,
            rounded = true,
            variant = 'default',
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
                className={styles.container}
                data-rounded={rounded}
                data-size={size}
                data-variant={variant}
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
                    className={styles.indicator}
                    data-variant={variant}
                    data-indeterminate={value === null}
                />
            </ProgressRadixPrimitive.Root>
        );
    },
);
LoadingBar.displayName = 'LoadingBar';
