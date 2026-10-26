/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EngineSuggestion } from '#/definition';

import { type ActiveSuggestion, type SuggestionItem } from '../../portTypes';

import { type ReferenceResults } from './references';

export type { ActiveSuggestion, SuggestionItem };

export type SuggestionsState = {
    readonly active: ActiveSuggestion | null;
    /** The trigger position whose list Escape closed, which stays closed until its text no longer matches. */
    readonly dismissed: number | null;
    /** Counts requests across lists. */
    readonly requests: number;
};

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

export type Match = {
    readonly suggestion: EngineSuggestion;
    readonly from: number;
    readonly to: number;
    readonly query: string;
};
