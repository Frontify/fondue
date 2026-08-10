/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type FondueRtePlugin, type FrontifyBlockNode, type FrontifyInlineNode } from '#/RichTextEditor';

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
    toolbar: (api) => (
        <>
            {LEVELS.map((level) => {
                const active = api.isBlockActive('heading', { level });
                return (
                    <button
                        key={level}
                        type="button"
                        aria-pressed={active}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() =>
                            active ? api.setBlockType('paragraph') : api.setBlockType('heading', { level })
                        }
                        style={{
                            fontWeight: 600,
                            fontSize: 13,
                            lineHeight: 1,
                            padding: '3px 8px',
                            border: '1px solid #d1d5db',
                            background: active ? '#e5e7eb' : 'transparent',
                            cursor: 'pointer',
                            borderRadius: 4,
                            color: '#374151',
                            fontFamily: 'inherit',
                        }}
                    >
                        H{level}
                    </button>
                );
            })}
        </>
    ),
};
