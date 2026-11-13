/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ANY_LIST, defineBlock, defineContent, definePlugin, PARAGRAPH, type RtePlugin } from '#/core';

/**
 * Plugins for the engine's specs. Each declares only what the engine reads (a
 * list of items, an item with a state, an attribute every text block carries,
 * a block a shortcut creates), so a spec depends on no shipped feature.
 */

/**
 * Three list types: `dotList` and `stepList` share the item type `row`, so one
 * converts into the other in place, and `taskList` holds `task` items, which
 * carry a `done` state that starts false.
 */
export const listsPlugin: RtePlugin = definePlugin({
    id: 'test-lists',
    content: defineContent({
        blocks: {
            dotList: defineBlock({
                content: { items: 'row' },
                toHtml: () => ({ tag: 'ul', children: true }),
                parse: [{ tag: 'ul' }],
            }),
            stepList: defineBlock({
                content: { items: 'row' },
                toHtml: () => ({ tag: 'ol', children: true }),
                parse: [{ tag: 'ol' }],
            }),
            row: defineBlock({
                content: { blocks: [PARAGRAPH, ANY_LIST] },
                toHtml: () => ({ tag: 'li', children: true }),
                parse: [{ tag: 'li' }],
            }),
            taskList: defineBlock({
                content: { items: 'task' },
                toHtml: () => ({ tag: 'ul', attrs: { 'data-tasks': '' }, children: true }),
                parse: [{ tag: 'ul[data-tasks]' }],
            }),
            task: defineBlock<{ done: boolean }>({
                content: { blocks: [PARAGRAPH, ANY_LIST] },
                defaults: { done: false },
                toHtml: ({ done }) => ({ tag: 'li', attrs: { 'data-done': String(done) }, children: true }),
                parse: [{ tag: 'li[data-done]' }],
            }),
        },
    }),
});

/** An attribute every text block carries, whichever plugin declared the block. */
export const toneAttributePlugin: RtePlugin = definePlugin({
    id: 'test-tone',
    content: defineContent({
        blockAttributes: {
            tone: { style: (value) => ({ color: value }) },
        },
    }),
});

/** A text block other than the paragraph, which typing `## ` creates. */
export const titlePlugin: RtePlugin = definePlugin({
    id: 'test-title',
    content: defineContent({
        blocks: {
            title: defineBlock({
                content: 'text',
                toHtml: () => ({ tag: 'h2', children: true }),
                parse: [{ tag: 'h2' }],
            }),
        },
    }),
    inputRules: [{ kind: 'block', match: '## ', block: 'title' }],
});
