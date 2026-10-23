/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorPlugin } from '#/bridge/plugin';
import { codeBlockEditor } from '#/features/blocks-code/editor';
import { quoteEditor } from '#/features/blocks-quote/editor';
import { coreEditor } from '#/features/core/editor';
import { emojiEditor } from '#/features/emoji/editor';
import { bulletListEditor } from '#/features/lists-bullet/editor';
import { listItemEditor } from '#/features/lists-item/editor';
import { orderedListEditor } from '#/features/lists-ordered/editor';
import { taskListEditor } from '#/features/lists-task/editor';
import { taskReader } from '#/features/lists-task/reader';
import { codeEditor } from '#/features/marks-code/editor';
import { strikeEditor } from '#/features/marks-strike/editor';
import { mentionsEditor } from '#/features/mentions/editor';
import { mentionReader } from '#/features/mentions/reader';
import { commentModel } from '#/features/profiles/comment';
import { type CommandRef } from '#/model';

import { compileEditor } from '../compile-editor';
import { defineReactPresentation } from '../presentation';

import { inlineParts, inlineReaders } from './inline';
import { NOT_CREATABLE, partsOf, type ShippedProfile } from './parts';

// Mod+Enter submits in a comment, so no part binds it (Key precedence row 4).
const withoutModEnter = (part: EditorPlugin): EditorPlugin => {
    if (part.keys?.['Mod-Enter'] === undefined) {
        return part;
    }
    return Object.freeze({
        ...part,
        keys: Object.fromEntries(Object.entries(part.keys).filter(([key]) => key !== 'Mod-Enter')),
    });
};

/** The editor parts of the Comment profile's features, which Document extends; Comment drops their Mod+Enter keys. */
export const commentParts: readonly EditorPlugin[] = [
    coreEditor,
    ...inlineParts.slice(1),
    strikeEditor,
    codeEditor,
    quoteEditor,
    codeBlockEditor,
    listItemEditor,
    bulletListEditor,
    orderedListEditor,
    taskListEditor,
    mentionsEditor,
    emojiEditor,
] as const;

/** The reader overrides of the Comment profile's features. */
export const commentReaders = { ...inlineReaders, 'lists.task': taskReader, mentions: mentionReader };

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
        },
        partsOf(commentParts.map(withoutModEnter)),
        commentReaders,
        'comment',
    ),
    presentation: PRESENTATION,
    touchPresentation: TOUCH_PRESENTATION,
});
