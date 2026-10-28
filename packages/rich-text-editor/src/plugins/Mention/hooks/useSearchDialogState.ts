/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type CompositionEvent, useEffect, useId, useMemo, useRef, useState } from 'react';

import { suggestionOptionId, useEditorDialog } from '#/bridge/pluginApi/define';
import { type EditorApi, type SelectionHandle, useClientLayoutEffect } from '#/bridge/pluginApi/plugin';

import { mentionActions } from '../helpers/mentionActions';
import {
    afterFailure,
    afterPage,
    listOption,
    type ReferenceListStrings,
    referenceListStrings,
    type ResultItem,
    resultOf,
    type ResultPage,
    resultsOf,
    spokenOption,
} from '../helpers/results';

// As the mention list waits, so one search runs once the author pauses.
const SEARCH_DELAY_MS = 200;
// As the mention list shows its spinner.
const SPINNER_DELAY_MS = 300;

/** The mention search dialog's strings, in the UI locale. */
type MentionSearchStrings = {
    title: string;
    search: string;
    cancel: string;
} & ReferenceListStrings;

/** One ask of the host: its query and page, and whether it waits for the next keystroke first. */
type Ask = {
    query: string;
    page: string | null;
    waits: boolean;
};

type Found = {
    status: 'loading' | 'ready' | 'failed';
    items: readonly ResultItem[];
    /** Counts the answered asks, so each answer is announced, a repeated one too. */
    answers: number;
};

/** The dialog's strings from the chrome's `translate`. */
const mentionSearchStrings = (translate: EditorApi['translate']): MentionSearchStrings => ({
    ...referenceListStrings(translate),
    title: translate('RichTextEditor_mention'),
    search: translate('RichTextEditor_mentionSearch'),
    cancel: translate('RichTextEditor_cancel'),
});

/** What the list says about its answer: the failure, the result count, or that there are none. */
const statusOf = (found: Found, strings: MentionSearchStrings): string => {
    if (found.status === 'failed') {
        return strings.failed;
    }

    const count = resultsOf(found.items).length;

    if (count === 0) {
        return strings.noResults;
    }

    return strings.results(count);
};

// The mention goes where the selection was when the dialog opened, mapped through every change since.
const useInsertTarget = (targets: EditorApi['targets']) => {
    const targetRef = useRef<SelectionHandle | null>(null);
    useEffect(() => {
        const captured = targets.capture(undefined, { purpose: 'insert', onIntersectingEdit: 'map' });
        if (captured === undefined) {
            return undefined;
        }

        targetRef.current = captured;

        return () => {
            targetRef.current = null;
            targets.release(captured);
        };
    }, [targets]);

    return targetRef;
};

const useSearchResults = (services: EditorApi['services'], resourceTypes: readonly string[]) => {
    const [ask, setAsk] = useState<Ask>({ query: '', page: null, waits: true });
    const [found, setFound] = useState<Found>({ status: 'loading', items: [], answers: 0 });
    const [slow, setSlow] = useState(false);
    const [index, setIndex] = useState(0);
    const itemsRef = useRef(found.items);
    useClientLayoutEffect(() => {
        itemsRef.current = found.items;
    });
    useEffect(() => {
        let current = true;
        const controller = new AbortController();
        const receive = (results: ResultPage | undefined) => {
            if (!current) {
                return;
            }

            let shown: readonly ResultItem[] = [];
            if (ask.page !== null) {
                shown = resultsOf(itemsRef.current);
            }

            let items = afterFailure(shown);
            if (results !== undefined) {
                items = afterPage(shown, results);
            }

            // The first new option, or the last one when the page added none, so Enter takes the option announced.
            setIndex(Math.max(0, Math.min(shown.length, items.length - 1)));
            let status: Found['status'] = 'ready';
            if (results === undefined) {
                status = 'failed';
            }

            setFound((previous) => ({
                status,
                items,
                answers: previous.answers + 1,
            }));
        };

        const load = () => {
            const service = services.references();
            if (service === undefined) {
                receive(undefined);

                return;
            }

            service
                .search(ask.query, resourceTypes, controller.signal, ask.page)
                .then((page) => receive({ items: page.items.map(resultOf), nextCursor: page.nextCursor }))
                .catch(() => receive(undefined));
        };

        let timer: ReturnType<typeof setTimeout> | undefined;
        if (ask.waits) {
            timer = setTimeout(load, SEARCH_DELAY_MS);
        } else {
            load();
        }

        const spinner = setTimeout(() => setSlow(true), SPINNER_DELAY_MS);

        return () => {
            current = false;
            clearTimeout(timer);
            clearTimeout(spinner);
            setSlow(false);
            controller.abort();
        };
    }, [services, resourceTypes, ask]);

    /** Asks again for the same query: the page a Load more option names, or the page that failed. */
    const askAgain = (page: string | null) => {
        setFound({ status: 'loading', items: resultsOf(found.items), answers: found.answers });
        setAsk({ query: ask.query, page, waits: false });
    };

    const searchFor = (query: string) => {
        setFound({ status: 'loading', items: resultsOf(found.items), answers: found.answers });
        setAsk({ query, page: null, waits: true });
        setIndex(0);
    };

    return { ask, found, slow, index, setIndex, askAgain, searchFor };
};

// Each answer says its status and the option Enter takes; an arrow says the option it lands on.
const useAnnouncements = (
    found: Found,
    shownIndex: number,
    strings: MentionSearchStrings,
    announce: (message: string) => void,
) => {
    const spokenRef = useRef<{
        answers: number;
        status: Found['status'];
        key: string | undefined;
    } | null>(null);
    useEffect(() => {
        const item = found.items[shownIndex];
        const spoken = spokenOption(found.items, shownIndex, strings);
        const last = spokenRef.current;
        spokenRef.current = { answers: found.answers, status: found.status, key: item?.key };
        if (found.status === 'loading') {
            // Arrows still move over the options a newer query keeps, but the start of the load says nothing.
            if (
                last !== null &&
                last.status === 'loading' &&
                last.answers === found.answers &&
                last.key !== item?.key
            ) {
                if (spoken !== undefined) {
                    announce(spoken);
                }
            }

            return;
        }

        if (last === null || last.answers !== found.answers) {
            const status = statusOf(found, strings);
            if (spoken === undefined) {
                announce(status);
            } else {
                announce(strings.both(status, spoken));
            }

            return;
        }

        if (spoken !== undefined && last.key !== item?.key) {
            announce(spoken);
        }
    }, [announce, found, shownIndex, strings]);
};

/** The mention search dialog's state, effects and handlers, for the views to show. */
export const useSearchDialogState = (
    api: EditorApi,
    resourceTypes: readonly string[],
    opener: Element | null,
    onClose: () => void,
) => {
    const strings = mentionSearchStrings(api.translate);
    const { targets, services } = api;
    const dialog = useEditorDialog(opener, onClose);
    const [query, setQuery] = useState('');
    const composedAtRef = useRef(Number.NEGATIVE_INFINITY);
    const listId = useId();
    const targetRef = useInsertTarget(targets);
    const { ask, found, slow, index, setIndex, askAgain, searchFor } = useSearchResults(services, resourceTypes);
    const options = useMemo(() => found.items.map((item) => listOption(item, strings)), [found.items, strings]);
    const { choose, onKeyDown } = mentionActions({
        api,
        items: found.items,
        page: ask.page,
        askAgain,
        optionCount: options.length,
        index,
        setIndex,
        targetRef,
        composedAtRef,
        finish: () => dialog.finish('surface'),
    });
    const shownIndex = Math.min(index, Math.max(0, options.length - 1));
    useAnnouncements(found, shownIndex, strings, dialog.announce);

    let controls: string | undefined;
    let activeId: string | undefined;
    const active = options[shownIndex];
    if (active !== undefined) {
        controls = listId;
        activeId = suggestionOptionId(listId, active.key);
    }

    // Fondue's `TextInput` passes props it does not declare on to its `input`, and declares no `role` or composition events.
    const combobox = {
        role: 'combobox',
        onCompositionEnd: (event: CompositionEvent<HTMLInputElement>) => {
            composedAtRef.current = event.timeStamp;
        },
    };
    const onQueryChange = (next: string) => {
        setQuery(next);
        searchFor(next);
    };

    return {
        strings,
        testId: api.testId(),
        dialog,
        query,
        found,
        slow,
        options,
        shownIndex,
        listId,
        controls,
        activeId,
        combobox,
        onKeyDown,
        onQueryChange,
        choose,
        setIndex,
    };
};
