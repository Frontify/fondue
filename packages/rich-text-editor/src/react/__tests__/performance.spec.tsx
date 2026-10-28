/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, render } from '@testing-library/react';
import { Node } from 'prosemirror-model';
import { createRef } from 'react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';

import { defineReactPresentation } from '#/entries/authoring';
import { defineEditor, type EditorHandle, RichTextEditor } from '#/index';
import { compileContentModel, type ContentNodeJSON } from '#/model';
// oxlint-disable-next-line no-restricted-imports -- the spies need the hash module's own namespace, not a re-export.
import * as hash from '#/model/helpers/hash';
import { featuresById } from '#/plugins';
import { pluginsFor } from '#/plugins/__tests__/fixtures/pluginsFor';
import { registry } from '#/plugins/registry';
import { runtimeOf } from '#/runtime/runtime';
import { typeText } from '#/testing';

import budgets from '../../../perf/budgets.json';
import { percentile } from '../../../perf/report';

import { storedIn } from './fixtures/text';

// Each paragraph holds a plain, a bold and a linked run, so 5,000 of them make 20,000 nodes.
const PARAGRAPHS = 5000;
const RUNS = 50;
const budgetOf = (id: string): number => {
    const budget = budgets.rows.find((row) => row.id === id)?.budgetMs;
    if (budget === null || budget === undefined) {
        throw new Error(`No budget for ${id}.`);
    }

    return budget;
};

// The budgets in ms, both p95 on the large fixture.
const KEYSTROKE_BUDGET_P95 = budgetOf('keystroke-large-p95');
const COMMIT_PIPELINE_BUDGET_P95 = budgetOf('commit-large-p95');
// Taken before the fake timers replace `performance`.
const now = performance.now.bind(performance);

const paragraphOf = (index: number): ContentNodeJSON =>
    ({
        type: 'paragraph',
        attrs: { lang: null },
        content: [
            { type: 'text', text: `Paragraph ${index} ` },
            { type: 'text', text: 'bold', marks: [{ type: 'bold' }] },
            {
                type: 'text',
                text: ' link',
                marks: [
                    {
                        type: 'link',
                        attrs: {
                            href: 'https://frontify.com',
                            openInNewWindow: false,
                            styleId: null,
                        },
                    },
                ],
            },
        ],
    }) as ContentNodeJSON;

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
    vi.useRealTimers();
});

/** Mounts the `large` fixture's 20,000-node document with a caret in the middle of it. */
const mountLarge = () => {
    const model = compileContentModel(featuresById(Object.keys(registry)), {
        id: 'test.performance',
        version: 1,
    });
    const definition = defineEditor({ id: 'test.performance', model, plugins: pluginsFor(model) });
    const presentation = defineReactPresentation({
        toolbar: [['mark.bold.toggle', 'mark.italic.toggle'], ['link.edit'], ['outline.toggle', 'checks.open']],
    });
    const blocks = Array.from({ length: PARAGRAPHS }, (_, index) => paragraphOf(index));
    const ref = createRef<EditorHandle>();
    render(
        <RichTextEditor
            aria-label="Notes"
            definition={definition}
            presentation={presentation}
            defaultValue={{
                documentId: 'document-1',
                revision: null,
                document: storedIn(model, blocks),
            }}
            ref={ref}
        />,
    );
    act(() => {
        vi.advanceTimersToNextFrame();
    });
    const handle = ref.current;
    const runtime = handle === null ? undefined : runtimeOf(handle);
    if (handle === null || runtime === undefined) {
        throw new Error('The editor did not mount.');
    }

    let nodes = 0;
    runtime.state.doc.descendants(() => {
        nodes += 1;
    });
    // A caret in the middle of the document, inside its first plain run.
    const middle = runtime.state.doc.resolve(runtime.state.doc.content.size / 2).start() + 2;
    act(() => {
        runtime.select({ anchor: middle, head: middle });
    });

    return { handle, runtime, nodes };
};

it('types a character and moves the caret in a 20,000-node document within the keystroke and commit pipeline budgets', () => {
    const { handle, runtime, nodes } = mountLarge();
    const typing: number[] = [];
    const moving: number[] = [];
    for (let run = 0; run < RUNS; run += 1) {
        const started = now();
        act(() => {
            typeText(handle, 'a');
        });
        typing.push(now() - started);
        const caret = runtime.state.selection.head;
        const target = run % 2 === 0 ? caret - 1 : caret + 1;
        const moved = now();
        act(() => {
            runtime.select({ anchor: target, head: target });
        });
        moving.push(now() - moved);
    }

    expect(nodes).toBeGreaterThanOrEqual(20000);
    expect(percentile(typing, 'p95')).toBeLessThanOrEqual(KEYSTROKE_BUDGET_P95);
    expect(percentile(moving, 'p95')).toBeLessThanOrEqual(COMMIT_PIPELINE_BUDGET_P95);
}, 120_000);

it('neither hashes nor compares the document nor calls toJSON on a node over 100 keystrokes in a 20,000-node document', () => {
    const { handle } = mountLarge();
    const toJSON = vi.spyOn(Node.prototype, 'toJSON');
    const hashDocument = vi.spyOn(hash, 'hashDocument');
    const sameDocument = vi.spyOn(hash, 'sameDocument');

    for (let keystroke = 0; keystroke < 100; keystroke += 1) {
        act(() => {
            typeText(handle, 'a');
        });
    }

    expect(toJSON).not.toHaveBeenCalled();
    expect(hashDocument).not.toHaveBeenCalled();
    expect(sameDocument).not.toHaveBeenCalled();
}, 120_000);

it('has spies that see a real toJSON call and a real document compare', async () => {
    const { handle } = mountLarge();
    const toJSON = vi.spyOn(Node.prototype, 'toJSON');
    const sameDocument = vi.spyOn(hash, 'sameDocument');

    // Reading the document encodes it, and replacing it with an echo of itself compares the two documents.
    const snapshot = handle.getSnapshot();
    expect(toJSON).toHaveBeenCalled();
    const result = await handle.replaceDocument({
        expected: snapshot.stamp,
        next: { documentId: 'document-1', revision: null, document: snapshot.document },
        unsaved: { action: 'reject' },
        selection: 'start',
        history: 'reset',
    });

    expect(result.status).toBe('replaced');
    expect(sameDocument).toHaveBeenCalled();
}, 120_000);

it('types a character in a highlighted 2,000-line code block within the keystroke budget', async () => {
    const model = compileContentModel(featuresById(Object.keys(registry)), {
        id: 'test.performance',
        version: 1,
    });
    const definition = defineEditor({ id: 'test.performance', model, plugins: pluginsFor(model) });
    const lines = Array.from({ length: 2000 }, (_, index) => `const value${index} = "line ${index}";`);
    const block = {
        type: 'code_block',
        attrs: { languageId: 'typescript' },
        content: [{ type: 'text', text: lines.join('\n') }],
    } as ContentNodeJSON;
    const ref = createRef<EditorHandle>();
    const { container } = render(
        <RichTextEditor
            aria-label="Notes"
            definition={definition}
            defaultValue={{
                documentId: 'document-1',
                revision: null,
                document: storedIn(model, [block]),
            }}
            ref={ref}
        />,
    );
    await vi.waitFor(() => {
        expect(container.querySelector('[class*="hljs-"]')).not.toBeNull();
    });
    const handle = ref.current;
    const runtime = handle === null ? undefined : runtimeOf(handle);
    if (handle === null || runtime === undefined) {
        throw new Error('The editor did not mount.');
    }

    const middle = Math.floor(runtime.state.doc.content.size / 2);
    act(() => {
        runtime.select({ anchor: middle, head: middle });
    });
    const typing: number[] = [];
    for (let run = 0; run < RUNS; run += 1) {
        const started = now();
        act(() => {
            typeText(handle, 'a');
        });
        typing.push(now() - started);
    }

    expect(container.querySelector('[class*="hljs-"]')).not.toBeNull();
    expect(percentile(typing, 'p95')).toBeLessThanOrEqual(KEYSTROKE_BUDGET_P95);
}, 120_000);
