/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MouseEvent } from 'react';

import { type EditorControlApi } from '#/domain';

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
 * Partial, because what a link *carries* is not what it was declared with — a
 * pasted `<a>` with no href leaves it unset, and an unset attribute is absent.
 */
export type LinkRun = { value: Partial<LinkValue>; text: string };

export const draftFrom = (value: Partial<LinkValue> | null, text: string): LinkDraft => ({
    href: value?.href ?? '',
    openInNewTab: value?.openInNewTab === true,
    text,
});

/**
 * What the selection says, as the starting point for editing it — for UI opened
 * from the toolbar, where the selection is whatever the user made it. It grows
 * to the whole link first, so a caret inside one counts as all of it. That
 * dispatches, so it belongs in an event handler, never in a render.
 */
export const readSelection = (api: EditorControlApi): LinkDraft => {
    api.marks.select('link');
    const selection = api.selection.get();
    // The snapshot's marks are untyped, the way every mark key is; this plugin
    // knows what its own carries.
    const value = (selection.marks.link ?? null) as Partial<LinkValue> | null;
    return draftFrom(value, selection.text);
};

/**
 * Never take the selection away from the editor — every command in the panel
 * acts on it, and the panel is only there for as long as it stays a caret in
 * the link. Fondue's Button spreads what it doesn't act on onto the button
 * underneath, which is how a handler it never declared still reaches the DOM.
 */
export const keepSelection = {
    onMouseDown: (event: MouseEvent<HTMLButtonElement>) => event.preventDefault(),
};
