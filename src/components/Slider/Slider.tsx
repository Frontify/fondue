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
    step?: number;
    stepMultiplier?: number;
    onError?: (errorCode: SliderError) => void;
    valueUnitSuffix?: string;
    decimalDigits?: number;
};

export type SliderProps = BaseSliderProps & Pick<AriaAttributes, 'aria-label'>;

export enum SliderError {
    MinMax = 'MinMax',
    ValueOutOfRange = 'ValueOutOfRange',
    ValueNaN = 'ValueNaN',
}

const MIN_DEFAULT_VALUE = 0;
const MAX_DEFAULT_VALUE = 100;
const STEP_DEFAULT_VALUE = 1;
const STEP_MULTIPLIER_DEFAULT_VALUE = 1;
const ARIA_LABEL_DEFAULT_VALUE = 'Slider text input';

export const Slider = ({
    id: propId,
    label,
    value: propValue,
    min = MIN_DEFAULT_VALUE,
    max = MAX_DEFAULT_VALUE,
    step = STEP_DEFAULT_VALUE,
    stepMultiplier = STEP_MULTIPLIER_DEFAULT_VALUE,
    valueUnitSuffix = '',
    decimalDigits = 0,
    onError,
    ['aria-label']: ariaLabel = ARIA_LABEL_DEFAULT_VALUE,
}: SliderProps) => {
    const [value, setValue] = useState<string>();
    const [error, setError] = useState<SliderError>();
    const [percentagePosition, setPercentagePosition] = useState<number>();
    const [sliderRef, setSliderRef] = useState<HTMLDivElement | null>(null);
    const id = useMemoizedId(propId);

    const onChange = (inputValue: string) => {
        setValue(inputValue);
    };

    const addValueUnitSuffix = () => {
        setValue((currentValue) => {
            return currentValue?.replace(valueUnitSuffix, '') + valueUnitSuffix;
        });
    };

    const updatePosition = useCallback(
        (target: HTMLDivElement, clientX: number) => {
            const sliderPosition = target.getBoundingClientRect().x;
            const trackSize = target.clientWidth;
            const mousePosition = clientX;
            const positionInPixels = mousePosition - sliderPosition;
            const percentage = clamp(positionInPixels / trackSize, 0, 1);

            const newValue = (max - min) * percentage + min;

            setValue(`${newValue.toFixed(decimalDigits)}${valueUnitSuffix}`);
        },
        [min, max, decimalDigits, valueUnitSuffix],
    );

    const onDrag = useMemo(
        () =>
            !sliderRef
                ? () => void 0
                : debounce((event: Event & { clientX: number }) => {
                      updatePosition(sliderRef, event.clientX);
                  }, 2),
        [updatePosition, sliderRef],
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

        updatePosition(event.currentTarget, event.clientX);
        sliderRef.addEventListener('mousemove', onDrag);
        window.addEventListener('mouseup', stopDrag);
    };

    const onMouseUp = () => {
        if (!sliderRef) {
            return;
        }

        stopDrag();
    };

    useEffect(() => {
        if (min > max) {
            setError(SliderError.MinMax);
        }

        const middle = (max - min) / 2 + min;
        setValue(`${propValue?.toFixed(decimalDigits) || middle.toFixed(decimalDigits)}${valueUnitSuffix}`);
    }, [min, max, propValue, valueUnitSuffix, decimalDigits]);

    useEffect(() => {
        if (value === undefined) {
            return;
        }

        const numberValue = +value.replace(valueUnitSuffix, '');

        if (Number.isNaN(numberValue)) {
            setError(SliderError.ValueNaN);
            return;
        }

        if (+numberValue < min || +numberValue > max) {
            setError(SliderError.ValueOutOfRange);
            return;
        }

        const range = max - min;
        const percentage = (numberValue - min) / range;

        setError(undefined);

        setPercentagePosition(percentage * 100);
    }, [value, min, max, valueUnitSuffix]);

    useEffect(() => {
        if (error && onError) {
            onError(error);
        }
    }, [error, onError]);

    return (
        <div className="tw-flex tw-flex-col" data-test-id="fondue-slider">
            <label htmlFor={id} className={merge([!label && 'tw-hidden'])}>
                {label}
            </label>
            <div className="tw-flex">
                <div className={merge(['tw-flex-1 tw-flex tw-items-center'])}>
                    <div>{min}</div>
                    <div
                        ref={setSliderRef}
                        role="slider"
                        tabIndex={-1}
                        aria-valuenow={percentagePosition}
                        className="tw-flex-1 tw-relative tw-h-full tw-mx-3"
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
                    <div>{max}</div>
                </div>
                <div className="tw-w-16 tw-ml-3">
                    <TextInput
                        id={id}
                        value={value}
                        aria-label={ariaLabel}
                        type={TextInputType.Text}
                        validation={error ? Validation.Error : Validation.Default}
                        onChange={onChange}
                        onBlur={addValueUnitSuffix}
                        onEnterPressed={addValueUnitSuffix}
                    />
                </div>
            </div>
        </div>
    );
};
Slider.displayName = 'FondueSlider';
