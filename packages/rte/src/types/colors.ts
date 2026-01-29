/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * @deprecated Please use a custom type instead.
 **/
export type Color = {
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
};

/**
 * @deprecated Please use a custom type instead.
 **/
export type ColorRgb = {
    r: number;
    g: number;
    b: number;
    a?: number;
};

/**
 * @deprecated Please use a custom type instead.
 **/
export type Palette = {
    id: number | string;
    title: string;
    colors: Color[];
};

/**
 * @deprecated Please use a custom type instead.
 **/
export enum ColorFormat {
    Hex = 'Hex',
    Rgba = 'Rgba',
}
