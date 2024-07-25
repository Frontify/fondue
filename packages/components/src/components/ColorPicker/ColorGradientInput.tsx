/* (c) Copyright Frontify Ltd., all rights reserved. */

import { forwardRef } from 'react';
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
};

export const ColorGradientInput = ({
    currentColor = DEFAULT_COLOR,
    onColorChange = () => {},
}: ColorGradientInputProps) => {
    return (
        <div className={styles.gradientInput} data-test-id="custom-color-value-inputs">
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
