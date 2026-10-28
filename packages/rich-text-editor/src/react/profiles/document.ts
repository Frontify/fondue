/* (c) Copyright Frontify Ltd., all rights reserved. */

import { extendPlugin, type RichTextPlugin } from '#/bridge/pluginApi/definePlugin';
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

import { compileEditor } from '../compile/compileEditor';
import { defineReactPresentation } from '../compile/presentation';

import { commentPlugins } from './comment';
import { NOT_CREATABLE, type ShippedProfile } from './parts';
import { slashMenu } from './slashMenu';

/** The plugins of the Document profile's features. */
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

/** `plugins` with the core plugin extended by the `/` list of the block conversions and inserts the other plugins offer, which the stored model does not see. */
export const withSlashMenu = (plugins: readonly RichTextPlugin[]): readonly RichTextPlugin[] =>
    plugins.map((plugin) => {
        if (plugin.id !== 'core') {
            return plugin;
        }

        return extendPlugin(plugin, slashMenu(plugins));
    });

const PRESENTATION = defineReactPresentation({});

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
