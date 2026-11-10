/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineContent, defineMark, definePlugin, type HotkeyHandler } from '#/core';

import { isLinkablePaste, isSafeHref, toHref, WEB_ADDRESS } from '../shared/helpers/href';

import { LinkEditor } from './components/LinkEditor';
import { LinkToolbarButton } from './components/LinkToolbarButton';
import { openNewLinkForm } from './helpers/newLinkForms';
import { type LinkValue } from './helpers/value';
import styles from './link.module.scss';

/**
 * The value this plugin sets on text nodes
 */
export type LinkMark = {
    /**
     * The target of the link
     */
    link?: LinkValue;
};

const newTabAttrs = (link: Partial<LinkValue> | null | undefined): Record<string, string> =>
    link?.openInNewTab === true ? { target: '_blank', rel: 'noopener noreferrer' } : {};

/**
 * Links as a mark on text, written as `<a href>`.
 * Only web, mail, phone and relative targets count, so a `javascript:` URL is never clickable.
 */
export const linkContent = defineContent({
    marks: {
        link: defineMark<LinkValue>({
            // Outside every other mark, so a partly styled link still renders
            // as ONE anchor: an element stays open across text runs only while
            // the marks around it are the same, and a colour or an emphasis
            // inside would otherwise cut it up.
            nesting: -2,
            // Typing at the end of a link does not extend it.
            inclusive: false,

            /**
             * The link everywhere but while editing: readonly, export, copy
             */
            toHtml: (value) => {
                // A stored document may hold anything here (`{}`, `true`), so
                // nothing about its shape is taken on trust.
                const link = typeof value === 'object' ? (value as Partial<LinkValue> | null) : null;
                const href = link?.href;
                return {
                    tag: 'a',
                    attrs: {
                        ...(isSafeHref(href) ? { href } : {}),
                        class: styles.link,
                        ...newTabAttrs(link),
                    },
                    children: true,
                };
            },

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
        }),
    },
});

// The key is a literal because a computed key keeps this plugin in the renderer; HOTKEY's type ties it to this key.
const hotkeys = {
    'Mod-k': (api) => {
        if (api.marks.getRun('link') !== null) {
            api.editors.open('link');
            return true;
        }
        // Nothing selected is nothing to link, but the key is still the
        // editor's, not the browser's search bar.
        return api.selection.get().isCollapsed || openNewLinkForm(api);
    },
} satisfies Record<string, HotkeyHandler>;

const HOTKEY: keyof typeof hotkeys = 'Mod-k';

/**
 * Links, made with a toolbar button or `Mod-k` and edited in a flyout while the caret is inside.
 * A web address followed by a space becomes a link, and pasting one over selected text links that text.
 */
export const linkPlugin = /* @__PURE__ */ definePlugin({
    content: linkContent,
    toolbar: [{ label: 'Link', shortcut: HOTKEY, render: LinkToolbarButton }],
    edit: { link: LinkEditor },
    hotkeys,
    // A web address typed and followed by a space becomes a link. The pattern
    // names only web schemes, so what it matches is always a safe href.
    inputRules: [{ kind: 'markPattern', pattern: WEB_ADDRESS, mark: 'link', value: (href) => ({ href }) }],
    // A web or mail address pasted over selected text links that text, as
    // in most editors; anything else pastes as usual.
    onPaste: ({ text }, api) => {
        const typed = text.trim();
        const { isCollapsed, marks } = api.selection.get();
        let href: string | null = null;
        if (isLinkablePaste(typed)) {
            href = toHref(typed);
        }
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
