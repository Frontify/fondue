/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineMark, type RtePlugin } from '#/core';

import { LinkEditor } from './components/LinkEditor';
import { LinkToolbarButton } from './components/LinkToolbarButton';
import { isSafeHref, toHref } from './helpers/href';
import { openNewLinkForm } from './helpers/newLinkForms';
import { type LinkValue } from './helpers/value';
import styles from './link.module.scss';

/** Add or edit a link, as in most editors. */
const HOTKEY = 'Mod-k';

/** The value this plugin sets on text nodes. */
export type LinkMark = {
    link?: LinkValue;
};

const newTabAttrs = (link: LinkValue): Record<string, string> =>
    link.openInNewTab === true ? { target: '_blank', rel: 'noopener noreferrer' } : {};

/**
 * A link is a mark: the text stays text, and the target rides along on it.
 *
 * In the editor, `render.edit` draws the anchor around the text and the
 * flyout that hangs off it while the caret is inside — showing the target,
 * editing it, removing the link. The toolbar button (`toolbarItem`) is how a
 * link is made, and Mod-k does what it does.
 *
 * Only web, mail and phone links (and relative ones) are links: anything else
 * pasted in stays plain text, and a stored one is written out without its
 * target, so a `javascript:` URL is never clickable.
 */
export const linkPlugin = (): RtePlugin => ({
    id: 'link',
    marks: {
        link: defineMark<LinkValue>({
            // Outside every other mark, so a partly styled link still renders
            // as ONE anchor: an element stays open across text runs only while
            // the marks around it are the same, and a colour or an emphasis
            // inside would otherwise cut it up.
            nesting: -2,
            // Typing at the end of a link does not extend it.
            inclusive: false,

            /** The link everywhere but while editing: readonly, export, copy. */
            toHtml: (link) => ({
                tag: 'a',
                attrs: {
                    ...(isSafeHref(link.href) ? { href: link.href } : {}),
                    class: styles.link,
                    ...newTabAttrs(link),
                },
                children: true,
            }),

            parse: [
                {
                    tag: 'a[href]',
                    value: (element) => {
                        const href = element.getAttribute('href') ?? '';
                        return isSafeHref(href)
                            ? {
                                  href,
                                  ...(element.getAttribute('target') === '_blank'
                                      ? { openInNewTab: true as const }
                                      : {}),
                              }
                            : null;
                    },
                },
            ],

            render: { edit: LinkEditor },
        }),
    },
    toolbarItem: (props) => <LinkToolbarButton {...props} shortcut={HOTKEY} />,
    hotkeys: {
        [HOTKEY]: (api) => {
            if (api.marks.getRun('link') !== null) {
                api.editors.open('link');
                return true;
            }
            // Nothing selected is nothing to link, but the key is still the
            // editor's — not the browser's search bar.
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
