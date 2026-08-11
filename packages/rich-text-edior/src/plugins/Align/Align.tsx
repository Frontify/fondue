/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RteBlockNode, type RtePlugin } from '#/RichTextEditor';

import { ToolbarButton } from '../ToolbarButton/ToolbarButton';

/**
 * Alignment is an attribute on every text block rather than a block type of its
 * own, so it applies to paragraphs, headings, quotes and list items alike —
 * including block types this plugin knows nothing about.
 */
export type AlignAttribute = {
    align?: 'left' | 'center' | 'right' | 'justify';
};

const ALIGNMENTS: { value: NonNullable<AlignAttribute['align']>; label: string; title: string }[] = [
    { value: 'left', label: '⇤', title: 'Align left' },
    { value: 'center', label: '↔', title: 'Align center' },
    { value: 'right', label: '⇥', title: 'Align right' },
    { value: 'justify', label: '☰', title: 'Justify' },
];

export const AlignPlugin: RtePlugin = {
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
            {ALIGNMENTS.map(({ value, label, title }) => {
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
                        {label}
                    </ToolbarButton>
                );
            })}
        </>
    ),
};
