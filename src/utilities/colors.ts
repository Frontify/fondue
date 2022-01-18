/* (c) Copyright Frontify Ltd., all rights reserved. */

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { toState } from "react-color/lib/helpers/color";
import { Color, ColorFormat, ColorState, DiffColor, Palette } from "../types/colors";

export const getValidRgbColorValue = (input: string): number => {
    const value = parseInt(input || "0", 10);

    if (value > 255) {
        return 255;
    }

    return value < 0 ? 0 : value;
};

export const transformColor = (color: Color): ColorState => toState({ ...toState(color).rgb, a: color.alpha });

export const toColor = (current: Color, { name, ...diff }: DiffColor): Color => {
    const a = diff.rgba?.a || current.rgba?.a || current.alpha || 0;
    const alpha = a > 1 ? 1 : a;
    const rgb = { ...current.rgba, ...toState({ hex: diff.hex || current.hex }).rgb, ...diff.rgba };
    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(getValidRgbColorValue);
    const rgba = { r, g, b, a: alpha };
    const hex = toState(rgba).hex;

    return { name, rgba, alpha, hex };
};

export const getBackgroundColor = (color: Color): string => {
    const { rgba, hex } = color;
    if (rgba) {
        return `rgba(${Object.values(rgba).join(", ")})`;
    }
    return hex;
};

export const getAlphaPercent = (alpha: number): string => `${Math.round(alpha * 100)}%`;

export const getColorDisplayValue = (color: Color, format: ColorFormat, showAlpha = true): string => {
    const { hex, rgba, alpha } = color;

    switch (format) {
        case ColorFormat.Rgba:
            return rgba ? `rgba(${Object.values(rgba).join(", ")})` : hex;
        case ColorFormat.Hex:
            return showAlpha && alpha && alpha < 1 ? `${hex} ${getAlphaPercent(alpha)}` : hex;
        default:
            return hex;
    }
};

export const EXAMPLE_PALETTES: Palette[] = [
    {
        id: "red",
        title: "Red",
        colors: ["#992136", "#cc2c48", "#ff375a", "#ff8066", "#e1c4be", "#f0e1de"],
    },
    {
        id: "green",
        title: "Green",
        colors: [
            "#006452",
            "#00866e",
            "#00c8a5",
            "#80dbb7",
            "#bee1d4",
            "#def0e9",
            "#008452",
            "#009452",
            "#00f452",
            "#00ff52",
        ],
    },
    {
        id: "yellow",
        title: "Yellow",
        colors: ["#cc9000", "#e6a200", "#ffb400", "#eec779", "#e1d4be", "#f0e9de"],
    },
].map((palette) => ({
    ...palette,
    colors: palette.colors.map((hex, index) => {
        let name = "";

        switch (index) {
            case 0:
                name = "90";
                break;
            case 1:
                name = "70";
                break;
            case 2:
                name = "60";
                break;
            case 3:
                name = "50";
                break;
            case 4:
                name = "40";
                break;
            case 5:
                name = "20";
                break;
            default:
                break;
        }

        return { hex, name, alpha: 1 };
    }),
}));
