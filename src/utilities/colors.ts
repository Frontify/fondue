/* (c) Copyright Frontify Ltd., all rights reserved. */

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { toState } from "react-color/lib/helpers/color";

import { Color, ColorState, Palette } from "../types/colors";

export const toRgbString = (color: Color): string => {
    if (color.a) {
        return `rgba(${color.r}, ${color.g}, ${color.g}, ${color.a})`;
    } else {
        return `rgb(${color.r}, ${color.g}, ${color.g})`;
    }
};

export const toHexString = (color: Color): string => {
    debugger;
    if (color.a) {
        return `#${color.r.toString(16)}${color.g.toString(16)}${color.b.toString(16)}${((color.a * 255) >> 0).toString(
            16,
        )}`;
    } else {
        return `#${color.r.toString(16)}${color.g.toString(16)}${color.b.toString(16)}`;
    }
};

export const parseColor = (input: string): Color => {
    if (/^#([0-9a-fA-F]{3,4}){1,2}$/.test(input)) {
        if (input.length === 4) {
            return {
                r: parseInt(input.slice(1, 2) + input.slice(1, 2), 16),
                g: parseInt(input.slice(2, 3) + input.slice(2, 3), 16),
                b: parseInt(input.slice(3, 4) + input.slice(3, 4), 16),
            };
        }
        if (input.length === 5) {
            return {
                r: parseInt(input.slice(1, 2) + input.slice(1, 2), 16),
                g: parseInt(input.slice(2, 3) + input.slice(2, 3), 16),
                b: parseInt(input.slice(3, 4) + input.slice(3, 4), 16),
                a: parseInt(input.slice(4, 5) + input.slice(4, 5), 16) / 256,
            };
        }

        if (input.length === 7) {
            return {
                r: parseInt(input.slice(1, 3), 16),
                g: parseInt(input.slice(3, 5), 16),
                b: parseInt(input.slice(5, 7), 16),
            };
        }
        if (input.length === 9) {
            return {
                r: parseInt(input.slice(1, 3), 16),
                g: parseInt(input.slice(3, 5), 16),
                b: parseInt(input.slice(5, 7), 16),
                a: parseInt(input.slice(7, 9), 16) / 255,
            };
        }
    }

    const rgb = input.match(/rgb\((\d+), *(\d+), *(\d+)\)/);
    if (rgb?.length === 4) {
        return { r: parseInt(rgb[1]), g: parseInt(rgb[2]), b: parseInt(rgb[3]) };
    }

    const rgba = input.match(/rgba\((\d+), *(\d+), *(\d+), *(\d?.\d+)\)/);
    if (rgba?.length === 5) {
        return { r: parseInt(rgba[1]), g: parseInt(rgba[2]), b: parseInt(rgba[3]), a: parseFloat(rgba[4]) };
    }

    return { r: 0, g: 0, b: 0 };
};

export const transformColor = (color: Color): ColorState => toState({ ...toState(color).rgb, a: color.a });

export const EXAMPLE_PALETTES: Palette[] = [
    {
        id: "red",
        title: "Red",
        colors: ["#992136", "#cc2c48", "#ff375a", "#ff8066", "#e1c4be", "#f0e1de"],
    },
    {
        id: "green",
        title: "Green",
        colors: ["#006452", "#00866e", "#00c8a5", "#80dbb7", "#bee1d4", "#def0e9"],
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

        const color = parseColor(hex);
        color.name = name;
        return color;
    }),
}));
