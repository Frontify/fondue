/* (c) Copyright Frontify Ltd., all rights reserved. */

export enum PatternScale {
    SM = "SM",
    MD = "MD",
    LG = "LG",
    XL = "XL",
    XXL = "XXL",
}

export const patternScales: Record<PatternScale, string> = {
    [PatternScale.SM]: "1",
    [PatternScale.MD]: "1.5",
    [PatternScale.LG]: "2",
    [PatternScale.XL]: "2.5",
    [PatternScale.XXL]: " 3",
};
