/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Select } from '@frontify/fondue-components';
import { type CSSProperties, type ReactNode } from 'react';

import { type EditorControlApi, type RteBlockNode, type RteInlineNode, type RtePlugin } from '#/RichTextEditor';

/** The block type this plugin adds. Part of the assembled RteBlock union at the package root. */
export type HeadingBlock = {
    type: 'heading';
    level: 1 | 2 | 3;
    children: RteInlineNode[];
};

const LEVELS: HeadingBlock['level'][] = [1, 2, 3];

const STYLES: Record<HeadingBlock['level'], CSSProperties> = {
    1: { fontSize: '1.6em', fontWeight: 700, lineHeight: 1.3, margin: 0 },
    2: { fontSize: '1.3em', fontWeight: 700, lineHeight: 1.3, margin: 0 },
    3: { fontSize: '1.1em', fontWeight: 600, lineHeight: 1.3, margin: 0 },
};

/** The Select value standing for "not a heading" — the block type we fall back to. */
const PARAGRAPH = 'paragraph';

/** `getCurrentBlock()` returns the structural node; narrowing it makes `level` readable. */
const isHeading = (block: RteBlockNode | null): block is HeadingBlock => block?.type === 'heading';

/**
 * The heading-level dropdown. A component rather than inline JSX so it can hold
 * hooks later; its value is derived from the document on every render (the
 * toolbar re-renders on every editor state change), so the Select is fully
 * controlled by the editor, never by local state.
 */
const HeadingSelect = ({ api }: { api: EditorControlApi }): ReactNode => {
    const currentBlock = api.getCurrentBlock();

    const handleSelect = (selected: string | null): void => {
        if (selected === null) {
            return;
        }
        if (selected === PARAGRAPH) {
            api.setBlockType(PARAGRAPH);
        } else {
            api.setBlockType('heading', { level: Number(selected) });
        }

        // The menu is a popover: as it closes it hands focus back to its own
        // trigger, which would undo the focus setBlockType already restored.
        // Re-focus on the next frame so the caret ends up in the editor.
        requestAnimationFrame(() => api.focus());
    };

    return (
        <Select
            aria-label="Text style"
            value={isHeading(currentBlock) ? String(currentBlock.level) : PARAGRAPH}
            onSelect={handleSelect}
        >
            <Select.Item value={PARAGRAPH}>Paragraph</Select.Item>
            {LEVELS.map((level) => (
                <Select.Item key={level} value={String(level)}>{`Heading ${level}`}</Select.Item>
            ))}
        </Select>
    );
};

export const HeadingPlugin: RtePlugin = {
    id: 'heading',
    schema: {
        blocks: [
            {
                type: 'heading',
                attributes: { level: { default: 1 } },
                render: ({ node, children }) => {
                    // A render function knows what it declared, so it reads its own block type.
                    const { level } = node as HeadingBlock;
                    const Tag = `h${level}` as const;
                    return <Tag style={STYLES[level]}>{children}</Tag>;
                },
                parseRules: LEVELS.map((level) => ({ tag: `h${level}`, attributes: { level } })),
            },
        ],
    },
    toolbar: (api) => <HeadingSelect api={api} />,
};
