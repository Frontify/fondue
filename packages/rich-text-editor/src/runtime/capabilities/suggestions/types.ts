/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EngineSuggestion } from '#/runtime/definition';

import { type ActiveSuggestion, type SuggestionItem } from '../../portTypes';

import { type ReferenceResults } from './references';

export type { ActiveSuggestion, SuggestionItem };

export type SuggestionsState = {
    active: ActiveSuggestion | null;
    /** The trigger position whose list Escape closed, which stays closed until its text no longer matches. */
    dismissed: number | null;
    /** Counts requests across lists. */
    requests: number;
};

export type SuggestionsMeta =
    | {
          kind: 'results';
          request: number;
          results: ReferenceResults;
      }
    | { kind: 'failed'; request: number }
    | { kind: 'move'; index: number }
    | { kind: 'more'; cursor: string }
    | { kind: 'retry' }
    | { kind: 'dismiss' }
    | { kind: 'close' };

export type Match = {
    suggestion: EngineSuggestion;
    from: number;
    to: number;
    query: string;
};
