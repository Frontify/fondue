/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Slot as RadixSlot } from '@radix-ui/react-slot';
import { Children, forwardRef, useMemo, useState, type ForwardedRef, type ReactNode } from 'react';

import { ForwardedRefColorGradientInput } from './ColorGradientInput';
import { ForwardedRefColorPickerInput } from './ColorPickerInput';
import { ForwardedRefColorValueInput } from './ColorValueInput';
import styles from './styles/customColorPicker.module.scss';
import { type ColorFormat, type RgbaColor } from './types';
import { DEFAULT_COLOR, DEFAULT_FORMAT, getColorWithName } from './utils';

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
     * The active color format in the color picker
     */
    currentFormat?: ColorFormat;
    /**
     * Event handler called when the color format changes
     */
    onFormatChange?: (format: ColorFormat) => void;
    /**
     * The default format to use for the color input when not controlled externally
     * @default "HEX"
     */
    defaultFormat?: ColorFormat;
    /**
     * The test id of the color picker
     */
    'data-test-id'?: string;
};

export const ColorPickerRoot = (
    {
        children,
        currentColor = DEFAULT_COLOR,
        onColorChange = () => {},
        currentFormat,
        onFormatChange = () => {},
        defaultFormat = DEFAULT_FORMAT,
        'data-test-id': dataTestId = 'color-picker-input',
        ...props
    }: ColorPickerProps,
    forwardedRef: ForwardedRef<HTMLDivElement>,
) => {
    const [managedFormat, setManagedFormat] = useState<ColorFormat>(defaultFormat);
    const activeFormat = useMemo(() => currentFormat ?? managedFormat, [currentFormat, managedFormat]);

    return (
        <div className={styles.root} data-picker-type="custom-color" data-test-id={dataTestId} ref={forwardedRef}>
            {Children.map(children, (child) => (
                <ColorPickerSlot
                    {...props}
                    onColorChange={(color: RgbaColor) => {
                        onColorChange(getColorWithName(color, activeFormat));
                    }}
                    currentColor={currentColor}
                    currentFormat={activeFormat}
                    setCurrentFormat={(currentFormat: ColorFormat) => {
                        setManagedFormat(currentFormat);
                        onFormatChange(currentFormat);
                        onColorChange(getColorWithName(currentColor, currentFormat));
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
