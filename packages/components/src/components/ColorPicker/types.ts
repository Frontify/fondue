/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

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
    onColorChange: (color: Color) => void;
    showPreview?: boolean;
    allowCustomColor?: boolean;
};
