/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node as ProseMirrorNode } from 'prosemirror-model';
import {
    Decoration,
    DecorationSet,
    type DirectEditorProps,
    type EditorView,
    type NodeViewConstructor,
} from 'prosemirror-view';

import { firstBlockId, labelsFirstBlock } from './node-views';

// ProseMirror's own default margin, kept beyond the space the chrome covers.
const MARGIN = 5;

/** What editor chrome sets on the view: the selection it keeps visible and the space it covers at the viewport edges. */
export interface ChromeView {
    /** The chrome's props for a view about to be built on `surface` with `nodeViews`, so its first draw carries them. */
    props(surface: HTMLElement, nodeViews: Readonly<Record<string, NodeViewConstructor>>): Partial<DirectEditorProps>;
    /** Takes the view built with `props`, which later chrome changes redraw. */
    take(view: EditorView): void;
    /** Shows the selection through a decoration while focus is in editor chrome. */
    showSelection(shown: boolean): void;
    /** The height a sticky toolbar covers at the top of the viewport. */
    setTopInset(height: number): void;
    /** The height the on-screen keyboard covers at the bottom of the viewport. */
    setKeyboardInset(height: number): void;
    /** The height a toolbar docked right above the on-screen keyboard adds to it, or 0. */
    setDockedInset(height: number): void;
}

// Node chrome controls keep the caret's top margin clear of the sticky toolbar when they scroll into view.
const CHROME_SCROLL_MARGIN = '--rte-chrome-scroll-margin';

/** Writes the chrome scroll margin while a toolbar covers the top, and leaves the surface's attributes alone otherwise. */
const writeChromeMargin = (view: EditorView | undefined, height: number) => {
    if (view === undefined) {
        return;
    }
    if (height === 0) {
        view.dom.style.removeProperty(CHROME_SCROLL_MARGIN);
        return;
    }
    view.dom.style.setProperty(CHROME_SCROLL_MARGIN, `${height + MARGIN}px`);
};

/**
 * A node decoration with the `firstBlockId` on the first block of each node `labelsFirstBlock` names.
 */
const contentDecorations = (
    surface: HTMLElement,
    nodeViews: Readonly<Record<string, NodeViewConstructor>>,
    doc: ProseMirrorNode,
): Decoration[] => {
    const found: Decoration[] = [];
    const visit = (parent: ProseMirrorNode, start: number) => {
        let pos = start;
        for (let index = 0; index < parent.childCount; index += 1) {
            const child = parent.child(index);
            const viewed = Object.hasOwn(nodeViews, child.type.name);
            const labeled = labelsFirstBlock(child);
            if (viewed && labeled !== undefined) {
                found.push(
                    Decoration.node(pos + 1, pos + 1 + labeled.block.nodeSize, {
                        id: firstBlockId(surface, labeled.nodeId),
                    }),
                );
            }
            if (!child.isTextblock) {
                visit(child, pos + 1);
            }
            pos += child.nodeSize;
        }
    };
    visit(doc, 0);
    return found;
};

export const createChromeView = (): ChromeView => {
    let view: EditorView | undefined;
    let surface: HTMLElement | undefined;
    let nodeViews: Readonly<Record<string, NodeViewConstructor>> = {};
    let shown = false;
    // ProseMirror reads these objects on each scroll, so rewriting their fields needs no new props.
    const margin = { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN };
    const threshold = { top: 0, bottom: 0, left: 0, right: 0 };
    // The bottom band sums both parts, so a new keyboard measure keeps the docked toolbar's.
    const bottom = { keyboard: 0, docked: 0 };
    const writeBottom = () => {
        threshold.bottom = bottom.keyboard + bottom.docked;
        margin.bottom = threshold.bottom + MARGIN;
    };
    // A selection change keeps the document, so it draws no content decoration again.
    let markers = new WeakMap<ProseMirrorNode, DecorationSet>();
    const listsOf = (doc: ProseMirrorNode) => {
        if (surface === undefined) {
            return DecorationSet.empty;
        }
        let lists = markers.get(doc);
        if (lists === undefined) {
            lists = DecorationSet.create(doc, contentDecorations(surface, nodeViews, doc));
            markers.set(doc, lists);
        }
        return lists;
    };
    const decorations = (state: EditorView['state']) => {
        const { doc, selection } = state;
        const lists = listsOf(doc);
        if (!shown || selection.empty) {
            return lists;
        }
        return lists.add(doc, [Decoration.inline(selection.from, selection.to, { 'data-rte-selection': '' })]);
    };
    return {
        props: (next, views) => {
            surface = next;
            nodeViews = views;
            markers = new WeakMap();
            return { decorations, scrollMargin: margin, scrollThreshold: threshold };
        },
        take: (next) => {
            view = next;
            writeChromeMargin(next, threshold.top);
        },
        showSelection: (next) => {
            if (shown === next) {
                return;
            }
            shown = next;
            view?.setProps({});
        },
        // A caret inside the covered band starts a scroll only when the threshold covers it too.
        setTopInset: (height) => {
            threshold.top = height;
            margin.top = height + MARGIN;
            writeChromeMargin(view, height);
        },
        setKeyboardInset: (height) => {
            bottom.keyboard = height;
            writeBottom();
        },
        setDockedInset: (height) => {
            bottom.docked = height;
            writeBottom();
        },
    };
};

/** Ends a composition while focus stays in the surface: the browser commits composed text when the surface blurs. */
export const endComposition = (view: EditorView | undefined): void => {
    if (view === undefined) {
        return;
    }
    view.dom.blur();
    view.focus();
};

/** The node chrome toolbar of the innermost node at the selection that has one: the selected node or the node holding the caret. */
export const nodeChromeAt = (view: EditorView): HTMLElement | null => {
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
