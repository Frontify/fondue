/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineContent, defineMark, definePlugin, type HtmlSpec, type RteHotkey } from '#/core';

import { isLinkablePaste, LINKABLE_ADDRESS, toHref } from '../shared/helpers/href';

import { LinkEditor } from './components/LinkEditor';
import { LinkToolbarButton } from './components/LinkToolbarButton';
import { type LinkSearch } from './helpers/destination';
import { openNewLinkForm } from './helpers/newLinkForms';
import { allowsHref, type LinkPolicy } from './helpers/policy';
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

export type LinkPluginOptions = LinkPolicy & {
    /**
     * Offers the app's own pages as link targets while the author types. Editing only: the content never needs it.
     */
    search?: LinkSearch;
};

/**
 * The address prefixes that mark typed or pasted text as a link.
 */

const newTabAttrs = (link: Partial<LinkValue> | null | undefined): Record<string, string> =>
    link?.openInNewTab === true ? { target: '_blank', rel: 'noopener noreferrer' } : {};

/**
 * A link is a mark: the text stays text, and the target rides along on it.
 *
 * Only the links the policy allows are links: anything else pasted in stays
 * plain text, and a stored one is written out without its target, so a
 * `javascript:` URL is never clickable. By default that is any web, mail or
 * phone link, and any relative one.
 */
export const linkContent = (policy: LinkPolicy = {}) =>
    defineContent({
        marks: {
            link: defineMark<LinkValue>({
                // Outside every other mark, so a partly styled link renders as one anchor, not cut up by a colour or an emphasis inside.
                nesting: -2,
                // Typing at the end of a link does not extend it.
                inclusive: false,

                /**
                 * The link everywhere but while editing: readonly, export, copy
                 */
                toHtml: (value) => {
                    // A stored document may hold anything here (`{}`, `true`), so its shape is not taken on trust.
                    const link = typeof value === 'object' ? (value as Partial<LinkValue> | null) : null;
                    const href = link?.href;
                    const allowed = allowsHref(policy, href);
                    const spec: HtmlSpec = {
                        tag: 'a',
                        attrs: {
                            ...(allowed ? { href, ...newTabAttrs(link) } : {}),
                            class: styles.link,
                        },
                        children: true,
                    };
                    if (allowed && link?.openInNewTab === true) {
                        // Same wording as the editing panel.
                        spec.children = [
                            true,
                            {
                                tag: 'span',
                                attrs: { class: styles.visuallyHidden, 'data-rte-link-note': '' },
                                children: ' (opens in new tab)',
                            },
                        ];
                    }
                    return spec;
                },

                parse: [
                    // The hidden note toHtml adds is not text of the link.
                    { tag: 'span[data-rte-link-note]', ignore: true },
                    {
                        tag: 'a[href]',
                        value: (element) => {
                            const href = element.getAttribute('href') ?? '';
                            if (!allowsHref(policy, href)) {
                                return null;
                            }
                            if (element.getAttribute('target') === '_blank') {
                                return { href, openInNewTab: true as const };
                            }
                            return { href };
                        },
                    },
                ],
            }),
        },
    });

// The key is a literal because a computed key keeps this plugin in the renderer; HOTKEY's type ties it to this key.
const hotkeys = {
    'Mod-k': {
        label: 'Edit link',
        run: (api) => {
            if (api.marks.getRun('link') !== null) {
                api.editors.open('link');
                return true;
            }
            // At a caret the key stays the editor's even with no form to open (floating toolbar), never the browser's.
            if (openNewLinkForm(api)) {
                return true;
            }
            return api.selection.get().isCollapsed;
        },
    },
} satisfies Record<string, RteHotkey>;

const HOTKEY: keyof typeof hotkeys = 'Mod-k';

/**
 * Links, made with a toolbar button or `Mod-k` and edited in a flyout while the caret is inside.
 * A web, mail or phone address followed by a space becomes a link, and pasting one links the
 * selected text, or goes in linked at a caret outside a link. The policy decides which links are
 * allowed, and `search` offers the app's own pages as targets.
 *
 * @example
 * const links = linkPlugin({ allowedSchemes: ['https', 'mailto'], search });
 */
export const linkPlugin = ({ search, ...policy }: LinkPluginOptions = {}) =>
    /* @__PURE__ */ definePlugin({
        content: linkContent(policy),
        toolbar: [
            {
                label: 'Link',
                shortcut: HOTKEY,
                render: (props) => <LinkToolbarButton {...props} policy={policy} search={search} />,
            },
        ],
        edit: { link: (props) => <LinkEditor {...props} policy={policy} search={search} /> },
        hotkeys,
        // The pattern names only typed schemes, and the policy still decides which become links.
        inputRules: [
            {
                kind: 'markPattern',
                pattern: LINKABLE_ADDRESS,
                mark: 'link',
                value: (href) => (allowsHref(policy, href) ? { href } : null),
            },
        ],
        // Anything that is not an allowed web, mail or phone address pastes as usual.
        onPaste: ({ text }, api) => {
            const typed = text.trim();
            const { isCollapsed, marks } = api.selection.get();
            let href: string | null = null;
            if (isLinkablePaste(typed)) {
                href = toHref(typed);
            }
            if (href === null || !allowsHref(policy, href)) {
                return false;
            }
            if (isCollapsed) {
                // Inside a link the address stays plain text rather than nesting a link.
                if ('link' in marks) {
                    return false;
                }
                api.insertText(href, { link: { href } });
                return true;
            }
            // A toggle over text that is all linked already would take the link off, so it goes first.
            if ('link' in marks) {
                api.marks.toggle('link');
            }
            api.marks.toggle('link', { href });
            return true;
        },
    });
