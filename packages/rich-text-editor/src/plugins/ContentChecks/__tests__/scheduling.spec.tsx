/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, fireEvent, render, screen } from '@testing-library/react';
import { createRef, useState } from 'react';
import { afterEach, beforeEach, describe, expect, it, type MockInstance, vi } from 'vitest';

import { defineReactPresentation } from '#/entries/authoring';
import { defineEditor, type EditorHandle, RichTextEditor } from '#/index';
import { hashDocument } from '#/model';
import { CONTENT_RULE_IDS, CONTENT_RULES } from '#/plugins/__tests__/fixtures/contentRules';
import { pluginsFor } from '#/plugins/__tests__/fixtures/pluginsFor';
import { storedIn } from '#/react/__tests__/fixtures/text';
import { CHECK_DELAY_MS, contentChecksStateOf } from '#/runtime/capabilities/checks/contentIssues';
import { SETTLE_MS } from '#/runtime/dom/settle';
import { runtimeOf } from '#/runtime/runtime';
import { createFakePersistenceService, typeText } from '#/testing';

import { checksModel, colored, headingBlock, image, link, mountChecks, para, text } from './fixtures/checks';

let spies: MockInstance[] = [];

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    spies = CONTENT_RULE_IDS.map((ruleId) => vi.spyOn(CONTENT_RULES[ruleId], 'check'));
});

afterEach(() => {
    for (const spy of spies) {
        spy.mockRestore();
    }

    vi.useRealTimers();
});

const ruleCalls = () => spies.reduce((total, spy) => total + spy.mock.calls.length, 0);

const advance = (ms: number) =>
    act(() => {
        vi.advanceTimersByTime(ms);
    });

describe('when the content checks run', () => {
    it('runs the rules 750 ms after the last change, never while a change dispatches', () => {
        const { handle, runtime, view, unmount } = mountChecks({ blocks: [para(text('Hello'))] });
        const dispatch = view.dispatch.bind(view);
        let dispatched = 0;
        let callsInDispatch = 0;
        vi.spyOn(view, 'dispatch').mockImplementation((transaction) => {
            const before = ruleCalls();
            dispatch(transaction);
            dispatched += 1;
            callsInDispatch += ruleCalls() - before;
        });

        act(() => {
            typeText(handle, 'a');
        });
        advance(CHECK_DELAY_MS - 100);
        act(() => {
            typeText(handle, 'b');
        });
        advance(CHECK_DELAY_MS - 1);

        expect(ruleCalls()).toBe(0);
        expect(contentChecksStateOf(runtime.state)?.runs).toBe(0);

        advance(1);

        expect(ruleCalls()).toBeGreaterThan(0);
        expect(dispatched).toBe(2);
        expect(callsInDispatch).toBe(0);
        expect(contentChecksStateOf(runtime.state)).toMatchObject({ runs: 1 });
        const issues = contentChecksStateOf(runtime.state)?.issues;
        const first = issues?.[0];
        expect(first?.issue.sequence).toBe(handle.getSummary().sequence);
        unmount();
    });

    it('holds the run while a composition is open and runs 750 ms after the composed text settles', async () => {
        const { handle, runtime, view, unmount } = mountChecks({ blocks: [para(text('Hello'))] });

        act(() => {
            typeText(handle, 'a');
        });
        advance(CHECK_DELAY_MS - 10);
        act(() => {
            view.dom.dispatchEvent(new CompositionEvent('compositionstart'));
            view.dispatch(view.state.tr.insertText('か').setMeta('composition', 1));
        });
        advance(CHECK_DELAY_MS * 3);

        expect(ruleCalls()).toBe(0);
        expect(handle.getSummary().compositionActive).toBe(true);

        act(() => {
            view.dom.dispatchEvent(new CompositionEvent('compositionend'));
        });
        await act(async () => {
            await vi.advanceTimersByTimeAsync(0);
        });
        advance(SETTLE_MS);
        expect(handle.getSummary().compositionActive).toBe(false);
        advance(CHECK_DELAY_MS - SETTLE_MS - 1);
        expect(ruleCalls()).toBe(0);

        advance(CHECK_DELAY_MS);

        expect(ruleCalls()).toBeGreaterThan(0);
        expect(contentChecksStateOf(runtime.state)?.runs).toBe(1);
        unmount();
    });

    it('runs at once when the issues panel opens', () => {
        const { runtime, unmount } = mountChecks({ blocks: [headingBlock('empty', 2)] });

        expect(ruleCalls()).toBe(0);
        fireEvent.click(screen.getByRole('button', { name: 'Accessibility checks' }));

        expect(ruleCalls()).toBeGreaterThan(0);
        expect(contentChecksStateOf(runtime.state)?.issues.map(({ issue }) => issue.id)).toContain(
            'heading.empty:empty',
        );
        unmount();
    });

    it('keeps focus in the surface and the delay while the panel is open in a host that renders a new presentation on each change', () => {
        const model = checksModel();
        const definition = defineEditor({ id: 'test.checks', model, plugins: pluginsFor(model) });
        const ref = createRef<EditorHandle>();
        const Host = () => {
            const [changes, setChanges] = useState(0);

            return (
                <div data-changes={changes}>
                    <RichTextEditor
                        aria-label="Notes"
                        definition={definition}
                        presentation={defineReactPresentation({ toolbar: [['checks.open']] })}
                        defaultValue={{
                            documentId: 'document-1',
                            revision: null,
                            document: storedIn(model, [para(text('Hello'))]),
                        }}
                        onDocumentChange={() => setChanges((count) => count + 1)}
                        ref={ref}
                    />
                </div>
            );
        };

        const { unmount } = render(<Host />);
        act(() => {
            vi.advanceTimersToNextFrame();
        });
        const handle = ref.current;
        const view = handle === null ? undefined : runtimeOf(handle)?.view;
        if (handle === null || view === undefined) {
            throw new Error('The editor did not mount.');
        }

        fireEvent.click(screen.getByRole('button', { name: 'Accessibility checks' }));
        const opened = ruleCalls();
        act(() => {
            view.focus();
        });

        act(() => {
            typeText(handle, 'a');
        });
        advance(0);

        expect(document.activeElement).toBe(view.dom);
        expect(ruleCalls()).toBe(opened);
        advance(CHECK_DELAY_MS);
        expect(ruleCalls()).toBeGreaterThan(opened);
        expect(document.activeElement).toBe(view.dom);
        unmount();
    });

    it('keeps its results in plugin state only, so the document and its hash stay the same', () => {
        const { handle, unmount } = mountChecks({
            blocks: [headingBlock('empty', 2), para(link('here')), image('photo'), para(colored('Pale', 'pale'))],
        });
        const before = handle.getSnapshot();
        const { sequence } = handle.getSummary();

        fireEvent.click(screen.getByRole('button', { name: 'Accessibility checks' }));
        advance(CHECK_DELAY_MS);

        const after = handle.getSnapshot();
        expect(hashDocument(after.document)).toBe(hashDocument(before.document));
        expect(after.document).toEqual(before.document);
        expect(handle.getSummary().sequence).toBe(sequence);
        expect(JSON.stringify(after.document)).not.toMatch(/issue|image\.alt-missing|heading\.empty/);
        unmount();
    });
});

describe('a draft save', () => {
    it('proceeds for a document with an open issue of every error rule', async () => {
        const { handle, runtime, unmount } = mountChecks({
            blocks: [
                headingBlock('empty', 2),
                para(text('Go '), link('  ')),
                image('photo'),
                para(colored('Pale', 'pale')),
            ],
            services: { persistence: createFakePersistenceService() },
        });
        fireEvent.click(screen.getByRole('button', { name: 'Accessibility checks' }));
        const errors = new Set(
            contentChecksStateOf(runtime.state)
                ?.issues.filter(({ issue }) => issue.severity === 'error')
                .map(({ issue }) => issue.ruleId),
        );
        expect([...errors].sort()).toEqual(
            ['contrast.low', 'heading.empty', 'image.alt-missing', 'link.text-empty'].sort(),
        );
        act(() => {
            typeText(handle, 'x');
        });

        let result: Awaited<ReturnType<typeof handle.requestCommit>> | undefined;
        await act(async () => {
            result = await handle.requestCommit({ reason: 'manual' });
        });

        expect(result).toMatchObject({ status: 'acknowledged' });
        expect(handle.getSaveStatus().state).toBe('clean');
        unmount();
    });
});
