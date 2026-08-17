/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorState, Plugin as PmPlugin, PluginKey } from 'prosemirror-state';
import { type EditorView } from 'prosemirror-view';

import { type RtePlugin } from '#/core';
import { type FloatingPlacement, type FloatingRect } from '#/editor/port';

/**
 * Trigger tracking for autocomplete: is the caret typing after a `@`, and what
 * has been typed since? Mark- and selection-anchored floating UI is not here.
 */

export type TrackedTrigger = {
    trigger: string;
    query: string;
    /** The trigger character's position, i.e. where the query starts. */
    from: number;
    /** The caret, i.e. where the query ends. */
    to: number;
};

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

export const declaredTriggers = (features: RtePlugin[]): string[] => [
    ...new Set(features.flatMap(({ autocomplete }) => (autocomplete ? [autocomplete.trigger] : []))),
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

export const triggerTrackingPlugin = (triggers: string[]): PmPlugin<TriggerState> =>
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

const rectBetween = (view: EditorView, from: number, to: number): FloatingRect => {
    const start = view.coordsAtPos(from);
    const end = view.coordsAtPos(to);
    const left = Math.min(start.left, end.left);
    const top = Math.min(start.top, end.top);
    return {
        left,
        top,
        width: Math.max(start.right, end.right) - left,
        height: Math.max(start.bottom, end.bottom) - top,
    };
};

export const createSelectionRectReader =
    (view: EditorView): (() => FloatingRect | null) =>
    () => {
        const { from, to, empty } = view.state.selection;
        return empty ? null : rectBetween(view, from, to);
    };

export const createAutocompleteLocator = (
    view: EditorView,
    features: RtePlugin[],
    triggers: TriggerController,
): (() => FloatingPlacement[]) => {
    const declared = features.flatMap((feature) =>
        feature.autocomplete ? [{ pluginId: feature.id, trigger: feature.autocomplete.trigger }] : [],
    );

    return () => {
        const open = triggers.tracked();
        if (open === null) {
            return [];
        }
        return declared.flatMap(({ pluginId, trigger }) =>
            open.trigger === trigger
                ? [{ pluginId, query: open.query, measure: () => rectBetween(view, open.from, open.to) }]
                : [],
        );
    };
};
