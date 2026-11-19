/* (c) Copyright Frontify Ltd., all rights reserved. */

const peopleCount = (count: number): string => {
    if (count === 1) {
        return '1 person';
    }
    return `${count} people`;
};

/** Every word the Mention plugin says, visibly or to assistive technology. */
export const MENTION_STRINGS = Object.freeze({
    unknownPerson: 'Unknown person',
    unknownGroup: 'Unknown group',
    unknownMention: 'Unknown mention',
    /** The text box where the query is typed. */
    input: 'Mention someone',
    /** The list of people. */
    list: 'People',
    /** Shown, not announced, while a search takes long. */
    searching: 'Searching',
    noMatches: 'No matches',
    failed: 'Could not load people.',
    retry: 'Retry',
    /** Announced when people are listed. */
    peopleCount,
});
