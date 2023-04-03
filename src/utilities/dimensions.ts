/* (c) Copyright Frontify Ltd., all rights reserved. */

export type SpacingValues = 0 | 4 | 8 | 12 | 16 | 20 | 24 | 28 | 32 | 36 | 40;
export type DimensionUnities = '%' | 'px' | 'rem' | 'em' | 'vh' | 'vw';

export const SPACING_VALUES: SpacingValues[] = [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40];
export const PADDING_VALUES_MAP = {
    0: 'tw-p-0',
    4: 'tw-p-1',
    8: 'tw-p-2',
    12: 'tw-p-3',
    16: 'tw-p-4',
    20: 'tw-p-5',
    24: 'tw-p-6',
    28: 'tw-p-7',
    32: 'tw-p-8',
    36: 'tw-p-9',
    40: 'tw-p-10',
};

export const MARGIN_VALUES_MAP = {
    0: 'tw-m-0',
    4: 'tw-m-1',
    8: 'tw-m-2',
    12: 'tw-m-3',
    16: 'tw-m-4',
    20: 'tw-m-5',
    24: 'tw-m-6',
    28: 'tw-m-7',
    32: 'tw-m-8',
    36: 'tw-m-9',
    40: 'tw-m-10',
};
