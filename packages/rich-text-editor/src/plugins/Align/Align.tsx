/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type FondueIcon,
    IconTextAlignmentCentre,
    IconTextAlignmentJustify,
    IconTextAlignmentLeft,
    IconTextAlignmentRight,
} from '@frontify/fondue-icons';

import { type RteBlockNode, type RtePlugin } from '#/core';

import { ToolbarButton } from '../shared/ToolbarButton/ToolbarButton';

/**
 * Alignment is an attribute on every text block rather than a block type of its
 * own, so it applies to paragraphs, headings, quotes and list items alike —
 * block types this plugin knows nothing about included.
 */
export type AlignAttribute = {
    align?: 'left' | 'center' | 'right' | 'justify';
};

const ALIGNMENTS: { value: NonNullable<AlignAttribute['align']>; icon: FondueIcon; title: string }[] = [
    { value: 'left', icon: IconTextAlignmentLeft, title: 'Align left' },
    { value: 'center', icon: IconTextAlignmentCentre, title: 'Align center' },
    { value: 'right', icon: IconTextAlignmentRight, title: 'Align right' },
    { value: 'justify', icon: IconTextAlignmentJustify, title: 'Justify' },
];

export const alignPlugin = (): RtePlugin => ({
    id: 'align',
    schema: [
        {
            kind: 'attribute',
            type: 'align',
            toStyle: (value) => `text-align: ${value}`,
            parseFromStyle: 'text-align',
        },
    ],
    toolbar: (api) => {
        // The block the selection is in carries the attribute this plugin
        // added, which the structural node type does not know about.
        const current = api.selection.get().block as (RteBlockNode & AlignAttribute) | null;
        return (
            <>
                {ALIGNMENTS.map(({ value, icon: Icon, title }) => {
                    const active = current?.align === value;
                    return (
                        <ToolbarButton
                            key={value}
                            active={active}
                            title={title}
                            // Clicking the active alignment clears it, so the
                            // block inherits the editor's direction again.
                            onClick={() => api.blocks.updateAttributes({ align: active ? null : value })}
                        >
                            <Icon size={16} />
                        </ToolbarButton>
                    );
                })}
            </>
        );
    },
});
