/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useState } from 'react';

import { Select } from '../Select/Select';
import { TextInput } from '../TextInput/TextInput';

import styles from './styles/customColorPicker.module.scss';
import { type Color } from './types';
import { hexColorToRgb, isValidHexColor, rgbColorToHex } from './utils';

type ColorFormat = 'HEX' | 'RGBA';
type CustomColorPickerProps = {
    currentColor: Color;
    onColorChange: (color: Color) => void;
};

export const CustomColorPicker = ({ currentColor, onColorChange, ...props }: CustomColorPickerProps) => {
    const colorChange = (color: Color) => {
        onColorChange(color);
    };

    console.log('current', currentColor);

    return (
        <div className={styles.root} data-picker-type="custom-color" data-test-id="custom-color-picker" {...props}>
            <ColorPickerInputs currentColor={currentColor} onColorChange={colorChange} />
        </div>
    );
};
CustomColorPicker.displayName = 'ColorPicker.Wrapper';

type ColorPickerInputsProps = CustomColorPickerProps;
export const ColorPickerInputs = ({
    currentColor = { red: 0, green: 0, blue: 0, alpha: 1 },
    onColorChange = () => {
        console.log('default');
    },
    ...props
}: ColorPickerInputsProps) => {
    const [currentFormat, setCurrentFormat] = useState<ColorFormat>('HEX');
    const [hexColorValue, setHexColorValue] = useState<string>(rgbColorToHex(currentColor));
    return (
        <div className={styles.inputs} data-test-id="custom-color-value-inputs" {...props}>
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
                    className={`${styles.valueInput} ${styles.colorHexInput}`}
                    type="text"
                    value={hexColorValue}
                    status={isValidHexColor(hexColorValue) ? 'neutral' : 'error'}
                    onChange={(event) => {
                        setHexColorValue(event.target.value);
                        if (isValidHexColor(event.target.value)) {
                            onColorChange(hexColorToRgb(event.target.value));
                        }
                    }}
                    aria-label="Red Color Channel"
                >
                    <TextInput.Slot name="left">
                        <span className={styles.inputDecorator}>#</span>
                    </TextInput.Slot>
                </TextInput.Root>
            ) : (
                <>
                    <TextInput.Root
                        className={`${styles.valueInput} ${styles.colorChannelInput}`}
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
                        className={`${styles.valueInput} ${styles.colorChannelInput}`}
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
                        className={`${styles.valueInput} ${styles.colorChannelInput}`}
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
                </>
            )}
            <TextInput.Root
                className={`${styles.valueInput} ${styles.colorAlphaInput}`}
                value={currentColor.alpha}
                type="number"
                onChange={(event) => {
                    onColorChange({
                        ...currentColor,
                        alpha: parseInt(event.target.value),
                    });
                }}
                aria-label="Color Opacity"
            >
                <TextInput.Slot name="right">
                    <span className={styles.inputDecorator}>%</span>
                </TextInput.Slot>
            </TextInput.Root>
        </div>
    );
};
ColorPickerInputs.displayName = 'ColorPicker.Inputs';
