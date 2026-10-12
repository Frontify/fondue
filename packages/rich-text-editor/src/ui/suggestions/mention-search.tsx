/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, Dialog, LoadingCircle, TextInput } from '@frontify/fondue-components';
import {
    type CompositionEvent,
    type KeyboardEvent,
    useContext,
    useEffect,
    useId,
    useMemo,
    useRef,
    useState,
} from 'react';

import { createAnnouncer } from '#/bridge/announcer';
import { useClientLayoutEffect } from '#/bridge/client-layout-effect';
import { SessionContext } from '#/bridge/hooks';
import { useEditorOverlay } from '#/bridge/overlays';
import { passesToBrowser } from '#/runtime/keys';
import { type SuggestionItem, suggestionOptionId } from '#/runtime/suggestions/plugin';
import { afterFailure, afterPage, MENTION_DIALOG_SEARCH, resultsOf } from '#/runtime/suggestions/references';
import { createReferenceSearch } from '#/runtime/suggestions/search';
import { type SelectionHandle } from '#/runtime/types';

import { Listbox } from './listbox';
import styles from './styles/suggestions.module.scss';
import { listOption, type ReferenceListStrings, SPINNER_DELAY_MS, spokenOption } from './suggestion-list';

/** The feature whose search the dialog runs, and the command that inserts the chosen result. */
export const MENTIONS_FEATURE = 'mentions';
export const INSERT_MENTION = 'reference.insert';
// Safari sends the Enter that confirms a composition after `compositionend`, as ProseMirror's own guard has it.
const COMPOSITION_ENTER_MS = 500;

/** The mention search dialog's strings, in the UI locale. */
export interface MentionSearchStrings extends ReferenceListStrings {
    readonly title: string;
    readonly search: string;
    readonly cancel: string;
}

/** One ask of the host: its query and page, and whether it waits for the next keystroke first. */
interface Ask {
    readonly query: string;
    readonly page: string | null;
    readonly waits: boolean;
}

interface Found {
    readonly status: 'loading' | 'ready' | 'failed';
    readonly items: readonly SuggestionItem[];
    /** Counts the answered asks, so each answer is announced, a repeated one too. */
    readonly answers: number;
}

const wrapped = (index: number, length: number): number => ((index % length) + length) % length;

const statusOf = (found: Found, strings: MentionSearchStrings): string => {
    if (found.status === 'failed') {
        return strings.failed;
    }
    const count = resultsOf(found.items).length;
    return count > 0 ? strings.results(count) : strings.noResults;
};

/**
 * The mention search dialog: a search combobox over a listbox of the host's references, as the WAI-ARIA combobox
 * pattern has it, which inserts the chosen result as a mention at the target captured when the dialog opened. Focus
 * stays in the field; the arrows move the active option and Enter or a click chooses it. Cancel and Escape change
 * nothing and return focus to `opener`.
 */
export const MentionSearchDialog = ({
    opener,
    strings,
    testId,
    onClose,
}: {
    /** The element that had focus when the dialog opened, which Cancel and Escape return focus to. */
    readonly opener: Element | null;
    readonly strings: MentionSearchStrings;
    readonly testId: string;
    readonly onClose: () => void;
}) => {
    const runtime = useContext(SessionContext);
    const [open, setOpen] = useState(true);
    const [query, setQuery] = useState('');
    const [ask, setAsk] = useState<Ask>({ query: '', page: null, waits: true });
    const [found, setFound] = useState<Found>({ status: 'loading', items: [], answers: 0 });
    const [slow, setSlow] = useState(false);
    const [index, setIndex] = useState(0);
    const targetRef = useRef<SelectionHandle | null>(null);
    // The dialog's own polite region, since a modal dialog hides the editor's from a screen reader.
    const [announcer] = useState(createAnnouncer);
    useEffect(() => announcer.dispose, [announcer]);
    const composedAtRef = useRef(Number.NEGATIVE_INFINITY);
    const itemsRef = useRef(found.items);
    useClientLayoutEffect(() => {
        itemsRef.current = found.items;
    });
    const listId = useId();
    const close = (next: boolean) => {
        if (!next) {
            setOpen(false);
            onClose();
        }
    };
    const overlay = useEditorOverlay(open, close);
    const dismiss = (next: boolean) => {
        if (!next) {
            overlay.returnFocusTo(opener);
        }
        overlay.onOpenChange(next);
    };
    // The mention goes where the selection was when the dialog opened, mapped through every change since.
    useEffect(() => {
        if (runtime === undefined) {
            return undefined;
        }
        const captured = runtime.handle.captureTarget({ purpose: 'insert', onIntersectingEdit: 'map' });
        if (captured.status !== 'captured') {
            return undefined;
        }
        targetRef.current = captured.target;
        return () => {
            targetRef.current = null;
            runtime.handle.releaseTarget(captured.target);
        };
    }, [runtime]);
    const search = useMemo(() => createReferenceSearch(() => runtime, MENTION_DIALOG_SEARCH), [runtime]);
    useEffect(() => {
        const request = { featureId: MENTIONS_FEATURE, command: INSERT_MENTION, query: ask.query, cursor: ask.page };
        search.ask({ ...request, waits: ask.waits }, (results) => {
            let shown: readonly SuggestionItem[] = [];
            if (ask.page !== null) {
                shown = resultsOf(itemsRef.current);
            }
            let items = afterFailure(shown);
            if (results !== undefined) {
                items = afterPage(shown, results);
            }
            // The first new option, or the last one when the page added none, so Enter takes the option announced.
            setIndex(Math.max(0, Math.min(shown.length, items.length - 1)));
            setFound((current) => ({
                status: results === undefined ? 'failed' : 'ready',
                items,
                answers: current.answers + 1,
            }));
        });
        const spinner = setTimeout(() => setSlow(true), SPINNER_DELAY_MS);
        return () => {
            clearTimeout(spinner);
            setSlow(false);
            search.cancel();
        };
    }, [search, ask]);
    const options = useMemo(() => found.items.map((item) => listOption(item, strings)), [found.items, strings]);
    /** Asks again for the same query: the page a Load more option names, or the page that failed. */
    const askAgain = (page: string | null) => {
        setFound({ status: 'loading', items: resultsOf(found.items), answers: found.answers });
        setAsk({ query: ask.query, page, waits: false });
    };
    const choose = (position: number) => {
        const item = found.items[position];
        if (runtime === undefined || item === undefined) {
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
        let commandOptions: { readonly focus: 'editor'; readonly target?: SelectionHandle } = { focus: 'editor' };
        if (targetRef.current !== null) {
            commandOptions = { focus: 'editor', target: targetRef.current };
        }
        if (runtime.handle.execute(INSERT_MENTION, item.payload, commandOptions).status === 'rejected') {
            return;
        }
        overlay.returnFocusTo(null);
        close(false);
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
    // Each answer says its status and the option Enter takes; an arrow says the option it lands on.
    const spokenRef = useRef<{
        readonly answers: number;
        readonly status: Found['status'];
        readonly key: string | undefined;
    } | null>(null);
    useEffect(() => {
        const item = found.items[shownIndex];
        const spoken = spokenOption(found.items, shownIndex, strings);
        const last = spokenRef.current;
        spokenRef.current = { answers: found.answers, status: found.status, key: item?.key };
        if (found.status === 'loading') {
            // Arrows still move over the options a newer query keeps, but the start of the load says nothing.
            if (last?.status === 'loading' && last.answers === found.answers && last.key !== item?.key) {
                if (spoken !== undefined) {
                    announcer.announce(spoken);
                }
            }
            return;
        }
        if (last === null || last.answers !== found.answers) {
            const status = statusOf(found, strings);
            announcer.announce(spoken === undefined ? status : strings.both(status, spoken));
            return;
        }
        if (spoken !== undefined && last.key !== item?.key) {
            announcer.announce(spoken);
        }
    }, [announcer, found, shownIndex, strings]);
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
    return (
        <Dialog.Root open={open} onOpenChange={dismiss} modal>
            <Dialog.Content
                ref={overlay.contentRef}
                container={overlay.container}
                maxWidth="400px"
                data-test-id={`${testId}-mention-search`}
            >
                <Dialog.Header showCloseButton={false}>
                    <Dialog.Title>{strings.title}</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <div className={styles.picker}>
                        <TextInput
                            {...combobox}
                            type="text"
                            value={query}
                            placeholder={strings.search}
                            aria-label={strings.search}
                            aria-autocomplete="list"
                            aria-expanded={options.length > 0}
                            aria-controls={controls}
                            aria-activedescendant={activeId}
                            autoComplete="off"
                            spellCheck={false}
                            onChange={(event) => {
                                const next = event.target.value;
                                setQuery(next);
                                setFound({ status: 'loading', items: resultsOf(found.items), answers: found.answers });
                                setAsk({ query: next, page: null, waits: true });
                                setIndex(0);
                            }}
                            onKeyDown={onKeyDown}
                        />
                        {found.status === 'loading' && slow && (
                            <div className={styles.row}>
                                <LoadingCircle size="xx-small" />
                                {strings.loading}
                            </div>
                        )}
                        {options.length > 0 && (
                            <Listbox
                                id={listId}
                                label={strings.label}
                                options={options}
                                index={shownIndex}
                                onPick={choose}
                                onActivate={setIndex}
                                testId={`${testId}-mention-options`}
                            />
                        )}
                        {found.status === 'ready' && resultsOf(found.items).length === 0 && (
                            <div className={styles.row}>{strings.noResults}</div>
                        )}
                        {found.status === 'failed' && <div className={styles.row}>{strings.failed}</div>}
                        <div ref={announcer.setRegion} role="status" className={styles.announcer} />
                    </div>
                </Dialog.Body>
                <Dialog.Footer>
                    <Button
                        emphasis="default"
                        onPress={() => {
                            overlay.returnFocusTo(opener);
                            close(false);
                        }}
                    >
                        {strings.cancel}
                    </Button>
                </Dialog.Footer>
            </Dialog.Content>
        </Dialog.Root>
    );
};
