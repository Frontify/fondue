/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ForwardedRef, forwardRef, useEffect, useState } from 'react';

import { Select } from '../Select/Select';
import { TextInput } from '../TextInput/TextInput';

import styles from './styles/customColorPicker.module.scss';
import { type RgbaColor } from './types';
import { DEFAULT_COLOR, DEFAULT_FORMAT, hexColorToRgb, isValidHexColor, rgbColorToHex } from './utils';

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
};

export const ColorValueInput = (
    {
        currentColor = DEFAULT_COLOR,
        onColorChange = () => {},
        currentFormat = DEFAULT_FORMAT,
        setCurrentFormat = () => {},
    }: ColorValueInputProps,
    forwardedRef: ForwardedRef<HTMLDivElement>,
) => {
    const [hexColorValue, setHexColorValue] = useState<string>(rgbColorToHex(currentColor));

    useEffect(() => {
        setHexColorValue(rgbColorToHex(currentColor));
    }, [currentColor]);

    return (
        <div className={styles.inputs} data-test-id="custom-color-value-inputs" ref={forwardedRef}>
            <div className={styles.colorFormatInput}>
                <Select
                    aria-label="Select an item"
                    placeholder="Select an item"
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
                            onColorChange(hexColorToRgb(event.target.value));
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
                        onBlur={(event) => {
                            if (event.target.value.length === 0) {
                                onColorChange({
                                    ...currentColor,
                                    red: 0,
                                });
                            }
                        }}
                        onChange={(event) => {
                            console.log(parseInt(event.target.value));

                            onColorChange({
                                ...currentColor,
                                red: parseInt(event.target.value),
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
                        onBlur={(event) => {
                            if (event.target.value.length === 0) {
                                onColorChange({
                                    ...currentColor,
                                    green: 0,
                                });
                            }
                        }}
                        onChange={(event) => {
                            onColorChange({
                                ...currentColor,
                                green: parseInt(event.target.value),
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
                        onBlur={(event) => {
                            if (event.target.value.length === 0) {
                                onColorChange({
                                    ...currentColor,
                                    blue: 0,
                                });
                            }
                        }}
                        onChange={(event) => {
                            onColorChange({
                                ...currentColor,
                                blue: parseInt(event.target.value),
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
                            alpha: parseInt(event.target.value) / 100,
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
