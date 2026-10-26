/* (c) Copyright Frontify Ltd., all rights reserved. */

import { extendPlugin, type RichTextPlugin } from '#/bridge/pluginApi/definePlugin';
import { type CommandRef } from '#/model';
import { bulletListPlugin } from '#/plugins/BulletList';
import { checkListPlugin } from '#/plugins/CheckList';
import { codePlugin } from '#/plugins/Code';
import { codeBlockPlugin } from '#/plugins/CodeBlock';
import { corePlugin } from '#/plugins/Core';
import { emojiPlugin } from '#/plugins/Emoji';
import { listItemPlugin } from '#/plugins/ListItem';
import { mentionPlugin } from '#/plugins/Mention';
import { orderedListPlugin } from '#/plugins/OrderedList';
import { commentModel } from '#/plugins/profiles/comment';
import { quotePlugin } from '#/plugins/Quote';
import { strikethroughPlugin } from '#/plugins/Strikethrough';

import { compileEditor } from '../compileEditor';
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
    strikethroughPlugin(),
    codePlugin(),
    quotePlugin(),
    codeBlockPlugin(),
    listItemPlugin(),
    bulletListPlugin(),
    orderedListPlugin(),
    checkListPlugin(),
    mentionPlugin(),
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
