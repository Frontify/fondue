/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Select } from '@frontify/fondue-components';
import { type CSSProperties, type ReactNode } from 'react';

import { type EditorControlApi, type RteBlockNode, type RteInlineNode, type RtePlugin } from '#/RichTextEditor';

/**
 * The typography presets legacy called text styles and kept outside the heading
 * scale: three brand-configurable ones plus the pair used around images. They
 * are one block type with a `variant`, mirroring how heading carries a `level`
 * — so adding a preset is an attribute value, not a new block.
 */
export type TextStyleBlock = {
    type: 'textStyle';
    variant: 'custom1' | 'custom2' | 'custom3' | 'imageTitle' | 'imageCaption';
    children: RteInlineNode[];
};

/** The Select value standing for "not a preset" — the block type we fall back to. */
const PARAGRAPH = 'paragraph';

const VARIANTS: { value: TextStyleBlock['variant']; label: string; style: CSSProperties }[] = [
    { value: 'custom1', label: 'Custom 1', style: { fontSize: '1.05em', fontWeight: 600, letterSpacing: '0.02em' } },
    { value: 'custom2', label: 'Custom 2', style: { fontSize: '1em', fontStyle: 'italic', color: '#374151' } },
    {
        value: 'custom3',
        label: 'Custom 3',
        style: { fontSize: '0.9em', textTransform: 'uppercase', letterSpacing: '0.08em' },
    },
    { value: 'imageTitle', label: 'Image title', style: { fontSize: '1.05em', fontWeight: 700 } },
    { value: 'imageCaption', label: 'Image caption', style: { fontSize: '0.85em', color: '#6b7280' } },
];

const STYLES: Record<TextStyleBlock['variant'], CSSProperties> = Object.fromEntries(
    VARIANTS.map((variant) => [variant.value, { margin: 0, ...variant.style }]),
) as Record<TextStyleBlock['variant'], CSSProperties>;

/** `getCurrentBlock()` returns the structural node; narrowing it makes `variant` readable. */
const isTextStyle = (block: RteBlockNode | null): block is TextStyleBlock => block?.type === 'textStyle';

const TextStyleSelect = ({ api }: { api: EditorControlApi }): ReactNode => {
    const currentBlock = api.getCurrentBlock();

    const handleSelect = (selected: string | null): void => {
        if (selected === null) {
            return;
        }
        if (selected === PARAGRAPH) {
            api.setBlockType(PARAGRAPH);
        } else {
            api.setBlockType('textStyle', { variant: selected });
        }
        // The menu hands focus back to its own trigger as it closes, which would
        // undo the focus setBlockType already restored.
        requestAnimationFrame(() => api.focus());
    };

    return (
        <Select
            aria-label="Text style"
            value={isTextStyle(currentBlock) ? currentBlock.variant : PARAGRAPH}
            onSelect={handleSelect}
        >
            <Select.Item value={PARAGRAPH}>Body</Select.Item>
            {VARIANTS.map((variant) => (
                <Select.Item key={variant.value} value={variant.value}>
                    {variant.label}
                </Select.Item>
            ))}
        </Select>
    );
};

export const TextStylePlugin: RtePlugin = {
    id: 'text-style',
    schema: {
        blocks: [
            {
                type: 'textStyle',
                attributes: { variant: { default: 'custom1' } },
                render: ({ node, children }) => {
                    // A render function knows what it declared, so it reads its own block type.
                    const { variant } = node as TextStyleBlock;
                    return (
                        <p data-text-style={variant} style={STYLES[variant]}>
                            {children}
                        </p>
                    );
                },
                // The variant is read from the attribute value rather than off the
                // element, so an unknown one can never enter the document.
                parseRules: VARIANTS.map(({ value }) => ({
                    tag: `p[data-text-style=${value}]`,
                    attributes: { variant: value },
                })),
            },
        ],
    },
    toolbar: (api) => <TextStyleSelect api={api} />,
};
