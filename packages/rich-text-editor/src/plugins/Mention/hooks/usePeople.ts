/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useState } from 'react';

import { type MentionItem, type MentionItems } from '../types';

/** How many people the picker offers at once. */
const SUGGESTION_LIMIT = 8;

/**
 * The answer to one query.
 */
type Answer = { query: string; people: readonly MentionItem[]; failed: boolean };

export type UsePeopleResult = {
    people: readonly MentionItem[];
    pending: boolean;
    failed: boolean;
    retry: () => void;
};

/**
 * The people for a query. Answers are tagged with their query so a slow one
 * never overwrites a newer one; the last answer stays up while `pending`, so a
 * server-backed list does not flicker on every key. A failed lookup offers
 * nobody rather than leaving the last list up, and `retry` asks again.
 */
export const usePeople = (items: MentionItems, query: string): UsePeopleResult => {
    const [answer, setAnswer] = useState<Answer | null>(null);
    const [attempt, setAttempt] = useState(0);

    useEffect(() => {
        let current = true;
        const settle = (people: readonly MentionItem[], failed: boolean): void => {
            if (current) {
                setAnswer({ query, people: people.slice(0, SUGGESTION_LIMIT), failed });
            }
        };
        Promise.resolve(items(query))
            .then((people) => settle(people, false))
            .catch(() => settle([], true));
        return () => {
            current = false;
        };
    }, [items, query, attempt]);

    const retry = (): void => {
        setAnswer(null);
        setAttempt((previous) => previous + 1);
    };

    return {
        people: answer?.people ?? [],
        pending: answer?.query !== query,
        failed: answer?.query === query && answer.failed,
        retry,
    };
};
