/* (c) Copyright Frontify Ltd., all rights reserved. */

import { lookProperties, type TextLook } from '#/core';

import styles from '../link.module.scss';

import { type LinkAppearance } from './value';

/** What an appearance shows in the link form and the class that draws it. Every rule per appearance reads this table. */
export const APPEARANCES = {
    primary: { label: 'Primary button', className: styles.buttonPrimary },
    secondary: { label: 'Secondary button', className: styles.buttonSecondary },
    tertiary: { label: 'Tertiary button', className: styles.buttonTertiary },
} as const satisfies Record<LinkAppearance, { label: string; className: string | undefined }>;

/** The appearances an editor offers when it is given none. */
export const NO_APPEARANCES: readonly LinkAppearance[] = [];

/** The attribute that carries the appearance in exported and pasted HTML. */
export const APPEARANCE_ATTRIBUTE = 'data-appearance';

/** Every appearance, in the order the link form lists them. */
export const ALL_LINK_APPEARANCES: readonly LinkAppearance[] = ['primary', 'secondary', 'tertiary'];

/** Whether a stored value names an appearance, which a document from another editor may not. */
export const isLinkAppearance = (value: unknown): value is LinkAppearance =>
    typeof value === 'string' && Object.keys(APPEARANCES).includes(value);

/** The anchor's class: the link's own, and the appearance's when the value names one. */
export const linkClassName = (appearance: unknown): string | undefined => {
    if (isLinkAppearance(appearance)) {
        return [styles.link, APPEARANCES[appearance].className].join(' ');
    }
    return styles.link;
};

/** How a button looks under the pointer. */
export type ButtonHoverLook = {
    color?: string;
    backgroundColor?: string;
    borderColor?: string;
};

/**
 * How a button link looks. Each value is any CSS value, a guideline variable
 * (`var(--f-theme-settings-button-primary-color)`) included. A field left out keeps Fondue's look.
 */
export type ButtonLook = Omit<TextLook, 'marginTop' | 'marginBottom'> & {
    paddingTop?: string;
    paddingRight?: string;
    paddingBottom?: string;
    paddingLeft?: string;
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: string;
    borderRadius?: string;
    hover?: ButtonHoverLook;
};

/** The CSS property each field of a button's look sets. `link.module.scss` spells the same names. */
export const BUTTON_LOOK_FIELDS = {
    fontFamily: 'font-family',
    fontSize: 'font-size',
    fontWeight: 'font-weight',
    fontStyle: 'font-style',
    lineHeight: 'line-height',
    letterSpacing: 'letter-spacing',
    textTransform: 'text-transform',
    textDecoration: 'text-decoration',
    color: 'color',
    paddingTop: 'padding-top',
    paddingRight: 'padding-right',
    paddingBottom: 'padding-bottom',
    paddingLeft: 'padding-left',
    backgroundColor: 'background-color',
    borderColor: 'border-color',
    borderWidth: 'border-width',
    borderRadius: 'border-radius',
} as const satisfies Record<keyof Omit<ButtonLook, 'hover'>, string>;

/** The CSS property each field of a button's hover look sets. */
export const BUTTON_HOVER_LOOK_FIELDS = {
    color: 'color',
    backgroundColor: 'background-color',
    borderColor: 'border-color',
} as const satisfies Record<keyof ButtonHoverLook, string>;

/**
 * The custom properties the buttons' looks set, which `link.module.scss` reads with Fondue's look as the fallback.
 *
 * @throws When a value is empty or could break out of its declaration, naming the appearance and the field.
 */
export const buttonLookProperties = (
    looks: Readonly<Partial<Record<LinkAppearance, ButtonLook>>>,
): Record<string, string> => {
    const properties: Record<string, string> = {};
    for (const appearance of ALL_LINK_APPEARANCES) {
        const look = looks[appearance];
        if (look === undefined) {
            continue;
        }
        const { hover, ...own } = look;
        Object.assign(properties, lookProperties(`button-${appearance}`, own, BUTTON_LOOK_FIELDS));
        if (hover !== undefined) {
            Object.assign(properties, lookProperties(`button-${appearance}-hover`, hover, BUTTON_HOVER_LOOK_FIELDS));
        }
    }
    return properties;
};
