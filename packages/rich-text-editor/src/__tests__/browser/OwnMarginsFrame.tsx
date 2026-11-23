/* (c) Copyright Frontify Ltd., all rights reserved. */

// Mounted by ownMargins.ct.tsx: a component test mounts imported components, and the plugin list holds functions, which cannot travel as props.

import { OWN_MARGIN_VARIABLES } from '../../core';
import { defineBlock, defineContent, definePlugin, RichTextEditor, RichTextRenderer } from '../../index';

import styles from './OwnMarginsFrame.module.scss';
import { FRAME_DOCUMENT, FRAME_MARGIN } from './ownMarginsValues';

/** A block that sets both own-margin variables on its outermost element, as a block's look does. */
const framePlugin = definePlugin({
    id: 'frame',
    content: defineContent({
        blocks: {
            frame: defineBlock({
                content: { blocks: ['paragraph'] },
                toHtml: () => ({
                    tag: 'blockquote',
                    attrs: {
                        class: styles.frame,
                        style: {
                            [OWN_MARGIN_VARIABLES.top]: FRAME_MARGIN,
                            [OWN_MARGIN_VARIABLES.bottom]: FRAME_MARGIN,
                        },
                    },
                    children: true,
                }),
                parse: [],
            }),
        },
    }),
});

const unlistedTagPlugin = definePlugin({
    id: 'section',
    content: defineContent({
        blocks: {
            section: defineBlock({
                content: 'text',
                toHtml: () => ({ tag: 'section', children: true }),
                parse: [],
            }),
        },
    }),
});

const PLUGINS = [framePlugin, unlistedTagPlugin];

/** The renderer and the editor side by side, drawing the same document. */
export const OwnMarginsFrame = () => (
    <>
        <div data-test-id="renderer">
            <RichTextRenderer value={FRAME_DOCUMENT} plugins={PLUGINS} />
        </div>
        <div data-test-id="editor">
            <RichTextEditor value={FRAME_DOCUMENT} plugins={PLUGINS} />
        </div>
    </>
);
