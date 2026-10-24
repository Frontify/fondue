/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useState } from 'react';

import { type EditorApi } from '#/bridge/plugin';
import { type HrefPolicy } from '#/model';

import { type Destination, destinationsOf } from './destination';
import { type LinkPopoverStrings, type LinkSearch } from './link-popover-model';

// As the mention list waits, so one search runs once the author pauses.
const SEARCH_DELAY_MS = 200;

/** The destinations matching what was typed and the active one, which the editor's live region also says. */
export const useDestinationSearch = (
    api: EditorApi | undefined,
    search: LinkSearch | undefined,
    policy: HrefPolicy | undefined,
    query: string,
    typed: boolean,
    strings: LinkPopoverStrings,
) => {
    // The results of the last finished search, with the query they answer, so a changed query shows none of them.
    const [found, setFound] = useState<{ readonly query: string; readonly items: readonly Destination[] }>({
        query: '',
        items: [],
    });
    const [index, setIndex] = useState(0);
    const results = typed && found.query === query ? found.items : [];
    useEffect(() => {
        if (search === undefined || !typed || query === '') {
            return undefined;
        }
        const controller = new AbortController();
        const lookUp = async () => {
            let items: readonly Destination[] = [];
            try {
                const found = await search.service.search(query, search.resourceTypes, controller.signal, null);
                items = destinationsOf(found.items, policy);
            } catch {
                items = [];
            }
            if (!controller.signal.aborted) {
                setFound({ query, items });
                setIndex(0);
            }
        };
        const timer = setTimeout(() => {
            lookUp().catch(() => undefined);
        }, SEARCH_DELAY_MS);
        return () => {
            clearTimeout(timer);
            controller.abort();
        };
    }, [search, typed, query, policy]);
    // The field names the active destination with `aria-activedescendant`, which a screen reader does not follow to a
    // list outside the field, so the editor's live region says it too.
    let spoken = '';
    const activeResult = results[index];
    if (activeResult !== undefined) {
        spoken = strings.result(activeResult.label, index + 1, results.length);
    }
    useEffect(() => {
        if (spoken !== '') {
            api?.announce(spoken);
        }
    }, [api, spoken]);
    return [results, index, setIndex] as const;
};
