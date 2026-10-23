/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorPlugin } from '#/bridge/plugin';
import { alignEditor } from '#/features/blocks-align/editor';
import { coreEditor } from '#/features/core/editor';
import { inputRulesEditor } from '#/features/input-rules/editor';
import { linksEditor } from '#/features/links/editor';
import { linkReader } from '#/features/links/reader';
import { boldEditor } from '#/features/marks-bold/editor';
import { fontColorEditor } from '#/features/marks-font-color/editor';
import { italicEditor } from '#/features/marks-italic/editor';
import { languageEditor } from '#/features/marks-language/editor';
import { underlineEditor } from '#/features/marks-underline/editor';
import { inlineModel } from '#/features/profiles/inline';

import { compileEditor } from '../compile-editor';
import { defineReactPresentation } from '../presentation';

import { NOT_CREATABLE, partsOf, type ShippedProfile } from './parts';

// A single-line field keeps one paragraph: Shift+Enter acts as Enter (Key precedence row 4) and no block moves.
const LINE_ONLY = new Set(['Shift-Enter', 'Mod-Alt-ArrowUp', 'Mod-Alt-ArrowDown']);
const lineKeys = Object.fromEntries(Object.entries(coreEditor.keys ?? {}).filter(([key]) => !LINE_ONLY.has(key)));

/** The editor parts of the Inline profile's features. */
export const inlineParts: readonly EditorPlugin[] = [
    Object.freeze({ ...coreEditor, keys: lineKeys }),
    boldEditor,
    italicEditor,
    underlineEditor,
    linksEditor,
    fontColorEditor,
    languageEditor,
    alignEditor,
    inputRulesEditor,
] as const;

/** The reader overrides of the Inline profile's features. */
export const inlineReaders = { links: linkReader };

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
        },
        partsOf(inlineParts),
        inlineReaders,
        'inline',
    ),
    presentation: PRESENTATION,
    touchPresentation: TOUCH_PRESENTATION,
});
