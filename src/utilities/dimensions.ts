/* (c) Copyright Frontify Ltd., all rights reserved. */

export type SpacingValue = 0 | 4 | 8 | 12 | 16 | 20 | 24 | 28 | 32 | 36 | 40;
export type DimensionUnity = '%' | 'px' | 'rem' | 'em' | 'vh' | 'vw';

export const SPACING_VALUES: SpacingValue[] = [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40];
export const PADDING_VALUES_MAP: Record<SpacingValue, string> = {
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

export const MARGIN_VALUES_MAP: Record<SpacingValue, string> = {
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

export const GAP_X_MAPPING = {
    0: 'tw-gap-x-0',
    1: 'tw-gap-x-px',
    4: 'tw-gap-x-1',
    8: 'tw-gap-x-2',
    12: 'tw-gap-x-3',
    16: 'tw-gap-x-4',
    20: 'tw-gap-x-5',
    24: 'tw-gap-x-6',
    28: 'tw-gap-x-7',
    32: 'tw-gap-x-8',
    36: 'tw-gap-x-9',
    40: 'tw-gap-x-10',
    44: 'tw-gap-x-11',
    48: 'tw-gap-x-12',
    52: 'tw-gap-x-13',
    56: 'tw-gap-x-14',
    60: 'tw-gap-x-15',
    64: 'tw-gap-x-16',
    68: 'tw-gap-x-17',
    72: 'tw-gap-x-18',
    76: 'tw-gap-x-19',
    80: 'tw-gap-x-20',
    84: 'tw-gap-x-21',
};

export const GAP_Y_MAPPING = {
    0: 'tw-gap-y-0',
    1: 'tw-gap-y-px',
    4: 'tw-gap-y-1',
    8: 'tw-gap-y-2',
    12: 'tw-gap-y-3',
    16: 'tw-gap-y-4',
    20: 'tw-gap-y-5',
    24: 'tw-gap-y-6',
    28: 'tw-gap-y-7',
    32: 'tw-gap-y-8',
    36: 'tw-gap-y-9',
    40: 'tw-gap-y-10',
    44: 'tw-gap-y-11',
    48: 'tw-gap-y-12',
    52: 'tw-gap-y-13',
    56: 'tw-gap-y-14',
    60: 'tw-gap-y-15',
    64: 'tw-gap-y-16',
    68: 'tw-gap-y-17',
    72: 'tw-gap-y-18',
    76: 'tw-gap-y-19',
    80: 'tw-gap-y-20',
    84: 'tw-gap-y-21',
};
