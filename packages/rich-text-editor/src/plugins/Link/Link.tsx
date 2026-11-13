/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type DefaultStyle,
    defineContent,
    defineMark,
    definePlugin,
    type HotkeyHandler,
    type HtmlAttributes,
    lookProperties,
    type TextLook,
} from '#/core';

import { withoutDecorationLine } from '../shared/helpers/declaredStyle';
import { isLinkablePaste, isSafeHref, toHref, WEB_ADDRESS } from '../shared/helpers/href';

import { LinkEditor } from './components/LinkEditor';
import { LinkToolbarButton } from './components/LinkToolbarButton';
import { openNewLinkForm } from './helpers/newLinkForms';
import { type LinkValue } from './helpers/value';
import styles from './link.module.scss';

/** The value this plugin sets on text nodes. */
export type LinkMark = {
    /**
     * The target of the link
     */
    link?: LinkValue;
};

const newTabAttrs = (link: Partial<LinkValue> | null | undefined): Record<string, string> =>
    link?.openInNewTab === true ? { target: '_blank', rel: 'noopener noreferrer' } : {};

const withoutUnderline = (value: string): string => withoutDecorationLine(value, 'underline');

const LINK_DEFAULT_STYLES: readonly DefaultStyle[] = [
    { property: 'text-decoration', scope: 'inside', strip: withoutUnderline },
    { property: 'text-decoration-line', scope: 'inside', strip: withoutUnderline },
];

/**
 * How links look. A link keeps its underline, and vertical margins do nothing on inline text, so neither is a field.
 */
export type LinkLook = Omit<TextLook, 'textDecoration' | 'marginTop' | 'marginBottom'>;

export type LinkPluginOptions = {
    /**
     * How links look. A field left out keeps Fondue's look.
     * @default {}
     */
    look?: LinkLook;
};

// One definition for every content, because the registry throws when two different objects declare one type.
const linkMark = defineMark<LinkValue>({
    // Outside every other mark, so a partly styled link still renders
    // as ONE anchor: an element stays open across text runs only while
    // the marks around it are the same, and a colour or an emphasis
    // inside would otherwise cut it up.
    nesting: -2,
    // Typing at the end of a link does not extend it.
    inclusive: false,
    // A pasted span inside a link, such as Google Docs writes, repeats the underline the link already shows.
    defaultStyles: LINK_DEFAULT_STYLES,

    /**
     * The link everywhere but while editing: readonly, export, copy
     */
    toHtml: (value) => {
        // A stored document may hold anything here (`{}`, `true`), so
        // nothing about its shape is taken on trust.
        let link: Partial<LinkValue> | null = null;
        if (typeof value === 'object') {
            link = value as Partial<LinkValue> | null;
        }
        const href = link?.href;
        const attrs: HtmlAttributes = {};
        if (isSafeHref(href)) {
            attrs.href = href;
        }
        attrs.class = styles.link;
        Object.assign(attrs, newTabAttrs(link));
        return { tag: 'a', attrs, children: true };
    },

    parse: [
        {
            tag: 'a[href]',
            value: (element) => {
                const href = element.getAttribute('href') ?? '';
                if (!isSafeHref(href)) {
                    return null;
                }
                const value: LinkValue = { href };
                if (element.getAttribute('target') === '_blank') {
                    value.openInNewTab = true;
                }
                return value;
            },
        },
    ],
});

/**
 * Links as a mark on text, written as `<a href>`.
 * Only web, mail, phone and relative targets count, so a `javascript:` URL is never clickable.
 */
export const linkContent = ({ look = {} }: LinkPluginOptions = {}) =>
    defineContent({ marks: { link: linkMark }, contentProperties: lookProperties('link', look) });

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
export const linkPlugin = (options: LinkPluginOptions = {}) =>
    definePlugin({
        content: linkContent(options),
        toolbarGroup: 'link',
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
