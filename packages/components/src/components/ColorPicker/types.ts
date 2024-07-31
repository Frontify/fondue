/* (c) Copyright Frontify Ltd., all rights reserved. */

export type RgbaColor = {
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
};

export type ColorFormat = 'HEX' | 'RGBA';
