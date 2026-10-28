/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Schema } from 'prosemirror-model';
import { EditorState, TextSelection } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { afterEach, expect, it, vi } from 'vitest';

import { failNetworkInThisFile } from '#/testing/__tests__/fixtures/network';

import { createInputSettling, SETTLE_MS } from '../dom/settle';

failNetworkInThisFile();

// ProseMirror reads the platform once when it loads, so the Android user agent is set before any import runs.
vi.hoisted(() => {
    Object.defineProperty(navigator, 'userAgent', { value: 'Mozilla/5.0 (Linux; Android 14) Chrome/126.0 Mobile' });
});

const schema = new Schema({
    nodes: { doc: { content: 'paragraph+' }, paragraph: { content: 'text*', toDOM: () => ['p', 0] }, text: {} },
    marks: { strong: { toDOM: () => ['strong', 0], parseDOM: [{ tag: 'strong' }] } },
});

const textNodeOf = (editor: EditorView) => {
    const text = editor.dom.firstChild?.firstChild;
    if (!(text instanceof Text)) {
        throw new Error('The view has no text.');
    }

    return text;
};

afterEach(() => {
    vi.useRealTimers();
    document.body.replaceChildren();
});

it('settles input once ProseMirror ends an idle Android composition with no compositionend', async () => {
    vi.useFakeTimers();
    const settled = vi.fn();
    let view: EditorView | undefined;
    const settling = createInputSettling(
        () => view !== undefined && view.composing,
        settled,
        () => undefined,
        () => 0,
    );
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
    await vi.advanceTimersByTimeAsync(0);
    await vi.advanceTimersByTimeAsync(SETTLE_MS);

    expect([settling.active(), settled.mock.calls.length]).toEqual([false, 1]);
    view.destroy();
});

it('announces the next composition after the settle callback throws', async () => {
    vi.useFakeTimers();
    const seen: boolean[] = [];
    let fail = true;
    let view: EditorView | undefined;
    const settling = createInputSettling(
        () => view !== undefined && view.composing,
        () => {
            if (fail) {
                fail = false;
                throw new Error('settle failed');
            }
        },
        () => {
            seen.push(settling.active());
        },
        () => 0,
    );
    const doc = schema.node('doc', null, [schema.node('paragraph', null, [schema.text('ab')])]);
    view = new EditorView(document.body.appendChild(document.createElement('div')), {
        state: EditorState.create({ doc, plugins: [settling.plugin] }),
    });
    view.dom.dispatchEvent(new CompositionEvent('compositionstart'));
    view.dom.dispatchEvent(new CompositionEvent('compositionend'));
    await vi.advanceTimersByTimeAsync(0);
    await expect(vi.advanceTimersByTimeAsync(SETTLE_MS)).rejects.toThrow('settle failed');
    seen.splice(0);

    view.dom.dispatchEvent(new CompositionEvent('compositionstart'));
    expect(seen).toContain(true);
    view.dom.dispatchEvent(new CompositionEvent('compositionend'));
    await vi.advanceTimersByTimeAsync(0);
    await vi.advanceTimersByTimeAsync(SETTLE_MS);
    expect(seen.at(-1)).toBe(false);
    view.destroy();
});

it('settles a composition that starts again during the settle window when Android ends it', async () => {
    vi.useFakeTimers();
    const settled = vi.fn();
    let view: EditorView | undefined;
    const settling = createInputSettling(
        () => view !== undefined && view.composing,
        settled,
        () => undefined,
        () => 0,
    );
    const doc = schema.node('doc', null, [schema.node('paragraph', null, [schema.text('ab')])]);
    view = new EditorView(document.body.appendChild(document.createElement('div')), {
        state: EditorState.create({ doc, plugins: [settling.plugin] }),
    });
    const selectAll = () => {
        view?.dispatch(view.state.tr.setSelection(TextSelection.create(view.state.doc, 1, 3)));
    };

    view.focus();
    selectAll();
    view.dom.dispatchEvent(new CompositionEvent('compositionstart'));
    view.dom.dispatchEvent(new CompositionEvent('compositionend'));
    expect(view.state.selection.empty).toBe(false);
    view.dom.dispatchEvent(new CompositionEvent('compositionstart'));
    await vi.advanceTimersByTimeAsync(0);
    const text = textNodeOf(view);
    const composed = document.createTextNode(`${text.data}cd`);
    text.parentNode?.replaceChild(composed, text);
    const range = document.createRange();
    range.setStart(composed, composed.length);
    range.collapse(true);
    const domSelection = document.getSelection();
    domSelection?.removeAllRanges();
    domSelection?.addRange(range);
    await vi.advanceTimersByTimeAsync(0);
    await vi.advanceTimersByTimeAsync(5000);
    await vi.advanceTimersByTimeAsync(0);
    await vi.advanceTimersByTimeAsync(SETTLE_MS);

    expect(settled).toHaveBeenCalledTimes(1);
    expect(view.state.doc.textContent).toContain('cd');
    view.destroy();
});

it('does not settle an unrelated edit after stored marks end the composition in a microtask', async () => {
    vi.useFakeTimers();
    const settled = vi.fn();
    let view: EditorView | undefined;
    const settling = createInputSettling(
        () => view !== undefined && view.composing,
        settled,
        () => undefined,
        () => 0,
    );
    const doc = schema.node('doc', null, [schema.node('paragraph', null, [schema.text('ab')])]);
    view = new EditorView(document.body.appendChild(document.createElement('div')), {
        state: EditorState.create({ doc, plugins: [settling.plugin] }),
    });
    const mark = schema.marks.strong.create();
    view.dispatch(view.state.tr.addStoredMark(mark));
    view.dom.dispatchEvent(new CompositionEvent('compositionstart'));
    queueMicrotask(() => {
        view?.dispatch(view.state.tr);
    });
    await vi.advanceTimersByTimeAsync(0);
    view.dispatch(view.state.tr.insertText('z'));
    await vi.advanceTimersByTimeAsync(0);
    await vi.advanceTimersByTimeAsync(SETTLE_MS);

    expect(settled).not.toHaveBeenCalled();
    expect(settling.active()).toBe(true);
    view.dom.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', keyCode: 65, bubbles: true, isComposing: false }));
    expect(settled).not.toHaveBeenCalled();
    expect(settling.active()).toBe(true);
    await vi.advanceTimersByTimeAsync(0);
    await vi.advanceTimersByTimeAsync(SETTLE_MS);

    expect(settled).toHaveBeenCalledTimes(1);
    expect(settling.active()).toBe(false);
    view.destroy();
});

it('does not settle an unrelated edit after a compositionstart listener stores a mark', async () => {
    vi.useFakeTimers();
    const settled = vi.fn();
    let view: EditorView | undefined;
    const settling = createInputSettling(
        () => view !== undefined && view.composing,
        settled,
        () => undefined,
        () => 0,
    );
    const doc = schema.node('doc', null, [schema.node('paragraph', null, [schema.text('ab')])]);
    view = new EditorView(document.body.appendChild(document.createElement('div')), {
        state: EditorState.create({ doc, plugins: [settling.plugin] }),
    });
    const mark = schema.marks.strong.create();
    view.dom.addEventListener('compositionstart', () => {
        view?.dispatch(view.state.tr.addStoredMark(mark));
    });
    view.dom.dispatchEvent(new CompositionEvent('compositionstart'));
    await vi.advanceTimersByTimeAsync(0);
    view.dispatch(view.state.tr.insertText('z'));
    await vi.advanceTimersByTimeAsync(0);
    await vi.advanceTimersByTimeAsync(SETTLE_MS);

    expect(settled).not.toHaveBeenCalled();
    expect(settling.active()).toBe(true);
    view.dom.dispatchEvent(
        new InputEvent('beforeinput', { bubbles: true, isComposing: false, inputType: 'insertText' }),
    );
    expect(settled).not.toHaveBeenCalled();
    expect(settling.active()).toBe(true);
    await vi.advanceTimersByTimeAsync(0);
    await vi.advanceTimersByTimeAsync(SETTLE_MS);

    expect(settled).toHaveBeenCalledTimes(1);
    expect(settling.active()).toBe(false);
    view.destroy();
});

it('does not settle a later selection after an idle end that never updates the view', async () => {
    vi.useFakeTimers();
    const settled = vi.fn();
    let view: EditorView | undefined;
    const settling = createInputSettling(
        () => view !== undefined && view.composing,
        settled,
        () => undefined,
        () => 0,
    );
    const doc = schema.node('doc', null, [schema.node('paragraph', null, [schema.text('ab')])]);
    view = new EditorView(document.body.appendChild(document.createElement('div')), {
        state: EditorState.create({ doc, plugins: [settling.plugin] }),
    });
    view.focus();
    view.dispatch(view.state.tr.setSelection(TextSelection.create(view.state.doc, 1, 3)));
    view.dom.dispatchEvent(new CompositionEvent('compositionstart'));
    await vi.advanceTimersByTimeAsync(5000);
    view.dispatch(view.state.tr.setSelection(TextSelection.create(view.state.doc, 1)));
    await vi.advanceTimersByTimeAsync(0);
    await vi.advanceTimersByTimeAsync(SETTLE_MS);

    expect(settled).not.toHaveBeenCalled();
    expect(settling.active()).toBe(true);
    view.dom.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', keyCode: 65, bubbles: true, isComposing: false }));
    expect(settled).not.toHaveBeenCalled();
    expect(settling.active()).toBe(true);
    await vi.advanceTimersByTimeAsync(0);
    await vi.advanceTimersByTimeAsync(SETTLE_MS);

    expect(settled).toHaveBeenCalledTimes(1);
    expect(settling.active()).toBe(false);
    view.destroy();
});
