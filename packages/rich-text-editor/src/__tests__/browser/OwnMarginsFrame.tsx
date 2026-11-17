/* (c) Copyright Frontify Ltd., all rights reserved. */

// Mounted by ownMargins.ct.tsx: a component test mounts imported components, and the plugin list holds functions, which cannot travel as props.

import { OWN_MARGIN_VARIABLES } from '../../core';
import { defineBlock, defineContent, definePlugin, RichTextEditor, RichTextRenderer } from '../../index';

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

const PLUGINS = [framePlugin];

/** The renderer and the editor side by side, drawing the same document with the frame plugin. */
export const OwnMarginsFrame = () => (
    <>
        <div data-testid="renderer">
            <RichTextRenderer value={FRAME_DOCUMENT} plugins={PLUGINS} />
        </div>
        <div data-testid="editor">
            <RichTextEditor value={FRAME_DOCUMENT} plugins={PLUGINS} />
        </div>
    </>
);
