/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MouseEvent } from 'react';

import { type EditorControlApi } from '#/RichTextEditor';

/** Both halves of a link plus its flag, as the editing UI works with them. */
export type LinkDraft = { href: string; text: string; openInNewTab: boolean };

/** The whole run of the link mark around the selection: what the panel is about. */
export type LinkRun = { value: Record<string, unknown>; text: string };

export const draftFrom = (value: Record<string, unknown> | null, text: string): LinkDraft => ({
    href: typeof value?.href === 'string' ? value.href : '',
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
    api.selectMark('link');
    return draftFrom(api.getMarkValue('link'), api.getSelectedText());
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
