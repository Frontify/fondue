/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type HeadingBlock } from '#/core/document';
import { type FondueRtePlugin } from '#/core/plugin';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4';

const HEADING_STYLES: Record<1 | 2 | 3 | 4, React.CSSProperties> = {
    1: { fontSize: '1.6em', fontWeight: 700, lineHeight: 1.3, margin: 0 },
    2: { fontSize: '1.3em', fontWeight: 700, lineHeight: 1.3, margin: 0 },
    3: { fontSize: '1.1em', fontWeight: 600, lineHeight: 1.3, margin: 0 },
    4: { fontSize: '1em', fontWeight: 600, lineHeight: 1.3, margin: 0 },
};

export const HeadingPlugin: FondueRtePlugin = {
    id: 'heading',
    label: 'Heading',
    schema: {
        blocks: [
            {
                type: 'heading',
                attrs: {
                    level: { default: 1 },
                },
                render: ({ node, children, attributes }) => {
                    const heading = node as HeadingBlock;
                    const Tag = `h${heading.level}` as HeadingTag;
                    return (
                        <Tag {...attributes} style={HEADING_STYLES[heading.level]}>
                            {children}
                        </Tag>
                    );
                },
            },
        ],
    },
    toolbar: {
        positions: ['top'],
        render: (api) => {
            const current = api.getCurrentBlock();
            const level = current?.type === 'heading' ? current.level : 0;
            return (
                <select
                    value={level}
                    onMouseDown={(event) => event.stopPropagation()}
                    onChange={(event) => {
                        const next = Number(event.target.value);
                        if (next === 0) {
                            api.setBlockType('paragraph');
                        } else {
                            api.setBlockType('heading', { level: next });
                        }
                    }}
                    style={{
                        fontSize: 13,
                        padding: '3px 6px',
                        border: '1px solid #d1d5db',
                        borderRadius: 4,
                        background: 'transparent',
                        color: '#374151',
                        fontFamily: 'inherit',
                        cursor: 'pointer',
                    }}
                >
                    <option value={0}>Paragraph</option>
                    <option value={1}>H1</option>
                    <option value={2}>H2</option>
                    <option value={3}>H3</option>
                    <option value={4}>H4</option>
                </select>
            );
        },
    },
    parseHtml: [
        { tag: 'h1', produce: { kind: 'block', type: 'heading' }, getAttrs: () => ({ level: 1 }) },
        { tag: 'h2', produce: { kind: 'block', type: 'heading' }, getAttrs: () => ({ level: 2 }) },
        { tag: 'h3', produce: { kind: 'block', type: 'heading' }, getAttrs: () => ({ level: 3 }) },
        { tag: 'h4', produce: { kind: 'block', type: 'heading' }, getAttrs: () => ({ level: 4 }) },
    ],
};
