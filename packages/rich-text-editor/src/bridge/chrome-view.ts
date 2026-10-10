/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Decoration, DecorationSet, type EditorView } from 'prosemirror-view';

// ProseMirror's own default margin, kept beyond the space the chrome covers.
const MARGIN = 5;

/** What editor chrome sets on the view: the selection it keeps visible and the space it covers at the viewport edges. */
export interface ChromeView {
    /** Gives a newly attached view the chrome's props, which ProseMirror merges with the runtime's own. */
    take(view: EditorView): void;
    /** Shows the selection through a decoration while focus is in editor chrome (SPEC-rich-text-accessibility/AC-067). */
    showSelection(shown: boolean): void;
    /** The height a sticky toolbar covers at the top of the viewport (SPEC-rich-text-accessibility/AC-024). */
    setTopInset(height: number): void;
    /** The height the on-screen keyboard covers at the bottom of the viewport. */
    setBottomInset(height: number): void;
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

export const createChromeView = (): ChromeView => {
    let view: EditorView | undefined;
    let shown = false;
    // ProseMirror reads these objects on each scroll, so rewriting their fields needs no new props.
    const margin = { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN };
    const threshold = { top: 0, bottom: 0, left: 0, right: 0 };
    const decorations = (state: EditorView['state']) => {
        const { selection } = state;
        if (!shown || selection.empty) {
            return null;
        }
        return DecorationSet.create(state.doc, [
            Decoration.inline(selection.from, selection.to, { 'data-rte-selection': '' }),
        ]);
    };
    return {
        take: (next) => {
            view = next;
            next.setProps({ decorations, scrollMargin: margin, scrollThreshold: threshold });
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
        setBottomInset: (height) => {
            threshold.bottom = height;
            margin.bottom = height + MARGIN;
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
        const toolbar = element.querySelector(':scope > [data-rte-chrome] [data-rte-node-chrome]');
        if (toolbar instanceof HTMLElement) {
            return toolbar;
        }
    }
    return null;
};
