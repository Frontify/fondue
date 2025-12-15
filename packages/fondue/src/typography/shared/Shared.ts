/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * @deprecated This object is deprecated and will be removed in the next major version.
 */
export const sharedTypographyArgTypes = {
    overflow: {
        options: ['ellipsis', 'clip', 'visible', 'truncate'],
        control: { type: 'select' },
    },
    whitespace: {
        options: ['nowrap', 'pre-wrap', 'pre', 'pre-line', 'normal'],
        control: { type: 'select' },
    },
    display: {
        options: ['block', 'inline-block', 'none', 'inline'],
        control: { type: 'select' },
    },
    wordBreak: {
        options: ['break-all', 'break-words', 'normal'],
        control: { type: 'select' },
    },
    decoration: {
        options: ['underline', 'line-through', 'none'],
        control: { type: 'select' },
    },
};

/**
 * @deprecated This object is deprecated and will be removed in the next major version.
 */
export const sharedTypographyArgs = {
    overflow: 'visible',
    wordBreak: 'normal',
    decoration: 'none',
    whitespace: 'normal',
    display: 'block',
};
