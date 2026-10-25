/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RichTextPlugin } from '#/bridge/definePlugin';
import { contentChecksPlugin } from '#/features/a11y-content-checks';
import { headingPlugin } from '#/features/blocks-heading';
import { rulePlugin } from '#/features/blocks-rule';
import { formatClearPlugin } from '#/features/format-clear';
import { subscriptPlugin } from '#/features/marks-subscript';
import { superscriptPlugin } from '#/features/marks-superscript';
import { mediaImagePlugin } from '#/features/media-image';
import { mediaUploadPlugin } from '#/features/media-upload';
import { outlinePlugin } from '#/features/nav-outline';
import { documentModel } from '#/features/profiles/document';
import { type CommandRef } from '#/model';

import { compileEditor } from '../compileEditor';
import { defineReactPresentation } from '../presentation';

import { commentPlugins } from './comment';
import { NOT_CREATABLE, type ShippedProfile } from './parts';

/** The units of the Document profile's features. */
export const documentPlugins: readonly RichTextPlugin[] = [
    ...commentPlugins,
    subscriptPlugin(),
    superscriptPlugin(),
    headingPlugin(),
    rulePlugin(),
    mediaImagePlugin(),
    mediaUploadPlugin(),
    outlinePlugin(),
    formatClearPlugin(),
    contentChecksPlugin(),
] as const;

/** The default toolbar groups of the Document profile; a group keeps only the commands the definition installs. */
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
    ['image.insert', 'rule.insert', 'mention.search.open', 'emoji.picker.open'],
    ['checks.open', 'outline.toggle'],
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
            plugins: documentPlugins,
        },
        'document',
    ),
    presentation: PRESENTATION,
});
