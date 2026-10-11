/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorView } from 'prosemirror-view';

import { type JsonObject } from '#/model';

import { type CommandResult } from '../types';

import { type ReferenceResults } from './references';

/**
 * One page of a reference search: the interaction it belongs to, whose newer page supersedes it, the list's feature and
 * command, its query, and the cursor of the page, `null` for the first.
 */
export interface ReferenceQuery {
    readonly key: string;
    readonly featureId: string;
    readonly command: string;
    readonly query: string;
    readonly cursor: string | null;
}

/** What the suggestion plugin asks of the session that owns a view, which the runtime registers when it attaches one. */
export interface SuggestionHost {
    /** The editor's locale, such as `de-CH`, which picks a source's data. */
    readonly locale: () => string;
    /** Whether the authoring policy lets the author create content with `featureId`, without which its lists stay closed, as its toolbar entries hide. */
    readonly creates: (featureId: string) => boolean;
    /** Replaces `from` to `to` with the result of `command`, through the session's command checks, as one undo step. */
    readonly accept: (
        range: { readonly from: number; readonly to: number },
        command: string,
        payload: JsonObject,
    ) => CommandResult;
    /** Whether the host passes a `ReferenceService`, without which a reference list stays closed. */
    readonly searchesReferences: () => boolean;
    /**
     * Asks the host's `ReferenceService` for one page through the session's async coordinator, with the feature's
     * `resourceTypes`, and hands `receive` the options it keeps, or `undefined` when the call failed. Returns what
     * aborts the call, or `undefined` when the host passes no service.
     */
    readonly searchReferences: (
        query: ReferenceQuery,
        receive: (results: ReferenceResults | undefined) => void,
    ) => (() => void) | undefined;
}

/** The host of each attached view, read by the plugin, which is built once per definition and shared by sessions. */
export const suggestionHosts = new WeakMap<EditorView, SuggestionHost>();
