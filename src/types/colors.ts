/* (c) Copyright Frontify Ltd., all rights reserved. */

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
