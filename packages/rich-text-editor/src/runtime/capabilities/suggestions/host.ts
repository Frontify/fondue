/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorView } from 'prosemirror-view';

import { type JsonObject } from '#/model';

import { type CommandResult } from '../../types';

/** One search of a suggestion list: the list's key, whose newer search supersedes it, its feature and command, and the call. */
export type SuggestionSearch<T> = {
    readonly key: string;
    readonly featureId: string;
    readonly command: string;
    readonly run: (signal: AbortSignal) => Promise<T>;
};

/** What the suggestion plugin asks of the session that owns a view, which the runtime registers when it attaches one. */
export type SuggestionHost = {
    /** Whether the authoring policy lets the author create content with `featureId`, without which its lists stay closed, as its toolbar entries hide. */
    readonly creates: (featureId: string) => boolean;
    /** Replaces `from` to `to` with the result of `command`, through the session's command checks, as one undo step. */
    readonly accept: (
        range: { readonly from: number; readonly to: number },
        command: string,
        payload: JsonObject,
    ) => CommandResult;
    /** What the editor layer hands plugins, which a list's search reads the session's API through. */
    readonly commandHost: unknown;
    /** Runs `search` as one operation of the session's async coordinator and hands `receive` what it resolved; returns what aborts it. */
    readonly search: <T>(search: SuggestionSearch<T>, receive: (result: T) => void) => () => void;
};

/** The host of each attached view, read by the plugin, which is built once per definition and shared by sessions. */
export const suggestionHosts = new WeakMap<EditorView, SuggestionHost>();
