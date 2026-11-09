/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    defineContent,
    defineMark,
    definePlugin,
    type EditProps,
    type HotkeyHandler,
    type HtmlSpec,
    type ToolbarItemProps,
} from '#/core';

import { toHref } from '../shared/helpers/href';

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
    /** Offers the app's own pages as link targets while the author types. Editing only: the content never needs it. */
    search?: LinkSearch;
};

/** The address prefixes that mark typed or pasted text as a link. */
const LINKABLE_SCHEMES = 'https?://|mailto:|tel:';
const AUTOLINK_PATTERN = new RegExp(`(?:${LINKABLE_SCHEMES})[^\\s]+`);
const LINKABLE_START = new RegExp(`^(?:${LINKABLE_SCHEMES})`, 'i');

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
    /* @__PURE__ */ defineContent({
        marks: {
            link: /* @__PURE__ */ defineMark<LinkValue>({
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
                            return allowsHref(policy, href)
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
        // At a caret the key stays the editor's even with no form to open (floating toolbar), never the browser's.
        return openNewLinkForm(api) || api.selection.get().isCollapsed;
    },
} satisfies Record<string, HotkeyHandler>;

const HOTKEY: keyof typeof hotkeys = 'Mod-k';

/**
 * Links, made with a toolbar button or `Mod-k` and edited in a flyout while the caret is inside.
 * A web address followed by a space becomes a link, and pasting one over selected text links that text.
 */
export const linkPlugin = ({ search, ...policy }: LinkPluginOptions = {}) => {
    const LinkToolbar = (props: ToolbarItemProps) => (
        <LinkToolbarButton {...props} shortcut={HOTKEY} policy={policy} search={search} />
    );
    const LinkEdit = (props: EditProps<LinkValue>) => <LinkEditor {...props} policy={policy} search={search} />;

    return /* @__PURE__ */ definePlugin({
        content: /* @__PURE__ */ linkContent(policy),
        toolbar: [{ render: LinkToolbar }],
        edit: { link: LinkEdit },
        hotkeys,
        // A web, mail or phone address typed and followed by a space becomes a
        // link, when the policy allows it. The pattern names only typed schemes.
        inputRules: [
            {
                kind: 'markPattern',
                pattern: AUTOLINK_PATTERN,
                mark: 'link',
                value: (href) => (allowsHref(policy, href) ? { href } : null),
            },
        ],
        // A web, mail or phone address pasted over selected text links that
        // text, and at a caret outside a link it goes in linked, as in most
        // editors; anything else pastes as usual.
        onPaste: ({ text }, api) => {
            const typed = text.trim();
            const { isCollapsed, marks } = api.selection.get();
            const href = LINKABLE_START.test(typed) ? toHref(typed) : null;
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
            // A toggle over text that is all linked already would take the link
            // off, so it goes first and the new target is set after.
            if ('link' in marks) {
                api.marks.toggle('link');
            }
            api.marks.toggle('link', { href });
            return true;
        },
    });
};
