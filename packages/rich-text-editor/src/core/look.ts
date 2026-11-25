/* (c) Copyright Frontify Ltd., all rights reserved. */

import { isSafeCssValue } from './htmlSpec';

/**
 * How a text style looks. Each value is any CSS value, a guideline variable
 * (`var(--f-theme-settings-heading1-font-size)`) included. A field left out keeps Fondue's look.
 * A blank value, or one `isSafeCssValue` rejects, throws; check values you don't control with it first.
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

/** The prefix every look's custom property carries; `styles/look.module.scss` writes the same. */
const LOOK_VARIABLE_PREFIX = '--rte-';

const UPPER_CASE_LETTER = /[A-Z]/g;

/** `imageTitle` → `image-title`, the form the stylesheet names a style's variables with. */
const kebabCase = (key: string): string => key.replaceAll(UPPER_CASE_LETTER, (letter) => `-${letter.toLowerCase()}`);

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
 * @param fields - The name each field's variable ends in, such as `LOOK_PROPERTIES` for a text look.
 * @throws When a value is blank or `isSafeCssValue` rejects it, rather than dropping it silently.
 */
export const lookProperties = <TLook extends Partial<Record<string, string>>>(
    key: string,
    look: Readonly<TLook>,
    fields: Readonly<Record<keyof TLook & string, string>>,
): Record<string, string> => {
    const values: Readonly<Partial<Record<string, string>>> = look;
    const properties: Record<string, string> = {};
    for (const [field, property] of Object.entries<string>(fields)) {
        const value = values[field];
        if (value === undefined) {
            continue;
        }
        if (value.trim() === '' || !isSafeCssValue(value)) {
            throw new Error(`The "${field}" of the "${key}" look is not a usable CSS value: ${JSON.stringify(value)}`);
        }
        properties[lookVariableName(key, property)] = value;
    }
    return properties;
};
