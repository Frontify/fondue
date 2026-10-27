/* (c) Copyright Frontify Ltd., all rights reserved. */

/** The strings of a plugin in one locale: exactly the keys of its `enUS` table, so a missing key is a type error. */
export type PluginStrings<English extends Record<string, string>> = Record<keyof English, string>;
