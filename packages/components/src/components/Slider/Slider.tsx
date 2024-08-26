/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as RadixSlider from '@radix-ui/react-slider';
import { type ForwardedRef, forwardRef, useRef } from 'react';

import { type CommonAriaAttrs } from '#/utilities/types';

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
     * Disable the slider
     * @default false
     */
    disabled?: boolean;
    onChange?: (value: number[]) => void;
    onCommit?: (value: number[]) => void;
    'data-test-id'?: string;
} & CommonAriaAttrs;

const SliderComponent = (
    {
        value,
        defaultValue = [0],
        onChange,
        onCommit,
        'data-test-id': dataTestId = 'fondue-slider',
        ...props
    }: SliderProps,
    ref: ForwardedRef<HTMLButtonElement>,
) => {
    const sliderThumbRef = useRef<HTMLSpanElement | null>(null);
    return (
        <RadixSlider.Root
            ref={ref}
            className={styles.root}
            value={value}
            defaultValue={defaultValue}
            onValueChange={onChange}
            onValueCommit={onCommit}
            data-test-id={dataTestId}
            {...props}
        >
            <RadixSlider.Track
                onPointerDown={() => {
                    if (sliderThumbRef.current) {
                        sliderThumbRef.current.dataset.preventBlueOutline = 'true';
                    }
                }}
                className={styles.track}
            >
                <RadixSlider.Range className={styles.range} />
            </RadixSlider.Track>
            {(value || defaultValue).map((_, index) => (
                <RadixSlider.Thumb
                    ref={sliderThumbRef}
                    className={styles.thumb}
                    onPointerDown={(event) => {
                        event.currentTarget.dataset.preventBlueOutline = 'true';
                    }}
                    onBlur={(event) => {
                        event.currentTarget.dataset.preventBlueOutline = 'false';
                    }}
                    key={index}
                />
            ))}
        </RadixSlider.Root>
    );
};

export const Slider = forwardRef<HTMLButtonElement, SliderProps>(SliderComponent);
Slider.displayName = 'Slider';
