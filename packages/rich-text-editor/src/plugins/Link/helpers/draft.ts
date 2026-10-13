/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * What a link carries in the document. `openInNewTab` is stored only when it is
 * on, so an ordinary link stays `{ link: { href } }`.
 */
export type LinkValue = { href: string; openInNewTab?: true };
