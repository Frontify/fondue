/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReferenceQuery, type SuggestionHost } from './host';
import { type ReferenceResults } from './references';

/** How long a typed reference query waits for the next keystroke before the host is asked. */
export const SEARCH_DELAY_MS = 200;

/** One page to ask for: a typed query's first page waits for the next keystroke; a further page and a retry do not. */
export interface ReferenceAsk extends Omit<ReferenceQuery, 'key'> {
    readonly waits: boolean;
}

/**
 * The reference search of one interaction, the `@` list or the mention search dialog: each ask replaces the one before,
 * after `SEARCH_DELAY_MS` for a typed query, and `receive` gets its page, or `undefined` when it failed or the host
 * passes no service. Its key keeps it apart from the other interaction's search.
 */
export interface ReferenceSearch {
    ask(request: ReferenceAsk, receive: (results: ReferenceResults | undefined) => void): void;
    /** Drops the waiting ask and aborts the running one, whose page then never arrives. */
    cancel(): void;
}

export const createReferenceSearch = (
    hostOf: () => Pick<SuggestionHost, 'searchReferences'> | undefined,
    key: string,
): ReferenceSearch => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    let abort: (() => void) | undefined;
    const cancel = () => {
        clearTimeout(timer);
        timer = undefined;
        abort?.();
        abort = undefined;
    };
    return {
        ask: ({ waits, ...query }, receive) => {
            cancel();
            const start = () => {
                timer = undefined;
                abort = hostOf()?.searchReferences({ ...query, key }, receive);
                if (abort === undefined) {
                    receive(undefined);
                }
            };
            if (waits) {
                timer = setTimeout(start, SEARCH_DELAY_MS);
                return;
            }
            start();
        },
        cancel,
    };
};
