/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MentionContentLabels } from '../helpers/labels';

/** What the list of people says while a mention is being made. */
export type MentionPickerLabels = {
    /**
     * Name of the text box where the query is typed
     * @default 'Mention someone'
     */
    input: string;
    /**
     * Name of the list of people
     * @default 'People'
     */
    list: string;
    /**
     * Shown, not announced, while a search takes long
     * @default 'Searching'
     */
    searching: string;
    /**
     * Shown and announced when nobody matches the query
     * @default 'No matches'
     */
    noMatches: string;
    /**
     * Shown and announced when the search failed
     * @default 'Could not load people.'
     */
    failed: string;
    /**
     * The button that asks again after a failed search
     * @default 'Retry'
     */
    retry: string;
    /**
     * Announced when people are listed, with how many
     * @default (count) => (count === 1 ? '1 person' : `${count} people`)
     */
    peopleCount: (count: number) => string;
};

/** Every word a mention and its list of people say. */
export type MentionLabels = MentionContentLabels & MentionPickerLabels;

const peopleCount = (count: number): string => {
    if (count === 1) {
        return '1 person';
    }
    return `${count} people`;
};

export const DEFAULT_MENTION_PICKER_LABELS: MentionPickerLabels = {
    input: 'Mention someone',
    list: 'People',
    searching: 'Searching',
    noMatches: 'No matches',
    failed: 'Could not load people.',
    retry: 'Retry',
    peopleCount,
};
