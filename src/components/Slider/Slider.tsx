/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, {
    AriaAttributes,
    KeyboardEvent,
    MouseEvent,
    TouchEvent,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';

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
    disabled?: boolean;
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
}

export const MIN_DEFAULT_VALUE = 0;
export const MAX_DEFAULT_VALUE = 100;
export const STEP_DEFAULT_VALUE = 1;
export const STEP_MULTIPLIER_DEFAULT_VALUE = 5;
export const ARIA_LABEL_DEFAULT_VALUE = 'Slider text input';
const DEBOUNCE_INTERVAL = 3;
const INCREMENT_KEYS = ['ArrowUp', 'ArrowRight'];
const DECREMENT_KEYS = ['ArrowDown', 'ArrowLeft'];
const LIMITS_KEYS = ['Home', 'End'];

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
    onError,
    onChange,
    ['aria-label']: ariaLabel = ARIA_LABEL_DEFAULT_VALUE,
    disabled = false,
}: SliderProps) => {
    const [value, setValue] = useState<number>();
    const [valueWithSuffix, setValueWithSuffix] = useState('');
    const [error, setError] = useState<SliderError>();
    const [percentagePosition, setPercentagePosition] = useState<number>();
    const [sliderRef, setSliderRef] = useState<HTMLButtonElement | null>(null);
    const [isMouseOver, setIsMouseOver] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const id = useMemoizedId(propId);

    const onInputChange = (inputValue: string) => {
        // make sure the suffix will be added to the input field
        setValueWithSuffix(`${inputValue.replace(valueSuffix, '')}${valueSuffix}`);
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
            setValueWithSuffix(`${stepValue}${valueSuffix}`);
        },
        [sliderRef, max, min, step, valueSuffix],
    );

    const onDrag = useMemo(
        () =>
            !sliderRef
                ? () => void 0
                : debounce((event: Event & { clientX: number; touches: [{ clientX: number }] }) => {
                      if (disabled) {
                          return;
                      }
                      updateThumbPosition({
                          clientX: event.clientX ?? event.touches[0].clientX,
                      });
                  }, DEBOUNCE_INTERVAL),
        [updateThumbPosition, sliderRef, disabled],
    );

    const stopDrag = useCallback(() => {
        if (!sliderRef) {
            return;
        }

        setIsDragging(false);
        sliderRef.removeEventListener('mousemove', onDrag);
        sliderRef.addEventListener('touchmove', onDrag);
        window.removeEventListener('mouseup', stopDrag);
    }, [sliderRef, onDrag]);

    const startDrag = (event: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>) => {
        if (!sliderRef || disabled) {
            return;
        }

        setIsDragging(true);

        updateThumbPosition({
            clientX: (event as MouseEvent).clientX ?? (event as TouchEvent).touches[0].clientX,
        });

        sliderRef.addEventListener('touchmove', onDrag);
        sliderRef.addEventListener('mousemove', onDrag);
        window.addEventListener('mouseup', stopDrag);
    };

    const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
        if (
            ![...INCREMENT_KEYS, ...DECREMENT_KEYS, ...LIMITS_KEYS].includes(event.key) ||
            value === undefined ||
            disabled
        ) {
            return;
        }

        event.preventDefault();

        let variation = 0;
        let rawValue = 0;
        if (DECREMENT_KEYS.includes(event.key)) {
            variation = -step;
        } else if (INCREMENT_KEYS.includes(event.key)) {
            variation = step;
        }

        if (!LIMITS_KEYS.includes(event.key)) {
            variation *= event.shiftKey ? stepMultiplier : 1;
            rawValue = clamp(Math.floor(value / step) * step + variation, min, max);
        } else {
            rawValue = event.key === 'Home' ? min : max;
        }

        setValue(rawValue);
        setValueWithSuffix(`${rawValue}${valueSuffix}`);
    };

    const onMouseOver = () => {
        if (disabled) {
            return;
        }

        setIsMouseOver(true);
    };

    const onMouseOut = () => {
        if (disabled) {
            return;
        }

        setIsMouseOver(false);
    };

    const onFocus = () => {
        if (disabled) {
            return;
        }

        setIsDragging(true);
    };

    const onBlur = () => {
        if (disabled) {
            return;
        }

        setIsDragging(false);
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
        setValueWithSuffix(`${raw}${valueSuffix}`);
        updateThumbPosition({ rawValue: raw });
    }, [sliderRef, updateThumbPosition, min, max, propValue, valueSuffix]);

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
        if (!disabled) {
            onChange({
                raw: value,
                withSuffix: valueWithSuffix.replace(valueSuffix, '') + valueSuffix,
            });
        }
    }, [value, valueWithSuffix, valueSuffix, error, onChange, updateThumbPosition, disabled]);

    useEffect(() => {
        if (error && onError) {
            onError(error);
        }
    }, [error, onError]);

    return (
        <div className="tw-flex tw-flex-col" data-test-id="fondue-slider" id={id}>
            <label
                htmlFor={id}
                className={merge([!label && 'tw-hidden', disabled && 'tw-text-text-disabled'])}
                data-test-id="fondue-slider-label"
            >
                {label}
            </label>
            <div className="tw-flex">
                <div className={merge(['tw-flex-1 tw-flex tw-items-center'])}>
                    {showMinMax && (
                        <div className={merge(['tw-mr-3', disabled && 'tw-text-text-disabled'])}>
                            {min}
                            {valueSuffix}
                        </div>
                    )}
                    <button
                        ref={setSliderRef}
                        data-test-id="fondue-slider-interactive"
                        className="tw-flex-1 tw-relative tw-h-full tw-cursor-pointer disabled:tw-cursor-default tw-outline-none"
                        onMouseOver={onMouseOver}
                        onMouseOut={onMouseOut}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onMouseDown={startDrag}
                        onMouseUp={stopDrag}
                        onTouchStart={startDrag}
                        onTouchEnd={stopDrag}
                        onKeyDown={onKeyDown}
                        disabled={disabled}
                    >
                        <span className="tw-absolute tw-block tw-top-1/2 tw--translate-y-1/2 tw-w-full tw-h-1 tw-rounded-sm tw-bg-box-neutral tw-flex-1"></span>
                        {percentagePosition !== undefined && (
                            <span
                                role="slider"
                                aria-valuenow={value}
                                aria-valuemin={min}
                                aria-valuemax={max}
                                aria-label={ariaLabel}
                                data-test-id="fondue-slider-track"
                                className={merge([
                                    'tw-absolute tw-block tw-top-1/2 tw--translate-y-1/2 tw-origin-left tw-w-full tw-h-1  tw-rounded-sm tw-bg-box-neutral-strong tw-flex-1',
                                    disabled && 'tw-bg-box-neutral',
                                ])}
                                style={{ width: `${percentagePosition}%` }}
                            ></span>
                        )}
                        <span
                            className={merge([
                                'tw-absolute tw-block tw-top-1/2 tw--translate-y-1/2 tw--translate-x-1/2 tw-w-5 tw-h-5',
                                'after:tw-absolute after:tw-block after:tw-top-1/2 after:tw-left-1/2 after:tw--translate-y-1/2 after:tw--translate-x-1/2 after:tw-w-5 after:tw-h-5 after:tw-bg-base after:tw-rounded-full after:tw-border after:tw-border-line-strong',
                                isMouseOver && !isDragging && 'after:tw-shadow',
                                isDragging &&
                                    "after:tw-border-line-xx-strong before:tw-content-[''] before:tw-opacity-25 before:tw-top-1/2 before:tw--translate-y-1/2 before:tw--translate-x-1/2 before:tw-left-1/2 before:tw-block before:tw-rounded-full before:tw-absolute before:tw-z-0 before:tw-w-9 before:tw-h-9 before:tw-bg-box-neutral-strong",
                                disabled && 'after:tw-bg-box-neutral after:tw-border-line-weak',
                            ])}
                            style={{ left: `${percentagePosition}%` }}
                        ></span>
                    </button>
                    {showMinMax && (
                        <div className={merge(['tw-ml-3', disabled && 'tw-text-text-disabled'])}>
                            {max}
                            {valueSuffix}
                        </div>
                    )}
                    <div className="tw-w-16 tw-ml-3">
                        <TextInput
                            id={`${id}-text-input`}
                            value={valueWithSuffix}
                            placeholder={ariaLabel}
                            type={TextInputType.Text}
                            validation={error ? Validation.Error : Validation.Default}
                            onChange={onInputChange}
                            disabled={disabled}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
Slider.displayName = 'FondueSlider';
