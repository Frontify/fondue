/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Flyout, LoadingCircle } from '@frontify/fondue-components';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';

import { useAnnounce } from '#/bridge/announcer';
import { useClientLayoutEffect } from '#/bridge/client-layout-effect';
import { SessionContext, useSessionValue } from '#/bridge/hooks';
import { useEditorOverlay } from '#/bridge/overlays';
import { type EditorRuntime } from '#/runtime/runtime';
import {
    acceptSuggestion,
    type ActiveSuggestion,
    activeSuggestion,
    dismissSuggestion,
    moveSuggestion,
    type SuggestionItem,
} from '#/runtime/suggestions/plugin';

import { Listbox, type ListboxOption } from './listbox';
import styles from './styles/suggestions.module.scss';

/** A reference search shows its spinner once it has waited this long. */
export const SPINNER_DELAY_MS = 300;

/** What a reference list says about its search, in the UI locale. */
export interface ReferenceListStrings {
    readonly label: string;
    readonly loading: string;
    readonly noResults: string;
    readonly failed: string;
    readonly loadMore: string;
    readonly retry: string;
    readonly results: (count: number) => string;
}

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

/** The options of a reference list's own results, without Load more and Retry. */
const resultCount = (items: readonly SuggestionItem[]) => items.filter((item) => item.action === undefined).length;

/** An option as the listbox shows it: Load more and Retry by their localized label, a reference with its icon. */
export const listOption = (item: SuggestionItem, strings: ReferenceListStrings): ListboxOption => {
    if (item.action === 'more') {
        return { key: item.key, label: strings.loadMore, glyph: null };
    }
    if (item.action === 'retry') {
        return { key: item.key, label: strings.retry, glyph: null };
    }
    if (item.detail === undefined) {
        return item;
    }
    // A reference result with no image and no kind shows the person icon.
    let lead: Pick<ListboxOption, 'imageUrl' | 'kind'> = { kind: item.kind ?? 'user' };
    if (item.imageUrl !== undefined) {
        lead = { imageUrl: item.imageUrl };
    }
    return { key: item.key, label: item.label, glyph: null, detail: item.detail, ...lead };
};

/** Whether a reference search has waited `SPINNER_DELAY_MS` for request `request`, which shows its spinner row. */
const useSlowRequest = (active: ActiveSuggestion | null): boolean => {
    const [slow, setSlow] = useState<number | null>(null);
    const request = active?.request;
    const loading = active?.source === 'references' && active.status === 'loading';
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
 * What a reference list announces: its result count or that it found none or failed when a search answers, and the
 * active option only when the author moves it. A search that starts or loads announces nothing.
 */
const useReferenceAnnouncements = (
    active: ActiveSuggestion | null,
    strings: ReferenceListStrings,
    optionLabel: (label: string, position: number, total: number) => string,
) => {
    const announce = useAnnounce();
    const lastRef = useRef<ActiveSuggestion | null>(null);
    useEffect(() => {
        const last = lastRef.current;
        lastRef.current = active;
        if (active === null || active.source !== 'references') {
            return;
        }
        if (last === null || last.request !== active.request || last.status !== active.status) {
            if (active.status === 'ready') {
                const count = resultCount(active.items);
                announce(count > 0 ? strings.results(count) : strings.noResults);
            } else if (active.status === 'failed') {
                announce(strings.failed);
            }
            return;
        }
        const option = active.items[active.index];
        if (last.index !== active.index && option !== undefined) {
            announce(optionLabel(listOption(option, strings).label, active.index + 1, active.items.length));
        }
    }, [active, announce, strings, optionLabel]);
};

/** The row a reference list shows below its options: its spinner, no results, or its failure. */
const StatusRow = ({
    active,
    slow,
    strings,
}: {
    readonly active: ActiveSuggestion;
    readonly slow: boolean;
    readonly strings: ReferenceListStrings;
}) => {
    if (active.source !== 'references') {
        return null;
    }
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
 * The open suggestion list below the trigger's line, while it has options or, for references, a status to show. The
 * surface keeps focus and the plugin keeps the keys; the surface's `aria-activedescendant` names the active option.
 */
export const SuggestionList = ({
    label,
    optionLabel,
    references,
    testId,
}: {
    readonly label: string;
    /** What the announcer says for the active option, such as `grinning face, 1 of 12`. */
    readonly optionLabel: (label: string, position: number, total: number) => string;
    readonly references: ReferenceListStrings;
    readonly testId: string;
}) => {
    const runtime = useContext(SessionContext);
    const announce = useAnnounce();
    const runtimeRef = useRef(runtime);
    useClientLayoutEffect(() => {
        runtimeRef.current = runtime;
    });
    const active = useSessionValue(activeOf, sameShown);
    const slow = useSlowRequest(active);
    useReferenceAnnouncements(active, references, optionLabel);
    const isReference = active?.source === 'references';
    const items = active?.items;
    const options = useMemo(() => (items ?? []).map((item) => listOption(item, references)), [items, references]);
    let open = false;
    if (active !== null) {
        open = active.items.length > 0;
        if (isReference) {
            open ||= active.status !== 'loading' || slow;
        }
    }
    // The surface names the active option with `aria-activedescendant`, which a screen reader does not follow to a list
    // outside the surface, so the editor's polite live region says it too.
    let spoken = '';
    if (active !== null && !isReference) {
        const option = active.items[active.index];
        if (option !== undefined) {
            spoken = optionLabel(option.label, active.index + 1, active.items.length);
        }
    }
    useEffect(() => {
        if (spoken !== '') {
            announce(spoken);
        }
    }, [announce, spoken]);
    // The list sits below its trigger, and hides while a scrolling ancestor clips it, as other overlays do.
    const overlay = useEditorOverlay(open, IGNORE_CLOSE, () => {
        const current = activeOf(runtimeRef.current);
        if (current === null) {
            return undefined;
        }
        return current.from;
    });
    const view = runtime?.view;
    if (runtime === undefined || view === undefined || active === null) {
        return null;
    }
    let listLabel = label;
    if (isReference) {
        listLabel = references.label;
    }
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
                <StatusRow active={active} slow={slow} strings={references} />
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
