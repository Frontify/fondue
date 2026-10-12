/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorView } from 'prosemirror-view';

import { type JsonObject } from '#/model';

import { type CommandResult } from '../types';

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
}

/** The host of each attached view, read by the plugin, which is built once per definition and shared by sessions. */
export const suggestionHosts = new WeakMap<EditorView, SuggestionHost>();
