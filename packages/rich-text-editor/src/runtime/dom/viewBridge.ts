/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DOMSerializer, type Node as ProseMirrorNode, type Schema } from 'prosemirror-model';
import {
    type DirectEditorProps,
    type EditorView,
    type MarkViewConstructor,
    type NodeView,
    type NodeViewConstructor,
} from 'prosemirror-view';

/** The view on the editing surface, which the bridge holds without reading the engine's API. */
export type SurfaceView = EditorView;

/** The props a chrome view hands to the view it builds. */
export type ViewProps = Partial<DirectEditorProps>;

/** A document node, which the bridge passes to the helpers here. */
export type ViewNode = ProseMirrorNode;

/** The editor's schema, which the mark views are built from. */
export type ViewSchema = Schema;

/** What the view calls to build the view of one node. */
export type ViewNodeConstructor = NodeViewConstructor;

/** The view of one node, as the view reads it. */
export type ViewNodeView = NodeView;

/** What the view calls to build the view of each mark, by mark name. */
export type ViewMarkViews = Readonly<Record<string, MarkViewConstructor>>;

/** The caret rectangle at `pos`, as a zero-width box on its line. */
const positionRect = (view: SurfaceView, pos: number): DOMRect => {
    const caret = view.coordsAtPos(pos, 1);

    return new DOMRect(caret.left, caret.top, 0, caret.bottom - caret.top);
};

/** The caret rectangle at `pos`, or `undefined` for a position outside the document. */
export const caretRect = (view: SurfaceView, pos: number): DOMRect | undefined => {
    if (pos < 0 || pos > view.state.doc.content.size) {
        return undefined;
    }

    return positionRect(view, pos);
};

/** The box around the document range `from` to `to`, clamped to the document. */
export const rangeRect = (view: SurfaceView, from: number, to: number): DOMRect => {
    const size = view.state.doc.content.size;
    const start = view.domAtPos(Math.min(from, size));
    const end = view.domAtPos(Math.min(Math.max(to, from), size));
    const box = view.dom.ownerDocument.createRange();
    box.setStart(start.node, start.offset);
    box.setEnd(end.node, end.offset);

    return box.getBoundingClientRect();
};

/** The selection's rectangle: the selected node's box, the caret, or the box around every line of a text range. */
export const selectionRect = (view: SurfaceView): DOMRect => {
    const { selection } = view.state;
    if ('node' in selection) {
        const dom = view.nodeDOM(selection.from);
        if (dom instanceof Element) {
            return dom.getBoundingClientRect();
        }
    }

    if (selection.empty) {
        const caret = view.coordsAtPos(selection.head);

        return new DOMRect(caret.left, caret.top, 0, caret.bottom - caret.top);
    }

    const start = view.domAtPos(selection.from);
    const end = view.domAtPos(selection.to);
    const range = view.dom.ownerDocument.createRange();
    range.setStart(start.node, start.offset);
    range.setEnd(end.node, end.offset);

    return range.getBoundingClientRect();
};

/** Writes the editor selection to the DOM again after a portal flush, while the surface has focus. */
export const resyncSelection = (view: SurfaceView | undefined): void => {
    // A composition keeps its own DOM selection until it ends.
    if (view !== undefined && view.hasFocus() && !view.composing) {
        view.focus();
    }
};

/** Ends a composition while focus stays in the surface: the browser commits composed text when the surface blurs. */
export const endComposition = (view: SurfaceView | undefined): void => {
    if (view === undefined) {
        return;
    }

    view.dom.blur();
    view.focus();
};

/** Draws the view again with its current props. */
export const redraw = (view: SurfaceView | undefined): void => {
    view?.setProps({});
};

/** The node chrome toolbar of the innermost node at the selection that has one: the selected node or the node holding the caret. */
export const nodeChromeAt = (view: SurfaceView): HTMLElement | null => {
    const { selection } = view.state;
    let node: Node | null = view.domAtPos(selection.head).node;
    if ('node' in selection) {
        node = view.nodeDOM(selection.from);
    }

    let element: HTMLElement | null = null;
    if (node instanceof HTMLElement) {
        element = node;
    } else if (node !== null) {
        element = node.parentElement;
    }

    for (; element !== null && element !== view.dom; element = element.parentElement) {
        const chrome = element.querySelector(':scope > [data-rte-chrome]');
        if (chrome === null) {
            continue;
        }

        // Content a view places inside its chrome holds the chrome of other nodes, never this node's.
        const toolbar = [...chrome.querySelectorAll('[data-rte-node-chrome]')].find((candidate) => {
            const content = candidate.closest('[data-rte-content]');

            return content === null || !chrome.contains(content);
        });
        if (toolbar instanceof HTMLElement) {
            return toolbar;
        }
    }

    return null;
};

/** The tag of a node's view element: `span` for an inline node, `div` for a block. */
export const tagOf = (node: ViewNode) => {
    if (node.isInline) {
        return 'span';
    }

    return 'div';
};

/** The elements of `node`'s HTML spec from its outer element to its content hole; none for a spec with no hole. */
export const layersOf = (node: ViewNode, document: Document): readonly HTMLElement[] => {
    const spec = node.type.spec.toDOM?.(node);
    if (spec === undefined) {
        return [];
    }

    const { dom, contentDOM } = DOMSerializer.renderSpec(document, spec);
    const layers: HTMLElement[] = [];
    let at = contentDOM as HTMLElement | null | undefined;
    while (at !== null && at !== undefined) {
        layers.unshift(at);
        if (at === dom) {
            break;
        }

        at = at.parentElement;
    }

    return layers;
};

const viewIndexes = new WeakMap<HTMLElement, string>();
/**
 * The `id` that the chrome view's decoration gives the first block of the node `nodeId`, which names a node that
 * holds blocks, as a task item's text does without its child tasks; unique per surface, since a page may show a document twice.
 */
export const firstBlockId = (surface: HTMLElement, nodeId: string, domId: () => string): string => {
    let index = viewIndexes.get(surface);
    if (index === undefined) {
        index = domId();
        viewIndexes.set(surface, index);
    }

    return `rte-node-label-${index}-${encodeURIComponent(nodeId)}`;
};

/** The first block that carries `node`'s label id: a block container with a `nodeId`, not a textblock. */
export const labelsFirstBlock = (node: ViewNode): { nodeId: string; block: ViewNode } | undefined => {
    const block = node.firstChild;
    const { nodeId } = node.attrs;
    if (node.isAtom || node.isTextblock || block === null || !block.isBlock || typeof nodeId !== 'string') {
        return undefined;
    }

    return { nodeId, block };
};
