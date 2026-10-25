/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Plugin } from 'prosemirror-state';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { compileDefinition } from '#/definition';
import { countingIds } from '#/features/__tests__/fixtures/notes';
import { unitsOf } from '#/features/__tests__/fixtures/units';
import { core } from '#/features/core/feature';
import { bold } from '#/features/marksBold/feature';
import { compileContentModel, type Diagnostic, type JsonValue } from '#/model';
import { decodeToTree, limitsOf } from '#/model/internal';
import { extensionsOf } from '#/react/engine';

import { RUNTIME_PLUGINS } from '../capabilities';
import { authoringOf } from '../policy';
import { createEditorRuntime, type EditorRuntime } from '../runtime';
import { type OperationMetric, type ReplaceDocumentRequest } from '../types';

const model = compileContentModel([core(), bold()], { id: 'test.bold', version: 1 });
const stored = (...blocks: readonly JsonValue[]) => ({
    format: 'frontify.rich-text',
    formatVersion: 1,
    model: { id: 'test.bold', version: 1 },
    requiredCapabilities: [{ id: 'core', version: 1 }],
    content: { type: 'doc', attrs: { lang: null, dir: 'auto' }, content: blocks },
});
const para = (text: string) => ({
    type: 'paragraph',
    attrs: { lang: null },
    content: [{ type: 'text', text }],
});

/** A paragraph node view whose `update` throws once its paragraph holds `!`. */
const updateFails = new Plugin({
    props: {
        nodeViews: {
            paragraph: (node) => {
                const dom = document.createElement('p');
                return {
                    dom,
                    contentDOM: dom,
                    update: (next) => {
                        if (next.textContent.includes('!')) {
                            throw new Error('node view update failure');
                        }
                        return next.type === node.type;
                    },
                };
            },
        },
    },
});

const started: EditorRuntime[] = [];
beforeEach(() => {
    vi.useFakeTimers();
});
afterEach(() => {
    for (const runtime of started.splice(0)) {
        runtime.handle.dispose();
    }
    document.body.replaceChildren();
    vi.useRealTimers();
});

/** A runtime that is not attached yet, with listeners for the events a phase change shows. */
const create = (...plugins: readonly Plugin[]) => {
    const { result, tree } = decodeToTree(stored(para('ab')), model);
    if (result.status !== 'editable' || tree === undefined) {
        throw new Error('expected an editable document');
    }
    const compiled = compileDefinition(model, RUNTIME_PLUGINS, extensionsOf(model, unitsOf(model)));
    const runtime = createEditorRuntime({
        definition: { ...compiled, plugins: [...compiled.plugins, ...plugins] },
        documentId: 'document-1',
        tree,
        capabilities: result.document.requiredCapabilities,
        generateId: countingIds(),
        mode: 'editable',
        policy: authoringOf(model),
        limits: limitsOf({}),
    });
    started.push(runtime);
    const ready = vi.fn();
    const disposed = vi.fn();
    const metrics: OperationMetric[] = [];
    const diagnostics: Diagnostic[] = [];
    runtime.handle.subscribe('ready', ready);
    runtime.handle.subscribe('disposed', disposed);
    runtime.handle.subscribe('operationMetric', (metric: OperationMetric) => metrics.push(metric));
    runtime.handle.subscribe('diagnostic', (diagnostic: Diagnostic) => diagnostics.push(diagnostic));
    const attach = () => runtime.attach(document.body.appendChild(document.createElement('div')));
    return { runtime, handle: runtime.handle, ready, disposed, metrics, diagnostics, attach };
};

const replacing = (handle: EditorRuntime['handle'], text: string): ReplaceDocumentRequest => ({
    expected: handle.getSnapshot().stamp,
    next: { documentId: 'document-2', revision: null, document: stored(para(text)) as never },
    unsaved: { action: 'discard', confirmed: true },
    selection: 'start',
    history: 'reset',
});

describe('the phase of a session', () => {
    it('stays faulted, and emits no ready or mount metric, when the view faults before the first frame', () => {
        const { runtime, handle, ready, metrics, attach } = create(updateFails);
        attach();

        const { view } = runtime;
        if (view === undefined) {
            throw new Error('no view');
        }
        view.dispatch(view.state.tr.insertText('!', 3));
        expect(handle.getSummary().phase).toBe('faulted');
        vi.runAllTimers();

        expect(handle.getSummary().phase).toBe('faulted');
        expect(ready).not.toHaveBeenCalled();
        expect(metrics.filter(({ kind }) => kind === 'mount')).toEqual([]);
    });

    it('stays disposed, and reports no fault, when a plugin view disposes the session and throws while it mounts', () => {
        let dispose = () => {};
        const disposes = new Plugin({
            view: () => {
                dispose();
                throw new Error('plugin view failure');
            },
        });
        const { handle, diagnostics, disposed, attach } = create(disposes);
        dispose = () => handle.dispose();

        attach();

        expect(disposed).toHaveBeenCalledTimes(1);
        expect(handle.getSummary().phase).toBe('disposed');
        expect(diagnostics).toEqual([]);
    });

    it('stays disposed when a plugin view disposes the session while a replacement installs its state', async () => {
        let dispose: (() => void) | undefined;
        const disposes = new Plugin({
            view: () => ({
                update: () => {
                    dispose?.();
                    dispose = undefined;
                },
            }),
        });
        const { handle, disposed, attach } = create(disposes);
        attach();
        vi.runAllTimers();
        dispose = () => handle.dispose();

        await handle.replaceDocument(replacing(handle, 'cd'));

        expect(disposed).toHaveBeenCalledTimes(1);
        expect(handle.getSummary().phase).toBe('disposed');
    });

    it('stays faulted when a plugin view faults the session while a replacement installs its state', async () => {
        let nested: (() => void) | undefined;
        const faults = new Plugin({
            view: () => ({
                update: () => {
                    nested?.();
                    nested = undefined;
                },
            }),
        });
        const { runtime, handle, diagnostics, attach } = create(updateFails, faults);
        attach();
        vi.runAllTimers();
        nested = () => {
            const { view } = runtime;
            if (view !== undefined) {
                view.dispatch(view.state.tr.insertText('!', 1));
            }
        };

        await handle.replaceDocument(replacing(handle, 'cd'));

        expect(diagnostics.map(({ code }) => code)).toEqual(['runtime.view-fault']);
        expect(handle.getSummary().phase).toBe('faulted');
    });
});
