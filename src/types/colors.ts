/* (c) Copyright Frontify Ltd., all rights reserved. */

export type ColorState = {
    rgb: { r: number; g: number; b: number; a: number };
    hsl: { h: number; s: number; l: number; a: number };
    hsv: { h: number; s: number; v: number; a: number };
    hex: string;
};

export type Color = {
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

export type Palette = {
    id: number | string;
    title: string;
    colors: Color[];
};

export enum ColorFormat {
    Hex = "Hex",
    Rgba = "Rgba",
}
