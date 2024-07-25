/* (c) Copyright Frontify Ltd., all rights reserved. */

import { RgbaColorPicker } from 'react-colorful';

import { type CustomColorPickerProps } from './CustomColorPicker';
import styles from './styles/customColorPicker.module.scss';

type ColorGradientInputProps = CustomColorPickerProps;

export const ColorGradientInput = ({
    currentColor = { red: 150, green: 150, blue: 150, alpha: 1 },
    onColorChange = () => {},
    ...props
}: ColorGradientInputProps) => {
    return (
        <div className={styles.gradientInput} data-test-id="custom-color-value-inputs" {...props}>
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
ColorGradientInput.displayName = 'ColorPicker.GradientInput';
