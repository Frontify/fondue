/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Plugin, PluginKey } from 'prosemirror-state';
import { type EditorView } from 'prosemirror-view';

// ProseMirror reads pending DOM changes in a microtask after `compositionend` and ends the composition in a 20 ms timer.
export const SETTLE_MS = 20;

/** The pending settle timers of every live runtime, which the `src/testing` probe reads. */
export const settleResources = { timers: 0 };

type CompositionTrack = {
    wasComposing: boolean;
    sawComposing: boolean;
};

const clearTrack = (track: CompositionTrack) => {
    track.wasComposing = false;
    track.sawComposing = false;
};

// A non-composing key or beforeinput ends a round ProseMirror ended silently, and that end settles like any other.
const noteIdleInput = (view: EditorView, event: Event, idle: () => void) => {
    if (event instanceof KeyboardEvent) {
        if (event.isComposing || event.keyCode === 229) {
            return false;
        }
    } else if (!(event instanceof InputEvent) || event.isComposing) {
        return false;
    }

    if (!view.composing) {
        idle();
    }

    return false;
};

export type InputSettling = {
    /** Records composition events and composition ends, with no handler on the view itself. */
    plugin: Plugin;
    /** Whether a composition runs, or ended and input has not settled yet. */
    active: () => boolean;
    /** Clears a pending settle without telling watchers, and records the current value. `dispose` uses this after the phase is `disposed`. */
    reset: () => void;
};

const compositionView = (
    view: EditorView,
    track: CompositionTrack,
    finish: () => void,
    tell: () => void,
    reading: () => { started: boolean; quiet: boolean },
) => {
    track.wasComposing = view.composing;

    return {
        update: (current: EditorView) => {
            const { started, quiet } = reading();
            const composingNow = current.composing;
            if (composingNow) {
                track.sawComposing = true;
            }

            const ends = track.sawComposing && track.wasComposing && !composingNow;
            track.wasComposing = composingNow;
            // ProseMirror ends a composition with no `compositionend` after an idle time on Android; a state with
            // stored marks ends only its own record of it while the IME goes on, so that waits for `compositionend`.
            if (ends && started && current.state.storedMarks === null) {
                finish();
            }

            if (!quiet) {
                tell();
            }
        },
        // A view destroyed mid-composition, as `detach` does, ends it, so held work still settles.
        destroy: () => {
            if (reading().started) {
                finish();
            }
        },
    };
};

const afterSettleDelay = (
    isStale: () => boolean,
    clock: { current: ReturnType<typeof setTimeout> | undefined },
    run: () => void,
) => {
    queueMicrotask(() => {
        if (isStale()) {
            return;
        }

        clock.current = setTimeout(() => {
            clock.current = undefined;
            settleResources.timers -= 1;
            run();
        }, SETTLE_MS);
        settleResources.timers += 1;
    });
};

/** Calls `onChange` when `active` flips, which a composition's start and end do without a new editor state. */
const whenActiveChanges = (active: () => boolean, onChange: () => void) => {
    let wasActive = false;
    const tell = () => {
        const next = active();
        if (next === wasActive) {
            return;
        }

        wasActive = next;
        onChange();
    };

    const sync = () => {
        // A fault or a settle that already notified records the value and must not notify again.
        wasActive = active();
    };

    return { tell, sync };
};

const closeRound = (notified: boolean, sync: () => void, tell: () => void) => {
    if (notified) {
        sync();

        return;
    }

    tell();
};

/**
 * Calls `settled` once input has settled after a composition: after its end, a microtask, then a timer of 20 ms from
 * that microtask, with the view no longer composing. A composition runs from `compositionstart` to `compositionend`,
 * to the moment ProseMirror ends it on its own, or to a non-composing key or beforeinput after that silent end.
 * That end settles like any other. This rests on ProseMirror's internal flush timing, which the composition tests pin.
 */
export const createInputSettling = (
    composing: () => boolean,
    settled: () => void,
    onActiveChange: () => void,
    notifications: () => number,
): InputSettling => {
    let ended = 0;
    let started = false;
    let waiting = false;
    const clock: { current: ReturnType<typeof setTimeout> | undefined } = { current: undefined };
    // The settle install updates the view before the document is published, so that update must not announce the end.
    let quiet = false;
    const track: CompositionTrack = { wasComposing: false, sawComposing: false };
    const { tell, sync } = whenActiveChanges(() => started || waiting || composing(), onActiveChange);
    const idle = () => {
        if (!started || waiting) {
            return;
        }

        finish();
    };

    const dropRound = () => {
        ended += 1;
        started = false;
        waiting = false;
        if (clock.current !== undefined) {
            clearTimeout(clock.current);
            clock.current = undefined;
            settleResources.timers -= 1;
        }
    };

    const reset = () => {
        dropRound();
        sync();
    };

    const begin = (view: EditorView) => {
        // compositionstart flushes the DOM and ends the previous composition before it marks the view composing.
        if (!view.composing) {
            clearTrack(track);
        }

        if (!started) {
            dropRound();
            started = true;
            tell();
        }

        return false;
    };

    const finish = () => {
        dropRound();
        waiting = true;
        tell();
        // A later end, start or `reset` makes this round stale.
        const round = ended;
        afterSettleDelay(
            () => round !== ended,
            clock,
            () => {
                waiting = false;
                quiet = true;
                const before = notifications();
                try {
                    if (!composing()) {
                        settled();
                    }
                } finally {
                    quiet = false;
                    closeRound(notifications() !== before, sync, tell);
                }
            },
        );
    };

    const plugin = new Plugin({
        key: new PluginKey('rte.settle'),
        props: {
            handleDOMEvents: {
                // ProseMirror starts a composition again on `compositionupdate`, as Android sends after an idle end.
                compositionstart: begin,
                compositionupdate: begin,
                compositionend: () => {
                    finish();

                    return false;
                },
                keydown: (view, event) => noteIdleInput(view, event, idle),
                beforeinput: (view, event) => noteIdleInput(view, event, idle),
            },
        },
        view: (view) => compositionView(view, track, finish, tell, () => ({ started, quiet })),
    });

    return { plugin, active: () => started || waiting || composing(), reset };
};
