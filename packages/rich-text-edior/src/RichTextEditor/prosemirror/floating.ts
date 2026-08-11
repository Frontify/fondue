/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Schema } from 'prosemirror-model';
import { type EditorView } from 'prosemirror-view';

import { type FloatingAnchor, type RtePlugin } from '#/domain';
import { type FloatingPlacement, type FloatingRect } from '#/ports';

import { findMarkRange } from './queries';
import { type TriggerController } from './triggers';

/**
 * Where each declared piece of floating UI belongs on screen. Only the engine can
 * turn a document position into a box, which is the whole reason floating UI is
 * declared rather than positioned by the plugin itself.
 */

type DeclaredFloating = { pluginId: string; anchor: FloatingAnchor };

/** What the mounted plugins declared, in mount order. */
const declaredFloating = (plugins: RtePlugin[]): DeclaredFloating[] =>
    plugins.flatMap((plugin) => (plugin.floating ? [{ pluginId: plugin.id, anchor: plugin.floating.anchor }] : []));

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
 * The box around what is selected, or null when nothing is. A collapsed caret
 * counts as nothing: it selects no text, and a toolbar hanging over it would be
 * following the typing around with no reason to be there.
 */
export const createSelectionRectReader =
    (view: EditorView): (() => FloatingRect | null) =>
    () => {
        const { from, to, empty } = view.state.selection;
        return empty ? null : rectBetween(view, from, to);
    };

export const createFloatingLocator = (
    view: EditorView,
    plugins: RtePlugin[],
    schema: Schema,
    triggers: TriggerController,
): (() => FloatingPlacement[]) => {
    const declared = declaredFloating(plugins);

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
