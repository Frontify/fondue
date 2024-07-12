/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as RadixSlider from '@radix-ui/react-slider';

import { Label } from '../Label/Label';

import styles from './styles/slider.module.scss';

/**
 * Properties for the Slider component.
 */
export interface SliderProps {
    id?: string;
    label?: string;
    value?: number[];
    defaultValue?: number[];
    min?: number;
    max?: number;
    step?: number;
    minStepsBetweenThumbs?: number;
    showMinMax?: boolean;
    disabled?: boolean;
    onChange?: (value: number[]) => void;
    onCommit?: (value: number[]) => void;
    'aria-label': string; // Required for accessibility.
    'data-test-id'?: string;
}

/**
 * Generate a unique ID for slider component instances. This will be a generic util soon.
 * @returns A unique string ID.
 */
const generateId = () => `slider-${Math.random().toString(36).substring(2, 9)}`;

/**
 * Slider component that provides a UI for range selection, supporting features like accessibility through ARIA labels,
 * custom step increments, and optional min/max value display.
 *
 * @param {SliderProps} props The properties passed to the Slider component.
 * - `id`: Optional. A unique identifier for the slider. If not provided, one is generated.
 * - `label`: Descriptive label for the slider, used for accessibility and form labeling.
 * - `value`: Optional. Current value(s) of the slider. If provided, the slider is controlled externally.
 * - `defaultValue`: Optional. Initial value(s) of the slider when it mounts, used if `value` is not provided. Enables uncontrolled usage.
 * - `min`: Optional. Minimum value of the slider.
 * - `max`: Optional. Maximum value of the slider.
 * - `step`: Optional. The granularity with which the slider can step through values.
 * - `minStepsBetweenThumbs`: Optional. Minimum steps between thumbs in a range slider.
 * - `showMinMax`: Optional. Determines whether to display the minimum and maximum values below the slider.
 * - `disabled`: Optional. If true, disables slider interaction.
 * - `onChange`: Optional. Function called with the current value when it changes.
 * - `onCommit`: Optional. Function called when the user stops changing the value.
 * - `aria-label`: Accessibility label for the slider. Mandatory for screen readers.
 * - `data-test-id`: Optional. An identifier used for testing purposes. Defaults to 'fondue-slider'.
 */
export const Slider: React.FC<SliderProps> = ({
    id = generateId(),
    label,
    value,
    defaultValue = [0],
    min = 0,
    max = 100,
    step = 1,
    minStepsBetweenThumbs,
    showMinMax = false,
    disabled = false,
    onChange,
    onCommit,
    'aria-label': ariaLabel,
    'data-test-id': dataTestId = 'fondue-slider',
}) => {
    return (
        <div data-test-id={dataTestId}>
            <Label htmlFor={id}>{label}</Label>
            <RadixSlider.Root
                id={id}
                className={styles.SliderRoot}
                defaultValue={defaultValue}
                value={value}
                min={min}
                max={max}
                step={step}
                minStepsBetweenThumbs={minStepsBetweenThumbs}
                aria-label={ariaLabel}
                disabled={disabled}
                onValueChange={onChange}
                onValueCommit={onCommit}
            >
                <RadixSlider.Track className={styles.SliderTrack}>
                    <RadixSlider.Range className={styles.SliderRange} />
                </RadixSlider.Track>
                {(value || defaultValue).map((_, i) => (
                    <RadixSlider.Thumb key={i} className={styles.SliderThumb} />
                ))}
            </RadixSlider.Root>
            {showMinMax && (
                <span>
                    {min} - {max}
                </span>
            )}
        </div>
    );
};

Slider.displayName = 'Slider';
