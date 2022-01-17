/* (c) Copyright Frontify Ltd., all rights reserved. */

export type ColorState = {
    rgb: { r: number; g: number; b: number; a: number };
    hsl: { h: number; s: number; l: number; a: number };
    hsv: { h: number; s: number; v: number; a: number };
    hex: string;
};

export type Color = {
    r: number;
    g: number;
    b: number;
    a?: number;
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
