/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Flyout, LoadingCircle } from '@frontify/fondue-components';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';

import { Listbox } from '#/bridge/chrome/components/Listbox';
import { useEditorOverlay } from '#/bridge/overlays/hooks/useEditorOverlay';
import { SessionContext } from '#/bridge/session/helpers/sessionContext';
import { useAnnounce } from '#/bridge/session/hooks/useAnnounce';
import { useClientLayoutEffect } from '#/bridge/session/hooks/useClientLayoutEffect';
import { useSessionValue } from '#/bridge/session/hooks/useSessionValue';
import {
    acceptSuggestionIn,
    type ActiveSuggestion,
    activeSuggestionOf,
    dismissSuggestionIn,
    type EditorPort,
    hasSurface,
    moveSuggestionIn,
    suggestionAnchorRange,
} from '#/runtime/port';

import { SPINNER_DELAY_MS } from '../constants';
import { type ReferenceListStrings } from '../helpers/referenceStrings';
import { listOption, resultCount, spokenOption } from '../helpers/suggestionOptions';
import styles from '../styles/suggestions.module.scss';

const activeOf = (runtime: EditorPort | undefined): ActiveSuggestion | null => {
    if (runtime === undefined) {
        return null;
    }

    return activeSuggestionOf(runtime);
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
                status = strings.noResults;
                if (count > 0) {
                    status = strings.results(count);
                }
            }

            if (spoken === undefined) {
                announce(status);

                return;
            }

            announce(strings.both(status, spoken));

            return;
        }

        if (moved && spoken !== undefined) {
            announce(spoken);
        }
    }, [active, announce, strings]);
};

type StatusRowProps = {
    active: ActiveSuggestion;
    slow: boolean;
    strings: ReferenceListStrings;
};

/** The row a list shows below its options: its spinner, no results, or its failure. */
const StatusRow = ({ active, slow, strings }: StatusRowProps) => {
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

export type SuggestionListProps = {
    /** The list's accessible name from its package string key or its translations. */
    nameOf: (name: ActiveSuggestion['name']) => string;
    strings: ReferenceListStrings;
    testId: string;
};

/**
 * The open suggestion list below the trigger's line, while it has options or a status to show. The surface keeps focus
 * and the plugin keeps the keys; the surface's `aria-activedescendant` names the active option.
 */
export const SuggestionList = ({ nameOf, strings, testId }: SuggestionListProps) => {
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
    const overlay = useEditorOverlay(open, IGNORE_CLOSE, () => suggestionAnchorRange(runtimeRef.current));
    if (runtime === undefined || !hasSurface(runtime) || active === null) {
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
                onEscapeKeyDown={() => dismissSuggestionIn(runtime)}
            >
                <StatusRow active={active} slow={slow} strings={strings} />
                {options.length > 0 && (
                    <Listbox
                        id={runtime.suggestionListId}
                        label={listLabel}
                        options={options}
                        index={active.index}
                        onPick={(index) => acceptSuggestionIn(runtime, index)}
                        onActivate={(index) => moveSuggestionIn(runtime, index)}
                        testId={`${testId}-suggestions`}
                    />
                )}
            </Flyout.Content>
        </Flyout.Root>
    );
};

SuggestionList.displayName = 'SuggestionList';
