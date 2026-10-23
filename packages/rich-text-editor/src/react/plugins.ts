/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type CommandsOfPlugin, type EditorPlugin } from '#/bridge/plugin';
import { headingEditor } from '#/features/blocks-heading/editor';
import { quoteEditor } from '#/features/blocks-quote/editor';
import { coreEditor } from '#/features/core/editor';
import { inputRulesEditor } from '#/features/input-rules/editor';
import { boldEditor } from '#/features/marks-bold/editor';
import { codeEditor } from '#/features/marks-code/editor';
import { italicEditor } from '#/features/marks-italic/editor';
import { strikeEditor } from '#/features/marks-strike/editor';
import { subscriptEditor } from '#/features/marks-subscript/editor';
import { superscriptEditor } from '#/features/marks-superscript/editor';
import { underlineEditor } from '#/features/marks-underline/editor';

const SHIPPED = [
    coreEditor,
    boldEditor,
    italicEditor,
    underlineEditor,
    strikeEditor,
    codeEditor,
    subscriptEditor,
    superscriptEditor,
    headingEditor,
    quoteEditor,
    inputRulesEditor,
] as const;

/** The editor parts of the shipped features by feature ID; a host's own plugin for a feature extends its entry. */
export const SHIPPED_PLUGINS: Readonly<Record<string, EditorPlugin>> = Object.fromEntries(
    SHIPPED.map((plugin) => [plugin.feature, plugin]),
);

type ShippedOf<Id extends string> = Extract<(typeof SHIPPED)[number], { readonly feature: Id }>;

/** The command payloads of the shipped editor part of feature `Id`, none for another feature. */
export type ShippedPluginCommands<Id extends string> = string extends Id
    ? object
    : [ShippedOf<Id>] extends [never]
      ? object
      : CommandsOfPlugin<ShippedOf<Id>>;
