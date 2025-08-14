/* (c) Copyright Frontify Ltd., all rights reserved. */

export enum PatternScale {
    SM = 'SM',
    MD = 'MD',
    LG = 'LG',
    XL = 'XL',
    XXL = 'XXL',
}

export const patternScales: Record<PatternScale, string> = {
    [PatternScale.SM]: '1',
    [PatternScale.MD]: '2',
    [PatternScale.LG]: '3',
    [PatternScale.XL]: '5',
    [PatternScale.XXL]: '10',
};
