/* (c) Copyright Frontify Ltd., all rights reserved. */

export enum PatternScale {
    Small = "Small",
    Large = "Large",
}

export const patternScales: Record<PatternScale, string> = {
    [PatternScale.Small]: "tw-scale-100",
    [PatternScale.Large]: "tw-scale-150",
};
