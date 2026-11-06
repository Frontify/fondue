/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type FondueIcon,
    IconTextAlignmentCentre,
    IconTextAlignmentJustify,
    IconTextAlignmentLeft,
    IconTextAlignmentRight,
} from '@frontify/fondue-icons';

import { definePlugin, type ToolbarItemProps } from '#/core';

import { ToolbarButton } from '../shared/ToolbarButton/ToolbarButton';

import styles from './align.module.scss';
import { type AlignAttribute, alignContent } from './content';

const ALIGNMENTS: readonly { value: NonNullable<AlignAttribute['align']>; icon: FondueIcon; title: string }[] = [
    { value: 'left', icon: IconTextAlignmentLeft, title: 'Align left' },
    { value: 'center', icon: IconTextAlignmentCentre, title: 'Align center' },
    { value: 'right', icon: IconTextAlignmentRight, title: 'Align right' },
    { value: 'justify', icon: IconTextAlignmentJustify, title: 'Justify' },
];

const AlignToolbar = ({ api, selection }: ToolbarItemProps) => {
    // The block the selection is in carries the attribute this plugin
    // added, which the structural node type does not know about.
    const align = (selection.block as AlignAttribute | null)?.align;
    // A block without one reads left to right, so left is what it shows.
    const current = align ?? 'left';
    return (
        // One choice of four, so a radio group: the checked one is the
        // block's alignment.
        <div role="radiogroup" aria-label="Alignment" className={styles.group}>
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
                    onClick={() => api.blocks.updateAttributes({ align: align === value ? null : value })}
                >
                    <Icon size={16} />
                </ToolbarButton>
            ))}
        </div>
    );
};

/** Text alignment as a block attribute, with a four-way radio group in the toolbar. */
export const alignPlugin = definePlugin({
    id: 'align',
    content: alignContent,
    toolbar: [{ render: AlignToolbar, floating: 'inline' }],
});
