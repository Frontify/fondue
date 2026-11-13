/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ComponentType, type ReactNode } from 'react';

import { type DefaultStyle, defineContent, defineMark, definePlugin, type HotkeyHandler } from '#/core';

import { withoutDecorationLine } from '../shared/helpers/declaredStyle';
import { isLinkablePaste, LINKABLE_ADDRESS, toHref } from '../shared/helpers/href';

import { LinkEditor } from './components/LinkEditor';
import { LinkToolbarButton } from './components/LinkToolbarButton';
import { LINKABLE_ADDRESS_TRIM } from './helpers/address';
import { type LinkSearch } from './helpers/destination';
import { type LinkLabels, resolveLinkLabels } from './helpers/labels';
import { openNewLinkForm } from './helpers/newLinkForms';
import { DEFAULT_NEW_TAB_NOTE, NEW_TAB_NOTE_ATTRIBUTE, NEW_TAB_REL, NEW_TAB_TARGET } from './helpers/newTab';
import { allowsHref, type LinkPolicy } from './helpers/policy';
import { type LinkValue } from './helpers/value';
import styles from './link.module.scss';

/** The value this plugin sets on text nodes. */
export type LinkMark = {
    /**
     * The target of the link
     */
    link?: LinkValue;
};

/**
 * What the link content takes: the policy, and the words the reader and the export say.
 */
export type LinkContentOptions = LinkPolicy & {
    /**
     * The words the link says, in the language of the host. Only `newTabNote` is read here.
     * @default English
     */
    labels?: Partial<LinkLabels>;
};

export type LinkPluginOptions = LinkContentOptions & {
    /**
     * Offers the app's own pages as link targets while the author types. Editing only: the content never needs it.
     */
    search?: LinkSearch;
};

const NEW_TAB_NOTE_SELECTOR = `span[${NEW_TAB_NOTE_ATTRIBUTE}]`;

const withoutUnderline = (value: string): string => withoutDecorationLine(value, 'underline');

const LINK_DEFAULT_STYLES: readonly DefaultStyle[] = [
    { property: 'text-decoration', scope: 'inside', strip: withoutUnderline },
    { property: 'text-decoration-line', scope: 'inside', strip: withoutUnderline },
];

/**
 * A stored link as the reader and the export draw it: without its target when the policy refuses it.
 */
type DrawnLink = { kind: 'refused' } | { kind: 'sameTab'; href: string } | { kind: 'newTab'; href: string };

const drawnLink = (policy: LinkPolicy, value: unknown): DrawnLink => {
    // A stored document may hold anything here (`{}`, `true`), so its shape is not taken on trust.
    let link: Partial<LinkValue> | null = null;
    if (typeof value === 'object') {
        // The declared type is trusted only this far: every field is checked before use.
        link = value as Partial<LinkValue> | null;
    }
    const href = link?.href;
    if (!allowsHref(policy, href)) {
        return { kind: 'refused' };
    }
    if (link?.openInNewTab === true) {
        return { kind: 'newTab', href };
    }
    return { kind: 'sameTab', href };
};

/**
 * The anchor attributes the reader and the export share; each adds its own class attribute.
 */
type LinkAnchorAttrs = {
    href?: string;
    target?: string;
    rel?: string;
};

const anchorAttrs = (drawn: DrawnLink): LinkAnchorAttrs => {
    switch (drawn.kind) {
        case 'refused':
            return {};
        case 'sameTab':
            return { href: drawn.href };
        case 'newTab':
            return { href: drawn.href, target: NEW_TAB_TARGET, rel: NEW_TAB_REL };
    }
};

/**
 * The marker attribute on the hidden note, spread because JSX has no computed attribute names.
 */
const NEW_TAB_NOTE_MARKER = { [NEW_TAB_NOTE_ATTRIBUTE]: '' };

/**
 * The note only a screen reader hears, on a link that opens a new tab. Same wording as the editing panel.
 */
const newTabNote = (drawn: DrawnLink, note: string): ReactNode => {
    switch (drawn.kind) {
        case 'refused':
        case 'sameTab':
            return null;
        case 'newTab':
            return (
                <span className={styles.visuallyHidden} {...NEW_TAB_NOTE_MARKER}>
                    {note}
                </span>
            );
    }
};

type LinkReaderProps = {
    value: LinkValue;
    children: ReactNode;
    policy: LinkPolicy;
    /** The words of the new-tab note. */
    note: string;
};

/**
 * A link in the reader: the export's markup, plus the new-tab note.
 */
const LinkReader = ({ value, children, policy, note }: LinkReaderProps): ReactNode => {
    const drawn = drawnLink(policy, value);
    return (
        // A refused link keeps its anchor without a target, as the export writes it.
        <a {...anchorAttrs(drawn)} className={styles.link}>
            {children}
            {newTabNote(drawn, note)}
        </a>
    );
};

/**
 * What the renderer hands a mark's reader component.
 */
type BoundLinkReaderProps = Omit<LinkReaderProps, 'policy' | 'note'>;

/**
 * One reader component per policy and note, so a renderer handed a new `linkPlugin()` on every render keeps its links
 * mounted (and focused) rather than seeing a new component each time.
 */
const readers = new Map<string, ComponentType<BoundLinkReaderProps>>();

const readerFor = (policy: LinkPolicy, note: string): ComponentType<BoundLinkReaderProps> => {
    const key = JSON.stringify([policy.allowedSchemes ?? null, policy.allowedHosts ?? null, note]);
    const known = readers.get(key);
    if (known !== undefined) {
        return known;
    }
    const reader = (props: BoundLinkReaderProps): ReactNode => <LinkReader {...props} policy={policy} note={note} />;
    readers.set(key, reader);
    return reader;
};

/**
 * A link is a mark: the text stays text, and the target rides along on it.
 *
 * Only the links the policy allows are links: anything else pasted in stays
 * plain text, and a stored one is written out without its target, so a
 * `javascript:` URL is never clickable. By default that is any web, mail or
 * phone link, and any relative one.
 *
 * @param options - Which links are allowed, by default every web, mail, phone and relative link, and the words of the new-tab note.
 * @example
 * const content = linkContent({ allowedSchemes: ['https'] });
 */
export const linkContent = ({ labels, ...policy }: LinkContentOptions = {}) =>
    defineContent({
        marks: {
            link: defineMark<LinkValue>({
                // Outside every other mark, so a partly styled link renders as one anchor, not cut up by a colour or an emphasis inside.
                nesting: -2,
                // Typing at the end of a link does not extend it.
                inclusive: false,

                /**
                 * The link in the export and on the clipboard, with no text of its own, so pasting it adds none
                 */
                toHtml: (value) => ({
                    tag: 'a',
                    attrs: { ...anchorAttrs(drawnLink(policy, value)), class: styles.link },
                    children: true,
                }),

                render: { component: readerFor(policy, labels?.newTabNote ?? DEFAULT_NEW_TAB_NOTE) },

                // A pasted span inside a link, such as Google Docs writes, repeats the underline the link already shows.
                defaultStyles: LINK_DEFAULT_STYLES,

                parse: [
                    // The hidden note the reader adds is not text of the link, when the reader is copied back in.
                    { tag: NEW_TAB_NOTE_SELECTOR, ignore: true },
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
    'Mod-k': (api) => {
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
} satisfies Record<string, HotkeyHandler>;

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
export const linkPlugin = ({ search, labels, ...policy }: LinkPluginOptions = {}) =>
    /* @__PURE__ */ definePlugin({
        content: linkContent({ ...policy, labels }),
        toolbarGroup: 'link',
        toolbar: [
            {
                label: 'Link',
                shortcut: HOTKEY,
                render: (props) => (
                    <LinkToolbarButton {...props} policy={policy} labels={resolveLinkLabels(labels)} search={search} />
                ),
            },
        ],
        edit: {
            link: (props) => (
                <LinkEditor {...props} policy={policy} labels={resolveLinkLabels(labels)} search={search} />
            ),
        },
        hotkeys,
        // The pattern names only typed schemes, and the policy still decides which become links.
        inputRules: [
            {
                kind: 'markPattern',
                pattern: LINKABLE_ADDRESS,
                mark: 'link',
                trim: LINKABLE_ADDRESS_TRIM,
                value: (href) => {
                    if (allowsHref(policy, href)) {
                        return { href };
                    }
                    return null;
                },
            },
        ],
        // Anything that is not an allowed web, mail or phone address pastes as usual.
        onPaste: ({ text, source }, api) => {
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
