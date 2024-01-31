/* (c) Copyright Frontify Ltd., all rights reserved. */

export enum PatternTheme {
    Black = 'Black',
    Green = 'Green',
    Violet = 'Violet',
    Yellow = 'Yellow',
    Red = 'Red',
}

export const patternThemes: Record<PatternTheme, string> = {
    [PatternTheme.Black]: 'tw-text-black',
    [PatternTheme.Green]: 'tw-text-green-60',
    [PatternTheme.Violet]: 'tw-text-violet-60',
    [PatternTheme.Yellow]: 'tw-text-yellow-60',
    [PatternTheme.Red]: 'tw-text-red-60',
};
