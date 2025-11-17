/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ForwardedRef, forwardRef, useEffect, useState } from 'react';

import { useTranslation } from '#/hooks/useTranslation';

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

const nooperation = () => {};

export const ColorValueInput = (
    {
        currentColor = DEFAULT_COLOR,
        onColorChange = nooperation,
        currentFormat = DEFAULT_FORMAT,
        setCurrentFormat = nooperation,
        'data-test-id': dataTestId = 'color-picker-value-input',
    }: ColorValueInputProps,
    forwardedRef: ForwardedRef<HTMLDivElement>,
) => {
    const { t } = useTranslation();
    const [hexColorValue, setHexColorValue] = useState<string>(() => rgbColorToHex(currentColor));

    useEffect(() => {
        setHexColorValue(rgbColorToHex(currentColor));
    }, [currentColor]);

    return (
        <div className={styles.inputs} data-test-id={dataTestId} ref={forwardedRef}>
            <div className={styles.colorFormatInput}>
                <Select
                    data-test-id="color-picker-select-format"
                    aria-label={t('ColorPicker_selectFormat')}
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
                    data-test-id="color-picker-value-input-hex"
                    className={styles.valueInput}
                    type="text"
                    value={hexColorValue}
                    status={isValidHexColor(hexColorValue) ? 'neutral' : 'error'}
                    onBlur={(event) => {
                        if (isValidHexColor(event.target.value)) {
                            onColorChange({ ...hexColorToRgba(event.target.value), alpha: currentColor.alpha });
                        }
                    }}
                    onChange={(event) => {
                        const inputValue = event.target.value.startsWith('#')
                            ? event.target.value.slice(1)
                            : event.target.value;

                        setHexColorValue(inputValue);
                    }}
                    aria-label={t('ColorPicker_hexValue')}
                >
                    <TextInput.Slot name="left">
                        <span className={styles.inputDecorator}>#</span>
                    </TextInput.Slot>
                </TextInput.Root>
            ) : (
                <div className={styles.colorChannelInputGroup}>
                    <TextInput.Root
                        data-test-id="color-picker-value-input-red"
                        className={styles.valueInput}
                        value={currentColor.red}
                        type="number"
                        onChange={(event) => {
                            onColorChange({
                                ...currentColor,
                                red: getLimitedColorChannelValue(event.target.value),
                            });
                        }}
                        aria-label={t('ColorPicker_redChannel')}
                    >
                        <TextInput.Slot name="left">
                            <span className={styles.inputDecorator}>R</span>
                        </TextInput.Slot>
                    </TextInput.Root>
                    <TextInput.Root
                        data-test-id="color-picker-value-input-green"
                        className={styles.valueInput}
                        value={currentColor.green}
                        type="number"
                        onChange={(event) => {
                            onColorChange({
                                ...currentColor,
                                green: getLimitedColorChannelValue(event.target.value),
                            });
                        }}
                        aria-label={t('ColorPicker_greenChannel')}
                    >
                        <TextInput.Slot name="left">
                            <span className={styles.inputDecorator}>G</span>
                        </TextInput.Slot>
                    </TextInput.Root>
                    <TextInput.Root
                        data-test-id="color-picker-value-input-blue"
                        className={styles.valueInput}
                        value={currentColor.blue}
                        type="number"
                        onChange={(event) => {
                            onColorChange({
                                ...currentColor,
                                blue: getLimitedColorChannelValue(event.target.value),
                            });
                        }}
                        aria-label={t('ColorPicker_blueChannel')}
                    >
                        <TextInput.Slot name="left">
                            <span className={styles.inputDecorator}>B</span>
                        </TextInput.Slot>
                    </TextInput.Root>
                </div>
            )}
            <div className={styles.colorAlphaInput}>
                <TextInput.Root
                    data-test-id="color-picker-value-input-alpha"
                    className={styles.valueInput}
                    /* .toString() is a workaround for https://github.com/facebook/react/issues/9402 */
                    value={currentColor.alpha === undefined ? 100 : Math.trunc(currentColor.alpha * 100).toString()}
                    type="number"
                    onChange={(event) => {
                        onColorChange({
                            ...currentColor,
                            alpha: getLimitedColorChannelValue(event.target.value, 0, 100) / 100,
                        });
                    }}
                    aria-label={t('ColorPicker_opacity')}
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
