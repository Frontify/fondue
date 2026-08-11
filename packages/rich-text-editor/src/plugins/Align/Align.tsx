/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type FondueIcon,
    IconTextAlignmentCentre,
    IconTextAlignmentJustify,
    IconTextAlignmentLeft,
    IconTextAlignmentRight,
} from '@frontify/fondue-icons';

import { type RteBlockNode, type RtePlugin } from '#/domain';

import { ToolbarButton } from '../shared/ToolbarButton/ToolbarButton';

/**
 * Alignment is an attribute on every text block rather than a block type of its
 * own, so it applies to paragraphs, headings, quotes and list items alike —
 * including block types this plugin knows nothing about.
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
    schema: {
        blockAttributes: [
            {
                name: 'align',
                toStyle: (value) => `text-align: ${value}`,
                parseFromStyle: 'text-align',
            },
        ],
    },
    toolbar: (api) => {
        // The block the selection is in carries the attribute this plugin
        // injected, which the structural node type does not know about.
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
                            // Clicking the active alignment clears it, so the block
                            // goes back to inheriting the editor's direction.
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
