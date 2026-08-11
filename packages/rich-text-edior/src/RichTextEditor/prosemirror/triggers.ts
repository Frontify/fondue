/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorState, Plugin as PmPlugin, PluginKey } from 'prosemirror-state';
import { type EditorView } from 'prosemirror-view';

import { type RtePlugin } from '#/domain';

/**
 * Trigger tracking: which declared trigger character the caret is typing after,
 * and what has been typed since. Generic — the editor knows nothing about what a
 * plugin does with it, only that a stretch of text is "the query".
 */

export type TrackedTrigger = {
    trigger: string;
    query: string;
    /** The trigger character's position, i.e. where the query starts. */
    from: number;
    /** The caret, i.e. where the query ends. */
    to: number;
};

/** Reading and closing whatever trigger is currently open. */
export type TriggerController = {
    tracked(): TrackedTrigger | null;
    /** Delete the trigger and its query, so a choice can take their place. */
    clear(): void;
    /** Close it until the caret moves on (Escape). */
    dismiss(): void;
};

type TriggerState = {
    tracked: TrackedTrigger | null;
    /** Where a trigger was dismissed, so it stays closed until the caret moves on. */
    dismissedFrom: number | null;
};

const triggerKey = new PluginKey<TriggerState>('rte-trigger');
const DISMISS = 'dismiss';

/** Every trigger character the mounted plugins anchor floating UI to, without duplicates. */
export const declaredTriggers = (plugins: RtePlugin[]): string[] => [
    ...new Set(
        plugins.flatMap(({ floating }) =>
            floating && typeof floating.anchor === 'object' && 'trigger' in floating.anchor
                ? [floating.anchor.trigger]
                : [],
        ),
    ),
];

/** A trigger only counts at the start of a word, and only while the query has no spaces. */
const trackTrigger = (state: EditorState, triggers: string[]): TrackedTrigger | null => {
    const { selection } = state;
    if (!selection.empty) {
        return null;
    }
    const { $from } = selection;
    if (!$from.parent.isTextblock) {
        return null;
    }
    // Inline atoms count as one character each, so text offsets stay aligned
    // with document positions.
    const textBefore = $from.parent.textBetween(0, $from.parentOffset, undefined, '￼');

    let best: TrackedTrigger | null = null;
    let bestIndex = -1;
    for (const trigger of triggers) {
        const index = textBefore.lastIndexOf(trigger);
        if (index === -1 || index < bestIndex) {
            continue;
        }
        const query = textBefore.slice(index + trigger.length);
        if (/\s/.test(query)) {
            continue;
        }
        const before = index === 0 ? '' : textBefore.charAt(index - 1);
        if (before !== '' && !/[\s([]/.test(before)) {
            continue;
        }
        bestIndex = index;
        best = { trigger, query, from: $from.start() + index, to: $from.pos };
    }
    return best;
};

export const triggerPlugin = (triggers: string[]): PmPlugin<TriggerState> =>
    new PmPlugin<TriggerState>({
        key: triggerKey,
        state: {
            init: () => ({ tracked: null, dismissedFrom: null }),
            apply: (transaction, previous, _oldState, newState) => {
                const tracked = trackTrigger(newState, triggers);
                if (transaction.getMeta(triggerKey) === DISMISS) {
                    return { tracked: null, dismissedFrom: tracked?.from ?? null };
                }
                if (tracked && tracked.from === previous.dismissedFrom) {
                    return { tracked: null, dismissedFrom: previous.dismissedFrom };
                }
                return { tracked, dismissedFrom: null };
            },
        },
    });

export const createTriggerController = (view: EditorView): TriggerController => {
    const tracked = (): TrackedTrigger | null => triggerKey.getState(view.state)?.tracked ?? null;

    return {
        tracked,
        clear() {
            const open = tracked();
            if (open) {
                view.dispatch(view.state.tr.delete(open.from, open.to));
            }
        },
        dismiss() {
            view.dispatch(view.state.tr.setMeta(triggerKey, DISMISS));
        },
    };
};
