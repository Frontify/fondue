/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as RadixSlider from '@radix-ui/react-slider';
import { type ForwardedRef, forwardRef } from 'react';

import styles from './styles/slider.module.scss';

export type SliderProps = {
    id?: string;
    name?: string;
    /**
     * The default value of the slider
     * Used for uncontrolled components
     * @default [0]
     */
    defaultValue?: number[];
    /**
     * The controlled value of the slider
     * @default [0]
     */
    value?: number[];
    /**
     * Minimum value of the slider
     * @default 0
     */
    min?: number;
    /**
     * Maximum value of the slider
     * @default 100
     */
    max?: number;
    /**
     * The granularity with which the slider can step through values
     * @default 1
     */
    step?: number;
    /**
     * The minimum steps between thumbs in a range slider
     * @default 0
     */
    minStepsBetweenThumbs?: number;
    /**
     * Determines whether to display the minimum and maximum values below the slider
     * @default false
     */
    showMinMax?: boolean;
    /**
     * Disable the checkbox
     * @default false
     */
    disabled?: boolean;
    /**
     * Make the checkbox required in form
     * @default false
     */
    required?: boolean;
    /**
     * Make the checkbox read-only
     * @default false
     */
    onChange?: (value: number[]) => void;
    onCommit?: (value: number[]) => void;
    'aria-label': string; // Required for accessibility.
    'data-test-id'?: string;
};

const SliderComponent = (
    {
        showMinMax = false,
        value = [0],
        defaultValue = [0],
        min = 0,
        max = 100,
        onChange,
        onCommit,
        'aria-label': ariaLabel,
        'data-test-id': dataTestId = 'fondue-slider',
        ...props
    }: SliderProps,
    ref: ForwardedRef<HTMLButtonElement>,
) => {
    return (
        <RadixSlider.Root
            ref={ref}
            className={styles.SliderRoot}
            defaultValue={defaultValue}
            aria-label={ariaLabel}
            onValueChange={onChange}
            onValueCommit={onCommit}
            data-test-id={dataTestId}
            {...props}
        >
            <RadixSlider.Track className={styles.SliderTrack}>
                <RadixSlider.Range className={styles.SliderRange} />
            </RadixSlider.Track>
            {(value || defaultValue).map((_, index) => (
                <RadixSlider.Thumb key={index} className={styles.SliderThumb} />
            ))}
            {showMinMax && (
                <span>
                    {min} - {max}
                </span>
            )}
        </RadixSlider.Root>
    );
};

export const Slider = forwardRef<HTMLButtonElement, SliderProps>(SliderComponent);
Slider.displayName = 'Slider';
