/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useState } from 'react';

import { Select } from '../Select/Select';
import { TextInput } from '../TextInput/TextInput';

import styles from './styles/customColorPicker.module.scss';
import { type Color } from './types';

type ColorFormat = 'HEX' | 'RGBA';
type CustomColorPickerProps = {
    currentColor: Color;
    onColorChange: (color: Color) => void;
};

export const CustomColorPicker = ({
    currentColor,
    onColorChange = () => {
        console.log('default custom');
    },
    ...props
}: CustomColorPickerProps) => {
    return (
        <div className={styles.root} data-picker-type="custom-color" data-test-id="custom-color-picker" {...props}>
            <ColorPickerInputs currentColor={currentColor} onColorChange={onColorChange} />
        </div>
    );
};
CustomColorPicker.displayName = 'ColorPicker.Wrapper';

type ColorPickerInputsProps = CustomColorPickerProps;
export const ColorPickerInputs = ({
    currentColor,
    onColorChange = () => {
        console.log('default');
    },
    ...props
}: ColorPickerInputsProps) => {
    const [currentFormat, setCurrentFormat] = useState<ColorFormat>('HEX');
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
                    value={50}
                    type="number"
                    onChange={(event) => console.log(event.target.value)}
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
                        value={10}
                        type="number"
                        onChange={(event) => console.log(event.target.value)}
                        aria-label="Red Color Channel"
                    >
                        <TextInput.Slot name="left">
                            <span className={styles.inputDecorator}>R</span>
                        </TextInput.Slot>
                    </TextInput.Root>
                    <TextInput.Root
                        className={`${styles.valueInput} ${styles.colorChannelInput}`}
                        value={20}
                        type="number"
                        onChange={(event) => console.log(event.target.value)}
                        aria-label="Green Color Channel"
                    >
                        <TextInput.Slot name="left">
                            <span className={styles.inputDecorator}>G</span>
                        </TextInput.Slot>
                    </TextInput.Root>
                    <TextInput.Root
                        className={`${styles.valueInput} ${styles.colorChannelInput}`}
                        value={30}
                        type="number"
                        onChange={(event) => console.log(event.target.value)}
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
                value={100}
                type="number"
                onChange={(event) => console.log(event.target.value)}
                aria-label="Color Opacity"
            >
                <TextInput.Slot name="right">%</TextInput.Slot>
            </TextInput.Root>
        </div>
    );
};
ColorPickerInputs.displayName = 'ColorPicker.Inputs';
