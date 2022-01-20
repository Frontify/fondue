/* (c) Copyright Frontify Ltd., all rights reserved. */

import tinycolor from "tinycolor2";
import { Color, ColorFormat, Palette } from "../types/colors";

export const getColorDisplayValue = (color: Color, format: ColorFormat, showAlpha = true): string => {
    const parsedColor = tinycolor(color);

    switch (format) {
        case ColorFormat.Rgba:
            return parsedColor.toRgbString();
        case ColorFormat.Hex:
            const hex = parsedColor.toHexString();
            return showAlpha && color.a && color.a < 1 ? `${hex} ${Math.trunc(parsedColor.getAlpha() * 100)}%` : hex;
        default:
            return parsedColor.toHexString();
    }
};

export const isColorLight = (color: Color): boolean => {
    const parsedColor = tinycolor(color);
    return parsedColor.isLight() || parsedColor.getAlpha() < 0.25;
};

const generatePalette = (color: string, amount: number): Color[] => {
    const sourceColor = tinycolor(color);
    const palette = [...new Array(amount)].map((_, index) => {
        const name = (90 - index * 10).toString();
        const { r, g, b, a } = sourceColor.lighten(index * 3).toRgb();
        return {
            r,
            g,
            b,
            a,
            name,
        };
    });
    return palette;
};

export const EXAMPLE_PALETTES: Palette[] = [
    {
        id: "red",
        title: "Red",
        source: "#992136",
    },
    {
        id: "green",
        title: "Green",
        source: "#006452",
    },
    {
        id: "yellow",
        title: "Yellow",
        source: "#cc9000",
    },
].map((palette) => {
    return {
        ...palette,
        colors: generatePalette(palette.source, 6),
    };
});
