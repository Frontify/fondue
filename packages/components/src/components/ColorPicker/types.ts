/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

export type Palette = {
    id: number | string;
    title: string;
    colors: Color[];
};

export type BrandColorPickerProps = {
    palettes?: Palette[];
    currentColor?: Color;
    onColorSelected?: (color: Color) => void;
};

export type Color = {
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
};
export type ColorPickerProps = {
    children?: ReactNode;
    currentColor?: Color;
    onSelect: (color: Color) => void;
    showPreview?: boolean;
    allowCustomColor?: boolean;
};
