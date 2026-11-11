/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type FondueIcon,
    IconTextAlignmentCentre,
    IconTextAlignmentJustify,
    IconTextAlignmentLeft,
    IconTextAlignmentRight,
} from '@frontify/fondue-icons';

import { defineContent, definePlugin, type StyleMap, type ToolbarItemProps } from '#/core';
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

const ALIGNMENTS: readonly { value: NonNullable<AlignAttribute['align']>; icon: FondueIcon; title: string }[] = [
    { value: 'left', icon: IconTextAlignmentLeft, title: 'Align left' },
    { value: 'center', icon: IconTextAlignmentCentre, title: 'Align center' },
    { value: 'right', icon: IconTextAlignmentRight, title: 'Align right' },
    { value: 'justify', icon: IconTextAlignmentJustify, title: 'Justify' },
];

const AlignToolbar = ({ api, selection, label }: ToolbarItemProps) => {
    // The block the selection is in carries the attribute this plugin
    // added, which the structural node type does not know about.
    const align = (selection.block as AlignAttribute | null)?.align;
    // A block without one reads left to right, so left is what it shows.
    const current = align ?? 'left';
    return (
        // One choice of four, so a radio group: the checked one is the
        // block's alignment.
        <div role="radiogroup" aria-label={label} className={styles.group}>
            {ALIGNMENTS.map(({ value, icon: Icon, title }) => (
                // A <button> underneath, which the toolbar gives its tabIndex.
                // oxlint-disable-next-line jsx-a11y/interactive-supports-focus
                <ToolbarButton
                    key={value}
                    role="radio"
                    aria-checked={current === value}
                    title={title}
                    // Choosing the alignment already set clears it, so the
                    // block inherits the editor's direction again.
                    onClick={() => {
                        let next: typeof value | null = value;
                        if (align === value) {
                            next = null;
                        }
                        api.blocks.updateAttributes({ align: next });
                    }}
                >
                    <Icon size={TOOLBAR_ICON_SIZE} />
                </ToolbarButton>
            ))}
        </div>
    );
};

/**
 * Text alignment, with a four-way radio group in the toolbar
 */
export const alignPlugin = /* @__PURE__ */ definePlugin({
    id: 'align',
    content: alignContent,
    toolbarGroup: 'align',
    toolbar: [{ label: 'Alignment', render: AlignToolbar, floating: 'inline' }],
});
