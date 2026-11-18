/* (c) Copyright Frontify Ltd., all rights reserved. */

/** The button looks a link can take, in the order the link form lists them. */
export const ALL_LINK_APPEARANCES = ['primary', 'secondary', 'tertiary'] as const;

/** One of the button looks a link can take. */
export type LinkAppearance = (typeof ALL_LINK_APPEARANCES)[number];

/** The kinds of link an editor can offer. */
const LINK_KINDS = ['text', 'button'] as const;

/** One of the kinds of link an editor can offer. */
export type LinkKind = (typeof LINK_KINDS)[number];

/** A link that looks like text. `openInNewTab` is stored only when set. */
export type TextLink = { href: string; openInNewTab?: true };

/** A link that looks like a button. */
export type ButtonLink = TextLink & { appearance: LinkAppearance };

/** What a link carries in the document: a button is a text link that also names its appearance. */
export type LinkValue = TextLink | ButtonLink;
