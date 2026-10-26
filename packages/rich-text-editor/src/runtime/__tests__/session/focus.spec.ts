/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Schema } from 'prosemirror-model';
import { EditorState, Selection, type Transaction } from 'prosemirror-state';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { createFocus } from '../../session/editing/focus';
import { createLifecycle } from '../../session/state/lifecycle';
import { createStore } from '../../session/state/store';

const schema = new Schema({
    nodes: {
        doc: { content: 'paragraph+' },
        paragraph: { content: 'text*', group: 'block' },
        text: {},
    },
});
const doc = schema.node('doc', null, [
    schema.node('paragraph', null, [schema.text('one')]),
    schema.node('paragraph', null, [schema.text('two')]),
]);

const setup = (options: { mode?: 'editable' | 'readonly'; disabled?: boolean; withView?: boolean } = {}) => {
    const store = createStore(EditorState.create({ doc, selection: Selection.atStart(doc) }));
    const lifecycle = createLifecycle();
    lifecycle.to('ready');
    const dom = document.createElement('div');
    document.body.append(dom);
    const view = { dom, focus: vi.fn(), domAtPos: () => ({ node: dom, offset: 0 }) };
    const roots: Transaction[] = [];
    const current: { view: typeof view | undefined } = { view: options.withView === false ? undefined : view };
    const service = createFocus({
        lifecycle,
        view: { current: () => current.view as never },
        store,
        commit: {
            commit: (root) => {
                roots.push(root);
                store.set(store.state.apply(root));
            },
        },
        shown: { mode: () => options.mode ?? 'editable' },
        mode: { disabled: () => options.disabled ?? false },
    });

    return { service, store, lifecycle, view, roots, current, dom };
};

afterEach(() => {
    vi.restoreAllMocks();
    document.body.replaceChildren();
});

describe('createFocus', () => {
    it('focuses an editable view through the view and commits nothing for current', () => {
        const { service, view, roots } = setup();
        service.focus();
        expect(view.focus).toHaveBeenCalledTimes(1);
        expect(roots).toEqual([]);
    });

    it('commits a selection at the start or the end first', () => {
        const { service, store, roots } = setup();
        service.focus('end');
        expect(roots).toHaveLength(1);
        expect(store.state.selection.eq(Selection.atEnd(doc))).toBe(true);
        service.focus('start');
        expect(roots).toHaveLength(2);
        expect(store.state.selection.eq(Selection.atStart(doc))).toBe(true);
    });

    it('does nothing when the session is not ready or has no view', () => {
        const without = setup({ withView: false });
        without.service.focus('end');
        expect(without.roots).toEqual([]);
        const faulted = setup();
        faulted.lifecycle.to('faulted');
        faulted.service.focus('end');
        expect(faulted.roots).toEqual([]);
        expect(faulted.view.focus).not.toHaveBeenCalled();
    });

    it('focuses the surface itself, not the view, when readonly', () => {
        const { service, view, dom } = setup({ mode: 'readonly' });
        const focus = vi.spyOn(dom, 'focus');
        service.focus();
        expect(view.focus).not.toHaveBeenCalled();
        expect(focus).toHaveBeenCalledTimes(1);
    });

    it('refocuses only a surface that had focus and sees no other focus', () => {
        const { service, view } = setup();
        service.refocus(false);
        expect(view.focus).not.toHaveBeenCalled();
        vi.spyOn(document, 'hasFocus').mockReturnValue(true);
        service.refocus(true);
        expect(view.focus).toHaveBeenCalledTimes(1);
        const other = document.createElement('input');
        document.body.append(other);
        other.focus();
        service.refocus(true);
        expect(view.focus).toHaveBeenCalledTimes(1);
    });

    it('never refocuses a disabled surface', () => {
        const { service, view } = setup({ disabled: true });
        vi.spyOn(document, 'hasFocus').mockReturnValue(true);
        service.refocus(true);
        expect(view.focus).not.toHaveBeenCalled();
    });
});
