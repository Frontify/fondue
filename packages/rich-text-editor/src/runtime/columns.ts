/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node as ProseMirrorNode } from 'prosemirror-model';
import { type EditorState, Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';

import { COLUMN_BREAK } from '#/model/output';

/** What the editor shows of the presentation's columns: their count, whether the surface has room for them, and the break labels. */
export interface ColumnState {
    readonly count: number;
    readonly fits: boolean;
    readonly label: string;
    /** The name of a break that forces no break. */
    readonly inactiveLabel: string;
}

export const ONE_COLUMN: ColumnState = {
    count: 1,
    fits: false,
    label: 'Column break',
    inactiveLabel: 'Column break, inactive',
};
const key = new PluginKey<() => ColumnState>('rte.columns');

/** The session's columns, or one column for a state that no editor session made. */
export const columnsOf = (state: EditorState): ColumnState => {
    const read = key.getState(state);
    if (read === undefined) {
        return ONE_COLUMN;
    }
    return read();
};

/** A column break's attributes in the editor: a labelled separator, named and marked inactive when it forces no break. */
const breakAttrs = (active: boolean, columns: ColumnState): Record<string, string> => {
    if (active) {
        return { role: 'separator', 'aria-label': columns.label, 'data-rte-column-break': 'active' };
    }
    return { role: 'separator', 'aria-label': columns.inactiveLabel, 'data-rte-column-break': 'inactive' };
};

/** Each column break as a labelled separator, active for the first `count - 1` while the surface has room for the columns. */
const breakDecorations = (doc: ProseMirrorNode, columns: ColumnState): DecorationSet => {
    const decorations: Decoration[] = [];
    let index = 0;
    // A column break sits only between top-level blocks.
    let offset = 0;
    for (let child = 0; child < doc.childCount; child += 1) {
        const node = doc.child(child);
        if (node.type.name === COLUMN_BREAK) {
            const active = columns.fits && index < columns.count - 1;
            decorations.push(Decoration.node(offset, offset + node.nodeSize, breakAttrs(active, columns)));
            index += 1;
        }
        offset += node.nodeSize;
    }
    return DecorationSet.create(doc, decorations);
};

/** The session's columns, which `read` gives, as the column break decorations and the count `column.break.insert` reads. */
export const columnsPlugin = (read: () => ColumnState): Plugin => {
    let drawn:
        | { readonly doc: ProseMirrorNode; readonly columns: ColumnState; readonly set: DecorationSet }
        | undefined;
    return new Plugin({
        key,
        state: { init: () => read, apply: (_transaction, value) => value },
        props: {
            decorations: (state) => {
                const columns = read();
                if (drawn === undefined || drawn.doc !== state.doc || drawn.columns !== columns) {
                    drawn = { doc: state.doc, columns, set: breakDecorations(state.doc, columns) };
                }
                return drawn.set;
            },
        },
    });
};

/** Whether two column states show the same, so an equal one draws nothing again. */
export const sameColumns = (a: ColumnState, b: ColumnState): boolean =>
    a.count === b.count && a.fits === b.fits && a.label === b.label && a.inactiveLabel === b.inactiveLabel;
