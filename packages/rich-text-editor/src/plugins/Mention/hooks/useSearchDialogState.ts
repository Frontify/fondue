/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type CompositionEvent, type KeyboardEvent, useEffect, useId, useMemo, useRef, useState } from 'react';

import { suggestionOptionId, useEditorDialog } from '#/bridge/pluginApi/define';
import {
    type EditorApi,
    passesToBrowser,
    type SelectionHandle,
    useClientLayoutEffect,
} from '#/bridge/pluginApi/plugin';

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

/** The command that inserts the chosen result. */
const INSERT_MENTION = 'reference.insert';
// As the mention list waits, so one search runs once the author pauses.
const SEARCH_DELAY_MS = 200;
// As the mention list shows its spinner.
const SPINNER_DELAY_MS = 300;
// Safari sends the Enter that confirms a composition after `compositionend`, as ProseMirror's own guard has it.
const COMPOSITION_ENTER_MS = 500;

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

/** The dialog's strings from the chrome's `t`. */
const mentionSearchStrings = (t: EditorApi['t']): MentionSearchStrings => ({
    ...referenceListStrings(t),
    title: t('RichTextEditor_mention'),
    search: t('RichTextEditor_mentionSearch'),
    cancel: t('RichTextEditor_cancel'),
});

const wrapped = (index: number, length: number): number => ((index % length) + length) % length;

const statusOf = (found: Found, strings: MentionSearchStrings): string => {
    if (found.status === 'failed') {
        return strings.failed;
    }

    const count = resultsOf(found.items).length;

    return count > 0 ? strings.results(count) : strings.noResults;
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
            setFound((previous) => ({
                status: results === undefined ? 'failed' : 'ready',
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
            announce(spoken === undefined ? status : strings.both(status, spoken));

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
    const strings = mentionSearchStrings(api.t);
    const { targets, services } = api;
    const dialog = useEditorDialog(opener, onClose);
    const [query, setQuery] = useState('');
    const composedAtRef = useRef(Number.NEGATIVE_INFINITY);
    const listId = useId();
    const targetRef = useInsertTarget(targets);
    const { ask, found, slow, index, setIndex, askAgain, searchFor } = useSearchResults(services, resourceTypes);
    const options = useMemo(() => found.items.map((item) => listOption(item, strings)), [found.items, strings]);
    const choose = (position: number) => {
        const item = found.items[position];
        if (item === undefined) {
            return;
        }

        if (item.action === 'more' && item.cursor !== undefined) {
            askAgain(item.cursor);

            return;
        }

        if (item.action === 'retry') {
            askAgain(ask.page);

            return;
        }

        let commandOptions: { focus: 'editor'; target?: SelectionHandle } = { focus: 'editor' };
        if (targetRef.current !== null) {
            commandOptions = { focus: 'editor', target: targetRef.current };
        }

        if (api.commands.execute(INSERT_MENTION, item.payload, commandOptions).status === 'rejected') {
            return;
        }

        dialog.finish('surface');
    };

    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (passesToBrowser(event.nativeEvent)) {
            return;
        }

        // The Enter that confirms a composition is spent here, with options or none, so it never marks a later Enter.
        if (event.key === 'Enter' && event.timeStamp - composedAtRef.current < COMPOSITION_ENTER_MS) {
            composedAtRef.current = Number.NEGATIVE_INFINITY;
            event.preventDefault();

            return;
        }

        if (options.length === 0) {
            return;
        }

        if (event.key === 'ArrowDown') {
            event.preventDefault();
            setIndex(wrapped(index + 1, options.length));

            return;
        }

        if (event.key === 'ArrowUp') {
            event.preventDefault();
            setIndex(wrapped(index - 1, options.length));

            return;
        }

        if (event.key === 'Enter') {
            event.preventDefault();
            choose(index);
        }
    };

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
