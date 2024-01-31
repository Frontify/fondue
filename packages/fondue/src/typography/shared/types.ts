/* (c) Copyright Frontify Ltd., all rights reserved. */

export type SharedTypographyProps = {
    overflow?: TypographyOverflow;
    whitespace?: TypographyWhitespace;
    display?: TypographyDisplay;
    wordBreak?: TypographyWordBreak;
    decoration?: TypographyDecoration;
};

export type TypographyOverflow = 'truncate' | 'ellipsis' | 'clip' | 'visible';
export type TypographyWhitespace = 'normal' | 'nowrap' | 'pre' | 'pre-line' | 'pre-wrap';
export type TypographyDisplay = 'inline-block' | 'block' | 'inline' | 'none';
export type TypographyWordBreak = 'break-words' | 'break-all' | 'normal';
export type TypographyDecoration = 'underline' | 'line-through' | 'none';
