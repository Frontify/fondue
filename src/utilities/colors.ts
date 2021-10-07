/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { toState } from "react-color/lib/helpers/color";

type ColorState = {
    rgb: { r: number; g: number; b: number; a: number };
    hsl: { h: number; s: number; l: number; a: number };
    hsv: { h: number; s: number; v: number; a: number };
    hex: string;
};

export type Color = {
    rgba?: { r: number; g: number; b: number; a: number };
    hex: string;
    hexa: string;
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

export const transformColor = (color: Color): ColorState => toState({ ...toState(color).rgb, a: color.alpha });

export const toColor = (current: Color, { name, ...diff }: DiffColor): Color => {
    const a = diff.rgba?.a || current.rgba?.a || current.alpha || 0;
    const alpha = a > 1 ? 1 : a;
    const rgb = { ...current.rgba, ...toState({ hex: diff.hex || current.hex }).rgb, ...diff.rgba };
    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(getValidRgbColorValue);
    const rgba = { r, g, b, a: alpha };
    const hex = toState(rgba).hex;
    const hexa = alpha < 1 ? hex + Math.round(alpha * 100) : hex;

    return { name, rgba, alpha, hex, hexa };
};
