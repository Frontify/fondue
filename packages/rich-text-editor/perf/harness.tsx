/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { useEffect } from 'react';
import { createRoot, type Root } from 'react-dom/client';

import { type EditorHandle } from '#/index';
import { type PerfFixtureName } from '#/model/__tests__/fixtures/perf/documents';
import { perfValue, PerfTree } from '#/react/__tests__/fixtures/PerfEditor';
import { runtimeOf } from '#/runtime/runtime';

import { type PageApi, type TimedEvent } from './page-api';

declare global {
    interface Window {
        rtePerf?: PageApi;
    }
}

interface Mounted {
    readonly root: Root;
    readonly container: HTMLElement;
    readonly handles: EditorHandle[];
}

const nextPaint = () =>
    new Promise<void>((resolve) => {
        requestAnimationFrame(() => {
            setTimeout(resolve, 0);
        });
    });

// The commit pipeline: from `applyTransaction` to the end of `updateState`, as the rte-dispatch marks bound it.
const commits: number[] = [];
let dispatchStarted: number | undefined;
const applyTransaction = EditorState.prototype.applyTransaction;
EditorState.prototype.applyTransaction = function (this: EditorState, ...args: Parameters<typeof applyTransaction>) {
    performance.mark('rte-dispatch-start');
    dispatchStarted = performance.now();
    return applyTransaction.apply(this, args);
};
const updateState = EditorView.prototype.updateState;
EditorView.prototype.updateState = function (this: EditorView, ...args: Parameters<typeof updateState>) {
    const result = updateState.apply(this, args);
    performance.mark('rte-dispatch-end');
    if (dispatchStarted !== undefined) {
        commits.push(performance.now() - dispatchStarted);
        dispatchStarted = undefined;
    }
    return result;
};

// Selector notification to toolbar render: from the selector store's notification to the end of the React commit.
const notifications: number[] = [];
let notifiedAt: number | undefined;
const onRender = () => {
    if (notifiedAt !== undefined) {
        notifications.push(performance.now() - notifiedAt);
        notifiedAt = undefined;
    }
};

// Keystrokes: the Event Timing entries at the threshold `method.json` records.
const events: TimedEvent[] = [];

let mounted: Mounted | undefined;

const hostOf = (): HTMLElement => {
    const host = document.createElement('div');
    host.style.width = '800px';
    document.body.append(host);
    return host;
};

const view = () => {
    const handle = mounted?.handles[0];
    const runtime = handle === undefined ? undefined : runtimeOf(handle);
    if (runtime?.view === undefined) {
        throw new Error('No editor is mounted.');
    }
    return { handle: handle as EditorHandle, runtime, view: runtime.view };
};

/** Watches the first selector store each editor opens, so the toolbar's notification is marked. */
const markNotifications = (handle: EditorHandle) => {
    const runtime = runtimeOf(handle);
    if (runtime === undefined) {
        return;
    }
    const watch = runtime.watch;
    runtime.watch = (read, isEqual, listener) =>
        watch(read, isEqual, (value) => {
            if (notifiedAt === undefined) {
                performance.mark('rte-selector-notify');
                notifiedAt = performance.now();
            }
            listener(value);
        });
};

const mountAll = async (fixtures: readonly PerfFixtureName[]): Promise<number> => {
    const container = hostOf();
    const root = createRoot(container);
    // The documents exist before the clock starts, since a host holds its document when it mounts.
    const values = fixtures.map(perfValue);
    const started = performance.now();
    const handles = await new Promise<EditorHandle[]>((resolve) => {
        root.render(<PerfTree values={values} onReady={resolve} onRender={onRender} onHandle={markNotifications} />);
    });
    const elapsed = performance.now() - started;
    mounted = { root, container, handles };
    return elapsed;
};

const unmount = () => {
    mounted?.root.unmount();
    mounted?.container.remove();
    mounted = undefined;
};

/** A caret inside the first plain run and one inside the first bold run, so a move between them flips the bold state. */
const boldPositions = () => {
    const { view: surface } = view();
    let plain: number | undefined;
    let bold: number | undefined;
    surface.state.doc.descendants((node, position) => {
        if (node.isText && bold === undefined) {
            const marked = node.marks.some(({ type }) => type.name === 'bold');
            if (marked) {
                bold = position + 1;
            } else if (plain === undefined) {
                plain = position + 1;
            }
        }
        return bold === undefined;
    });
    if (plain === undefined || bold === undefined) {
        throw new Error('The fixture has no plain and bold run.');
    }
    return { plain, bold };
};

const MIB = 1024 * 1024;

/** HTML of about `bytes`, in the shape of a web page: paragraphs with marks and links, and nested lists. */
const htmlOf = (bytes: number): string => {
    // The prose keeps 1 MiB of blocks under `maxDocumentNodes` once pasted into `typical`, so the paste is accepted.
    const block =
        '<h2>Brand guidelines</h2><p>Use the <strong>primary logo</strong> with <em>clear space</em> and read the <a href="https://frontify.com/guidelines">full guide</a> before you export any asset for print or web. Keep the logo at its minimum size or larger, never stretch, rotate, outline or recolour it, and place it only on a background with enough contrast that every reader sees it at a glance. When a layout leaves too little room, use the compact mark from the asset library instead, and ask the brand team to review any use that these guidelines do not cover yet.</p><ul><li>Logos<ul><li>Primary</li><li>Secondary</li></ul></li><li>Colours</li></ul>';
    let html = '';
    while (html.length < Math.min(bytes, MIB - 1024)) {
        html += block;
    }
    return html;
};

const api: PageApi = {
    mount: async (fixture) => mountAll([fixture]),
    mountMany: async (count) => mountAll(Array.from({ length: count }, () => 'small')),
    unmount,
    focusMiddle: () => {
        const { runtime, view: surface } = view();
        const middle = surface.state.doc.resolve(surface.state.doc.content.size / 2).start() + 2;
        runtime.select({ anchor: middle, head: middle });
        surface.focus();
    },
    observeEvents: (threshold) => {
        events.length = 0;
        new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                const { name, duration, interactionId } = entry as PerformanceEventTiming;
                events.push({ name, duration, interactionId });
            }
        }).observe({ type: 'event', durationThreshold: threshold, buffered: true } as PerformanceObserverInit);
    },
    events: () => events,
    resetEvents: () => {
        events.length = 0;
    },
    commits: () => commits,
    resetCommits: () => {
        commits.length = 0;
    },
    nextPaint,
    moveBetweenBoldAndPlain: async (moves) => {
        const { runtime } = view();
        const { plain, bold } = boldPositions();
        notifications.length = 0;
        for (let move = 0; move < moves; move += 1) {
            const position = move % 2 === 0 ? bold : plain;
            // A notification that renders nothing, such as the status line's, must not pair with a later render.
            notifiedAt = undefined;
            runtime.select({ anchor: position, head: position });
            await nextPaint();
        }
        return [...notifications];
    },
    snapshotAfterEdit: () => {
        const { handle, view: surface } = view();
        surface.dispatch(surface.state.tr.insertText('a'));
        const started = performance.now();
        handle.getSnapshot();
        return performance.now() - started;
    },
    paste: async (bytes) => {
        const { handle, view: surface } = view();
        const data = new DataTransfer();
        data.setData('text/html', htmlOf(bytes));
        const before = surface.state.doc;
        const started = performance.now();
        surface.dom.dispatchEvent(
            new ClipboardEvent('paste', { clipboardData: data, bubbles: true, cancelable: true }),
        );
        await nextPaint();
        const elapsed = performance.now() - started;
        if (surface.state.doc.eq(before)) {
            throw new Error('The paste changed nothing.');
        }
        handle.execute('history.undo');
        return elapsed;
    },
    command: async (id) => {
        const { handle, runtime } = view();
        const { plain } = boldPositions();
        runtime.select({ anchor: plain, head: plain + 5 });
        const started = performance.now();
        (handle as { execute: (command: string) => unknown }).execute(id);
        await nextPaint();
        const elapsed = performance.now() - started;
        handle.execute('history.undo');
        return elapsed;
    },
    openedWithFocus: async (id, selectors) => {
        const { handle, runtime } = view();
        const { plain } = boldPositions();
        runtime.select({ anchor: plain, head: plain + 5 });
        const started = performance.now();
        (handle as { execute: (command: string) => unknown }).execute(id);
        const deadline = started + 2000;
        while (performance.now() < deadline) {
            await nextPaint();
            const active = document.activeElement;
            if (active !== null && active.closest(selectors) !== null) {
                const elapsed = performance.now() - started;
                handle.focus();
                return elapsed;
            }
        }
        return null;
    },
};

/** Gives a performance test the page functions that drive and time an editor. */
export const PerfHarness = () => {
    useEffect(() => {
        window.rtePerf = api;
        return () => {
            delete window.rtePerf;
        };
    }, []);
    return null;
};
