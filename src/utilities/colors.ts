/* (c) Copyright Frontify Ltd., all rights reserved. */

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
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

export const EXAMPLE_PALETTES: Palette[] = [
    {
        id: "red",
        source: "#992136",
        title: "Red",
    },
    {
        id: "green",
        source: "#006452",
        title: "Green",
    },
    {
        id: "yellow",
        source: "#cc9000",
        title: "Yellow",
    },
].map((palette) => {
    const sourceColor = tinycolor(palette.source);
    return {
        ...palette,
        colors: [...new Array(6)].map((_, index) => {
            const color = sourceColor.lighten(5).toRgb();
            let name = "";
            let r = 225,
                g = 255,
                b = 255,
                a = 1;

            switch (index) {
                case 0:
                    r = color.r;
                    g = color.g;
                    b = color.b;
                    a = color.a;
                    name = "90";
                    break;
                case 1:
                    r = color.r;
                    g = color.g;
                    b = color.b;
                    a = color.a;
                    name = "80";
                    break;
                case 2:
                    r = color.r;
                    g = color.g;
                    b = color.b;
                    a = color.a;
                    name = "70";
                    break;
                case 3:
                    r = color.r;
                    g = color.g;
                    b = color.b;
                    a = color.a;
                    name = "60";
                    break;
                case 4:
                    r = color.r;
                    g = color.g;
                    b = color.b;
                    a = color.a;
                    name = "50";
                    break;
                case 5:
                    r = color.r;
                    g = color.g;
                    b = color.b;
                    a = color.a;
                    name = "40";
                    break;
                default:
                    break;
            }

            return { r, g, b, a, name };
        }),
    };
});
