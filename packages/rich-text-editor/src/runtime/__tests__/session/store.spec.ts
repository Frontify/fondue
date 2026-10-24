/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Schema } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { describe, expect, it } from 'vitest';

import { createStore } from '../../session/store';

const schema = new Schema({
    nodes: { doc: { content: 'paragraph+' }, paragraph: { content: 'text*' }, text: {} },
});
const make = (text: string) =>
    EditorState.create({
        doc: schema.node('doc', undefined, [
            schema.node('paragraph', undefined, text === '' ? [] : [schema.text(text)]),
        ]),
    });

describe('createStore', () => {
    it('reads the initial state until a new one is set', () => {
        const initial = make('a');
        const store = createStore(initial);
        expect(store.state).toBe(initial);
        expect(store.state).toBe(initial);
    });

    it('returns the latest state that was set, by identity', () => {
        const store = createStore(make('a'));
        const next = make('b');
        store.set(next);
        expect(store.state).toBe(next);
        const last = make('c');
        store.set(last);
        expect(store.state).toBe(last);
    });

    it('lets a detached reader see later writes', () => {
        const store = createStore(make('a'));
        const read = () => store.state;
        const next = make('b');
        store.set(next);
        expect(read()).toBe(next);
    });
});
