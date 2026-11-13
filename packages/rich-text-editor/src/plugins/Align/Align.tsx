/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type FondueIcon,
    IconTextAlignmentCentre,
    IconTextAlignmentJustify,
    IconTextAlignmentLeft,
    IconTextAlignmentRight,
} from '@frontify/fondue-icons';

import {
    defineContent,
    definePlugin,
    type EditorControlApi,
    type RteHotkey,
    type RteSelectionSnapshot,
    type StyleMap,
    type ToolbarItemProps,
} from '#/core';
import { ToolbarButton } from '#/ui/ToolbarButton/ToolbarButton';
import { TOOLBAR_ICON_SIZE } from '#/ui/toolbarIconSize';

import * as TOOLBAR_GROUPS from '../shared/toolbarGroups';

import styles from './align.module.scss';

/**
 * Alignment is an attribute on every text block rather than a block type of its
 * own, so it applies to paragraphs, headings, quotes and list items alike —
 * block types this plugin knows nothing about included.
 */
export type AlignAttribute = {
    /**
     * The text alignment of the block
     */
    align?: 'left' | 'center' | 'right' | 'justify';
};

const ALIGN_ATTRIBUTE = 'align';

const ALIGN_VALUES: readonly NonNullable<AlignAttribute['align']>[] = ['left', 'center', 'right', 'justify'];

const isAlignment = (value: unknown): value is NonNullable<AlignAttribute['align']> =>
    ALIGN_VALUES.some((alignment) => alignment === value);

/**
 * Text alignment as a block attribute
 */
export const alignContent = defineContent({
    blockAttributes: {
        [ALIGN_ATTRIBUTE]: {
            // Only the four this plugin offers reach a style: a stored value is
            // not trusted to be one, and anything else could carry more CSS.
            style: (value): StyleMap => (isAlignment(value) ? { 'text-align': value } : {}),
            // Only the four this plugin offers: `start`, `end` or `-webkit-center`
            // pasted from elsewhere would be values no control can show.
            parse: (element) => (isAlignment(element.style.textAlign) ? element.style.textAlign : null),
        },
    },
});

type AlignValue = NonNullable<AlignAttribute['align']>;

/** The keys are literals because a computed key keeps this plugin in the renderer; this type ties each alignment to one. */
type AlignShortcut = 'Mod-Shift-l' | 'Mod-Shift-e' | 'Mod-Shift-r' | 'Mod-Shift-j';

type Alignment = {
    value: AlignValue;
    icon: FondueIcon;
    shortcut: AlignShortcut;
};

const LEFT: Alignment = { value: 'left', icon: IconTextAlignmentLeft, shortcut: 'Mod-Shift-l' };

const CENTER: Alignment = { value: 'center', icon: IconTextAlignmentCentre, shortcut: 'Mod-Shift-e' };

const RIGHT: Alignment = { value: 'right', icon: IconTextAlignmentRight, shortcut: 'Mod-Shift-r' };

const JUSTIFY: Alignment = { value: 'justify', icon: IconTextAlignmentJustify, shortcut: 'Mod-Shift-j' };

const ALIGNMENTS: readonly Alignment[] = [LEFT, CENTER, RIGHT, JUSTIFY];

const DEFAULT_LEFT_TITLE = 'Align left';
const DEFAULT_CENTER_TITLE = 'Align center';
const DEFAULT_RIGHT_TITLE = 'Align right';
const DEFAULT_JUSTIFY_TITLE = 'Justify';

const DEFAULT_LEFT_ANNOUNCEMENT = 'Aligned left';
const DEFAULT_CENTER_ANNOUNCEMENT = 'Centered';
const DEFAULT_RIGHT_ANNOUNCEMENT = 'Aligned right';
const DEFAULT_JUSTIFY_ANNOUNCEMENT = 'Justified';
const DEFAULT_CLEARED_ANNOUNCEMENT = 'Alignment cleared';

/**
 * What the alignment buttons and keys say, to sighted users and to screen readers, with a default of English.
 */
export type AlignPluginOptions = {
    /**
     * The name of the left alignment: the button's title and what the keyboard reference calls its key.
     *
     * @default 'Align left'
     */
    leftTitle?: string;
    /**
     * The name of the center alignment: the button's title and what the keyboard reference calls its key.
     *
     * @default 'Align center'
     */
    centerTitle?: string;
    /**
     * The name of the right alignment: the button's title and what the keyboard reference calls its key.
     *
     * @default 'Align right'
     */
    rightTitle?: string;
    /**
     * The name of the justified alignment: the button's title and what the keyboard reference calls its key.
     *
     * @default 'Justify'
     */
    justifyTitle?: string;
    /**
     * Said after the left alignment is chosen.
     *
     * @default 'Aligned left'
     */
    leftAnnouncement?: string;
    /**
     * Said after the center alignment is chosen.
     *
     * @default 'Centered'
     */
    centerAnnouncement?: string;
    /**
     * Said after the right alignment is chosen.
     *
     * @default 'Aligned right'
     */
    rightAnnouncement?: string;
    /**
     * Said after the justified alignment is chosen.
     *
     * @default 'Justified'
     */
    justifyAnnouncement?: string;
    /**
     * Said after the alignment the block already had is chosen again, which removes it.
     *
     * @default 'Alignment cleared'
     */
    clearedAnnouncement?: string;
};

/** The name of each alignment, which the alignment values name their own entry of. */
type AlignTitles = Record<AlignValue, string>;

const titlesOf = (options: AlignPluginOptions): AlignTitles => ({
    left: options.leftTitle ?? DEFAULT_LEFT_TITLE,
    center: options.centerTitle ?? DEFAULT_CENTER_TITLE,
    right: options.rightTitle ?? DEFAULT_RIGHT_TITLE,
    justify: options.justifyTitle ?? DEFAULT_JUSTIFY_TITLE,
});

/** What is said after each choice; the alignment values name their own entry. */
type AlignAnnouncements = Record<AlignValue | 'cleared', string>;

const announcementsOf = (options: AlignPluginOptions): AlignAnnouncements => ({
    left: options.leftAnnouncement ?? DEFAULT_LEFT_ANNOUNCEMENT,
    center: options.centerAnnouncement ?? DEFAULT_CENTER_ANNOUNCEMENT,
    right: options.rightAnnouncement ?? DEFAULT_RIGHT_ANNOUNCEMENT,
    justify: options.justifyAnnouncement ?? DEFAULT_JUSTIFY_ANNOUNCEMENT,
    cleared: options.clearedAnnouncement ?? DEFAULT_CLEARED_ANNOUNCEMENT,
});

/** The alignment of the block the selection is in, which is none when the block has not been given one. */
const alignOf = ({ block }: RteSelectionSnapshot): AlignAttribute['align'] =>
    // The block carries the attribute this plugin added, which the structural node type does not know about.
    (block as AlignAttribute | null)?.align;

type ChooseAlignmentParams = {
    api: EditorControlApi;
    value: AlignValue;
    announcements: AlignAnnouncements;
};

/** What a toolbar button and its key both do: set the alignment, or clear it when the block already has it, and say so when a block changed. */
const chooseAlignment = ({ api, value, announcements }: ChooseAlignmentParams): void => {
    let next: AlignValue | null = value;
    let announcement = announcements[value];
    // Choosing the alignment already set clears it, so the block inherits the editor's direction again.
    if (alignOf(api.selection.get()) === value) {
        next = null;
        announcement = announcements.cleared;
    }
    // Nothing to say when no selected block can be aligned: a screen reader user would hear a change that did not happen.
    if (api.blocks.updateAttributes({ [ALIGN_ATTRIBUTE]: next })) {
        api.announce(announcement);
    }
};

type AlignToolbarProps = ToolbarItemProps & { titles: AlignTitles; announcements: AlignAnnouncements };

const AlignToolbar = ({ api, selection, label, titles, announcements }: AlignToolbarProps) => {
    // A block without one reads left to right, so left is what it shows.
    const current = alignOf(selection) ?? 'left';
    return (
        // One choice of four, so a radio group: the checked one is the
        // block's alignment.
        <div role="radiogroup" aria-label={label} className={styles.group}>
            {ALIGNMENTS.map(({ value, icon: Icon, shortcut }) => (
                // A <button> underneath, which the toolbar gives its tabIndex.
                // oxlint-disable-next-line jsx-a11y/interactive-supports-focus
                <ToolbarButton
                    key={value}
                    role="radio"
                    aria-checked={current === value}
                    title={titles[value]}
                    shortcut={shortcut}
                    onClick={() => {
                        chooseAlignment({ api, value, announcements });
                    }}
                >
                    <Icon size={TOOLBAR_ICON_SIZE} />
                </ToolbarButton>
            ))}
        </div>
    );
};

/**
 * Text alignment, with a four-way radio group in the toolbar and a key for each alignment
 */
export const alignPlugin = (options: AlignPluginOptions = {}) => {
    const titles = titlesOf(options);
    const announcements = announcementsOf(options);
    return definePlugin({
        id: 'align',
        content: alignContent,
        toolbarGroup: TOOLBAR_GROUPS.align,
        toolbar: [
            {
                label: 'Alignment',
                render: (props) => <AlignToolbar {...props} titles={titles} announcements={announcements} />,
                floating: 'inline',
            },
        ],
        hotkeys: {
            'Mod-Shift-l': {
                label: titles.left,
                run: (api) => {
                    chooseAlignment({ api, value: 'left', announcements });
                },
            },
            'Mod-Shift-e': {
                label: titles.center,
                run: (api) => {
                    chooseAlignment({ api, value: 'center', announcements });
                },
            },
            'Mod-Shift-r': {
                label: titles.right,
                run: (api) => {
                    chooseAlignment({ api, value: 'right', announcements });
                },
            },
            'Mod-Shift-j': {
                label: titles.justify,
                run: (api) => {
                    chooseAlignment({ api, value: 'justify', announcements });
                },
            },
        } satisfies Record<AlignShortcut, RteHotkey>,
    });
};
