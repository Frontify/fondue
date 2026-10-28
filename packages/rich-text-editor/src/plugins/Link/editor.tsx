/* (c) Copyright Frontify Ltd., all rights reserved. */

import { lazyPart } from '#/bridge/pluginApi/define';
import { defineEditorPart, type EditorApi, type EditorCommand } from '#/bridge/pluginApi/plugin';
import { markRule } from '#/model';

import { SurfaceLinkClicks } from './components/SurfaceLinkClicks';
import { link } from './feature';
import { EDIT_LINK, REMOVE_LINK } from './helpers/linkBubbleModel';
import { linkInitialOf, SET_LINK } from './helpers/linkPopoverModel';

const LinkBubble = lazyPart(() => import('./components/LinkBubble').then((loaded) => loaded.LinkBubble));
const LinkPopover = lazyPart(() => import('./components/LinkPopover').then((loaded) => loaded.LinkPopover));

// An absolute URL after a space, a bracket, a quote or the block start, without the punctuation that ends a sentence.
const AUTOLINK = /(?<=^|[\s([{<"'])(?<href>(?:https?:\/\/|mailto:|tel:)[^\s<>]*[^\s<>.,;:!?'")\]}])\s$/u;

/** What `link.set` takes: the destination, the visible text at a caret outside a link, the new window and the style. */
export type LinkValue = {
    href: string;
    text?: string;
    openInNewWindow: boolean;
    styleId: string | null;
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
export const linksEditor = defineEditorPart(link, {
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
            group: 'link',
            opensOverlay: true,
        },
    ],
    overlays: [SurfaceLinkClicks, LinkBubble],
});
