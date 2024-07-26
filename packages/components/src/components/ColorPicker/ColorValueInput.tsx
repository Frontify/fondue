/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ForwardedRef, forwardRef, useEffect, useState } from 'react';

import { Select } from '../Select/Select';
import { TextInput } from '../TextInput/TextInput';

import styles from './styles/customColorPicker.module.scss';
import { type RgbaColor } from './types';
import {
    DEFAULT_COLOR,
    DEFAULT_FORMAT,
    getLimitedColorChannelValue,
    hexColorToRgba,
    isValidHexColor,
    rgbColorToHex,
} from './utils';

type ColorFormat = 'HEX' | 'RGBA';

type ColorValueInputProps = {
    /**
     * @ignore
     * The active color in the color picker, passed down from the root component
     */
    currentColor?: RgbaColor;
    /**
     * @ignore
     * Event handler called when the color changes, passed down from the root component
     */
    onColorChange?: (color: RgbaColor) => void;
    /**
     * @ignore
     * The format to use for the color input, passed down from the root component
     */
    currentFormat?: ColorFormat;
    /**
     * @ignore
     * The format to use for the color input, passed down from the root component
     */
    setCurrentFormat?: (format: ColorFormat) => void;
    /**
     * The test id of the color picker value input
     */
    'data-test-id'?: string;
};

export const ColorValueInput = (
    {
        currentColor = DEFAULT_COLOR,
        onColorChange = () => {},
        currentFormat = DEFAULT_FORMAT,
        setCurrentFormat = () => {},
        'data-test-id': dataTestId = 'color-picker-value-input',
    }: ColorValueInputProps,
    forwardedRef: ForwardedRef<HTMLDivElement>,
) => {
    const [hexColorValue, setHexColorValue] = useState<string>(rgbColorToHex(currentColor));

    useEffect(() => {
        setHexColorValue(rgbColorToHex(currentColor));
    }, [currentColor]);

    return (
        <div className={styles.inputs} data-test-id={dataTestId} ref={forwardedRef}>
            <div className={styles.colorFormatInput}>
                <Select
                    aria-label="Select an item"
                    placeholder="Select a Format"
                    onSelect={(selectedValue) => {
                        setCurrentFormat(selectedValue as ColorFormat);
                    }}
                    value={currentFormat}
                >
                    <Select.Item value="HEX">HEX</Select.Item>
                    <Select.Item value="RGBA">RGBA</Select.Item>
                </Select>
            </div>
            {currentFormat === 'HEX' ? (
                <TextInput.Root
                    className={styles.valueInput}
                    type="text"
                    value={hexColorValue}
                    status={isValidHexColor(hexColorValue) ? 'neutral' : 'error'}
                    onBlur={(event) => {
                        if (isValidHexColor(event.target.value)) {
                            onColorChange(hexColorToRgba(event.target.value));
                        }
                    }}
                    onChange={(event) => {
                        setHexColorValue(event.target.value);
                    }}
                    aria-label="Red Color Channel"
                >
                    <TextInput.Slot name="left">
                        <span className={styles.inputDecorator}>#</span>
                    </TextInput.Slot>
                </TextInput.Root>
            ) : (
                <div className={styles.colorChannelInputGroup}>
                    <TextInput.Root
                        className={styles.valueInput}
                        value={currentColor.red}
                        type="number"
                        onChange={(event) => {
                            onColorChange({
                                ...currentColor,
                                red: getLimitedColorChannelValue(event.target.value),
                            });
                        }}
                        aria-label="Red Color Channel"
                    >
                        <TextInput.Slot name="left">
                            <span className={styles.inputDecorator}>R</span>
                        </TextInput.Slot>
                    </TextInput.Root>
                    <TextInput.Root
                        className={styles.valueInput}
                        value={currentColor.green}
                        type="number"
                        onChange={(event) => {
                            onColorChange({
                                ...currentColor,
                                green: getLimitedColorChannelValue(event.target.value),
                            });
                        }}
                        aria-label="Green Color Channel"
                    >
                        <TextInput.Slot name="left">
                            <span className={styles.inputDecorator}>G</span>
                        </TextInput.Slot>
                    </TextInput.Root>
                    <TextInput.Root
                        className={styles.valueInput}
                        value={currentColor.blue}
                        type="number"
                        onChange={(event) => {
                            onColorChange({
                                ...currentColor,
                                blue: getLimitedColorChannelValue(event.target.value),
                            });
                        }}
                        aria-label="Blue Color Channel"
                    >
                        <TextInput.Slot name="left">
                            <span className={styles.inputDecorator}>B</span>
                        </TextInput.Slot>
                    </TextInput.Root>
                </div>
            )}
            <div className={styles.colorAlphaInput}>
                <TextInput.Root
                    className={styles.valueInput}
                    value={currentColor.alpha === undefined ? 100 : Math.trunc(currentColor.alpha * 100)}
                    type="number"
                    onChange={(event) => {
                        onColorChange({
                            ...currentColor,
                            alpha: getLimitedColorChannelValue(event.target.value, 0, 100) / 100,
                        });
                    }}
                    aria-label="Color Opacity"
                >
                    <TextInput.Slot name="left">
                        <span className={styles.inputDecorator}>A</span>
                    </TextInput.Slot>
                    <TextInput.Slot name="right">
                        <span className={styles.inputDecorator}>%</span>
                    </TextInput.Slot>
                </TextInput.Root>
            </div>
        </div>
    );
};
ColorValueInput.displayName = 'ColorPicker.Values';

export const ForwardedRefColorValueInput = forwardRef<HTMLDivElement, ColorValueInputProps>(ColorValueInput);
