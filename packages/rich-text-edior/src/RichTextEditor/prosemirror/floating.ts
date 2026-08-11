/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Schema } from 'prosemirror-model';
import { type EditorView } from 'prosemirror-view';

import { type FloatingAnchor, type RtePlugin } from '../types';

import { findMarkRange } from './queries';
import { type TriggerController } from './triggers';

/**
 * Where each declared piece of floating UI belongs on screen. Only the engine can
 * turn a document position into a box, which is the whole reason floating UI is
 * declared rather than positioned by the plugin itself.
 */

/** A box in viewport coordinates. */
export type FloatingRect = { left: number; top: number; width: number; height: number };

export type FloatingPlacement = {
    pluginId: string;
    rect: FloatingRect;
    /** For a `{ trigger }` anchor: what has been typed after it. Empty for the others. */
    query: string;
};

type DeclaredFloating = { pluginId: string; anchor: FloatingAnchor };

/** What the mounted plugins declared, in mount order. */
const declaredFloating = (plugins: RtePlugin[]): DeclaredFloating[] =>
    plugins.flatMap((plugin) => (plugin.floating ? [{ pluginId: plugin.id, anchor: plugin.floating.anchor }] : []));

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

    /**
     * The box around both ends of the range. Content that wraps across lines
     * spans both of them, which is the honest answer: a link is one link, and it
     * is that tall.
     */
    const rectBetween = (from: number, to: number): FloatingRect => {
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

    return () =>
        declared.flatMap(({ pluginId, anchor }) => {
            const range = anchorRange(anchor);
            return range === null ? [] : [{ pluginId, query: range.query, rect: rectBetween(range.from, range.to) }];
        });
};
