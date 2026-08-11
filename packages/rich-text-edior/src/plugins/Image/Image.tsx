/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RtePlugin } from '#/RichTextEditor';

import { ToolbarButton } from '../ToolbarButton/ToolbarButton';

import styles from './image.module.scss';

/** The void block this plugin adds: no text children, data lives in attributes. */
export type ImageBlock = {
    type: 'image';
    src: string;
    alt?: string;
};

export const ImagePlugin: RtePlugin = {
    id: 'image',
    schema: {
        blocks: [
            {
                type: 'image',
                isVoid: true,
                attributes: {
                    src: { parseFromDomAttribute: true },
                    alt: { parseFromDomAttribute: true },
                },
                render: ({ node }) => {
                    // A render function knows what it declared, so it reads its own block type.
                    const image = node as ImageBlock;
                    return <img src={image.src} alt={image.alt ?? ''} className={styles.image} />;
                },
                parseRules: [{ tag: 'img' }],
            },
        ],
    },
    toolbar: (api) => (
        <ToolbarButton
            onClick={() => {
                // Spike-level UX; a real implementation opens an asset picker.
                const src = window.prompt('Image URL');
                if (src) {
                    api.insert('image', { src });
                }
            }}
        >
            🖼
        </ToolbarButton>
    ),
};
