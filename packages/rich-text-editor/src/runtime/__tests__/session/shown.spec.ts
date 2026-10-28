/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Schema } from 'prosemirror-model';
import { AllSelection, EditorState, TextSelection } from 'prosemirror-state';
import { Mapping } from 'prosemirror-transform';
import { describe, expect, it } from 'vitest';

import { type RichTextDocument } from '#/model';

import { changed, createShown } from '../../session/state/shown';
import { createStore } from '../../session/state/store';
import { ONE_COLUMN } from '../../statePlugins/columns';
import { type DocumentStamp, type SaveStatus } from '../../types';

const schema = new Schema({
    nodes: { doc: { content: 'paragraph+' }, paragraph: { content: 'text*' }, text: {} },
});
const make = (text: string) =>
    EditorState.create({
        doc: schema.node('doc', undefined, [schema.node('paragraph', undefined, [schema.text(text)])]),
    });
const stamp = { documentId: 'd', sessionId: 's', generation: 0, sequence: 1 } as DocumentStamp;
const status = (revision: string | null) => ({ revision }) as unknown as SaveStatus;

const setup = () => {
    const store = createStore(make('ab'));
    const events: string[] = [];
    const state = { composing: false, status: status(null), encoded: 0 };
    const shown = createShown({
        store,
        mode: 'editable',
        columns: ONE_COLUMN,
        emit: (event, value) => events.push(`${event}:${JSON.stringify(value)}`),
        saveStatus: () => state.status,
        composing: () => state.composing,
        stamp: () => stamp,
        encodeByBlock: () => {
            state.encoded += 1;

            return { encoded: state.encoded } as unknown as RichTextDocument;
        },
    });

    return { shown, store, events, state };
};

describe('changed', () => {
    it('takes the new value and reports a change only when it differs', () => {
        const slot = { value: 1 };
        expect(changed(slot, 1, (left, right) => left === right)).toBe(false);
        expect(changed(slot, 2, (left, right) => left === right)).toBe(true);
        expect(slot.value).toBe(2);
    });

    it('keeps the old value when the comparison finds them equal', () => {
        const slot = { value: { n: 1 } };
        const first = slot.value;
        expect(changed(slot, { n: 1 }, (left, right) => left.n === right.n)).toBe(false);
        expect(slot.value).toBe(first);
    });
});

describe('createShown', () => {
    it('starts with the initial mode, columns and published state and follows sync', () => {
        const { shown, store } = setup();
        expect(shown.mode()).toBe('editable');
        expect(shown.columns()).toBe(ONE_COLUMN);
        expect(shown.published()).toBe(store.state);
        shown.sync('readonly', { ...ONE_COLUMN, count: 2 });
        expect(shown.mode()).toBe('readonly');
        expect(shown.columns().count).toBe(2);
    });

    it('replaces the published state', () => {
        const { shown } = setup();
        const next = make('c');
        shown.setPublished(next);
        expect(shown.published()).toBe(next);
    });

    it('keeps the first provisional mapping and appends later ones to it', () => {
        const { shown } = setup();
        expect(shown.provisional()).toBeUndefined();
        const first = new Mapping();
        shown.addProvisional(first);
        expect(shown.provisional()).toBe(first);
        shown.addProvisional(new Mapping());
        expect(shown.provisional()).toBe(first);
        expect(first.maps.length).toBe(0);
    });

    it('takes and drops the provisional mapping', () => {
        const { shown } = setup();
        const mapping = new Mapping();
        shown.addProvisional(mapping);
        expect(shown.takeProvisional()).toBe(mapping);
        expect(shown.provisional()).toBeUndefined();
        shown.addProvisional(new Mapping());
        shown.takeProvisional();
        expect(shown.takeProvisional()).toBeUndefined();
    });

    it('emits the selection only when its summary changes', () => {
        const { shown, store, events } = setup();
        shown.emitSelection();
        expect(events).toEqual([]);
        store.set(store.state.apply(store.state.tr.setSelection(TextSelection.create(store.state.doc, 2))));
        shown.emitSelection();
        expect(events).toEqual([]);
        store.set(store.state.apply(store.state.tr.setSelection(new AllSelection(store.state.doc))));
        shown.emitSelection();
        shown.emitSelection();
        expect(events).toHaveLength(1);
        expect(events[0]).toContain('selectionChange:');
        expect(events[0]).toContain('"kind":"all"');
    });

    it('emits the save status once per distinct status, and primeStatus counts as shown', () => {
        const { shown, state, events } = setup();
        shown.emitSaveStatus();
        expect(events).toHaveLength(1);
        shown.emitSaveStatus();
        expect(events).toHaveLength(1);
        const next = status('r1');
        state.status = next;
        shown.emitSaveStatus();
        expect(events).toHaveLength(2);
        const primed = setup();
        primed.shown.primeStatus();
        primed.shown.emitSaveStatus();
        expect(primed.events).toEqual([]);
    });

    it('serves the same snapshot until the document, composition or revision changes', () => {
        const { shown, state } = setup();
        const first = shown.snapshot();
        expect(shown.snapshot()).toBe(first);
        expect(state.encoded).toBe(1);
        state.composing = true;
        const second = shown.snapshot();
        expect(second).not.toBe(first);
        expect(second.compositionActive).toBe(true);
        expect(shown.snapshot()).toBe(second);
        state.status = status('r2');
        const third = shown.snapshot();
        expect(third).not.toBe(second);
        expect(third.acknowledgedRevision).toBe('r2');
        shown.setPublished(make('z'));
        expect(shown.snapshot()).not.toBe(third);
        expect(state.encoded).toBe(4);
    });

    it('encodes again after an encode that threw', () => {
        const store = createStore(make('ab'));
        const state = { fail: true };
        const shown = createShown({
            store,
            mode: 'editable',
            columns: ONE_COLUMN,
            emit: () => undefined,
            saveStatus: () => status(null),
            composing: () => false,
            stamp: () => stamp,
            encodeByBlock: () => {
                if (state.fail) {
                    throw new Error('encode');
                }

                return {} as RichTextDocument;
            },
        });
        expect(() => shown.snapshot()).toThrow('encode');
        state.fail = false;
        expect(shown.snapshot().stamp).toStrictEqual(stamp);
    });
});
