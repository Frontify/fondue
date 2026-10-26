/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, render } from '@testing-library/react';
import { createRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { createPortalStore } from '#/bridge/portals';
import { defineReaderFeature } from '#/entries/reader';
import { commentModel, documentModel, inlineModel } from '#/features';
import { unitsOf } from '#/features/__tests__/fixtures/units';
import { core } from '#/features/core/feature';
import { defineEditor, type EditorHandle, type EditorServices, type PersistenceService, RichTextEditor } from '#/index';
import {
    compileContentModel,
    type ContentModel,
    createEmptyDocument,
    defineFeature,
    type RichTextDocument,
} from '#/model';
import { typeText } from '#/testing';

import { countImportFailures } from '../observability/importFailures';
import { collectOperationMetrics } from '../observability/operationMetrics';
import {
    createRendererFailureCounter,
    readerElement,
    recordCodecFailures,
    recordEditorFailures,
} from '../observability/rendererFailures';
import { countSaveConflicts } from '../observability/saveConflicts';

vi.mock('#/bridge/portals', { spy: true });
const { createPortalStore: actualStore } = await vi.importActual<{
    readonly createPortalStore: typeof createPortalStore;
}>('#/bridge/portals');

beforeEach(() => {
    vi.useFakeTimers();
});
afterEach(() => {
    vi.useRealTimers();
});

const text = (value: string) => ({ type: 'text', text: value });
const paragraph = (value: string) => ({ type: 'paragraph', attrs: { lang: null }, content: [text(value)] });

/** Mounts an editor of `model` on one paragraph, runs its first frame and hands back its handle. */
const mount = async (model: ContentModel, services: EditorServices = {}) => {
    const ref = createRef<EditorHandle<object>>();
    const document = createEmptyDocument(model);
    render(
        <RichTextEditor
            aria-label="Notes"
            definition={defineEditor({ id: 'docs.observability', model, plugins: unitsOf(model) })}
            defaultValue={{ documentId: 'docs-observability', revision: 'revision-1', document }}
            services={services}
            ref={ref}
        />,
    );
    await act(async () => {
        await Promise.resolve();
    });
    act(() => {
        vi.advanceTimersToNextFrame();
    });
    const handle = ref.current;
    if (handle === null) {
        throw new Error('The editor has no handle.');
    }

    return handle;
};

describe('the observability guide examples', () => {
    it('counts import failures and unknown capabilities from the format diagnostics of decodeDocument', () => {
        const valid = createEmptyDocument(inlineModel);
        const stored = [
            valid,
            '{',
            { ...valid, model: { id: 'other.model', version: 1 } },
            { ...valid, requiredCapabilities: [...valid.requiredCapabilities, { id: 'acme.callout', version: 1 }] },
        ];

        const { blocked, byCode } = countImportFailures(stored, inlineModel);

        expect(blocked).toBe(2);
        expect([...byCode]).toEqual([
            ['format.not-json', 1],
            ['format.wrong-model', 1],
            ['format.unknown-capability', 1],
        ]);
    });

    describe('renderer failures', () => {
        const fail = () => {
            throw new Error('override failed');
        };

        const note = defineFeature({
            id: 'docs.note',
            version: 1,
            requires: [{ id: 'core', version: 1 }],
            nodes: { note: { group: 'block', content: 'inline*', attrs: {}, html: ['aside', 0], parse: [] } },
            formats: { html: 'lossless', text: 'lossless', markdown: 'lossless' },
            codecs: { html: { nodes: { note: fail } } },
        });
        const model = compileContentModel([core(), defineReaderFeature(note(), { note: fail })], {
            id: 'docs.renderer',
            version: 1,
        });
        const stored = {
            ...createEmptyDocument(model),
            content: {
                type: 'doc',
                attrs: { lang: null, dir: 'auto' },
                content: [paragraph('Before'), { type: 'note', content: [text('Noted')] }],
            },
        } as RichTextDocument;

        it('counts one reader.override-failed from the onDiagnostic prop of RichTextReader', () => {
            const counter = createRendererFailureCounter();

            renderToStaticMarkup(readerElement(counter, model, stored));

            expect(counter.failures()).toBe(1);
        });

        it('counts one codecs.override-failed from the diagnostics of toHTML', () => {
            const counter = createRendererFailureCounter();

            recordCodecFailures(counter, model, stored);

            expect(counter.failures()).toBe(1);
        });

        it('counts one runtime.view-fault from the diagnostic event of an editor', async () => {
            // A node view that cannot build is the one way to fault a view, so the portal store throws for it.
            let armed = false;
            vi.mocked(createPortalStore).mockImplementationOnce(() => {
                const store = actualStore();

                return {
                    ...store,
                    set: (entry) => {
                        if (armed) {
                            throw new Error('node view failed');
                        }

                        store.set(entry);
                    },
                };
            });
            const handle = await mount(commentModel);
            const counter = createRendererFailureCounter();
            recordEditorFailures(counter, handle);
            armed = true;

            act(() => {
                handle.execute('list.task.toggle' as never, undefined as never);
            });

            expect(handle.getSummary().phase).toBe('faulted');
            expect(counter.failures()).toBe(1);
        });
    });

    it('counts a save conflict from the saveStatusChange event once, however long the state stays conflict', async () => {
        const persistence: PersistenceService = {
            save: () => Promise.resolve({ status: 'conflict', currentRevision: 'revision-9' }),
            read: () => Promise.reject(new Error('The conflict handler reads nothing.')),
        };
        const handle = await mount(inlineModel, { persistence });
        const counter = countSaveConflicts(handle);
        act(() => typeText(handle, 'ab'));

        await act(async () => handle.requestCommit({ reason: 'manual' }));
        act(() => typeText(handle, 'c'));
        await act(async () => handle.requestCommit({ reason: 'manual' }));

        expect(handle.getSaveStatus().state).toBe('conflict');
        expect(counter.conflicts()).toBe(1);
        counter.stop();
    });

    it('counts operations and normalization transactions from the operationMetric event', async () => {
        const handle = await mount(documentModel);
        const metrics = collectOperationMetrics(handle);
        act(() => typeText(handle, 'abc'));

        // A new heading gets its nodeId from a normalization transaction.
        act(() => {
            handle.execute('heading.set' as never, { level: 1 } as never);
        });

        expect(metrics.durations.get('commit')?.length).toBe(4);
        expect(metrics.normalizationTransactions()).toBe(1);
        metrics.stop();
    });
});
