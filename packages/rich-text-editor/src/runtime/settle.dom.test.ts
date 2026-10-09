/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Schema } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { afterEach, expect, it, vi } from 'vitest';

import { createTestEnvironment } from '#/testing';

import { createInputSettling } from './settle';

// ProseMirror reads the platform once when it loads, so the Android user agent is set before any import runs.
vi.hoisted(() => {
    Object.defineProperty(navigator, 'userAgent', { value: 'Mozilla/5.0 (Linux; Android 14) Chrome/126.0 Mobile' });
});

const schema = new Schema({
    nodes: { doc: { content: 'paragraph+' }, paragraph: { content: 'text*', toDOM: () => ['p', 0] }, text: {} },
});

afterEach(() => {
    vi.useRealTimers();
    document.body.replaceChildren();
});

it('SPEC-rich-text-runtime/AC-070 settles input once ProseMirror ends an idle Android composition with no compositionend', async () => {
    vi.useFakeTimers();
    const environment = createTestEnvironment({ seed: 1 });
    const settled = vi.fn();
    let view: EditorView | undefined;
    const settling = createInputSettling(environment, () => view !== undefined && view.composing, settled);
    const doc = schema.node('doc', null, [schema.node('paragraph', null, [schema.text('ab')])]);
    view = new EditorView(document.body.appendChild(document.createElement('div')), {
        state: EditorState.create({ doc, plugins: [settling.plugin] }),
    });
    view.focus();
    view.dom.dispatchEvent(new CompositionEvent('compositionstart'));
    // ProseMirror marks the composed text it reads from the DOM with its composition ID.
    view.dispatch(view.state.tr.insertText('x').setMeta('composition', 1));

    // ProseMirror's Android timer ends a composition after 5 s with no input.
    vi.advanceTimersByTime(5000);
    expect([view.composing, settling.active(), settled.mock.calls.length]).toEqual([false, true, 0]);
    await environment.flushMicrotasks();
    environment.advance(20);

    expect([settling.active(), settled.mock.calls.length]).toEqual([false, 1]);
    view.destroy();
});
