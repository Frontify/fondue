/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Slot as RadixSlot } from '@radix-ui/react-slot';
import { Children, forwardRef, useCallback, useState, type ReactNode } from 'react';

import { ForwardedRefColorGradientInput } from './ColorGradientInput';
import { ForwardedRefColorPickerInput } from './ColorPickerInput';
import { ForwardedRefColorValueInput } from './ColorValueInput';
import styles from './styles/customColorPicker.module.scss';
import { type ColorFormat, type RgbaColor } from './types';
import { DEFAULT_COLOR, DEFAULT_FORMAT, rgbColorToHex } from './utils';

type ColorPickerProps = {
    /**
     * The children of the color picker component. This can contain multiple `ColorPicker.Values` or `ColorPicker.Gradient` components.
     */
    children?: ReactNode;
    /**
     * The active color in the color picker
     */
    currentColor?: RgbaColor;
    /**
     * Event handler called when the color changes
     */
    onColorChange?: (color: RgbaColor) => void;
    /**
     * The default format to use for the color input
     * @default "HEX"
     */
    defaultFormat?: ColorFormat;
};

export const ColorPickerRoot = ({
    children,
    currentColor = DEFAULT_COLOR,
    onColorChange = () => {},
    defaultFormat = DEFAULT_FORMAT,
    ...props
}: ColorPickerProps) => {
    const [currentFormat, setCurrentFormat] = useState<ColorFormat>(defaultFormat);

    const handleColorChange = useCallback(
        (color: RgbaColor, currentFormat: ColorFormat) => {
            if (currentFormat === 'HEX') {
                onColorChange({
                    ...color,
                    name: `#${rgbColorToHex(color)}`,
                });
            } else {
                onColorChange({
                    ...color,
                    name: `rgba(${color.red}, ${color.green}, ${color.blue}, ${color.alpha || 1})`,
                });
            }
        },
        [onColorChange],
    );

    return (
        <div className={styles.root} data-picker-type="custom-color" data-test-id="custom-color-picker">
            {Children.map(children, (child) => (
                <ColorPickerSlot
                    {...props}
                    onColorChange={(color: RgbaColor) => {
                        handleColorChange(color, currentFormat);
                    }}
                    currentColor={currentColor}
                    currentFormat={currentFormat}
                    setCurrentFormat={(currentFormat: ColorFormat) => {
                        setCurrentFormat(currentFormat);
                        handleColorChange(currentColor, currentFormat);
                    }}
                >
                    {child}
                </ColorPickerSlot>
            ))}
        </div>
    );
};
ColorPickerRoot.displayName = 'ColorPicker';

type ColorPickerSlotProps = ColorPickerProps & {
    currentFormat?: ColorFormat;
    setCurrentFormat?: (format: ColorFormat) => void;
};
const ColorPickerSlot = ({ children, ...props }: ColorPickerSlotProps) => <RadixSlot {...props}>{children}</RadixSlot>;

export const ForwardedRefColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>(ColorPickerRoot);

export const ColorPicker = {
    Root: ForwardedRefColorPicker,
    Values: ForwardedRefColorValueInput,
    Gradient: ForwardedRefColorGradientInput,
    Input: ForwardedRefColorPickerInput,
};

ColorPicker.Root.displayName = 'ColorPicker.Root';
ColorPicker.Values.displayName = 'ColorPicker.Values';
ColorPicker.Gradient.displayName = 'ColorPicker.Gradient';
ColorPicker.Input.displayName = 'ColorPicker.Input';
