/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Plugin as PmPlugin, TextSelection } from 'prosemirror-state';
import { type EditorView } from 'prosemirror-view';

/**
 * An inline node (a mention) cannot be half selected: it is one character to
 * the engine. A drag that ends partway into one would otherwise snap to its
 * near side and leave it out — so it looked unselected while the mouse was
 * plainly over it. This extends the selection to the node's FAR side instead,
 * so a partly covered node counts as selected.
 */

const islandOf = (view: EditorView, node: Node | null): HTMLElement | null => {
    const element = node instanceof HTMLElement ? node : (node?.parentElement ?? null);
    const island = element?.closest<HTMLElement>('[contenteditable="false"]') ?? null;
    return island !== null && island !== view.dom && view.dom.contains(island) ? island : null;
};

const extendOverIsland = (view: EditorView, settled: boolean): void => {
    const dom = view.dom.ownerDocument.getSelection();
    if (!dom || dom.isCollapsed) {
        return;
    }
    const island = islandOf(view, dom.focusNode);
    const parent = island?.parentNode;
    if (!island || !parent) {
        return;
    }
    const before = view.posAtDOM(parent, Array.prototype.indexOf.call(parent.childNodes, island));
    const node = view.state.doc.nodeAt(before);
    if (!node?.isInline || !node.isAtom) {
        return;
    }
    const after = before + node.nodeSize;
    const { anchor, head } = view.state.selection;
    const farSide = anchor <= before ? after : before;
    if (head !== farSide) {
        view.dispatch(view.state.tr.setSelection(TextSelection.create(view.state.doc, anchor, farSide)));
    }
    // The browser's own selection still ends inside the node, so what it paints
    // stops short of the text up to it. Moved once the mouse is up — during a
    // drag the browser owns it and would move it right back.
    if (settled) {
        const index = Array.prototype.indexOf.call(parent.childNodes, island);
        dom.extend(parent, farSide === after ? index + 1 : index);
    }
};

export const wholeIslandsPlugin = (): PmPlugin =>
    new PmPlugin({
        view: (view) => {
            const document = view.dom.ownerDocument;
            let mouseDown = false;
            // After the engine has read the same change, so this adjusts its
            // result rather than racing it.
            const onSelectionChange = (): void => queueMicrotask(() => extendOverIsland(view, !mouseDown));
            const onMouseDown = (): void => {
                mouseDown = true;
            };
            const onMouseUp = (): void => {
                mouseDown = false;
                queueMicrotask(() => extendOverIsland(view, true));
            };
            document.addEventListener('selectionchange', onSelectionChange);
            document.addEventListener('mousedown', onMouseDown);
            document.addEventListener('mouseup', onMouseUp);
            return {
                destroy: () => {
                    document.removeEventListener('selectionchange', onSelectionChange);
                    document.removeEventListener('mousedown', onMouseDown);
                    document.removeEventListener('mouseup', onMouseUp);
                },
            };
        },
    });
