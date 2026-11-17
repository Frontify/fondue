/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type DefaultStyle, defineContent, defineMark, definePlugin, type RteHotkey } from '#/core';

import { withoutDecorationLine } from '../shared/helpers/declaredStyle';
import { isLinkablePaste, isSafeHref, LINKABLE_ADDRESS, toHref } from '../shared/helpers/href';
import * as TOOLBAR_GROUPS from '../shared/toolbarGroups';

import { LinkEditor } from './components/LinkEditor';
import { LinkToolbarButton } from './components/LinkToolbarButton';
import { LINKABLE_ADDRESS_TRIM } from './helpers/address';
import { type LinkSearch } from './helpers/destination';
import { openNewLinkForm } from './helpers/newLinkForms';
import { NEW_TAB_REL, NEW_TAB_TARGET } from './helpers/newTab';
import { type LinkValue } from './helpers/value';
import styles from './link.module.scss';

/** The value this plugin sets on text nodes. */
export type LinkMark = {
    /**
     * The target of the link
     */
    link?: LinkValue;
};

export type LinkPluginOptions = {
    /**
     * Offers the app's own pages as link targets while the author types. Editing only: the content never needs it.
     */
    search?: LinkSearch;
};

const withoutUnderline = (value: string): string => withoutDecorationLine(value, 'underline');

const LINK_DEFAULT_STYLES: readonly DefaultStyle[] = [
    { property: 'text-decoration', scope: 'inside', strip: withoutUnderline },
    { property: 'text-decoration-line', scope: 'inside', strip: withoutUnderline },
];

type LinkAnchorAttrs = {
    href?: string;
    target?: string;
    rel?: string;
};

/**
 * A stored link's anchor attributes, without its target when that target is not safe.
 */
const anchorAttrs = (value: unknown): LinkAnchorAttrs => {
    // A stored document may hold anything here (`{}`, `true`), so its shape is not taken on trust.
    let link: Partial<LinkValue> | null = null;
    if (typeof value === 'object') {
        // The declared type is trusted only this far: every field is checked before use.
        link = value as Partial<LinkValue> | null;
    }
    const href = link?.href;
    if (!isSafeHref(href)) {
        return {};
    }
    if (link?.openInNewTab === true) {
        return { href, target: NEW_TAB_TARGET, rel: NEW_TAB_REL };
    }
    return { href };
};

/**
 * Links as a mark on text, written as `<a href>`.
 * Only web, mail, phone and relative targets count, so a `javascript:` URL is never clickable.
 */
export const linkContent = defineContent({
    marks: {
        link: defineMark<LinkValue>({
            // Outside every other mark, so a partly styled link renders as one anchor, not cut up by a colour or an emphasis inside.
            nesting: -2,
            // Typing at the end of a link does not extend it.
            inclusive: false,
            // Clearing formatting is about how text looks; where a link goes is not.
            survivesClear: true,

            toHtml: (value) => ({
                tag: 'a',
                attrs: { ...anchorAttrs(value), class: styles.link },
                children: true,
            }),

            // A pasted span inside a link, such as Google Docs writes, repeats the underline the link already shows.
            defaultStyles: LINK_DEFAULT_STYLES,

            parse: [
                {
                    tag: 'a[href]',
                    value: (element) => {
                        const href = element.getAttribute('href') ?? '';
                        if (!isSafeHref(href)) {
                            return null;
                        }
                        if (element.getAttribute('target') === NEW_TAB_TARGET) {
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
 * selected text, or goes in linked at a caret outside a link. `search` offers the app's own
 * pages as targets.
 *
 * @example
 * const links = linkPlugin({ search });
 */
export const linkPlugin = ({ search }: LinkPluginOptions = {}) =>
    /* @__PURE__ */ definePlugin({
        content: linkContent,
        toolbarGroup: TOOLBAR_GROUPS.link,
        toolbar: [
            {
                label: 'Link',
                shortcut: HOTKEY,
                render: (props) => <LinkToolbarButton {...props} search={search} />,
            },
        ],
        edit: {
            link: (props) => <LinkEditor {...props} search={search} />,
        },
        hotkeys,
        inputRules: [
            {
                kind: 'markPattern',
                pattern: LINKABLE_ADDRESS,
                mark: 'link',
                trim: LINKABLE_ADDRESS_TRIM,
                // The pattern names only safe schemes; the check still refuses an address too long to keep.
                value: (href) => {
                    if (isSafeHref(href)) {
                        return { href };
                    }
                    return null;
                },
            },
        ],
        onPaste: ({ text, source }, api) => {
            const typed = text.trim();
            const { isCollapsed, marks } = api.selection.get();
            let href: string | null = null;
            if (isLinkablePaste(typed)) {
                href = toHref(typed);
            }
            if (href === null) {
                return false;
            }
            if (isCollapsed) {
                // Inside a link the address stays plain text rather than nesting a link.
                if ('link' in marks) {
                    return false;
                }
                // Copied from an editor, the address pastes back with its link and marks as they were.
                if (source === 'editor') {
                    return false;
                }
                // The first undo takes the link off and keeps the address, as after an autolink.
                api.insertText(href, { link: { href } }, { undo: 'marksFirst' });
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
