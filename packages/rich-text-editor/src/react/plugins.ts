/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type CommandsOfPlugin, type EditorPlugin } from '#/bridge/plugin';
import { coreEditor } from '#/features/core/editor';
import { boldEditor } from '#/features/marks-bold/editor';

const SHIPPED = [coreEditor, boldEditor] as const;

/** The editor parts of the shipped features by feature ID; a host's own plugin for a feature replaces its entry. */
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
