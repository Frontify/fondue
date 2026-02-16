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
     * The picker content. Compose with `ColorPicker.Values` for hex/rgba inputs and `ColorPicker.Gradient` for the visual color area.
     */
    children?: ReactNode;
    /**
     * The active color. Pass an `RgbaColor` object with `red`, `green`, `blue`, and optional `alpha` channels.
     */
    currentColor?: RgbaColor;
    /**
     * Callback fired whenever the color changes — through the gradient, the value inputs, or the alpha slider.
     */
    onColorChange?: (color: RgbaColor) => void;
    /**
     * The controlled color format. Use together with `onFormatChange` for controlled format switching between `'HEX'` and `'RGBA'`.
     */
    currentFormat?: ColorFormat;
    /**
     * Callback fired when the user toggles between HEX and RGBA format.
     */
    onFormatChange?: (format: ColorFormat) => void;
    /**
     * The initial color format for uncontrolled usage.
     * @default "HEX"
     */
    defaultFormat?: ColorFormat;
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

/** A color selection tool — compose `Root` with `Values`, `Gradient`, and `Input` sub-components. */
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
