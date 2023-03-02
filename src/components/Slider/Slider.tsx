/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { AriaAttributes, MouseEvent, useCallback, useEffect, useMemo, useState } from 'react';

import { useMemoizedId } from '@hooks/useMemoizedId';
import { merge } from '@utilities/merge';
import { TextInput, TextInputType } from '@components/TextInput';
import { Validation } from '@utilities/validation';
import { clamp } from '@utilities/number';
import { debounce } from '@utilities/debounce';

type BaseSliderProps = {
    id?: string;
    label?: string;
    value?: number;
    min?: number;
    max?: number;
    showMinMax?: boolean;
    step?: number;
    stepMultiplier?: number;
    onError?: (errorCode: SliderError) => void;
    onChange: (value: SliderValue) => void;
    valueSuffix?: string;
    decimalDigits?: number;
};

export type SliderValue = {
    raw: number;
    withSuffix: string;
};

export type SliderProps = BaseSliderProps & Pick<AriaAttributes, 'aria-label'>;

export enum SliderError {
    MinMax = 'MinMax',
    ValueOutOfRange = 'ValueOutOfRange',
    ValueNaN = 'ValueNaN',
    ValueOutOfSteps = 'ValueOutOfSteps',
}

const MIN_DEFAULT_VALUE = 0;
const MAX_DEFAULT_VALUE = 100;
const STEP_DEFAULT_VALUE = 1;
const STEP_MULTIPLIER_DEFAULT_VALUE = 1;
const ARIA_LABEL_DEFAULT_VALUE = 'Slider text input';
const DEBOUNCE_INTERVAL = 3;

export const Slider = ({
    id: propId,
    label,
    value: propValue,
    min = MIN_DEFAULT_VALUE,
    max = MAX_DEFAULT_VALUE,
    showMinMax = false,
    step = STEP_DEFAULT_VALUE,
    stepMultiplier = STEP_MULTIPLIER_DEFAULT_VALUE,
    valueSuffix = '',
    decimalDigits = 0,
    onError,
    onChange,
    ['aria-label']: ariaLabel = ARIA_LABEL_DEFAULT_VALUE,
}: SliderProps) => {
    const [value, setValue] = useState<number>();
    const [valueWithSuffix, setValueWithSuffix] = useState('');
    const [error, setError] = useState<SliderError>();
    const [percentagePosition, setPercentagePosition] = useState<number>();
    const [sliderRef, setSliderRef] = useState<HTMLDivElement | null>(null);
    const id = useMemoizedId(propId);

    const onInputChange = (inputValue: string) => {
        // make sure the suffix will be added to the input field
        setValueWithSuffix(inputValue.replace(valueSuffix, '') + valueSuffix);
    };

    const addValueUnitSuffix = () => {
        setValueWithSuffix((currentValue) => {
            return currentValue.replace(valueSuffix, '') + valueSuffix;
        });
    };

    const updateThumbPosition = useCallback(
        ({ clientX, rawValue }: { clientX?: number; rawValue?: number }) => {
            if (!sliderRef) {
                return;
            }

            const range = max - min;
            const sliderPosition = sliderRef.getBoundingClientRect().x;
            const trackSize = sliderRef.clientWidth;

            let percentage;
            if (clientX !== undefined) {
                const mousePosition = clientX;
                const positionInPixels = mousePosition - sliderPosition;
                percentage = positionInPixels / trackSize;
            } else {
                // if raw value, update thumb position independently of steps
                percentage = ((rawValue || min) - min) / range;
                setPercentagePosition(clamp(percentage, 0, 1) * 100);
                return;
            }

            const newPosition = clamp(percentage, 0, 1);
            const totalSteps = range / step;
            const stepValue = clamp(Math.round(newPosition * totalSteps) * step + min, min, max);
            setPercentagePosition(((stepValue - min) / range) * 100);
            setValueWithSuffix(stepValue.toFixed(decimalDigits) + valueSuffix);
        },
        [sliderRef, max, min, step, decimalDigits, valueSuffix],
    );

    const onDrag = useMemo(
        () =>
            !sliderRef
                ? () => void 0
                : debounce((event: Event & { clientX: number }) => {
                      updateThumbPosition({
                          clientX: event.clientX,
                      });
                  }, DEBOUNCE_INTERVAL),
        [updateThumbPosition, sliderRef],
    );

    const stopDrag = useCallback(() => {
        if (!sliderRef) {
            return;
        }

        sliderRef.removeEventListener('mousemove', onDrag);
        window.removeEventListener('mouseup', stopDrag);
    }, [sliderRef, onDrag]);

    const onMouseDown = (event: MouseEvent<HTMLDivElement>) => {
        if (!sliderRef) {
            return;
        }

        updateThumbPosition({
            clientX: event.clientX,
        });
        sliderRef.addEventListener('mousemove', onDrag);
        window.addEventListener('mouseup', stopDrag);
    };

    const onMouseUp = () => {
        if (!sliderRef) {
            return;
        }

        stopDrag();
    };

    // This side effect will handle the initial property values
    // and their changes
    useEffect(() => {
        if (!sliderRef) {
            return;
        }

        if (min > max) {
            setError(SliderError.MinMax);
            return;
        }

        const raw = propValue || min;

        setValue(raw);
        setValueWithSuffix(`${raw.toFixed(decimalDigits)}${valueSuffix}`);
        updateThumbPosition({ rawValue: raw });
    }, [sliderRef, updateThumbPosition, min, max, propValue, valueSuffix, decimalDigits]);

    useEffect(() => {
        if (!valueWithSuffix) {
            return;
        }

        const valueWithoutSuffix = valueWithSuffix.replace(valueSuffix, '');
        const rawValue = +valueWithoutSuffix;

        if (Number.isNaN(rawValue) || !valueWithoutSuffix) {
            setValue(undefined);
            setError(SliderError.ValueNaN);
            return;
        }

        if (rawValue < min || rawValue > max) {
            setValue(undefined);
            setError(SliderError.ValueOutOfRange);
            return;
        }

        setError(undefined);
        setValue(rawValue);
    }, [valueWithSuffix, valueSuffix, min, max]);

    useEffect(() => {
        if (error || value === undefined || !valueWithSuffix) {
            return;
        }

        const valueWithoutSuffix = valueWithSuffix.replace(valueSuffix, '');
        const rawValue = +valueWithoutSuffix;

        // don't call onChange if value is invalid or different
        // than the value in the text field
        if (Number.isNaN(rawValue) || value !== rawValue) {
            return;
        }

        updateThumbPosition({ rawValue: value });
        onChange({
            raw: value,
            withSuffix: valueWithSuffix.replace(valueSuffix, '') + valueSuffix,
        });
    }, [value, valueWithSuffix, valueSuffix, error, onChange, updateThumbPosition]);

    useEffect(() => {
        if (error && onError) {
            onError(error);
            return;
        }
    }, [error, onError]);

    return (
        <div className="tw-flex tw-flex-col" data-test-id="fondue-slider">
            <label htmlFor={id} className={merge([!label && 'tw-hidden'])}>
                {label}
            </label>
            <div className="tw-flex">
                <div className={merge(['tw-flex-1 tw-flex tw-items-center'])}>
                    {showMinMax && <div>{min}</div>}
                    <div
                        ref={setSliderRef}
                        role="slider"
                        tabIndex={-1}
                        aria-valuenow={percentagePosition}
                        className="tw-flex-1 tw-relative tw-h-full tw-mx-3 tw-cursor-pointer"
                        onMouseDown={onMouseDown}
                        onMouseUp={onMouseUp}
                    >
                        <div className="tw-absolute tw-top-1/2 tw--translate-y-1/2 tw-w-full tw-h-1 tw-rounded-sm tw-bg-base tw-border tw-border-line-strong tw-flex-1"></div>
                        {percentagePosition !== undefined && (
                            <div
                                className="tw-absolute tw-top-1/2 tw--translate-y-1/2 tw-origin-left tw-w-full tw-h-1  tw-rounded-sm tw-bg-box-neutral-strong tw-border tw-border-line-strong tw-flex-1"
                                style={{ width: `${percentagePosition}%` }}
                            ></div>
                        )}
                        <div
                            className="tw-absolute tw-top-1/2 tw--translate-y-1/2 tw--translate-x-1/2 tw-w-5 tw-h-5 tw-bg-base tw-rounded-full tw-border tw-border-line-strong"
                            style={{ left: `${percentagePosition}%` }}
                        ></div>
                    </div>
                    {showMinMax && <div>{max}</div>}
                </div>
                <div className="tw-w-16 tw-ml-3">
                    <TextInput
                        id={id}
                        value={valueWithSuffix}
                        aria-label={ariaLabel}
                        type={TextInputType.Text}
                        validation={error ? Validation.Error : Validation.Default}
                        onChange={onInputChange}
                        onBlur={addValueUnitSuffix}
                        onEnterPressed={addValueUnitSuffix}
                    />
                </div>
            </div>
        </div>
    );
};
Slider.displayName = 'FondueSlider';
