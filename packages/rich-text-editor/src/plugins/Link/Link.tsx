/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type DefaultStyle,
    type MarkDefinition,
    defineContent,
    defineMark,
    definePlugin,
    lookProperties,
    type RteContent,
    type RteHotkey,
} from '#/core';
import { translatedLabel } from '#/ui/translation';

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
    linkLookClassName,
    NO_APPEARANCES,
    TEXT_LINK_LOOK_FIELDS,
    type TextLinkLook,
} from './helpers/appearance';
import { type LinkSearch } from './helpers/destination';
import { openNewLinkForm } from './helpers/newLinkForms';
import { NEW_TAB_REL, NEW_TAB_TARGET, opensInNewTab } from './helpers/newTab';
import {
    ALL_LINK_APPEARANCES,
    type ButtonLink,
    type LinkAppearance,
    type LinkKind,
    type LinkValue,
    type TextLink,
} from './helpers/value';

/** The value this plugin sets on text nodes. */
export type LinkMark = {
    /**
     * The target of the link
     */
    link?: LinkValue;
};

/** How each kind of link looks. */
export type LinkLook = {
    /** How text links look. */
    text?: TextLinkLook;
    /** How each button style looks. */
    button?: Partial<Record<LinkAppearance, ButtonLook>>;
};

/** How the link content looks; what a renderer needs to draw links the way the editor does. */
export type LinkContentOptions = {
    /**
     * The kinds of link authors can make. Every editor makes text links; add `'button'` to offer the primary,
     * secondary and tertiary button styles. A link already stored as a button always draws as one.
     *
     * @default ['text']
     */
    kinds?: readonly LinkKind[];
    /**
     * How each kind of link looks in the editor, the readonly view and the HTML export. Values are CSS strings, so
     * `var(--f-theme-settings-button-primary-color)` works and wrapper overrides keep working. A kind, button style or
     * field left out keeps Fondue's look. A value that `isAllowedLookValue` rejects throws an error that
     * names the field. A look never offers a kind: `look.button` alone only styles buttons already stored.
     */
    look?: LinkLook;
};

export type LinkPluginOptions = LinkContentOptions & {
    /**
     * Offers the app's own pages as link targets while the author types. Editing only: the content never needs it.
     */
    search?: LinkSearch;
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
const storedLink = (value: unknown): Partial<ButtonLink> | null => {
    if (typeof value === 'object') {
        // The declared type is trusted only this far: every field is checked before use.
        return value as Partial<ButtonLink> | null;
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

    let textLink: TextLink = { href };

    if (opensInNewTab(element.getAttribute('target'))) {
        textLink = { href, openInNewTab: true };
    }

    const appearance = element.getAttribute(APPEARANCE_ATTRIBUTE);

    if (isLinkAppearance(appearance) && appearances.includes(appearance)) {
        return { ...textLink, appearance };
    }

    return textLink;
};

/** The link mark, which keeps a pasted button look only when this editor offers it. */
const linkMarkFor = (appearances: readonly LinkAppearance[]): MarkDefinition =>
    defineMark<LinkValue>({
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
    });

// Shared so every link content with the same offer declares the very same mark, which the registry requires.
const LINK_MARK = linkMarkFor(NO_APPEARANCES);
const BUTTON_LINK_MARK = linkMarkFor(ALL_LINK_APPEARANCES);

// Shared so the default plugin, `defaultContent` and every call without a look hand out the very same content.
const DEFAULT_LINK_CONTENT = defineContent({ marks: { link: LINK_MARK } });

const DEFAULT_LINK_KINDS: readonly LinkKind[] = ['text'];

/** The button styles one kind of link offers. */
const appearancesOfKind = (kind: LinkKind): readonly LinkAppearance[] => {
    switch (kind) {
        case 'text':
            return NO_APPEARANCES;
        case 'button':
            return ALL_LINK_APPEARANCES;
    }
};

/** The button styles an editor offers, whatever its kinds repeat. */
const offeredAppearances = (kinds: readonly LinkKind[]): readonly LinkAppearance[] => [
    ...new Set(kinds.flatMap(appearancesOfKind)),
];

/**
 * @throws When the kinds leave out `'text'`, which every link editor makes.
 */
const requireTextKind = (kinds: readonly LinkKind[]): void => {
    if (!kinds.includes('text')) {
        throw new Error("kinds must include 'text': every link editor makes text links");
    }
};

/**
 * Links as a mark on text, written as `<a href>`, and how they look.
 * Only web, mail, phone and relative targets count, so a `javascript:` URL is never clickable.
 * Pass the same `kinds` and `look` as `linkPlugin`, so a renderer given only content draws the host's looks and
 * keeps a pasted button's style only where the editor offers buttons.
 *
 * @example
 * <RichTextRenderer plugins={[linkContent({ kinds: ['text', 'button'], look }), boldContent]} value={doc} />
 */
export const linkContent = ({ kinds = DEFAULT_LINK_KINDS, look }: LinkContentOptions = {}): RteContent => {
    requireTextKind(kinds);

    const appearances = offeredAppearances(kinds);

    if (appearances.length === 0 && look === undefined) {
        return DEFAULT_LINK_CONTENT;
    }

    let mark = LINK_MARK;
    if (appearances.length > 0) {
        mark = BUTTON_LINK_MARK;
    }

    return defineContent({
        marks: { link: mark },
        contentClassName: linkLookClassName(look?.text ?? {}, look?.button ?? {}),
        contentProperties: {
            ...lookProperties(LINK_LOOK_NAME, look?.text ?? {}, TEXT_LINK_LOOK_FIELDS),
            ...buttonLookProperties(look?.button ?? {}),
        },
    });
};

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
 * pages as targets. `kinds` offers button links (primary, secondary and tertiary) next to text links, and
 * `look` sets how each kind of link looks.
 *
 * @example
 * const links = linkPlugin({
 *     search,
 *     kinds: ['text', 'button'],
 *     look: {
 *         text: { color: 'var(--f-theme-settings-link-color)' },
 *         button: { primary: { backgroundColor: 'var(--f-theme-settings-button-primary-background-color)' } },
 *     },
 * });
 */
export const linkPlugin = ({ search, kinds = DEFAULT_LINK_KINDS, look }: LinkPluginOptions = {}) => {
    const appearances = offeredAppearances(kinds);

    return definePlugin({
        content: linkContent({ kinds, look }),
        toolbarGroup: 'link',
        toolbar: [
            {
                label: translatedLabel('RichTextEditor_link'),
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
