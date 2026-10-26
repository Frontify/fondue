/* (c) Copyright Frontify Ltd., all rights reserved. */

import { extendPlugin, type RichTextPlugin } from '#/bridge/pluginApi/definePlugin';
import { alignPlugin } from '#/plugins/Align';
import { boldPlugin } from '#/plugins/Bold';
import { corePlugin } from '#/plugins/Core';
import { fontColorPlugin } from '#/plugins/FontColor';
import { inputRulesPlugin } from '#/plugins/InputRules';
import { italicPlugin } from '#/plugins/Italic';
import { languagePlugin } from '#/plugins/Language';
import { linkPlugin } from '#/plugins/Link';
import { inlineModel } from '#/plugins/profiles/inline';
import { underlinePlugin } from '#/plugins/Underline';

import { compileEditor } from '../compile/compileEditor';
import { defineReactPresentation } from '../compile/presentation';

import { NOT_CREATABLE, type ShippedProfile } from './parts';

// A single-line field keeps one paragraph: Shift+Enter acts as Enter and no block moves.
const LINE_ONLY = new Set(['Shift-Enter', 'Mod-Alt-ArrowUp', 'Mod-Alt-ArrowDown']);
const core = corePlugin();
const lineKeys = Object.fromEntries(Object.entries(core.editor.keys ?? {}).filter(([key]) => !LINE_ONLY.has(key)));

/** The units of the Inline profile's features. */
export const inlinePlugins: readonly RichTextPlugin[] = [
    extendPlugin(core, { keys: lineKeys }),
    boldPlugin(),
    italicPlugin(),
    underlinePlugin(),
    linkPlugin(),
    fontColorPlugin(),
    languagePlugin(),
    alignPlugin(),
    inputRulesPlugin(),
] as const;

const GROUPS = [['mark.bold.toggle', 'mark.italic.toggle'], ['link.edit']];
const PRESENTATION = defineReactPresentation({ toolbar: GROUPS });
const TOUCH_PRESENTATION = defineReactPresentation({ toolbar: [['history.undo', 'history.redo'], ...GROUPS] });

/** The profile's definition and default presentation, compiled once by the loader. */
export const shipped = (): ShippedProfile => ({
    definition: compileEditor(
        {
            id: 'frontify.inline',
            model: inlineModel,
            policy: {
                features: {
                    'marks.font-color': NOT_CREATABLE,
                    'marks.language': NOT_CREATABLE,
                    'blocks.align': NOT_CREATABLE,
                    'input-rules': NOT_CREATABLE,
                },
                enterBehavior: 'submit',
            },
            plugins: inlinePlugins,
        },
        'inline',
    ),
    presentation: PRESENTATION,
    touchPresentation: TOUCH_PRESENTATION,
});
