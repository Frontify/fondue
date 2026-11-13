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
    type HotkeyHandler,
    type RteSelectionSnapshot,
    type StyleMap,
    type ToolbarItemProps,
} from '#/core';
import { ToolbarButton } from '#/ui/ToolbarButton/ToolbarButton';
import { TOOLBAR_ICON_SIZE } from '#/ui/toolbarIconSize';

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

const ALIGN_VALUES: readonly NonNullable<AlignAttribute['align']>[] = ['left', 'center', 'right', 'justify'];

const isAlignment = (value: unknown): value is NonNullable<AlignAttribute['align']> =>
    ALIGN_VALUES.some((alignment) => alignment === value);

/**
 * Text alignment as a block attribute
 */
export const alignContent = defineContent({
    blockAttributes: {
        align: {
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
    title: string;
    shortcut: AlignShortcut;
};

const ALIGNMENTS: readonly Alignment[] = [
    { value: 'left', icon: IconTextAlignmentLeft, title: 'Align left', shortcut: 'Mod-Shift-l' },
    { value: 'center', icon: IconTextAlignmentCentre, title: 'Align center', shortcut: 'Mod-Shift-e' },
    { value: 'right', icon: IconTextAlignmentRight, title: 'Align right', shortcut: 'Mod-Shift-r' },
    { value: 'justify', icon: IconTextAlignmentJustify, title: 'Justify', shortcut: 'Mod-Shift-j' },
];

/**
 * The words the alignment buttons and keys say to screen readers
 */
export type AlignLabels = {
    /**
     * Said after the left alignment is chosen.
     *
     * @default 'Aligned left'
     */
    left: string;
    /**
     * Said after the center alignment is chosen.
     *
     * @default 'Centered'
     */
    center: string;
    /**
     * Said after the right alignment is chosen.
     *
     * @default 'Aligned right'
     */
    right: string;
    /**
     * Said after the justified alignment is chosen.
     *
     * @default 'Justified'
     */
    justify: string;
    /**
     * Said after the alignment the block already had is chosen again, which removes it.
     *
     * @default 'Alignment cleared'
     */
    cleared: string;
};

const DEFAULT_ALIGN_LABELS: AlignLabels = {
    left: 'Aligned left',
    center: 'Centered',
    right: 'Aligned right',
    justify: 'Justified',
    cleared: 'Alignment cleared',
};

export type AlignPluginOptions = {
    /**
     * The words the plugin says. Each one left out stays English.
     */
    labels?: Partial<AlignLabels>;
};

/** The alignment of the block the selection is in, which is none when the block has not been given one. */
const alignOf = ({ block }: RteSelectionSnapshot): AlignAttribute['align'] =>
    // The block carries the attribute this plugin added, which the structural node type does not know about.
    (block as AlignAttribute | null)?.align;

type ChooseAlignmentParams = {
    api: EditorControlApi;
    value: AlignValue;
    labels: AlignLabels;
};

/** What a toolbar button and its key both do: set the alignment, or clear it when the block already has it, and say so when a block changed. */
const chooseAlignment = ({ api, value, labels }: ChooseAlignmentParams): void => {
    let next: AlignValue | null = value;
    let announcement = labels[value];
    // Choosing the alignment already set clears it, so the block inherits the editor's direction again.
    if (alignOf(api.selection.get()) === value) {
        next = null;
        announcement = labels.cleared;
    }
    // Nothing to say when no selected block can be aligned: a screen reader user would hear a change that did not happen.
    if (api.blocks.updateAttributes({ align: next })) {
        api.announce(announcement);
    }
};

type AlignToolbarProps = ToolbarItemProps & { labels: AlignLabels };

const AlignToolbar = ({ api, selection, label, labels }: AlignToolbarProps) => {
    // A block without one reads left to right, so left is what it shows.
    const current = alignOf(selection) ?? 'left';
    return (
        // One choice of four, so a radio group: the checked one is the
        // block's alignment.
        <div role="radiogroup" aria-label={label} className={styles.group}>
            {ALIGNMENTS.map(({ value, icon: Icon, title, shortcut }) => (
                // A <button> underneath, which the toolbar gives its tabIndex.
                // oxlint-disable-next-line jsx-a11y/interactive-supports-focus
                <ToolbarButton
                    key={value}
                    role="radio"
                    aria-checked={current === value}
                    title={title}
                    shortcut={shortcut}
                    onClick={() => {
                        chooseAlignment({ api, value, labels });
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
    const labels: AlignLabels = { ...DEFAULT_ALIGN_LABELS, ...options.labels };
    return definePlugin({
        id: 'align',
        content: alignContent,
        toolbarGroup: 'align',
        toolbar: [
            {
                label: 'Alignment',
                render: (props) => <AlignToolbar {...props} labels={labels} />,
                floating: 'inline',
            },
        ],
        hotkeys: {
            'Mod-Shift-l': (api) => {
                chooseAlignment({ api, value: 'left', labels });
            },
            'Mod-Shift-e': (api) => {
                chooseAlignment({ api, value: 'center', labels });
            },
            'Mod-Shift-r': (api) => {
                chooseAlignment({ api, value: 'right', labels });
            },
            'Mod-Shift-j': (api) => {
                chooseAlignment({ api, value: 'justify', labels });
            },
        } satisfies Record<AlignShortcut, HotkeyHandler>,
    });
};
