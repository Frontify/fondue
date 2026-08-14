/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Schema } from 'prosemirror-model';
import { type EditorState, Plugin as PmPlugin, PluginKey } from 'prosemirror-state';
import { type EditorView } from 'prosemirror-view';

import { type FloatingAnchor, type RtePlugin } from '#/domain';
import { type FloatingPlacement, type FloatingRect } from '#/ports';

import { findMarkRange } from './controlApi';

/**
 * Where floating UI belongs on screen — a link panel, a mention picker, the
 * selection toolbar.
 *
 * A feature declares what its UI is *about* (`floating.anchor`) and renders the
 * contents; it never positions anything. That division exists because only the
 * engine can turn a document position into a box on screen, and it is what keeps
 * feature UI free of engine knowledge.
 *
 * Three sections, in the order the work happens on every keystroke:
 * 1. Trigger tracking — the one anchor kind that needs state: is the caret typing
 *    after a `@`, and what has been typed since?
 * 2. Geometry — a document range → a box in viewport coordinates.
 * 3. Anchors — each declared anchor resolved to a range, then to a placement.
 */

// ---------------------------------------------------------------------------
// 1. Trigger tracking
//
// Generic on purpose: the editor knows nothing about what a feature does with a
// trigger, only that a stretch of text after it is "the query".
// ---------------------------------------------------------------------------

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

/** Every trigger character the mounted features anchor floating UI to, without duplicates. */
export const declaredTriggers = (features: RtePlugin[]): string[] => [
    ...new Set(
        features.flatMap(({ floating }) =>
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

/**
 * Keeps the tracked trigger up to date as an engine plugin, so it is recomputed
 * once per transaction rather than on every read. Registered by
 * `setup/keystrokes.ts`, and only when some feature actually declared a trigger.
 */
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

// ---------------------------------------------------------------------------
// 2. Geometry: a document range → a box on screen
// ---------------------------------------------------------------------------

/**
 * The box around both ends of a range, in viewport coordinates. Content that
 * wraps across lines spans both of them, which is the honest answer: a link is
 * one link, and it is that tall.
 */
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

/**
 * The box around what is selected, or null when nothing is. This one is for the
 * editor's own selection toolbar rather than for a feature's declared UI.
 *
 * A collapsed caret counts as nothing: it selects no text, and a toolbar hanging
 * over it would be following the typing around with no reason to be there.
 */
export const createSelectionRectReader =
    (view: EditorView): (() => FloatingRect | null) =>
    () => {
        const { from, to, empty } = view.state.selection;
        return empty ? null : rectBetween(view, from, to);
    };

// ---------------------------------------------------------------------------
// 3. Anchors: what each declared piece of floating UI is about, right now
// ---------------------------------------------------------------------------

type DeclaredFloating = { pluginId: string; anchor: FloatingAnchor };

/** What the mounted features declared, in mount order. */
const declaredFloating = (features: RtePlugin[]): DeclaredFloating[] =>
    features.flatMap((feature) =>
        feature.floating ? [{ pluginId: feature.id, anchor: feature.floating.anchor }] : [],
    );

export const createFloatingLocator = (
    view: EditorView,
    features: RtePlugin[],
    schema: Schema,
    triggers: TriggerController,
): (() => FloatingPlacement[]) => {
    const declared = declaredFloating(features);

    /** What the content is about: a range in the document, or nothing right now. */
    const anchorRange = (anchor: FloatingAnchor): { from: number; to: number; query: string } | null => {
        if (anchor === 'selection') {
            const { from, to } = view.state.selection;
            return { from, to, query: '' };
        }
        if ('mark' in anchor) {
            const markType = schema.marks[anchor.mark];
            const range = markType ? findMarkRange(view.state, markType) : null;
            return range === null ? null : { ...range, query: '' };
        }
        const open = triggers.tracked();
        return open === null || open.trigger !== anchor.trigger
            ? null
            : { from: open.from, to: open.to, query: open.query };
    };

    return () =>
        declared.flatMap(({ pluginId, anchor }) => {
            const range = anchorRange(anchor);
            return range === null
                ? []
                : [{ pluginId, query: range.query, rect: rectBetween(view, range.from, range.to) }];
        });
};
