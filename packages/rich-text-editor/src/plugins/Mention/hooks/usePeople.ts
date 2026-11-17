/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useState } from 'react';

import { type MentionItem, type MentionItems } from '../types';

/** How many people the picker offers at once. */
const SUGGESTION_LIMIT = 8;

export type PeopleOutcome = { status: 'found'; people: readonly MentionItem[] } | { status: 'failed' };

type Answer = { query: string; attempt: number; outcome: PeopleOutcome };

/** `asking` is a lookup for a query with no answer yet; `retrying` asks again for the query that was answered. */
export type PeopleLookup = 'settled' | 'asking' | 'retrying';

const lookupOf = (answer: Answer | null, query: string, attempt: number): PeopleLookup => {
    if (answer === null || answer.query !== query) {
        return 'asking';
    }
    if (answer.attempt !== attempt) {
        return 'retrying';
    }
    return 'settled';
};

export type UsePeopleResult = {
    /**
     * The latest outcome, kept while a newer lookup runs; `null` before the first.
     */
    outcome: PeopleOutcome | null;
    lookup: PeopleLookup;
    retry: () => void;
};

/**
 * The people for a query. Answers are tagged with query and attempt so a slow one never overwrites a newer one; the
 * last outcome stays up while a lookup runs, so a server-backed list does not flicker on every key. `retry` asks again.
 */
export const usePeople = (items: MentionItems, query: string): UsePeopleResult => {
    const [answer, setAnswer] = useState<Answer | null>(null);
    const [attempt, setAttempt] = useState(0);

    useEffect(() => {
        let current = true;
        const settle = (outcome: PeopleOutcome): void => {
            if (current) {
                setAnswer({ query, attempt, outcome });
            }
        };
        // Called inside `then`, so a lookup that throws at once fails like one that rejects.
        Promise.resolve()
            .then(() => items(query))
            .then((people) => settle({ status: 'found', people: people.slice(0, SUGGESTION_LIMIT) }))
            .catch(() => settle({ status: 'failed' }));
        return () => {
            current = false;
        };
    }, [items, query, attempt]);

    const retry = (): void => {
        setAttempt((previous) => previous + 1);
    };

    return {
        outcome: answer?.outcome ?? null,
        lookup: lookupOf(answer, query, attempt),
        retry,
    };
};
