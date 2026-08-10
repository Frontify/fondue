/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Select } from '@frontify/fondue-components';
import { type ReactNode } from 'react';

import {
    type EditorControlApi,
    type FondueRtePlugin,
    type FrontifyBlockNode,
    type FrontifyInlineNode,
} from '#/RichTextEditor';

/** The block type this plugin adds. Part of the assembled FrontifyBlock union at the package root. */
export type HeadingBlock = {
    type: 'heading';
    level: 1 | 2 | 3;
    children: FrontifyInlineNode[];
};

export const isHeadingBlock = (node: FrontifyBlockNode): node is HeadingBlock => node.type === 'heading';

type HeadingTag = 'h1' | 'h2' | 'h3';

const HEADING_STYLES: Record<1 | 2 | 3, React.CSSProperties> = {
    1: { fontSize: '1.6em', fontWeight: 700, lineHeight: 1.3, margin: 0 },
    2: { fontSize: '1.3em', fontWeight: 700, lineHeight: 1.3, margin: 0 },
    3: { fontSize: '1.1em', fontWeight: 600, lineHeight: 1.3, margin: 0 },
};

const LEVELS = [1, 2, 3] as const;

/** The Select value standing for "not a heading" — the block type we fall back to. */
const PARAGRAPH_VALUE = 'paragraph';

const OPTIONS: { value: string; label: string }[] = [
    { value: PARAGRAPH_VALUE, label: 'Paragraph' },
    ...LEVELS.map((level) => ({ value: String(level), label: `Heading ${level}` })),
];

/**
 * The heading-level dropdown. A component rather than inline JSX so it can
 * hold hooks later; its value is derived from the document on every render
 * (the toolbar re-renders on every editor state change), so the Select is
 * fully controlled by the editor, never by local state.
 */
const HeadingSelect = ({ api }: { api: EditorControlApi }): ReactNode => {
    const currentBlock = api.getCurrentBlock();
    const value = currentBlock !== null && isHeadingBlock(currentBlock) ? String(currentBlock.level) : PARAGRAPH_VALUE;

    const handleSelect = (selected: string | null): void => {
        if (selected === null) {
            return;
        }

        if (selected === PARAGRAPH_VALUE) {
            api.setBlockType('paragraph');
        } else {
            api.setBlockType('heading', { level: Number(selected) });
        }

        // The menu is a popover: as it closes it hands focus back to its own
        // trigger, which would undo the focus setBlockType already restored.
        // Re-focus on the next frame so the caret ends up in the editor.
        requestAnimationFrame(() => api.focus());
    };

    return (
        <Select aria-label="Text style" value={value} onSelect={handleSelect}>
            {OPTIONS.map((option) => (
                <Select.Item key={option.value} value={option.value}>
                    {option.label}
                </Select.Item>
            ))}
        </Select>
    );
};

export const HeadingPlugin: FondueRtePlugin = {
    id: 'heading',
    schema: {
        blocks: [
            {
                type: 'heading',
                attributes: { level: { default: 1 } },
                render: ({ node, children, attributes }) => {
                    const heading = node as HeadingBlock;
                    const Tag = `h${heading.level}` as HeadingTag;
                    return (
                        <Tag {...attributes} style={HEADING_STYLES[heading.level]}>
                            {children}
                        </Tag>
                    );
                },
                parseRules: LEVELS.map((level) => ({ tag: `h${level}`, attributes: { level } })),
            },
        ],
    },
    toolbar: (api) => <HeadingSelect api={api} />,
};
