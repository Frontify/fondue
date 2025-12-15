/* (c) Copyright Frontify Ltd., all rights reserved. */

type SpacingMapType = Record<SpacingValue, string>;
type PaddingDirectionKey = 'PADDING' | 'PADDING_X' | 'PADDING_Y';
type PaddingDirection = 'padding' | 'padding-x' | 'padding-y';
type MarginDirectionKey = 'MARGIN' | 'MARGIN_X' | 'MARGIN_Y';
type MarginDirection = 'margin' | 'margin-x' | 'margin-y';

/**
 * @deprecated This type is deprecated and will be removed in the next major version.
 */
export type SpacingValue = 0 | 4 | 8 | 12 | 16 | 20 | 24 | 28 | 32 | 36 | 40;
/**
 * @deprecated This type is deprecated and will be removed in the next major version.
 */
export type DimensionUnity = '%' | 'px' | 'rem' | 'em' | 'vh' | 'vw';

/**
 * @deprecated This constant is deprecated and will be removed in the next major version.
 */
export const SPACING_VALUES: SpacingValue[] = [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40];
const PADDING_VALUES_MAP: Record<SpacingValue, string> = {
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

const PADDING_X_VALUES_MAP: Record<SpacingValue, string> = {
    0: 'tw-px-0',
    4: 'tw-px-1',
    8: 'tw-px-2',
    12: 'tw-px-3',
    16: 'tw-px-4',
    20: 'tw-px-5',
    24: 'tw-px-6',
    28: 'tw-px-7',
    32: 'tw-px-8',
    36: 'tw-px-9',
    40: 'tw-px-10',
};

const PADDING_Y_VALUES_MAP: Record<SpacingValue, string> = {
    0: 'tw-py-0',
    4: 'tw-py-1',
    8: 'tw-py-2',
    12: 'tw-py-3',
    16: 'tw-py-4',
    20: 'tw-py-5',
    24: 'tw-py-6',
    28: 'tw-py-7',
    32: 'tw-py-8',
    36: 'tw-py-9',
    40: 'tw-py-10',
};

/**
 * @deprecated This constant is deprecated and will be removed in the next major version.
 */
export const PADDING_DIRECTIONS: Record<PaddingDirectionKey, PaddingDirection> = {
    PADDING: 'padding',
    PADDING_X: 'padding-x',
    PADDING_Y: 'padding-y',
};

const MARGIN_VALUES_MAP: Record<SpacingValue, string> = {
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

const MARGIN_X_VALUES_MAP: Record<SpacingValue, string> = {
    0: 'tw-mx-0',
    4: 'tw-mx-1',
    8: 'tw-mx-2',
    12: 'tw-mx-3',
    16: 'tw-mx-4',
    20: 'tw-mx-5',
    24: 'tw-mx-6',
    28: 'tw-mx-7',
    32: 'tw-mx-8',
    36: 'tw-mx-9',
    40: 'tw-mx-10',
};

const MARGIN_Y_VALUES_MAP: Record<SpacingValue, string> = {
    0: 'tw-my-0',
    4: 'tw-my-1',
    8: 'tw-my-2',
    12: 'tw-my-3',
    16: 'tw-my-4',
    20: 'tw-my-5',
    24: 'tw-my-6',
    28: 'tw-my-7',
    32: 'tw-my-8',
    36: 'tw-my-9',
    40: 'tw-my-10',
};

/**
 * @deprecated This constant is deprecated and will be removed in the next major version.
 */
export const MARGIN_DIRECTIONS: Record<MarginDirectionKey, MarginDirection> = {
    MARGIN: 'margin',
    MARGIN_X: 'margin-x',
    MARGIN_Y: 'margin-y',
};

const getMappedSpacingValue = (map: SpacingMapType, spacingValue: SpacingValue) => {
    return SPACING_VALUES.includes(spacingValue) ? map[spacingValue] : '';
};

/**
 * @deprecated This function is deprecated and will be removed in the next major version.
 */
export const GetPaddingClassNames = (direction: PaddingDirection, padding?: SpacingValue): string => {
    if (padding) {
        switch (direction) {
            case PADDING_DIRECTIONS.PADDING_X:
                return getMappedSpacingValue(PADDING_X_VALUES_MAP, padding);
            case PADDING_DIRECTIONS.PADDING_Y:
                return getMappedSpacingValue(PADDING_Y_VALUES_MAP, padding);
            case PADDING_DIRECTIONS.PADDING:
                return getMappedSpacingValue(PADDING_VALUES_MAP, padding);
            default:
                return '';
        }
    }
    return '';
};

/**
 * @deprecated This function is deprecated and will be removed in the next major version.
 */
export const GetMarginClassNames = (direction: MarginDirection, margin?: SpacingValue): string => {
    if (margin) {
        switch (direction) {
            case MARGIN_DIRECTIONS.MARGIN_X:
                return getMappedSpacingValue(MARGIN_X_VALUES_MAP, margin);
            case MARGIN_DIRECTIONS.MARGIN_Y:
                return getMappedSpacingValue(MARGIN_Y_VALUES_MAP, margin);
            case MARGIN_DIRECTIONS.MARGIN:
                return getMappedSpacingValue(MARGIN_VALUES_MAP, margin);
            default:
                return '';
        }
    }
    return '';
};
