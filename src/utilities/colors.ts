/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { toState } from "react-color/lib/helpers/color";

export type Color = {
    value?: string;
    rgba?: { r: number; g: number; b: number; a: number };
    hex: string;
    alpha?: number;
    name?: string;
};

export type DiffColor = {
    hex?: string;
    rgba?: { r?: number | string; g?: number | string; b?: number | string; a?: number };
    name?: string;
};

export const getValidRgbColorValue = (input: string): number => {
    const value = parseInt(input || "0", 10);

    if (value > 255) {
        return 255;
    }

    return value < 0 ? 0 : value;
};

export const transformColor = (color: Color) => toState({ ...toState(color).rgb, a: color.alpha });

export const toColor = (current: Color, { name, ...diff }: DiffColor, mode?: "hex" | "rgba"): Color => {
    const a = diff.rgba?.a || current.rgba?.a || current.alpha || 0;
    const alpha = a > 1 ? 1 : a;
    const rgb = { ...current.rgba, ...toState({ hex: diff.hex || current.hex }).rgb, ...diff.rgba };
    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(getValidRgbColorValue);
    const rgba = { r, g, b, a: alpha };
    const hex = toState(rgba).hex;

    const value = alpha === 1 && mode === "hex" ? hex : `rgba(${Object.values(rgba).join(", ")})`;

    return { name, rgba, alpha, hex, value };
};
