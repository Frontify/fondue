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

import styles from './align.module.scss';

/**
 * The attribute this plugin adds to every text block
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

type Alignment = {
    value: NonNullable<AlignAttribute['align']>;
    icon: FondueIcon;
    title: string;
    shortcut: keyof typeof hotkeys;
    announcement: string;
};

const LEFT_TITLE = 'Align left';

const LEFT: Alignment = {
    value: 'left',
    icon: IconTextAlignmentLeft,
    title: LEFT_TITLE,
    shortcut: 'Mod-Shift-l',
    announcement: 'Aligned left',
};

const CENTER_TITLE = 'Align center';

const CENTER: Alignment = {
    value: 'center',
    icon: IconTextAlignmentCentre,
    title: CENTER_TITLE,
    shortcut: 'Mod-Shift-e',
    announcement: 'Centered',
};

const RIGHT_TITLE = 'Align right';

const RIGHT: Alignment = {
    value: 'right',
    icon: IconTextAlignmentRight,
    title: RIGHT_TITLE,
    shortcut: 'Mod-Shift-r',
    announcement: 'Aligned right',
};

const JUSTIFY_TITLE = 'Justify';

const JUSTIFY: Alignment = {
    value: 'justify',
    icon: IconTextAlignmentJustify,
    title: JUSTIFY_TITLE,
    shortcut: 'Mod-Shift-j',
    announcement: 'Justified',
};

const ALIGNMENTS: readonly Alignment[] = [LEFT, CENTER, RIGHT, JUSTIFY];

const CLEARED_ANNOUNCEMENT = 'Alignment cleared';

const alignOf = (selection: RteSelectionSnapshot): AlignAttribute['align'] =>
    // The structural block type does not know the attribute this plugin adds to every text block.
    (selection.block as AlignAttribute | null)?.align;

const alignFromKeyboard = (api: EditorControlApi, { value, announcement }: Alignment) => {
    // Choosing the alignment every selected block already has clears it, so they inherit the editor's direction again.
    switch (api.blocks.toggleAttribute(ALIGN_ATTRIBUTE, value)) {
        case 'removed':
            api.announce(CLEARED_ANNOUNCEMENT);
            return;
        case 'set':
            api.announce(announcement);
            return;
        case 'unchanged':
            return;
    }
};

const AlignToolbar = ({ api, selection, label }: ToolbarItemProps) => {
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
                        api.blocks.toggleAttribute(ALIGN_ATTRIBUTE, value);
                    }}
                >
                    <Icon size={TOOLBAR_ICON_SIZE} />
                </ToolbarButton>
            ))}
        </div>
    );
};

/**
 * The keys are literals because a computed key keeps this plugin in the renderer; each alignment's `shortcut` type ties it to one.
 * The labels are the titles' constants, not `LEFT.title`: reading an alignment here would keep its icon in the renderer too.
 */
const hotkeys = {
    'Mod-Shift-l': {
        label: LEFT_TITLE,
        run: (api) => {
            alignFromKeyboard(api, LEFT);
        },
    },
    'Mod-Shift-e': {
        label: CENTER_TITLE,
        run: (api) => {
            alignFromKeyboard(api, CENTER);
        },
    },
    'Mod-Shift-r': {
        label: RIGHT_TITLE,
        run: (api) => {
            alignFromKeyboard(api, RIGHT);
        },
    },
    'Mod-Shift-j': {
        label: JUSTIFY_TITLE,
        run: (api) => {
            alignFromKeyboard(api, JUSTIFY);
        },
    },
} satisfies Record<string, RteHotkey>;

/**
 * Text alignment, with a four-way radio group in the toolbar
 */
export const alignPlugin = /* @__PURE__ */ definePlugin({
    id: 'align',
    content: alignContent,
    toolbarGroup: 'align',
    toolbar: [{ label: 'Alignment', render: AlignToolbar, floating: 'inline' }],
    hotkeys,
});
