/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as RadixSlider from '@radix-ui/react-slider';

import { Label } from '../Label/Label';

import styles from './styles/slider.module.scss';

export type SliderProps = {
    id?: string;
    label: string;
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
    /**
     * The aria label of the select component.
     */
    'aria-label': string; // This should be mandatory due to accessibility reasons
    /**
     * The data test id of the select component.
     */
    'data-test-id'?: string;
};

function generateId() {
    return `slider-${Math.random().toString(36).substring(2, 9)}`;
}

export const Slider = ({
    id = generateId(),
    label,
    value,
    defaultValue = [0],
    min,
    max,
    step,
    minStepsBetweenThumbs,
    showMinMax,
    disabled,
    onChange,
    onCommit,
    'aria-label': ariaLabel = label,
    'data-test-id': dataTestId = 'fondue-slider',
}: SliderProps) => {
    return (
        <div data-test-id={dataTestId}>
            <Label className="LabelRoot" htmlFor={id}>
                {label}
            </Label>
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
