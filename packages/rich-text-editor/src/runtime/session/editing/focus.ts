/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Selection } from 'prosemirror-state';

import { keepScroll } from '../../dom/scroll';
import { type Lifecycle } from '../state/lifecycle';
import { type ModeService } from '../state/mode';
import { type Shown } from '../state/shown';
import { type Store } from '../state/store';

import { type Commit } from './commit';
import { type ViewService } from './view';

export type Focus = {
    focus(where?: 'current' | 'start' | 'end'): void;
    /**
     * Gives focus back to a surface that had it when the replacement started, editable or readonly, unless focus moved
     * on meanwhile, in its own document or out of it to a parent page; Chromium blurs a focused surface whose
     * `contenteditable` turns false.
     */
    refocus(focused: boolean): void;
};

export const createFocus = (args: {
    lifecycle: Pick<Lifecycle, 'is'>;
    view: Pick<ViewService, 'current'>;
    store: Store;
    commit: Pick<Commit, 'commit'>;
    shown: Pick<Shown, 'mode'>;
    mode: Pick<ModeService, 'disabled'>;
}): Focus => {
    const { lifecycle, view: views, store, commit, shown, mode } = args;
    const focus = (where: 'current' | 'start' | 'end' = 'current') => {
        if (!lifecycle.is('ready') || views.current() === undefined) {
            return;
        }

        if (where === 'start') {
            commit.commit(store.state.tr.setSelection(Selection.atStart(store.state.doc)));
        }

        if (where === 'end') {
            commit.commit(store.state.tr.setSelection(Selection.atEnd(store.state.doc)));
        }

        // A listener of those commits may have ended the session, which leaves no view.
        const view = views.current();
        if (view === undefined) {
            return;
        }

        if (shown.mode() === 'editable') {
            // WebKit reveals the surface's old DOM selection on focus, before ProseMirror writes the current one.
            const restore = keepScroll(view.dom);
            view.focus();
            restore();

            return;
        }

        // ProseMirror's `focus()` does nothing while the view is not editable, and it syncs no DOM selection there.
        view.dom.focus();
        const anchor = view.domAtPos(store.state.selection.anchor);
        const head = view.domAtPos(store.state.selection.head);
        const selection = view.dom.ownerDocument.getSelection();
        if (selection !== null) {
            selection.setBaseAndExtent(anchor.node, anchor.offset, head.node, head.offset);
        }
    };

    const refocus = (focused: boolean) => {
        // A disabled surface leaves the Tab order and takes no focus.
        const view = views.current();
        if (!focused || mode.disabled() || view === undefined) {
            return;
        }

        const owner = view.dom.ownerDocument;
        const { activeElement, body } = owner;
        if (owner.hasFocus() && (activeElement === null || activeElement === body)) {
            focus();
        }
    };

    return { focus, refocus };
};
