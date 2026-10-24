/* (c) Copyright Frontify Ltd., all rights reserved. */

import { extendPlugin, type RichTextPlugin } from '#/bridge/define-plugin';
import { alignPlugin } from '#/features/blocks-align';
import { corePlugin } from '#/features/core';
import { inputRulesPlugin } from '#/features/input-rules';
import { linksPlugin } from '#/features/links';
import { boldPlugin } from '#/features/marks-bold';
import { fontColorPlugin } from '#/features/marks-font-color';
import { italicPlugin } from '#/features/marks-italic';
import { languagePlugin } from '#/features/marks-language';
import { underlinePlugin } from '#/features/marks-underline';
import { inlineModel } from '#/features/profiles/inline';

import { compileEditor } from '../compile-editor';
import { defineReactPresentation } from '../presentation';

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
    linksPlugin(),
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
