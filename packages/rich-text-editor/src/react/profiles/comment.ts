/* (c) Copyright Frontify Ltd., all rights reserved. */

import { extendPlugin, type RichTextPlugin } from '#/bridge/definePlugin';
import { codeBlockPlugin } from '#/features/blocks-code';
import { quotePlugin } from '#/features/blocks-quote';
import { corePlugin } from '#/features/core';
import { emojiPlugin } from '#/features/emoji';
import { bulletListPlugin } from '#/features/lists-bullet';
import { listItemPlugin } from '#/features/lists-item';
import { orderedListPlugin } from '#/features/lists-ordered';
import { taskListPlugin } from '#/features/lists-task';
import { codePlugin } from '#/features/marks-code';
import { strikePlugin } from '#/features/marks-strike';
import { mentionsPlugin } from '#/features/mentions';
import { commentModel } from '#/features/profiles/comment';
import { type CommandRef } from '#/model';

import { compileEditor } from '../compile-editor';
import { defineReactPresentation } from '../presentation';

import { inlinePlugins } from './inline';
import { NOT_CREATABLE, type ShippedProfile } from './parts';

// Mod+Enter submits in a comment, so no unit binds it.
const withoutModEnter = (unit: RichTextPlugin): RichTextPlugin => {
    const { keys } = unit.editor;
    if (keys?.['Mod-Enter'] === undefined) {
        return unit;
    }
    return extendPlugin(unit, {
        keys: Object.fromEntries(Object.entries(keys).filter(([key]) => key !== 'Mod-Enter')),
    });
};

/** The units of the Comment profile's features, which Document extends; Comment drops their Mod+Enter keys. */
export const commentPlugins: readonly RichTextPlugin[] = [
    corePlugin(),
    ...inlinePlugins.slice(1),
    strikePlugin(),
    codePlugin(),
    quotePlugin(),
    codeBlockPlugin(),
    listItemPlugin(),
    bulletListPlugin(),
    orderedListPlugin(),
    taskListPlugin(),
    mentionsPlugin(),
    emojiPlugin(),
] as const;

const GROUPS: readonly (readonly CommandRef[])[] = [
    ['mark.bold.toggle', 'mark.italic.toggle', 'mark.strike.toggle', 'mark.code.toggle'],
    ['link.edit'],
    ['list.bullet.toggle', { command: 'list.ordered.toggle', payload: { start: 1 } }, 'list.task.toggle'],
    ['quote.toggle', 'code-block.toggle'],
    ['mention.search.open', 'emoji.picker.open'],
];
const PRESENTATION = defineReactPresentation({ toolbar: GROUPS });
const TOUCH_PRESENTATION = defineReactPresentation({ toolbar: [['history.undo', 'history.redo'], ...GROUPS] });

/** The profile's definition and default presentation, compiled once by the loader. */
export const shipped = (): ShippedProfile => ({
    definition: compileEditor(
        {
            id: 'frontify.comment',
            model: commentModel,
            policy: {
                features: {
                    'marks.font-color': NOT_CREATABLE,
                    'marks.language': NOT_CREATABLE,
                    'blocks.align': NOT_CREATABLE,
                    'input-rules': NOT_CREATABLE,
                },
                enterBehavior: 'paragraph',
            },
            plugins: commentPlugins.map(withoutModEnter),
        },
        'comment',
    ),
    presentation: PRESENTATION,
    touchPresentation: TOUCH_PRESENTATION,
});
