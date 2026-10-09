/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Plugin, PluginKey } from 'prosemirror-state';

import { type RuntimeEnvironment } from '#/model';

// ProseMirror reads pending DOM changes in a microtask after `compositionend` and ends the composition in a 20 ms timer.
const SETTLE_MS = 20;

/** The pending settle timers of every live runtime, which the `src/testing` probe counts. */
export const settleResources = { timers: 0 };

export interface InputSettling {
    /** Records `compositionend`, with no handler on the view itself (SPEC-rich-text-runtime/AC-001). */
    readonly plugin: Plugin;
    /** Whether a composition runs, or ended and input has not settled yet. */
    readonly active: () => boolean;
    /** Drops a pending settle, as `dispose` does. */
    readonly cancel: () => void;
}

/**
 * Calls `settled` once input has settled after a composition: after `compositionend`, an environment microtask, then
 * an environment timer of 20 ms from that microtask, with the view no longer composing (SPEC-rich-text-runtime/AC-070).
 * This rests on ProseMirror's internal flush timing, which the composition tests pin (SPEC-rich-text/AC-095).
 */
export const createInputSettling = (
    environment: RuntimeEnvironment,
    composing: () => boolean,
    settled: () => void,
): InputSettling => {
    let ended = 0;
    let waiting = false;
    let timer: number | undefined;

    const cancel = () => {
        ended += 1;
        waiting = false;
        if (timer !== undefined) {
            environment.clock.clearTimeout(timer);
            timer = undefined;
            settleResources.timers -= 1;
        }
    };

    const plugin = new Plugin({
        key: new PluginKey('rte.settle'),
        props: {
            handleDOMEvents: {
                compositionend: () => {
                    cancel();
                    waiting = true;
                    // A later `compositionend` or `cancel` makes this round stale.
                    const round = ended;
                    environment.scheduler.microtask(() => {
                        if (round !== ended) {
                            return;
                        }
                        timer = environment.clock.setTimeout(() => {
                            timer = undefined;
                            settleResources.timers -= 1;
                            waiting = false;
                            // A composition that started again settles after its own end.
                            if (!composing()) {
                                settled();
                            }
                        }, SETTLE_MS);
                        settleResources.timers += 1;
                    });
                    return false;
                },
            },
        },
    });

    return { plugin, active: () => waiting || composing(), cancel };
};
