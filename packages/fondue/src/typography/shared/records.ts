/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type TypographyDecoration,
    type TypographyDisplay,
    type TypographyOverflow,
    type TypographyWhitespace,
    type TypographyWordBreak,
} from './types';

/**
 * @deprecated This object is deprecated and will be removed in the next major version.
 */
export const overflowMap: Record<TypographyOverflow, string> = {
    truncate: 'tw-truncate',
    ellipsis: 'tw-text-ellipsis tw-overflow-hidden',
    clip: 'tw-text-clip tw-overflow-hidden',
    visible: 'tw-overflow-visible',
};

/**
 * @deprecated This object is deprecated and will be removed in the next major version.
 */
export const whitespaceMap: Record<TypographyWhitespace, string> = {
    unset: '',
    normal: 'tw-whitespace-normal',
    nowrap: 'tw-whitespace-nowrap',
    pre: 'tw-whitespace-pre',
    'pre-line': 'tw-whitespace-pre-line',
    'pre-wrap': 'tw-whitespace-pre-wrap',
};

/**
 * @deprecated This object is deprecated and will be removed in the next major version.
 */
export const displayMap: Record<TypographyDisplay, string> = {
    block: 'tw-block',
    'inline-block': 'tw-inline-block',
    inline: 'tw-inline',
    none: 'tw-hidden',
};

/**
 * @deprecated This object is deprecated and will be removed in the next major version.
 */
export const wordBreakMap: Record<TypographyWordBreak, string> = {
    'break-words': 'tw-break-words',
    'break-all': 'tw-break-all',
    normal: 'tw-break-normal',
};

/**
 * @deprecated This object is deprecated and will be removed in the next major version.
 */
export const decorationMap: Record<TypographyDecoration, string> = {
    underline: 'tw-underline',
    'line-through': 'tw-line-through',
    none: 'tw-no-underline',
};
