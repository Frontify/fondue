/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Plugin, PluginKey } from 'prosemirror-state';

import { type RuntimeEnvironment } from '#/model';

// ProseMirror reads pending DOM changes in a microtask after `compositionend` and ends the composition in a 20 ms timer.
export const SETTLE_MS = 20;

/** The pending settle timers of every live runtime, which the `src/testing` probe counts. */
export const settleResources = { timers: 0 };

export interface InputSettling {
    /** Records composition events and composition ends, with no handler on the view itself (SPEC-rich-text-runtime/AC-001). */
    readonly plugin: Plugin;
    /** Whether a composition runs, or ended and input has not settled yet. */
    readonly active: () => boolean;
    /** Drops a pending settle, as `dispose` does. */
    readonly cancel: () => void;
}

/**
 * Calls `settled` once input has settled after a composition: after its end, an environment microtask, then an
 * environment timer of 20 ms from that microtask, with the view no longer composing (SPEC-rich-text-runtime/AC-070).
 * A composition runs from `compositionstart` to `compositionend`, or to the moment ProseMirror ends it on its own.
 * This rests on ProseMirror's internal flush timing, which the composition tests pin (SPEC-rich-text/AC-095).
 */
export const createInputSettling = (
    environment: RuntimeEnvironment,
    composing: () => boolean,
    settled: () => void,
): InputSettling => {
    let ended = 0;
    let started = false;
    let waiting = false;
    let timer: number | undefined;

    const cancel = () => {
        ended += 1;
        started = false;
        waiting = false;
        if (timer !== undefined) {
            environment.clock.clearTimeout(timer);
            timer = undefined;
            settleResources.timers -= 1;
        }
    };

    const begin = () => {
        if (!started) {
            cancel();
            started = true;
        }
        return false;
    };

    const finish = () => {
        cancel();
        waiting = true;
        // A later end, start or `cancel` makes this round stale.
        const round = ended;
        environment.scheduler.microtask(() => {
            if (round !== ended) {
                return;
            }
            timer = environment.clock.setTimeout(() => {
                timer = undefined;
                settleResources.timers -= 1;
                waiting = false;
                if (!composing()) {
                    settled();
                }
            }, SETTLE_MS);
            settleResources.timers += 1;
        });
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
            },
        },
        view: (view) => {
            let wasComposing = view.composing;
            return {
                update: (current) => {
                    const ends = wasComposing && !current.composing;
                    wasComposing = current.composing;
                    // ProseMirror ends a composition with no `compositionend` after an idle time on Android; a state with
                    // stored marks ends only its own record of it while the IME goes on, so that waits for `compositionend`.
                    if (ends && started && current.state.storedMarks === null) {
                        finish();
                    }
                },
                // A view destroyed mid-composition, as `detach` does, ends it, so held work still settles.
                destroy: () => {
                    if (started) {
                        finish();
                    }
                },
            };
        },
    });

    return { plugin, active: () => started || waiting || composing(), cancel };
};
