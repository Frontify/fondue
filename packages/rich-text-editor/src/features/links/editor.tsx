/* (c) Copyright Frontify Ltd., all rights reserved. */

import { lazyPart } from '#/bridge/define';
import { defineEditorPart, type EditorApi, type EditorCommand } from '#/bridge/plugin';
import { markRule } from '#/model';

import { links } from './feature';
import { EDIT_LINK, REMOVE_LINK } from './linkBubbleModel';
import { linkInitialOf, SET_LINK } from './linkPopoverModel';
import { SurfaceLinkClicks } from './SurfaceLinkClicks';

const LinkBubble = lazyPart(() => import('./LinkBubble').then((loaded) => loaded.LinkBubble));
const LinkPopover = lazyPart(() => import('./LinkPopover').then((loaded) => loaded.LinkPopover));

// An absolute URL after a space, a bracket, a quote or the block start, without the punctuation that ends a sentence.
const AUTOLINK = /(?<=^|[\s([{<"'])(?<href>(?:https?:\/\/|mailto:|tel:)[^\s<>]*[^\s<>.,;:!?'")\]}])\s$/u;

/** What `link.set` takes: the destination, the visible text at a caret outside a link, the new window and the style. */
export type LinkValue = {
    readonly href: string;
    readonly text?: string;
    readonly openInNewWindow: boolean;
    readonly styleId: string | null;
};

const setLink: EditorCommand<LinkValue, 'marks'> = {
    payload: {
        fields: {
            href: { type: 'url' },
            text: { type: 'string', optional: true },
            openInNewWindow: { type: 'boolean' },
            styleId: { type: 'id', nullable: true },
        },
    },
    run: (api, { text, ...attrs }) =>
        api.marks.set('link', attrs, {
            extendToMarkRange: 'touching',
            ...(text === undefined ? {} : { text }),
        }),
};

/** Opens the link popover on the link at the selection, or on the selection for a new link. */
const editLink = (api: EditorApi<'marks' | 'overlays'>): boolean => {
    const initial = linkInitialOf(api);
    api.overlays.open(LinkPopover, { initial }, initial.link ?? 'selection');

    return true;
};

/**
 * `link.edit` opens the link popover, `link.set` sets a link over the selection, the whole link at a caret inside one,
 * or inserts its visible text at a caret outside one, and `link.remove` removes the whole link and keeps its text. A
 * bubble on the link at the caret opens, edits, copies and removes it.
 */
export const linksEditor = defineEditorPart(links, {
    needs: ['marks', 'overlays'],
    commands: {
        [EDIT_LINK]: {
            enabled: (api) => api.marks.allowed('link'),
            run: editLink,
        },
        [SET_LINK]: setLink,
        [REMOVE_LINK]: { run: (api) => api.marks.remove('link', { extendToMarkRange: 'touching' }) },
    },
    keys: { 'Mod-k': EDIT_LINK },
    inputRules: [markRule({ id: 'link.autolink', match: AUTOLINK, mark: 'link', on: ['input', 'enter'] })],
    toolbar: [
        {
            id: 'link',
            kind: 'button',
            command: EDIT_LINK,
            labelKey: 'RichTextEditor_link',
            icon: 'IconLink',
            opensOverlay: true,
        },
    ],
    overlays: [SurfaceLinkClicks, LinkBubble],
});
