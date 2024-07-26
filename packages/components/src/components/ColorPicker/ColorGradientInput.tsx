/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ForwardedRef, forwardRef } from 'react';
import { RgbaColorPicker } from 'react-colorful';

import styles from './styles/customColorPicker.module.scss';
import { type RgbaColor } from './types';
import { DEFAULT_COLOR } from './utils';

type ColorGradientInputProps = {
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
     * The test id of the color picker gradient input
     */
    'data-test-id'?: string;
};

export const ColorGradientInput = (
    {
        currentColor = DEFAULT_COLOR,
        onColorChange = () => {},
        'data-test-id': dataTestId = 'color-picker-input',
    }: ColorGradientInputProps,
    forwardedRef: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <div className={styles.gradientInput} data-test-id={dataTestId} ref={forwardedRef}>
            <RgbaColorPicker
                className={styles.reactColorful}
                color={{
                    r: currentColor.red,
                    g: currentColor.green,
                    b: currentColor.blue,
                    a: currentColor.alpha === undefined ? 1 : currentColor.alpha,
                }}
                onChange={(color) =>
                    onColorChange({
                        red: color.r,
                        green: color.g,
                        blue: color.b,
                        alpha: color.a,
                    })
                }
            />
        </div>
    );
};
ColorGradientInput.displayName = 'ColorPicker.Gradient';

export const ForwardedRefColorGradientInput = forwardRef<HTMLDivElement, ColorGradientInputProps>(ColorGradientInput);
