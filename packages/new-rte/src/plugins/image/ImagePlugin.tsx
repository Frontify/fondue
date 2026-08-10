/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type FondueRtePlugin, type FrontifyBlockNode } from '#/RichTextEditor';

/** The void block this plugin adds: no text children, data lives in attributes. */
export type ImageBlock = {
    type: 'image';
    src: string;
    alt?: string;
};

export const isImageBlock = (node: FrontifyBlockNode): node is ImageBlock => node.type === 'image';

export const ImagePlugin: FondueRtePlugin = {
    id: 'image',
    schema: {
        blocks: [
            {
                type: 'image',
                isVoid: true,
                attributes: {
                    src: { default: null, parseFromDomAttribute: true },
                    alt: { default: null, parseFromDomAttribute: true },
                },
                render: ({ node, attributes }) => {
                    const image = node as ImageBlock;
                    return (
                        <img
                            {...attributes}
                            src={image.src}
                            alt={image.alt ?? ''}
                            style={{ maxWidth: '100%', borderRadius: 6 }}
                        />
                    );
                },
                parseRules: [{ tag: 'img' }],
            },
        ],
    },
    toolbar: (api) => (
        <button
            type="button"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => {
                // Spike-level UX; a real implementation opens an asset picker.
                const src = window.prompt('Image URL');
                if (src) {
                    api.insertBlock('image', { src });
                }
            }}
            style={{
                fontSize: 13,
                lineHeight: 1,
                padding: '3px 8px',
                border: '1px solid #d1d5db',
                background: 'transparent',
                cursor: 'pointer',
                borderRadius: 4,
                color: '#374151',
                fontFamily: 'inherit',
            }}
        >
            🖼
        </button>
    ),
};
