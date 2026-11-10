/* (c) Copyright Frontify Ltd., all rights reserved. */

import { isSafeCssValue } from './htmlSpec';

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

/** The CSS property each field sets. The stylesheet's `_look.scss` spells the same names. */
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

const UPPER_CASE_LETTER = /[A-Z]/g;

/** `imageTitle` → `image-title`, the form the stylesheet names a style's variables with. */
const kebabCase = (key: string): string => key.replaceAll(UPPER_CASE_LETTER, (letter) => `-${letter.toLowerCase()}`);

/**
 * The custom properties a style's look sets, `--rte-<key>-<css property>`, which
 * the stylesheet reads with Fondue's look as the fallback.
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
        if (value.trim() === '' || !isSafeCssValue(value)) {
            throw new Error(`The "${field}" of the "${key}" look is not a usable CSS value: ${JSON.stringify(value)}`);
        }
        properties[`--rte-${kebabCase(key)}-${property}`] = value;
    }
    return properties;
};
