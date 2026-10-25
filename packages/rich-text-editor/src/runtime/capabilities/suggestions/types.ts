/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EngineSuggestion } from '#/definition';
import { type JsonObject } from '#/model';

import { type ReferenceResults } from './references';

/** One option of a suggestion list. */
export interface SuggestionItem {
    /** Unique within one result list. */
    readonly key: string;
    readonly label: string;
    /** What the option shows before its label, such as the emoji itself. */
    readonly glyph: string | null;
    /** What the list's command receives when the option is accepted. */
    readonly payload: JsonObject;
    /** What the option shows after its label, such as a mention's resource type. */
    readonly detail?: string;
    /** An image that passed `checkHref`, such as an avatar. */
    readonly imageUrl?: string;
    /** The icon an option shows without an image. */
    readonly kind?: 'user' | 'group' | 'everyone';
    /** An option that asks again instead of running the command: the next page, or the failed page once more. */
    readonly action?: 'more' | 'retry';
    /** The cursor of the page a `more` option asks for. */
    readonly cursor?: string;
}

/** The open suggestion list: what was typed, the range an accepted option replaces, and the options so far. */
export interface ActiveSuggestion {
    /** The feature that declares the list. */
    readonly featureId: string;
    readonly trigger: string;
    /** The list's accessible name: a package string key, or translations by language tag. */
    readonly name: string | Readonly<Record<string, string>>;
    readonly command: string;
    /** The trigger's start. */
    readonly from: number;
    /** The caret, at the end of the query. */
    readonly to: number;
    readonly query: string;
    /** `loading` keeps the previous query's options shown until the new ones arrive. */
    readonly status: 'loading' | 'ready' | 'failed';
    readonly items: readonly SuggestionItem[];
    /** The active option, which Enter and Tab accept. */
    readonly index: number;
    /** The request the current options answer, so a late result for an older query is dropped. */
    readonly request: number;
    /** The cursor of the page the request asks for, `null` for a query's first page. */
    readonly page: string | null;
}

export interface SuggestionsState {
    readonly active: ActiveSuggestion | null;
    /** The trigger position whose list Escape closed, which stays closed until its text no longer matches. */
    readonly dismissed: number | null;
    /** Counts requests across lists. */
    readonly requests: number;
}

export type SuggestionsMeta =
    | {
          readonly kind: 'results';
          readonly request: number;
          readonly results: ReferenceResults;
      }
    | { readonly kind: 'failed'; readonly request: number }
    | { readonly kind: 'move'; readonly index: number }
    | { readonly kind: 'more'; readonly cursor: string }
    | { readonly kind: 'retry' }
    | { readonly kind: 'dismiss' }
    | { readonly kind: 'close' };

export interface Match {
    readonly suggestion: EngineSuggestion;
    readonly from: number;
    readonly to: number;
    readonly query: string;
}
