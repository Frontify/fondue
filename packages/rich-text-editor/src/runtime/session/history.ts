/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node } from 'prosemirror-model';
import { type EditorState, type Selection, type Transaction } from 'prosemirror-state';

import { COMMAND_META, ORIGIN_META } from '#/definition';

import { carrySlots } from '../capabilities/media/uploadSlots';
import { groupRoot, isHistoryTransaction, reset } from '../history';
import { type InputSettling } from '../settle';
import { type ChangeOrigin } from '../types';

import { type Lifecycle } from './lifecycle';
import { type Store } from './store';

const UI_ORIGINS: ReadonlySet<string> = new Set(['paste', 'cut', 'drop']);

/** The origin of an action that one undo reverts on its own: a command, paste, cut or drop. */
export const actionOrigin = (root: Transaction): ChangeOrigin | undefined => {
    const event: unknown = root.getMeta('uiEvent');
    if (root.getMeta(COMMAND_META) !== undefined) {
        return 'command';
    }

    if (typeof event === 'string' && UI_ORIGINS.has(event)) {
        return event as ChangeOrigin;
    }

    return undefined;
};

/** Where a batch came from: typing is a DOM change after a recorded `beforeinput`, which `commit` marks. */
export const originOf = (root: Transaction): ChangeOrigin => {
    // Undo and redo report `history` whether a key, a command or the browser ran them.
    if (isHistoryTransaction(root)) {
        return 'history';
    }

    if (root.getMeta(ORIGIN_META) === 'async') {
        return 'async';
    }

    const action = actionOrigin(root);
    if (action !== undefined) {
        return action;
    }

    if (root.getMeta(ORIGIN_META) === 'input') {
        return 'input';
    }

    return 'unknown';
};

export type HistoryService = {
    /** Ends the open undo group before `root` when the batch before it asked, and around it when it is an action. */
    group(root: Transaction): void;
    /** A new state with the same plugins and an empty history, holding `doc` and `selection`. */
    fresh(doc?: Node, selection?: Selection): EditorState;
    /** Empties the history and keeps the document and selection; does nothing outside `ready` or while composing. */
    clear(): void;
};

export const createHistory = ({
    store,
    lifecycle,
    composition,
    notify,
    install,
    publish,
    uploads,
}: {
    store: Store;
    lifecycle: Lifecycle;
    composition: Pick<InputSettling, 'active'>;
    notify: () => void;
    install: (next: EditorState) => boolean;
    publish: () => void;
    uploads: (doc: Node, keep?: boolean) => void;
}): HistoryService => ({
    group: (root) => {
        groupRoot(store.state, root, actionOrigin(root) !== undefined);
    },
    fresh: (doc, selection) => reset(store.state, doc, selection),
    clear: () => {
        if (!lifecycle.is('ready') || composition.active()) {
            return;
        }

        const fresh = reset(store.state);
        // Uploads that run go on, so their slots keep what Cancel restores.
        if (install(fresh.apply(carrySlots(store.state, fresh)))) {
            publish();
            uploads(store.state.doc, true);
            notify();
        }
    },
});
