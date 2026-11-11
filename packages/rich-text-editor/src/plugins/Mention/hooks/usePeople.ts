/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useState } from 'react';

import { type MentionItem, type MentionItems } from '../types';

/** How many people the picker offers at once. */
const SUGGESTION_LIMIT = 8;

/**
 * How a lookup ended: the people found, or a failure.
 */
export type PeopleOutcome = { status: 'found'; people: readonly MentionItem[] } | { status: 'failed' };

/**
 * The outcome of one lookup, tagged with the query and attempt it answers.
 */
type Answer = { query: string; attempt: number; outcome: PeopleOutcome };

export type UsePeopleResult = {
    /**
     * The latest outcome, kept while a newer lookup is pending; `null` before the first.
     */
    outcome: PeopleOutcome | null;
    pending: boolean;
    retry: () => void;
};

/**
 * The people for a query. Answers are tagged with their query and attempt so a
 * slow one never overwrites a newer one; the last outcome stays up while
 * `pending`, so a server-backed list does not flicker on every key. A failed
 * lookup offers nobody rather than leaving the last list up, and `retry` asks
 * again.
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
        Promise.resolve(items(query))
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
        pending: answer === null || answer.query !== query || answer.attempt !== attempt,
        retry,
    };
};
