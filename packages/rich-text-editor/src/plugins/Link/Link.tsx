/* (c) Copyright Frontify Ltd., all rights reserved. */

import { definePlugin, type ToolbarItemProps } from '#/core';

import { isSafeHref, toHref } from '../shared/helpers/href';

import { LinkEditor } from './components/LinkEditor';
import { LinkToolbarButton } from './components/LinkToolbarButton';
import { linkContent } from './content';
import { openNewLinkForm } from './helpers/newLinkForms';

/** Add or edit a link, as in most editors. */
const HOTKEY = 'Mod-k';

const LinkToolbar = (props: ToolbarItemProps) => <LinkToolbarButton {...props} shortcut={HOTKEY} />;

/**
 * Editing a link: the `edit` view draws the anchor around the text and the
 * flyout that hangs off it while the caret is inside, showing the target,
 * editing it, removing the link. The toolbar button is how a link is made, and
 * Mod-k does what it does.
 */
export const linkPlugin = definePlugin({
    content: linkContent,
    toolbar: [{ render: LinkToolbar }],
    edit: { link: LinkEditor },
    hotkeys: {
        [HOTKEY]: (api) => {
            if (api.marks.getRun('link') !== null) {
                api.editors.open('link');
                return true;
            }
            // Nothing selected is nothing to link, but the key is still the
            // editor's, not the browser's search bar.
            return api.selection.get().isCollapsed || openNewLinkForm(api);
        },
    },
    // A web address typed and followed by a space becomes a link. The pattern
    // names only web schemes, so what it matches is always a safe href.
    inputRules: [{ kind: 'markPattern', pattern: /https?:\/\/[^\s]+/, mark: 'link', value: (href) => ({ href }) }],
    // A web or mail address pasted over selected text links that text, as
    // in most editors; anything else pastes as usual.
    onPaste: ({ text }, api) => {
        const typed = text.trim();
        const { isCollapsed, marks } = api.selection.get();
        const href = /^(https?:\/\/|mailto:)/i.test(typed) ? toHref(typed) : null;
        if (isCollapsed || href === null || !isSafeHref(href)) {
            return false;
        }
        // A toggle over text that is all linked already would take the link
        // off, so it goes first and the new target is set after.
        if ('link' in marks) {
            api.marks.toggle('link');
        }
        api.marks.toggle('link', { href });
        return true;
    },
});
