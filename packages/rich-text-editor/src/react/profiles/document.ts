/* (c) Copyright Frontify Ltd., all rights reserved. */

import { extendPlugin, type RichTextPlugin } from '#/bridge/definePlugin';
import { type CommandRef } from '#/model';
import { contentChecksPlugin } from '#/plugins/ContentChecks';
import { headingPlugin } from '#/plugins/Heading';
import { imagePlugin } from '#/plugins/Image';
import { outlinePlugin } from '#/plugins/Outline';
import { documentModel } from '#/plugins/profiles/document';
import { resetFormattingPlugin } from '#/plugins/ResetFormatting';
import { rulePlugin } from '#/plugins/Rule';
import { subscriptPlugin } from '#/plugins/Subscript';
import { superscriptPlugin } from '#/plugins/Superscript';
import { uploadPlugin } from '#/plugins/Upload';

import { compileEditor } from '../compileEditor';
import { defineReactPresentation } from '../presentation';

import { commentPlugins } from './comment';
import { NOT_CREATABLE, type ShippedProfile } from './parts';
import { slashMenu } from './slashMenu';

/** The units of the Document profile's features. */
export const documentPlugins: readonly RichTextPlugin[] = [
    ...commentPlugins,
    subscriptPlugin(),
    superscriptPlugin(),
    headingPlugin(),
    rulePlugin(),
    imagePlugin(),
    uploadPlugin(),
    outlinePlugin(),
    resetFormattingPlugin(),
    contentChecksPlugin(),
] as const;

/** `plugins` with the core unit extended by the `/` list of the block conversions and inserts the other units offer, which the stored model does not see. */
export const withSlashMenu = (plugins: readonly RichTextPlugin[]): readonly RichTextPlugin[] =>
    plugins.map((unit) => {
        if (unit.id !== 'core') {
            return unit;
        }

        return extendPlugin(unit, slashMenu(plugins));
    });

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
            plugins: withSlashMenu(documentPlugins),
        },
        'document',
    ),
    presentation: PRESENTATION,
});
