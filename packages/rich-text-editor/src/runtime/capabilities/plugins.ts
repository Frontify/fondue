/* (c) Copyright Frontify Ltd., all rights reserved. */

import { gapCursor } from 'prosemirror-gapcursor';
import { Plugin, PluginKey } from 'prosemirror-state';

import {
    BASE_KEYS_PLUGIN,
    BLOCK_DECORATIONS_PLUGIN,
    CONTENT_ISSUES_PLUGIN,
    CONTAINER_KEYS_PLUGIN,
    GAP_CURSOR_PLUGIN,
    HISTORY_PLUGIN,
    INPUT_RULES_PLUGIN,
    LAST_MARK_PLUGIN,
    SUGGESTIONS_PLUGIN,
} from '#/model/internal';
import { type EngineImplementations } from '#/runtime/definition';

import { blockDecorationsPlugin } from '../decorations';
import { historyPlugin } from '../history';
import { enterRules, inputRulesPlugin, undoInputRule } from '../inputRules';
import { baseKeysPlugin, containerKeysPlugin } from '../keys';

import { contentIssuesPlugin } from './checks/contentIssues';
import { lastMarkPlugin } from './markSet';
import { suggestionsPlugin } from './suggestions/plugin';

/** The package plugins the runtime builds, by plugin ID. */
export const RUNTIME_PLUGINS: EngineImplementations = {
    plugins: {
        [LAST_MARK_PLUGIN.id]: lastMarkPlugin,
        // Backspace right after a rule fired undoes it before any list or block key sees it.
        [HISTORY_PLUGIN.id]: ({ inputRules }) =>
            historyPlugin({ Backspace: undoInputRule, Enter: enterRules(inputRules) }),
        [INPUT_RULES_PLUGIN.id]: inputRulesPlugin,
        [CONTAINER_KEYS_PLUGIN.id]: containerKeysPlugin,
        [BASE_KEYS_PLUGIN.id]: baseKeysPlugin,
        [BLOCK_DECORATIONS_PLUGIN.id]: blockDecorationsPlugin,
        [CONTENT_ISSUES_PLUGIN.id]: contentIssuesPlugin,
        // Keyed by its plugin ID, as every package plugin is; `gapCursor()` itself carries no key.
        [GAP_CURSOR_PLUGIN.id]: () =>
            new Plugin({ key: new PluginKey(GAP_CURSOR_PLUGIN.id), props: gapCursor().props }),
        [SUGGESTIONS_PLUGIN.id]: suggestionsPlugin,
    },
};
