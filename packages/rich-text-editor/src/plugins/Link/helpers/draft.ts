/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MouseEvent } from 'react';

import { type EditorControlApi } from '#/core';

/**
 * What a link carries in the document. `openInNewTab` is stored only when it is
 * on — its attribute defaults to null, which is dropped on the way in, so an
 * ordinary link stays `{ link: { href } }`.
 */
export type LinkValue = { href: string; openInNewTab?: true };

/** Both halves of a link plus its flag, as the editing UI works with them. */
export type LinkDraft = { href: string; text: string; openInNewTab: boolean };

/**
 * The whole run of the link mark around the selection: what the panel is about.
 * Partial, because a pasted `<a>` with no href leaves it unset, and an unset
 * attribute is absent from the document.
 */
export type LinkRun = { value: Partial<LinkValue>; text: string };

export const draftFrom = (value: Partial<LinkValue> | null, text: string): LinkDraft => ({
    href: value?.href ?? '',
    openInNewTab: value?.openInNewTab === true,
    text,
});

/**
 * What the selection says, as the starting point for editing it — for UI opened
 * from the toolbar. It grows the selection to the whole link first, so a caret
 * inside one counts as all of it. That dispatches, so call it from an event
 * handler, never from a render.
 */
export const readSelection = (api: EditorControlApi): LinkDraft => {
    api.marks.select('link');
    const selection = api.selection.get();
    // The snapshot's marks are untyped; this plugin knows what its own carries.
    const value = (selection.marks.link ?? null) as Partial<LinkValue> | null;
    return draftFrom(value, selection.text);
};

/**
 * Never take the selection away from the editor: every command in the panel
 * acts on it, and the panel is only there while the caret stays in the link.
 * Fondue's Button spreads props it does not act on onto the underlying button,
 * which is how this handler reaches the DOM.
 */
export const keepSelection = {
    onMouseDown: (event: MouseEvent<HTMLButtonElement>) => event.preventDefault(),
};
