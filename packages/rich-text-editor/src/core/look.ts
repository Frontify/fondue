/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DOCUMENT_GAP_VARIABLES } from './documentContract';
import { isSafeCssValue, type StyleMap } from './htmlSpec';

/**
 * How a text style looks. Each value is any CSS value, a guideline variable
 * (`var(--f-theme-settings-heading1-font-size)`) included. A field left out keeps Fondue's look.
 */
export type TextLook = {
    fontFamily?: string;
    fontSize?: string;
    fontWeight?: string;
    fontStyle?: string;
    lineHeight?: string;
    letterSpacing?: string;
    textTransform?: string;
    textDecoration?: string;
    marginTop?: string;
    marginBottom?: string;
    color?: string;
};

/** The CSS property each field sets. `styles/look.module.scss` spells the same names. */
export const LOOK_PROPERTIES = {
    fontFamily: 'font-family',
    fontSize: 'font-size',
    fontWeight: 'font-weight',
    fontStyle: 'font-style',
    lineHeight: 'line-height',
    letterSpacing: 'letter-spacing',
    textTransform: 'text-transform',
    textDecoration: 'text-decoration',
    marginTop: 'margin-top',
    marginBottom: 'margin-bottom',
    color: 'color',
} as const satisfies Record<keyof TextLook, string>;

/**
 * The margins a block's look falls back to, as `$default-fallbacks` in `styles/look.module.scss`:
 * none above, and the document's gap below. For the inline style of a block that owns its margins.
 */
export const LOOK_MARGIN_FALLBACKS: StyleMap = {
    'margin-top': '0',
    'margin-bottom': `var(${DOCUMENT_GAP_VARIABLES.block}, 0)`,
};

/** The prefix every look's custom property carries; `styles/look.module.scss` writes the same. */
const LOOK_VARIABLE_PREFIX = '--rte-';

const UPPER_CASE_LETTER = /[A-Z]/g;

/** `imageTitle` → `image-title`, the form the stylesheet names a style's variables with. */
const kebabCase = (key: string): string => key.replaceAll(UPPER_CASE_LETTER, (letter) => `-${letter.toLowerCase()}`);

/**
 * Checks a look's value, so the rule for a usable one lives once.
 * @param subject - What the value belongs to, for the message, such as `the "custom2" look`.
 * @throws When the value is empty or could break out of its declaration, rather than dropping it silently.
 */
const assertUsableValue = (field: string, value: string, subject: string): void => {
    if (value.trim() === '' || !isSafeCssValue(value)) {
        throw new Error(`The "${field}" of ${subject} is not a usable CSS value: ${JSON.stringify(value)}`);
    }
};

/**
 * The custom property a host sets for one field of a style's look, `--rte-<key>-<css property>`.
 * The stylesheet reads it with Fondue's look as the fallback.
 *
 * @param key - The style's name, such as `imageTitle`.
 * @param property - The CSS property, as a value of `LOOK_PROPERTIES`.
 */
export const lookVariableName = (key: string, property: string): string =>
    `${LOOK_VARIABLE_PREFIX}${kebabCase(key)}-${property}`;

/**
 * The custom properties a style's look sets, which the stylesheet reads with Fondue's look as the fallback.
 *
 * @param key - The style's name, such as `imageTitle`.
 * @throws When a value is empty or could break out of its declaration, rather than dropping it silently.
 */
export const lookProperties = (key: string, look: TextLook): Record<string, string> => {
    const properties: Record<string, string> = {};
    for (const [field, property] of Object.entries(LOOK_PROPERTIES)) {
        // `Object.entries` widens the keys to string; they are the fields of `TextLook` by `satisfies` above.
        const value = look[field as keyof TextLook];
        if (value === undefined) {
            continue;
        }
        assertUsableValue(field, value, `the "${key}" look`);
        properties[lookVariableName(key, property)] = value;
    }
    return properties;
};

/**
 * One class's style, shaped as `contentStyles` takes it.
 * @throws When the class has no name, as when its stylesheet module did not load, rather than writing no style.
 */
export const styleOfClass = (className: string | undefined, style: StyleMap): Record<string, StyleMap> => {
    if (className === undefined) {
        throw new Error(
            'A class has no name, so its inline style has nothing to be keyed by: is its stylesheet loaded?',
        );
    }
    return { [className]: style };
};

/**
 * The inline style a look makes, for HTML exported without the stylesheet: the
 * fallbacks, then each value the host set, by its CSS property name.
 *
 * @param fallbacks - The values the stylesheet falls back to where the host sets none.
 * @throws When a value is empty or could break out of its declaration, rather than dropping it silently.
 */
export const lookStyle = (look: TextLook, fallbacks: StyleMap): StyleMap => {
    const style: StyleMap = { ...fallbacks };
    for (const [field, property] of Object.entries(LOOK_PROPERTIES)) {
        // `Object.entries` widens the keys to string; they are the fields of `TextLook` by `satisfies` above.
        const value = look[field as keyof TextLook];
        if (value === undefined) {
            continue;
        }
        assertUsableValue(field, value, 'the look');
        style[property] = value;
    }
    return style;
};
