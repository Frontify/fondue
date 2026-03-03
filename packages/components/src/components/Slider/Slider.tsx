/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as RadixSlider from '@radix-ui/react-slider';
import { type ForwardedRef, forwardRef, useRef } from 'react';

import { type CommonAriaAttrs } from '#/utilities/types';

import styles from './styles/slider.module.scss';

export type SliderProps = {
    id?: string;
    name?: string;
    /**
     * The initial value for uncontrolled usage. Pass an array with one number for a single thumb, or two numbers for a range.
     * @default [0]
     */
    defaultValue?: number[];
    /**
     * The controlled value. Use together with `onChange`. Pass an array with one number for a single thumb, or two numbers for a range.
     */
    value?: number[];
    /**
     * The minimum selectable value.
     * @default 0
     */
    min?: number;
    /**
     * The maximum selectable value.
     * @default 100
     */
    max?: number;
    /**
     * The granularity of allowed values. For example, `step={5}` snaps to multiples of 5.
     * @default 1
     */
    step?: number;
    /**
     * The minimum distance between thumbs in a range slider, measured in steps. Prevents thumbs from overlapping.
     * @default 0
     */
    minStepsBetweenThumbs?: number;
    /**
     * Prevents interaction and dims the slider visually.
     * @default false
     */
    disabled?: boolean;
    /**
     * Callback fired continuously as the thumb is dragged. Use for live previews.
     * @param value - The current slider value(s)
     */
    onChange?: (value: number[]) => void;
    /**
     * Callback fired when the thumb is released. Use for committing the final value (e.g., saving to state or API).
     * @param value - The committed slider value(s)
     */
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
                        sliderThumbRef.current.dataset.showFocusRing = 'false';
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
                        event.currentTarget.dataset.showFocusRing = 'false';
                    }}
                    onBlur={(event) => {
                        event.currentTarget.dataset.showFocusRing = 'true';
                    }}
                    key={index}
                />
            ))}
        </RadixSlider.Root>
    );
};

export const Slider = forwardRef<HTMLButtonElement, SliderProps>(SliderComponent);
Slider.displayName = 'Slider';
