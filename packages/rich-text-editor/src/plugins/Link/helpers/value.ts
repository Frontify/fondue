/* (c) Copyright Frontify Ltd., all rights reserved. */

/** The button looks a link can take, in the order the link form lists them. */
export const ALL_LINK_APPEARANCES = ['primary', 'secondary', 'tertiary'] as const;

/** One of the button looks a link can take. */
export type LinkAppearance = (typeof ALL_LINK_APPEARANCES)[number];

/** What a link carries in the document. `openInNewTab` and `appearance` are stored only when set. */
export type LinkValue = { href: string; openInNewTab?: true; appearance?: LinkAppearance };
