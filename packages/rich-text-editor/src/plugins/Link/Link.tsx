/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type DefaultStyle,
    type MarkDefinition,
    defineContent,
    defineMark,
    definePlugin,
    LOOK_PROPERTIES,
    lookProperties,
    type RteContent,
    type RteHotkey,
    type TextLook,
} from '#/core';

import { withoutDecorationLine } from '../shared/helpers/declaredStyle';
import { isLinkablePaste, isSafeHref, LINKABLE_ADDRESS, toHref } from '../shared/helpers/href';

import { LinkEditor } from './components/LinkEditor';
import { LinkToolbarButton } from './components/LinkToolbarButton';
import { LINKABLE_ADDRESS_TRIM } from './helpers/address';
import {
    APPEARANCE_ATTRIBUTE,
    buttonLookProperties,
    type ButtonLook,
    isLinkAppearance,
    linkClassName,
    NO_APPEARANCES,
} from './helpers/appearance';
import { type LinkSearch } from './helpers/destination';
import { openNewLinkForm } from './helpers/newLinkForms';
import { NEW_TAB_REL, NEW_TAB_TARGET } from './helpers/newTab';
import { type LinkAppearance, type LinkValue } from './helpers/value';

/** The value this plugin sets on text nodes. */
export type LinkMark = {
    /**
     * The target of the link
     */
    link?: LinkValue;
};

/**
 * How links look. A link keeps its underline, and vertical margins do nothing on inline text, so neither is a field.
 */
export type LinkLook = Omit<TextLook, 'textDecoration' | 'marginTop' | 'marginBottom'>;

export type LinkPluginOptions = {
    /**
     * Offers the app's own pages as link targets while the author types. Editing only: the content never needs it.
     */
    search?: LinkSearch;
    /**
     * How links look in the editor, the readonly view and the HTML export. A field left out keeps Fondue's look.
     * A value that is empty or can end its CSS declaration early throws an error that names the field.
     */
    look?: LinkLook;
    /**
     * The button looks the link form's Style select offers, in order. Left out, the form has no Style select and
     * pasted button links paste as plain links.
     * @default []
     */
    appearances?: readonly LinkAppearance[];
    /**
     * How each appearance looks. Values are CSS strings, so `var(--f-theme-settings-button-primary-color)` works and
     * wrapper overrides keep working. A field left out keeps Fondue's look. A value that is empty or can end its CSS
     * declaration early throws an error that names the appearance and the field.
     */
    looks?: Partial<Record<LinkAppearance, ButtonLook>>;
};

/** The name `link.module.scss` reads the look's custom properties by. */
const LINK_LOOK_NAME = 'link';

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

/** A stored document may hold anything here (`{}`, `true`), so its shape is not taken on trust. */
const storedLink = (value: unknown): Partial<LinkValue> | null => {
    if (typeof value === 'object') {
        // The declared type is trusted only this far: every field is checked before use.
        return value as Partial<LinkValue> | null;
    }
    return null;
};

/**
 * A stored link's anchor attributes, without its target when that target is not safe.
 */
const anchorAttrs = (value: unknown): LinkAnchorAttrs => {
    const link = storedLink(value);
    const href = link?.href;
    if (!isSafeHref(href)) {
        return {};
    }
    if (link?.openInNewTab === true) {
        return { href, target: NEW_TAB_TARGET, rel: NEW_TAB_REL };
    }
    return { href };
};

type LinkLookAttrs = {
    class?: string;
    [APPEARANCE_ATTRIBUTE]?: string;
};

/** What a stored link looks like, whatever this editor offers: a document from another editor shows as authored. */
const lookAttrs = (value: unknown): LinkLookAttrs => {
    const appearance = storedLink(value)?.appearance;
    if (isLinkAppearance(appearance)) {
        return { class: linkClassName(appearance), [APPEARANCE_ATTRIBUTE]: appearance };
    }
    return { class: linkClassName(undefined) };
};

/** A link read from pasted HTML, with a button look only when this editor offers it. */
const linkFromElement = (element: Element, appearances: readonly LinkAppearance[]): LinkValue | null => {
    const href = element.getAttribute('href') ?? '';
    if (!isSafeHref(href)) {
        return null;
    }
    const link: LinkValue = { href };
    if (element.getAttribute('target') === NEW_TAB_TARGET) {
        link.openInNewTab = true;
    }
    const appearance = element.getAttribute(APPEARANCE_ATTRIBUTE);
    if (isLinkAppearance(appearance) && appearances.includes(appearance)) {
        link.appearance = appearance;
    }
    return link;
};

/** The link mark, which keeps a pasted button look only when this editor offers it. */
const linkMarksFor = (appearances: readonly LinkAppearance[]): Record<string, MarkDefinition> => ({
    link: defineMark<LinkValue>({
        // Outside every other mark, so a partly styled link renders as one anchor, not cut up by a colour or an emphasis inside.
        nesting: -2,
        // Typing at the end of a link does not extend it.
        inclusive: false,
        // Clearing formatting is about how text looks; where a link goes is not.
        survivesClear: true,

        toHtml: (value) => ({
            tag: 'a',
            attrs: { ...anchorAttrs(value), ...lookAttrs(value) },
            children: true,
        }),

        // A pasted span inside a link, such as Google Docs writes, repeats the underline the link already shows.
        defaultStyles: LINK_DEFAULT_STYLES,

        parse: [{ tag: 'a[href]', value: (element) => linkFromElement(element, appearances) }],
    }),
});

/** The link mark of an editor that offers no button looks, shared so its content registers next to `linkContent`. */
const LINK_MARKS = linkMarksFor(NO_APPEARANCES);

/**
 * Links as a mark on text, written as `<a href>`.
 * Only web, mail, phone and relative targets count, so a `javascript:` URL is never clickable.
 */
export const linkContent = defineContent({ marks: LINK_MARKS });

type LinkContentWithOptions = Pick<LinkPluginOptions, 'look' | 'looks'> & {
    marks: Record<string, MarkDefinition>;
};

/** The link content with the host's looks, on the marks the plugin chose for the appearances it offers. */
const linkContentWith = ({ marks, look = {}, looks = {} }: LinkContentWithOptions): RteContent =>
    defineContent({
        marks,
        contentProperties: {
            ...lookProperties(LINK_LOOK_NAME, look, LOOK_PROPERTIES),
            ...buttonLookProperties(looks),
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
 * pages as targets, and `look` sets how links look. `appearances` offers button looks for a link, and `looks`
 * sets how each of them looks.
 *
 * @example
 * const links = linkPlugin({ search, look: { color: 'var(--f-theme-settings-link-color)' }, appearances: ['primary'] });
 */
export const linkPlugin = ({ search, look, appearances = NO_APPEARANCES, looks }: LinkPluginOptions = {}) => {
    // Offered appearances change what paste keeps, so they need a mark of their own; looks alone share the default one.
    let marks = LINK_MARKS;
    if (appearances.length > 0) {
        marks = linkMarksFor(appearances);
    }
    let content = linkContent;
    if (marks !== LINK_MARKS || look !== undefined || looks !== undefined) {
        content = linkContentWith({ marks, look, looks });
    }

    return definePlugin({
        content,
        toolbarGroup: 'link',
        toolbar: [
            {
                label: 'Link',
                shortcut: HOTKEY,
                render: (props) => <LinkToolbarButton {...props} search={search} appearances={appearances} />,
            },
        ],
        edit: {
            link: (props) => <LinkEditor {...props} search={search} appearances={appearances} />,
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
};
