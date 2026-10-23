/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Flyout, LoadingCircle } from '@frontify/fondue-components';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';

import { isolate, useAnnounce } from '#/bridge/announcer';
import { useClientLayoutEffect } from '#/bridge/client-layout-effect';
import { Listbox, type ListboxOption } from '#/bridge/listbox';
import { useEditorOverlay } from '#/bridge/overlays';
import { SessionContext, useSessionValue } from '#/bridge/session';
import { type CodecContext } from '#/model';
import { rangeOf } from '#/runtime/editor-api';
import { type EditorRuntime } from '#/runtime/runtime';
import {
    acceptSuggestion,
    type ActiveSuggestion,
    activeSuggestion,
    dismissSuggestion,
    moveSuggestion,
    type SuggestionItem,
} from '#/runtime/suggestions/plugin';

import styles from './styles/suggestions.module.scss';

/** A search shows its spinner once it has waited this long. */
export const SPINNER_DELAY_MS = 300;

/** What a list says about its search, in the UI locale. */
export interface ReferenceListStrings {
    readonly label: string;
    readonly loading: string;
    readonly noResults: string;
    readonly failed: string;
    readonly loadMore: string;
    readonly retry: string;
    readonly results: (count: number) => string;
    /** The active option with its place, and its type when it has one, so a user and a group of one name differ. */
    readonly option: (option: ListboxOption, position: number, total: number) => string;
    /** Two messages as one announcement, so the second does not cut the first off. */
    readonly both: (first: string, second: string) => string;
}

/** The mention list's and the mention search dialog's list strings from the chrome's `t`. */
export const referenceListStrings = (t: CodecContext['t']): ReferenceListStrings => ({
    label: t('RichTextEditor_mentionSuggestions'),
    loading: t('RichTextEditor_mentionLoading'),
    noResults: t('RichTextEditor_mentionNoResults'),
    failed: t('RichTextEditor_mentionFailed'),
    loadMore: t('RichTextEditor_mentionLoadMore'),
    retry: t('RichTextEditor_retry'),
    results: (count) => t('RichTextEditor_mentionResults', { count }),
    option: ({ label, detail }, position, total) => {
        if (detail === undefined) {
            return t('RichTextEditor_suggestionOption', { label: isolate(label), position, total });
        }
        return t('RichTextEditor_mentionOption', { label: isolate(label), type: detail, position, total });
    },
    both: (first, second) => t('RichTextEditor_announceBoth', { first, second }),
});

const activeOf = (runtime: EditorRuntime | undefined): ActiveSuggestion | null => {
    if (runtime === undefined) {
        return null;
    }
    return activeSuggestion(runtime.state);
};

/** What the list shows, so a commit that only maps the range leaves it as it was. */
const sameShown = (previous: ActiveSuggestion | null, next: ActiveSuggestion | null): boolean => {
    if (previous === null || next === null) {
        return previous === next;
    }
    return (
        previous.items === next.items &&
        previous.index === next.index &&
        previous.from === next.from &&
        previous.status === next.status &&
        previous.request === next.request
    );
};

/** The plugin opens and closes the list, so a close request of the flyout changes nothing. */
const IGNORE_CLOSE = () => undefined;

/** The options of a list's own results, without Load more and Retry. */
const resultCount = (items: readonly SuggestionItem[]) => items.filter((item) => item.action === undefined).length;

/** An option as the listbox shows it: Load more and Retry by their localized label, a reference with its icon. */
export const listOption = (item: SuggestionItem, strings: ReferenceListStrings): ListboxOption => {
    if (item.action === 'more') {
        return { key: item.key, label: strings.loadMore, glyph: null };
    }
    if (item.action === 'retry') {
        return { key: item.key, label: strings.retry, glyph: null };
    }
    if (item.glyph !== null || item.detail === undefined) {
        return item;
    }
    // A reference result with no image and no kind shows the person icon.
    let lead: Pick<ListboxOption, 'imageUrl' | 'kind'> = { kind: item.kind ?? 'user' };
    if (item.imageUrl !== undefined) {
        lead = { imageUrl: item.imageUrl };
    }
    return { key: item.key, label: item.label, glyph: null, detail: item.detail, ...lead };
};

/** Whether a search has waited `SPINNER_DELAY_MS` for request `request`, which shows its spinner row. */
const useSlowRequest = (active: ActiveSuggestion | null): boolean => {
    const [slow, setSlow] = useState<number | null>(null);
    const request = active?.request;
    const loading = active?.status === 'loading';
    useEffect(() => {
        if (!loading || request === undefined) {
            return undefined;
        }
        const timer = setTimeout(() => setSlow(request), SPINNER_DELAY_MS);
        return () => clearTimeout(timer);
    }, [loading, request]);
    return loading && slow === request;
};

/**
 * The place of option `index` that a screen reader hears: a result among the results, so Load more adds no place to
 * them, and Load more or Retry among every option.
 */
export const placeOf = (items: readonly SuggestionItem[], index: number) => {
    let total = items.length;
    if (items[index]?.action === undefined) {
        total = resultCount(items);
    }
    return { position: index + 1, total };
};

/** What the active option of `items` says, with its place, or `undefined` with none. */
export const spokenOption = (
    items: readonly SuggestionItem[],
    index: number,
    strings: ReferenceListStrings,
): string | undefined => {
    const option = items[index];
    if (option === undefined) {
        return undefined;
    }
    const { position, total } = placeOf(items, index);
    return strings.option(listOption(option, strings), position, total);
};

/**
 * What a list announces: when a search answers, its result count, or that it found none or failed, with the
 * option Enter takes; after that, the active option whenever it changes, while a newer query loads too. The start of a
 * load says nothing.
 */
const useAnnouncements = (active: ActiveSuggestion | null, strings: ReferenceListStrings) => {
    const announce = useAnnounce();
    const lastRef = useRef<ActiveSuggestion | null>(null);
    useEffect(() => {
        const last = lastRef.current;
        lastRef.current = active;
        if (active === null) {
            return;
        }
        const spoken = spokenOption(active.items, active.index, strings);
        const activeKey = active.items[active.index]?.key;
        let moved = false;
        if (last !== null) {
            const lastKey = last.items[last.index]?.key;
            moved = lastKey !== activeKey;
        }
        const changed = last === null || last.request !== active.request || last.status !== active.status;
        if (active.status === 'loading') {
            if (!changed && moved && spoken !== undefined) {
                announce(spoken);
            }
            return;
        }
        if (changed) {
            let status = strings.failed;
            if (active.status === 'ready') {
                const count = resultCount(active.items);
                status = count > 0 ? strings.results(count) : strings.noResults;
            }
            announce(spoken === undefined ? status : strings.both(status, spoken));
            return;
        }
        if (moved && spoken !== undefined) {
            announce(spoken);
        }
    }, [active, announce, strings]);
};

/** The row a list shows below its options: its spinner, no results, or its failure. */
const StatusRow = ({
    active,
    slow,
    strings,
}: {
    readonly active: ActiveSuggestion;
    readonly slow: boolean;
    readonly strings: ReferenceListStrings;
}) => {
    if (active.status === 'loading' && slow) {
        return (
            <div className={styles.row} data-row="loading">
                <LoadingCircle size="xx-small" />
                {strings.loading}
            </div>
        );
    }
    if (active.status === 'ready' && resultCount(active.items) === 0) {
        return (
            <div className={styles.row} data-row="empty">
                {strings.noResults}
            </div>
        );
    }
    if (active.status === 'failed') {
        return (
            <div className={styles.row} data-row="failed">
                {strings.failed}
            </div>
        );
    }
    return null;
};

/**
 * The open suggestion list below the trigger's line, while it has options or a status to show. The surface keeps focus
 * and the plugin keeps the keys; the surface's `aria-activedescendant` names the active option.
 */
export const SuggestionList = ({
    nameOf,
    strings,
    testId,
}: {
    /** The list's accessible name from its package string key or its translations. */
    readonly nameOf: (name: ActiveSuggestion['name']) => string;
    readonly strings: ReferenceListStrings;
    readonly testId: string;
}) => {
    const runtime = useContext(SessionContext);
    const runtimeRef = useRef(runtime);
    useClientLayoutEffect(() => {
        runtimeRef.current = runtime;
    });
    const active = useSessionValue(activeOf, sameShown);
    const slow = useSlowRequest(active);
    useAnnouncements(active, strings);
    const items = active?.items;
    const options = useMemo(() => (items ?? []).map((item) => listOption(item, strings)), [items, strings]);
    let open = false;
    if (active !== null) {
        open = active.items.length > 0 || active.status !== 'loading' || slow;
    }
    // The list sits below its trigger, and hides while a scrolling ancestor clips it, as other overlays do.
    const overlay = useEditorOverlay(open, IGNORE_CLOSE, () => {
        const current = activeOf(runtimeRef.current);
        const surface = runtimeRef.current?.view;
        const doc = surface?.state.doc;
        if (current === null || doc === undefined) {
            return undefined;
        }
        return rangeOf(doc, current.from, current.from);
    });
    const view = runtime?.view;
    if (runtime === undefined || view === undefined || active === null) {
        return null;
    }
    const listLabel = nameOf(active.name);
    return (
        <Flyout.Root open={open} onOpenChange={overlay.onOpenChange} virtualAnchor={overlay.anchor}>
            <Flyout.Content
                ref={overlay.contentRef}
                aria-label={listLabel}
                container={overlay.container}
                side="bottom"
                align="start"
                padding="tight"
                onOpenAutoFocus={(event) => event.preventDefault()}
                // Radix hears Escape on the document before the surface does and prevents it, so it closes the list here.
                onEscapeKeyDown={() => dismissSuggestion(view)}
            >
                <StatusRow active={active} slow={slow} strings={strings} />
                {options.length > 0 && (
                    <Listbox
                        id={runtime.suggestionListId}
                        label={listLabel}
                        options={options}
                        index={active.index}
                        onPick={(index) => acceptSuggestion(view, index)}
                        onActivate={(index) => moveSuggestion(view, index)}
                        testId={`${testId}-suggestions`}
                    />
                )}
            </Flyout.Content>
        </Flyout.Root>
    );
};
