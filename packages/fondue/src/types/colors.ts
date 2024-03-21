/* (c) Copyright Frontify Ltd., all rights reserved. */

export type Color = {
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
};

export type ColorRgb = {
    r: number;
    g: number;
    b: number;
    a?: number;
};

export type Palette = {
    id: number | string;
    title: string;
    colors: Color[];
};

export enum ColorFormat {
    Hex = 'Hex',
    Rgba = 'Rgba',
}
