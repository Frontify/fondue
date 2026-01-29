/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as ProgressRadixPrimitive from '@radix-ui/react-progress';
import { forwardRef, type CSSProperties, type ElementRef, type ForwardedRef } from 'react';

import styles from './styles/loadingBar.module.scss';

export type LoadingBarProps = {
    /**
     * The current value of the loading bar. If `null`, the loading bar will be in an indeterminate state.
     * @default null
     */
    value: number | null;
    /**
     * The maximum value of the loading bar
     * @default 100
     */
    max?: number;
    /**
     * @default 'fondue-loading-bar'
     */
    'data-test-id'?: string;
    /**
     * Add rounded corners to the loading bar
     * @default true
     */
    rounded?: boolean;
    /**
     * The style of the loading bar
     * @default "default"
     */
    variant?: 'default' | 'positive' | 'negative';
    /**
     * The size of the loading bar
     * @default "medium"
     */
    size?: 'small' | 'medium' | 'large' | 'x-large';
    /**
     * The label of the loading bar for accessibility purposes
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
