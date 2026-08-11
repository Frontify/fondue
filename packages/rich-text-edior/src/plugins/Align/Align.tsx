/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type FondueIcon,
    IconTextAlignmentCentre,
    IconTextAlignmentJustify,
    IconTextAlignmentLeft,
    IconTextAlignmentRight,
} from '@frontify/fondue-icons';

import { definePlugin, type RteBlockNode } from '#/RichTextEditor';

import { ToolbarButton } from '../ToolbarButton/ToolbarButton';

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

export const AlignPlugin = definePlugin(() => ({
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
    toolbar: (api) => (
        <>
            {ALIGNMENTS.map(({ value, icon: Icon, title }) => {
                // The current block carries the attribute this plugin injected,
                // which the structural node type does not know about.
                const current = api.getCurrentBlock() as (RteBlockNode & AlignAttribute) | null;
                const active = current?.align === value;
                return (
                    <ToolbarButton
                        key={value}
                        active={active}
                        title={title}
                        // Clicking the active alignment clears it, so the block
                        // goes back to inheriting the editor's direction.
                        onClick={() => api.updateBlockAttributes({ align: active ? null : value })}
                    >
                        <Icon size={16} />
                    </ToolbarButton>
                );
            })}
        </>
    ),
}));
