/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Flyout } from '@frontify/fondue-components';
import { useContext, useEffect, useRef } from 'react';

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
} from '#/runtime/suggestions/plugin';

import { Listbox } from './listbox';

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
    return previous.items === next.items && previous.index === next.index && previous.from === next.from;
};

/** The plugin opens and closes the list, so a close request of the flyout changes nothing. */
const IGNORE_CLOSE = () => undefined;

/**
 * The open suggestion list below the trigger's line, while it has options. The surface keeps focus and the plugin
 * keeps the keys; the surface's `aria-activedescendant` names the active option.
 */
export const SuggestionList = ({
    label,
    optionLabel,
    testId,
}: {
    readonly label: string;
    /** What the announcer says for the active option, such as `grinning face, 1 of 12`. */
    readonly optionLabel: (label: string, position: number, total: number) => string;
    readonly testId: string;
}) => {
    const runtime = useContext(SessionContext);
    const announce = useAnnounce();
    const runtimeRef = useRef(runtime);
    useClientLayoutEffect(() => {
        runtimeRef.current = runtime;
    });
    const active = useSessionValue(activeOf, sameShown);
    const open = active !== null && active.items.length > 0;
    // The surface names the active option with `aria-activedescendant`, which a screen reader does not follow to a list
    // outside the surface, so the editor's polite live region says it too.
    let spoken = '';
    if (active !== null) {
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
    return (
        <Flyout.Root open={open} onOpenChange={overlay.onOpenChange} virtualAnchor={overlay.anchor}>
            <Flyout.Content
                ref={overlay.contentRef}
                aria-label={label}
                container={overlay.container}
                side="bottom"
                align="start"
                padding="tight"
                onOpenAutoFocus={(event) => event.preventDefault()}
                // Radix hears Escape on the document before the surface does and prevents it, so it closes the list here.
                onEscapeKeyDown={() => dismissSuggestion(view)}
            >
                <Listbox
                    id={runtime.suggestionListId}
                    label={label}
                    options={active.items}
                    index={active.index}
                    onPick={(index) => acceptSuggestion(view, index)}
                    onActivate={(index) => moveSuggestion(view, index)}
                    testId={`${testId}-suggestions`}
                />
            </Flyout.Content>
        </Flyout.Root>
    );
};
