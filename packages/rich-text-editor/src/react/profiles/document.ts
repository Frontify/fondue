/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorPlugin } from '#/bridge/plugin';
import { contentChecksEditor } from '#/features/a11y-content-checks/editor';
import { headingEditor } from '#/features/blocks-heading/editor';
import { ruleEditor } from '#/features/blocks-rule/editor';
import { formatClearEditor } from '#/features/format-clear/editor';
import { subscriptEditor } from '#/features/marks-subscript/editor';
import { superscriptEditor } from '#/features/marks-superscript/editor';
import { mediaImageEditor } from '#/features/media-image/editor';
import { imageReader } from '#/features/media-image/reader';
import { mediaUploadEditor } from '#/features/media-upload/editor';
import { outlineEditor } from '#/features/nav-outline/editor';
import { documentModel } from '#/features/profiles/document';
import { type CommandRef } from '#/model';

import { compileEditor } from '../compile-editor';
import { defineReactPresentation } from '../presentation';

import { commentParts, commentReaders } from './comment';
import { NOT_CREATABLE, partsOf, type ShippedProfile } from './parts';

/** The editor parts of the Document profile's features. */
export const documentParts: readonly EditorPlugin[] = [
    ...commentParts,
    subscriptEditor,
    superscriptEditor,
    headingEditor,
    ruleEditor,
    mediaImageEditor,
    mediaUploadEditor,
    outlineEditor,
    formatClearEditor,
    contentChecksEditor,
] as const;

/** The reader overrides of the Document profile's features. */
export const documentReaders = { ...commentReaders, 'media.image': imageReader };

/** The Default toolbars groups of the Document profile; a group keeps only the commands the definition installs. */
export const documentToolbar = (lists: readonly (readonly CommandRef[])[]): readonly (readonly CommandRef[])[] => [
    ['history.undo', 'history.redo'],
    ['text-style'],
    [
        'mark.bold.toggle',
        'mark.italic.toggle',
        'mark.underline.toggle',
        'mark.strike.toggle',
        'mark.code.toggle',
        'format.clear',
    ],
    ['mark.color.menu.open'],
    ['link.edit'],
    ['list.bullet.toggle', { command: 'list.ordered.toggle', payload: { start: 1 } }, 'list.task.toggle'],
    ...lists,
    ['indent.decrease', 'indent.increase'],
    [
        { command: 'table.insert', payload: { rows: 3, columns: 3 } },
        'image.insert',
        'embed.insert',
        'rule.insert',
        'mention.search.open',
        'emoji.picker.open',
    ],
    ['checks.open', 'find.open', 'outline.toggle'],
];

const PRESENTATION = defineReactPresentation({ toolbar: documentToolbar([]) });

/** The profile's definition and default presentation, compiled once by the loader. */
export const shipped = (): ShippedProfile => ({
    definition: compileEditor(
        {
            id: 'frontify.document',
            model: documentModel,
            policy: {
                features: { 'blocks.align': NOT_CREATABLE, 'input-rules': NOT_CREATABLE },
                enterBehavior: 'paragraph',
            },
        },
        partsOf(documentParts),
        documentReaders,
        'document',
    ),
    presentation: PRESENTATION,
});
