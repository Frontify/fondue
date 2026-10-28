/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, render } from '@testing-library/react';
import { EditorState } from 'prosemirror-state';
import { createRef, Profiler, StrictMode, Suspense, useState, useReducer, startTransition } from 'react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';

import { useCommandQuery } from '#/bridge/pluginApi/hooks/useCommandQuery';
import { useEditorSelection } from '#/bridge/pluginApi/hooks/useEditorSelection';
import { SessionContext } from '#/bridge/session/helpers/sessionContext';
import { defineEditor, type EditorHandle, RichTextEditor } from '#/index';
import { compileContentModel, type ContentNodeJSON } from '#/model';
import { featuresById } from '#/plugins';
import { pluginsFor } from '#/plugins/__tests__/fixtures/pluginsFor';
import { defineReactPresentation } from '#/react/compile/define';
import { isHistoryTransaction } from '#/runtime/history';
import { runtimeOf } from '#/runtime/runtime';

import { PERF_FEATURES, perfDocument } from '../../model/__tests__/fixtures/perf/documents';

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
});
afterEach(() => {
    vi.useRealTimers();
});

const CARET_MOVES = 50;

it('rerenders a component that selects the block type and a command state on no caret move that leaves them equal', () => {
    const model = compileContentModel(featuresById(PERF_FEATURES), { id: 'test.hook-renders', version: 1 });
    const definition = defineEditor({ id: 'test.hook-renders', model, plugins: pluginsFor(model) });
    // One plain paragraph long enough for every move, then a heading, so a move out of the paragraph changes the value.
    const plain = {
        type: 'paragraph',
        attrs: { lang: null },
        content: [{ type: 'text', text: 'a'.repeat(CARET_MOVES * 2) }],
    } as ContentNodeJSON;
    const heading = {
        type: 'heading',
        attrs: { nodeId: 'heading-1', level: 2, lang: null },
        content: [{ type: 'text', text: 'Heading' }],
    } as ContentNodeJSON;
    const document = {
        ...perfDocument('small', model),
        content: { type: 'doc', attrs: { lang: null, dir: 'auto' }, content: [plain, heading] },
    } as unknown as ReturnType<typeof perfDocument>;
    const seen: unknown[] = [];
    let renders = 0;
    const Subject = () => {
        const blockType = useEditorSelection((selection) => selection.blockType);
        const bold = useCommandQuery('mark.bold.toggle');
        seen.push([blockType, bold.active]);

        return null;
    };

    const ref = createRef<EditorHandle>();
    render(
        <RichTextEditor.Root
            aria-label="Notes"
            definition={definition}
            defaultValue={{ documentId: 'document-1', revision: null, document }}
            ref={ref}
        >
            <RichTextEditor.Surface />
            <Profiler id="subject" onRender={() => (renders += 1)}>
                <Subject />
            </Profiler>
        </RichTextEditor.Root>,
    );
    act(() => {
        vi.advanceTimersToNextFrame();
    });
    const runtime = ref.current === null ? undefined : runtimeOf(ref.current);
    if (runtime === undefined) {
        throw new Error('The editor did not mount.');
    }

    const start = 2;
    act(() => {
        runtime.select({ anchor: start, head: start });
    });
    const before = renders;

    for (let move = 1; move <= CARET_MOVES; move += 1) {
        act(() => {
            runtime.select({ anchor: start + move, head: start + move });
        });
    }

    expect(runtime.state.selection.head).toBe(start + CARET_MOVES);
    expect(renders).toBe(before);

    // A move into the heading changes the block type, so the same component does rerender.
    const heading1 = runtime.state.doc.content.size - 3;
    act(() => {
        runtime.select({ anchor: heading1, head: heading1 });
    });
    expect(renders).toBe(before + 1);
    expect(seen.at(-1)).toEqual(['heading', false]);
});

const undoAppliesForOneCaretMove = (strict: boolean) => {
    const model = compileContentModel(featuresById(PERF_FEATURES), { id: 'test.hook-renders', version: 1 });
    const definition = defineEditor({ id: 'test.hook-renders', model, plugins: pluginsFor(model) });
    const ref = createRef<EditorHandle>();
    const editor = (
        <RichTextEditor.Root
            aria-label="Notes"
            definition={definition}
            defaultValue={{ documentId: 'document-1', revision: null, document: perfDocument('small', model) }}
            presentation={defineReactPresentation({})}
            ref={ref}
        >
            <RichTextEditor.Toolbar />
            <RichTextEditor.Surface />
        </RichTextEditor.Root>
    );
    render(strict ? <StrictMode>{editor}</StrictMode> : editor);
    act(() => {
        vi.advanceTimersToNextFrame();
    });
    const runtime = ref.current === null ? undefined : runtimeOf(ref.current);
    if (runtime === undefined) {
        throw new Error('The editor did not mount.');
    }

    act(() => {
        runtime.handle.execute('text.insert', { text: 'q' });
    });
    const head = runtime.state.selection.head;
    const caret = head === 1 ? 2 : 1;
    const apply = vi.spyOn(EditorState.prototype, 'applyTransaction');
    act(() => {
        runtime.select({ anchor: caret, head: caret });
    });
    const undoApplies = apply.mock.calls.filter(([transaction]) => isHistoryTransaction(transaction)).length;
    apply.mockRestore();

    return undoApplies;
};

it('queries undo once when one state update reaches the toolbar', () => {
    expect(undoAppliesForOneCaretMove(false)).toBe(1);
});

it('queries undo once per update when React renders twice', () => {
    expect(undoAppliesForOneCaretMove(true)).toBe(1);
});

it('notifies once when a composition settles and queries undo once per notice', async () => {
    const model = compileContentModel(featuresById(PERF_FEATURES), { id: 'test.hook-renders', version: 1 });
    const definition = defineEditor({ id: 'test.hook-renders', model, plugins: pluginsFor(model) });
    const ref = createRef<EditorHandle>();
    render(
        <RichTextEditor.Root
            aria-label="Notes"
            definition={definition}
            defaultValue={{ documentId: 'document-1', revision: null, document: perfDocument('small', model) }}
            presentation={defineReactPresentation({})}
            ref={ref}
        >
            <RichTextEditor.Toolbar />
            <RichTextEditor.Surface />
        </RichTextEditor.Root>,
    );
    act(() => {
        vi.advanceTimersToNextFrame();
    });
    const runtime = ref.current === null ? undefined : runtimeOf(ref.current);
    if (runtime === undefined) {
        throw new Error('The editor did not mount.');
    }

    const view = runtime.view;
    if (view === undefined) {
        throw new Error('The editor has no view.');
    }

    const notices: boolean[] = [];
    runtime.watch(
        () => runtime.handle.getSnapshot().compositionActive,
        () => false,
        (active) => {
            notices.push(active);
        },
    );
    const apply = vi.spyOn(EditorState.prototype, 'applyTransaction');
    act(() => {
        view.dom.dispatchEvent(new CompositionEvent('compositionstart'));
        view.dispatch(view.state.tr.insertText('Q').setMeta('composition', 1));
        view.dom.dispatchEvent(new CompositionEvent('compositionend'));
    });
    await act(async () => {
        await vi.advanceTimersByTimeAsync(0);
        await vi.advanceTimersByTimeAsync(20);
    });
    const undoQueries = apply.mock.calls.filter(([transaction]) => isHistoryTransaction(transaction)).length;
    apply.mockRestore();

    // The start has no undo step. The composed text and the single settle each query undo once.
    expect(notices).toEqual([true, true, false]);
    expect(undoQueries).toBe(2);
});

const openToolbar = () => {
    const model = compileContentModel(featuresById(PERF_FEATURES), { id: 'test.hook-renders', version: 1 });
    const definition = defineEditor({ id: 'test.hook-renders', model, plugins: pluginsFor(model) });
    const ref = createRef<EditorHandle>();
    render(
        <RichTextEditor.Root
            aria-label="Notes"
            definition={definition}
            defaultValue={{ documentId: 'document-1', revision: null, document: perfDocument('small', model) }}
            presentation={defineReactPresentation({})}
            ref={ref}
        >
            <RichTextEditor.Toolbar />
            <RichTextEditor.Surface />
        </RichTextEditor.Root>,
    );
    act(() => {
        vi.advanceTimersToNextFrame();
    });
    const runtime = ref.current === null ? undefined : runtimeOf(ref.current);
    if (runtime === undefined || runtime.view === undefined) {
        throw new Error('The editor did not mount.');
    }

    return runtime;
};

const endNotices = async (runtime: ReturnType<typeof openToolbar>) => {
    const view = runtime.view;
    if (view === undefined) {
        throw new Error('The editor has no view.');
    }

    const notices: boolean[] = [];
    runtime.watch(
        () => runtime.handle.getSnapshot().compositionActive,
        () => false,
        (active) => {
            notices.push(active);
        },
    );
    const apply = vi.spyOn(EditorState.prototype, 'applyTransaction');
    act(() => {
        view.dom.dispatchEvent(new CompositionEvent('compositionend'));
    });
    await act(async () => {
        await vi.advanceTimersByTimeAsync(0);
        await vi.advanceTimersByTimeAsync(20);
    });
    const undoQueries = apply.mock.calls.filter(([transaction]) => isHistoryTransaction(transaction)).length;
    apply.mockRestore();

    return { notices, undoQueries };
};

it('notifies once when a composition with a queued intent ends without a provisional edit', async () => {
    const runtime = openToolbar();
    const view = runtime.view;
    if (view === undefined) {
        throw new Error('The editor has no view.');
    }

    act(() => {
        view.dom.dispatchEvent(new CompositionEvent('compositionstart'));
    });
    const queued = runtime.handle.enqueue('text.insert', { text: '!' });
    const { notices, undoQueries } = await endNotices(runtime);

    expect(notices).toEqual([false]);
    expect(undoQueries).toBe(notices.length);
    expect(await queued).toMatchObject({ status: 'applied' });
});

it('notifies once when a composition with a held async result ends without a provisional edit', async () => {
    const runtime = openToolbar();
    const view = runtime.view;
    if (view === undefined) {
        throw new Error('The editor has no view.');
    }

    let settleResult: (result: unknown) => void = () => undefined;
    const call = new Promise<unknown>((resolve) => {
        settleResult = resolve;
    });
    act(() => {
        view.dom.dispatchEvent(new CompositionEvent('compositionstart'));
        runtime.startAsync({
            key: 'upload',
            service: 'uploads',
            featureId: 'core',
            action: 'create',
            command: 'text.insert',
            deliver: (result) => {
                if (typeof result !== 'object' || result === null || !('text' in result)) {
                    return 'invalid-payload';
                }

                const { text } = result;
                if (typeof text !== 'string') {
                    return 'invalid-payload';
                }

                const outcome = runtime.handle.execute('text.insert', { text });
                if (outcome.status === 'rejected') {
                    return outcome.code;
                }

                return undefined;
            },
            run: () => call,
        });
        settleResult({ text: 'Z' });
    });
    await act(async () => {
        await call;
    });
    const { notices, undoQueries } = await endNotices(runtime);

    expect(notices).toEqual([false]);
    expect(undoQueries).toBe(notices.length);
    expect(view.state.doc.textContent).toContain('Z');
});

it('rerenders no part when the host rerenders the editor with equal props', () => {
    const model = compileContentModel(featuresById(PERF_FEATURES), { id: 'test.hook-renders', version: 1 });
    const definition = defineEditor({ id: 'test.hook-renders', model, plugins: pluginsFor(model) });
    const paragraph = { type: 'paragraph', attrs: { lang: null }, content: [{ type: 'text', text: 'Hello' }] };
    const document = {
        ...perfDocument('small', model),
        content: { type: 'doc', attrs: { lang: null, dir: 'auto' }, content: [paragraph] },
    } as unknown as ReturnType<typeof perfDocument>;
    const defaultValue = { documentId: 'document-1', revision: null, document };
    const counts = { surface: 0, toolbar: 0, status: 0, panels: 0 };
    // One element for the whole run, so a part rerenders only when the context it reads changes.
    const parts = (
        <>
            <Profiler id="surface" onRender={() => (counts.surface += 1)}>
                <RichTextEditor.Surface />
            </Profiler>
            <Profiler id="toolbar" onRender={() => (counts.toolbar += 1)}>
                <RichTextEditor.Toolbar />
            </Profiler>
            <Profiler id="status" onRender={() => (counts.status += 1)}>
                <RichTextEditor.Status />
            </Profiler>
            <Profiler id="panels" onRender={() => (counts.panels += 1)}>
                <RichTextEditor.Panels />
            </Profiler>
        </>
    );
    const calls: string[] = [];
    const search = () => Promise.resolve({ items: [], nextCursor: null });
    const ref = createRef<EditorHandle<object>>();
    let rerender: () => void = () => undefined;
    const Host = () => {
        const [pass, tick] = useReducer((count: number) => count + 1, 0);
        rerender = tick;

        return (
            <RichTextEditor.Root
                ref={ref}
                aria-label="Notes"
                definition={definition}
                defaultValue={defaultValue}
                // A host that writes its services inline, with the same function on each render.
                services={{ references: { search } }}
                onFocus={() => calls.push(`focus ${pass}`)}
                onBlur={() => calls.push(`blur ${pass}`)}
                onSubmit={() => calls.push(`submit ${pass}`)}
            >
                {parts}
            </RichTextEditor.Root>
        );
    };

    const { container } = render(<Host />);
    act(() => {
        vi.advanceTimersToNextFrame();
    });
    const before = { ...counts };
    let reads = 0;
    const handle = ref.current;
    const stop =
        handle === null
            ? undefined
            : runtimeOf(handle)?.watch(
                  () => (reads += 1),
                  Object.is,
                  () => undefined,
              );
    const readsAtSubscribe = reads;

    for (let pass = 0; pass < 5; pass += 1) {
        act(() => rerender());
    }

    expect(counts).toEqual(before);
    expect(before.surface).toBeGreaterThan(0);
    expect(readsAtSubscribe).toBe(1);
    expect(reads).toBe(readsAtSubscribe);
    stop?.();

    const surface = container.querySelector<HTMLElement>('[data-rte-surface]');
    act(() => {
        surface?.focus();
        surface?.blur();
    });
    expect(calls).toEqual(['focus 5', 'blur 5']);
});

const mountedSession = (inserted: boolean) => {
    const model = compileContentModel(featuresById(PERF_FEATURES), { id: 'test.hook-renders', version: 1 });
    const definition = defineEditor({ id: 'test.hook-renders', model, plugins: pluginsFor(model) });
    const ref = createRef<EditorHandle>();
    render(
        <RichTextEditor.Root
            aria-label="Notes"
            definition={definition}
            defaultValue={{ documentId: 'document-1', revision: null, document: perfDocument('small', model) }}
            ref={ref}
        >
            <RichTextEditor.Surface />
        </RichTextEditor.Root>,
    );
    act(() => {
        vi.advanceTimersToNextFrame();
    });
    const runtime = ref.current === null ? undefined : runtimeOf(ref.current);
    if (runtime === undefined) {
        throw new Error('The editor did not mount.');
    }

    if (inserted) {
        act(() => {
            runtime.handle.execute('text.insert', { text: 'q' });
        });
    }

    return runtime;
};

class PendingRenderError extends Error {
    constructor() {
        super('The render is discarded.');
        this.name = 'PendingRenderError';
    }

    then() {
        return undefined;
    }
}

const pending = new PendingRenderError();

it('does not rerender when a command subscribes or an equal notification arrives', () => {
    const runtime = mountedSession(true);
    let renders = 0;
    const Probe = () => {
        useCommandQuery('history.undo');

        return null;
    };

    render(
        <SessionContext.Provider value={runtime}>
            <Profiler id="probe" onRender={() => (renders += 1)}>
                <Probe />
            </Profiler>
        </SessionContext.Provider>,
    );

    expect(renders).toBe(1);
    act(() => {
        runtime.notifyWatchers();
    });
    expect(renders).toBe(1);
});

it('queries the committed command after a render with another command is discarded', () => {
    const runtime = mountedSession(true);
    const queried: string[] = [];
    const query = runtime.handle.query.bind(runtime.handle);
    runtime.handle.query = (id: string, ...args: readonly unknown[]) => {
        queried.push(id);

        return query(id, ...args);
    };

    let suspend = false;
    type ProbeProps = { command: string };
    const Probe = ({ command }: ProbeProps) => {
        const state = useCommandQuery(command);
        if (suspend) {
            throw pending;
        }

        return <span>{`${command}:${String(state.enabled)}`}</span>;
    };

    const Harness = () => {
        const [command, setCommand] = useState('history.undo');

        return (
            <SessionContext.Provider value={runtime}>
                <Suspense fallback={<span>waiting</span>}>
                    <Probe command={command} />
                    <button
                        type="button"
                        onClick={() => {
                            startTransition(() => {
                                suspend = true;
                                setCommand('history.redo');
                            });
                        }}
                    >
                        switch
                    </button>
                </Suspense>
            </SessionContext.Provider>
        );
    };

    const view = render(<Harness />);
    expect(view.container.textContent).toContain('history.undo:true');

    act(() => {
        view.getByRole('button', { name: 'switch' }).click();
    });
    expect(view.container.textContent).toContain('history.undo:true');
    queried.splice(0);

    act(() => {
        runtime.notifyWatchers();
    });
    expect(queried).toContain('history.undo');
    expect(queried).not.toContain('history.redo');
    expect(view.container.textContent).toContain('history.undo:true');
});

it('does not reuse the previous session answer for the next session', () => {
    const first = mountedSession(true);
    const second = mountedSession(false);
    let suspend = false;
    const SessionProbe = () => {
        const state = useCommandQuery('history.undo');
        if (suspend) {
            throw pending;
        }

        return <span>{String(state.enabled)}</span>;
    };

    const view = render(
        <SessionContext.Provider value={first}>
            <Suspense fallback={<span>waiting</span>}>
                <SessionProbe />
            </Suspense>
        </SessionContext.Provider>,
    );
    expect(view.container.textContent).toBe('true');

    act(() => {
        startTransition(() => {
            suspend = true;
            view.rerender(
                <SessionContext.Provider value={second}>
                    <Suspense fallback={<span>waiting</span>}>
                        <SessionProbe />
                    </Suspense>
                </SessionContext.Provider>,
            );
        });
    });
    suspend = false;
    view.rerender(
        <SessionContext.Provider value={first}>
            <Suspense fallback={<span>waiting</span>}>
                <SessionProbe />
            </Suspense>
        </SessionContext.Provider>,
    );
    expect(view.container.textContent).toBe('true');
    view.rerender(
        <SessionContext.Provider value={second}>
            <Suspense fallback={<span>waiting</span>}>
                <SessionProbe />
            </Suspense>
        </SessionContext.Provider>,
    );
    expect(view.container.textContent).toBe('false');
});
