/* (c) Copyright Frontify Ltd., all rights reserved. */

export enum PatternTheme {
    Black = "Black",
    Green = "Green",
    Violet = "Violet",
    Yellow = "Yellow",
    Red = "Red",
}

export const patternThemes: Record<PatternTheme, string> = {
    [PatternTheme.Black]: "tw-text-base",
    [PatternTheme.Green]: "tw-text-green-bright",
    [PatternTheme.Violet]: "tw-text-violet-bright",
    [PatternTheme.Yellow]: "tw-text-yellow-bright",
    [PatternTheme.Red]: "tw-text-red-bright",
};
