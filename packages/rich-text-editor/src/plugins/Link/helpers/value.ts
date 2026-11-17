/* (c) Copyright Frontify Ltd., all rights reserved. */

/** The button looks a link can take. */
export type LinkAppearance = 'primary' | 'secondary' | 'tertiary';

/** What a link carries in the document. `openInNewTab` and `appearance` are stored only when set. */
export type LinkValue = { href: string; openInNewTab?: true; appearance?: LinkAppearance };
