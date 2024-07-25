/* (c) Copyright Frontify Ltd., all rights reserved. */


export type Palette = {
    id: number | string;
    title: string;
    colors: Color[];
};

export type BrandColorPickerProps = {
    palettes?: Palette[];
    currentColor?: Color;
    onColorChange?: (color: Color) => void;
};

export type Color = {
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
};
