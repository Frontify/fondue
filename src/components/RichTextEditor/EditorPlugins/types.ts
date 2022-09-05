/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EditorPlugin } from './Plugins/EditorPlugin';

export const BOLD = 'bold';
export const ITALIC = 'italic';
export const UNDERLINE = 'underline';
export const STRIKETHROUGH = 'strike_trough';
export type Plugins = typeof BOLD | typeof ITALIC | typeof UNDERLINE | typeof STRIKETHROUGH;

export type Unknown = unknown;
export type ObjectType<T extends Unknown> = Record<string, T>;
export type UnknownObject = ObjectType<unknown>;

export type AllPluginsType = {
    [K in Plugins]: EditorPlugin;
};
