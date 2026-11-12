/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type StyleParseRule } from '#/core';

/**
 * The lowest numeric `font-weight` that reads as bold.
 */
const BOLD_WEIGHT = 600;

/**
 * Whether a `font-weight` value is not bold.
 */
export const isNormalWeight = (value: string): boolean => {
    const weight = value.trim().toLowerCase();
    if (weight === 'normal' || weight === 'lighter') {
        return true;
    }
    return weight !== '' && Number(weight) < BOLD_WEIGHT;
};

/**
 * Whether a `font-weight` value is bold, such as `700`.
 */
export const isBoldWeight = (value: string): boolean => {
    const weight = value.trim().toLowerCase();
    if (weight === 'bold' || weight === 'bolder') {
        return true;
    }
    return Number(weight) >= BOLD_WEIGHT;
};

/**
 * A `font-style` that slants the text.
 */
const ITALIC_STYLE = /^(italic|oblique)\b/i;

/**
 * Whether a `font-style` value is italic, such as `oblique 10deg`.
 */
export const isItalicStyle = (value: string): boolean => ITALIC_STYLE.test(value);

/**
 * Whether a `font-style` value is upright.
 */
export const isNormalStyle = (value: string): boolean => value.trim().toLowerCase() === 'normal';

/**
 * Whether a `vertical-align` value is this keyword (`sub`, `super`).
 */
export const isVerticalAlign = (value: string, keyword: string): boolean => value.trim().toLowerCase() === keyword;

/**
 * The gaps between the keywords of a CSS value.
 */
const WHITESPACE = /\s+/;

/**
 * Whether a `text-decoration` or `text-decoration-line` value draws this line (`underline`, `line-through`).
 */
export const hasDecorationLine = (value: string, line: string): boolean =>
    value.toLowerCase().split(WHITESPACE).includes(line);

/**
 * A `text-decoration` or `text-decoration-line` value without this line (`underline`).
 */
export const withoutDecorationLine = (value: string, line: string): string =>
    value
        .split(WHITESPACE)
        .filter((word) => word.toLowerCase() !== line)
        .join(' ');

/**
 * A `font-weight` value, or nothing where it is bold.
 */
export const withoutBoldWeight = (value: string): string => {
    if (isBoldWeight(value)) {
        return '';
    }
    return value;
};

/**
 * A style rule's `value` that puts the mark on, with no value of its own, when the declared CSS value passes the check.
 */
export const markWhen =
    (check: (value: string) => boolean) =>
    (value: string): Record<string, never> | null => {
        if (check(value)) {
            return {};
        }
        return null;
    };

/**
 * The properties that can draw a line through or under text.
 */
const DECORATION_PROPERTIES = ['text-decoration', 'text-decoration-line'];

/**
 * Style rules that put the mark on any element whose declared decoration draws this line (`underline`, `line-through`).
 */
export const decorationLineRules = (line: string): StyleParseRule<Record<string, never>>[] =>
    DECORATION_PROPERTIES.map((style) => ({ style, value: markWhen((value) => hasDecorationLine(value, line)) }));

/**
 * Whether the element's own style resets the weight: Google Docs wraps copies in `<b style="font-weight: normal">`.
 */
export const declaresNormalWeight = (element: HTMLElement): boolean =>
    // Read as the browser does, like the `font-weight` style rules, so `font` shorthands and invalid values agree.
    isNormalWeight(element.style.getPropertyValue('font-weight'));
