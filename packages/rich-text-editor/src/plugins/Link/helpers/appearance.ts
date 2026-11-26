/* (c) Copyright Frontify Ltd., all rights reserved. */

import { LOOK_PROPERTIES, lookProperties, type TextLook } from '#/core';
import { type PlainStringKey } from '#/locales/types';

import styles from '../link.module.scss';

import { ALL_LINK_APPEARANCES, type ButtonLink, type LinkAppearance, type LinkValue } from './value';

type AppearanceEntry = {
    label: PlainStringKey;
    className: string | undefined;
    marginsClassName: string | undefined;
};

/** What an appearance shows in the link form and the class that draws it. Every rule per appearance reads this table. */
export const APPEARANCES = {
    primary: {
        label: 'RichTextEditor_linkButtonPrimary',
        className: styles.buttonPrimary,
        marginsClassName: styles.buttonPrimaryMargins,
    },
    secondary: {
        label: 'RichTextEditor_linkButtonSecondary',
        className: styles.buttonSecondary,
        marginsClassName: styles.buttonSecondaryMargins,
    },
    tertiary: {
        label: 'RichTextEditor_linkButtonTertiary',
        className: styles.buttonTertiary,
        marginsClassName: styles.buttonTertiaryMargins,
    },
} as const satisfies Record<LinkAppearance, AppearanceEntry>;

/** The appearances an editor offers when it is given none. */
export const NO_APPEARANCES: readonly LinkAppearance[] = [];

/** The attribute that carries the appearance in exported and pasted HTML. */
export const APPEARANCE_ATTRIBUTE = 'data-appearance';

/** Whether a stored value names an appearance, which a document from another editor may not. */
export const isLinkAppearance = (value: unknown): value is LinkAppearance =>
    typeof value === 'string' && Object.keys(APPEARANCES).includes(value);

/** Whether a link is a button that names an appearance this package knows. */
export const isButtonLink = (value: LinkValue): value is ButtonLink => {
    // A stored document may hold a non-object here, which `in` would throw on.
    if (typeof value !== 'object') {
        return false;
    }

    return 'appearance' in value && isLinkAppearance(value.appearance);
};

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

/** The box drawn around a link's text: its padding, background and border. */
export type LinkBoxLook = {
    paddingTop?: string;
    paddingRight?: string;
    paddingBottom?: string;
    paddingLeft?: string;
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: string;
    borderRadius?: string;
};

const LINK_BOX_LOOK_FIELDS = {
    paddingTop: 'padding-top',
    paddingRight: 'padding-right',
    paddingBottom: 'padding-bottom',
    paddingLeft: 'padding-left',
    backgroundColor: 'background-color',
    borderColor: 'border-color',
    borderWidth: 'border-width',
    borderRadius: 'border-radius',
} as const satisfies Record<keyof LinkBoxLook, string>;

/**
 * How a button link looks. Each value is any CSS value, a guideline variable
 * (`var(--f-theme-settings-button-primary-color)`) included. A field left out keeps Fondue's look.
 */
export type ButtonLook = TextLook & LinkBoxLook & { hover?: ButtonHoverLook };

/** The CSS property each field of a button's look sets. `link.module.scss` spells the same names. */
export const BUTTON_LOOK_FIELDS = {
    ...LOOK_PROPERTIES,
    ...LINK_BOX_LOOK_FIELDS,
} as const satisfies Record<keyof Omit<ButtonLook, 'hover'>, string>;

/**
 * How text links look: their font and colour, and the box around their text. A link keeps its underline, and
 * vertical margins do nothing on inline text, so neither is a field. A border style is a field because a text
 * link has no border until a host gives it one.
 */
export type TextLinkLook = Omit<TextLook, 'textDecoration' | 'marginTop' | 'marginBottom'> &
    LinkBoxLook & { borderStyle?: string };

/** The CSS property each field of a text link's box sets. */
export const TEXT_LINK_BOX_FIELDS = {
    ...LINK_BOX_LOOK_FIELDS,
    borderStyle: 'border-style',
} as const satisfies Record<keyof LinkBoxLook | 'borderStyle', string>;

/** The CSS property each field of a text link's look sets. `link.module.scss` spells the same names. */
export const TEXT_LINK_LOOK_FIELDS = {
    fontFamily: LOOK_PROPERTIES.fontFamily,
    fontSize: LOOK_PROPERTIES.fontSize,
    fontWeight: LOOK_PROPERTIES.fontWeight,
    fontStyle: LOOK_PROPERTIES.fontStyle,
    lineHeight: LOOK_PROPERTIES.lineHeight,
    letterSpacing: LOOK_PROPERTIES.letterSpacing,
    textTransform: LOOK_PROPERTIES.textTransform,
    color: LOOK_PROPERTIES.color,
    ...TEXT_LINK_BOX_FIELDS,
} as const satisfies Record<keyof TextLinkLook, string>;

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

/**
 * The content classes that turn on the parts of a link look a page's own anchor rule keeps until a host sets them.
 */
export const linkLookClassName = (
    text: TextLinkLook,
    buttons: Readonly<Partial<Record<LinkAppearance, ButtonLook>>>,
): string | undefined => {
    const classNames: string[] = [];

    // The generic narrows the look to the box fields, which `TEXT_LINK_BOX_FIELDS` covers.
    const boxProperties = lookProperties<Pick<TextLinkLook, keyof typeof TEXT_LINK_BOX_FIELDS>>(
        'link',
        text,
        TEXT_LINK_BOX_FIELDS,
    );
    if (Object.keys(boxProperties).length > 0 && styles.linkBox !== undefined) {
        classNames.push(styles.linkBox);
    }

    for (const appearance of ALL_LINK_APPEARANCES) {
        const look = buttons[appearance];
        const marginsClassName = APPEARANCES[appearance].marginsClassName;
        if (look === undefined || marginsClassName === undefined) {
            continue;
        }

        if (look.marginTop !== undefined || look.marginBottom !== undefined) {
            classNames.push(marginsClassName);
        }
    }

    if (classNames.length === 0) {
        return undefined;
    }

    return classNames.join(' ');
};
