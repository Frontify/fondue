/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, render } from '@testing-library/react';
import { createRef, Profiler } from 'react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';

import { useCommandQuery, useEditorSelection } from '#/bridge/hooks';
import { featuresById } from '#/features';
import { defineEditor, type EditorHandle, RichTextEditor } from '#/index';
import { compileContentModel, type ContentNodeJSON } from '#/model';
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
    const definition = defineEditor({ id: 'test.hook-renders', model });
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
