/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, render } from '@testing-library/react';
import { AllSelection, Selection } from 'prosemirror-state';
import { createRef } from 'react';
import { vi } from 'vitest';

import { compileContentModel, type ContentModel, type Diagnostic, type JsonValue, type ResourceLimits } from '#/model';
import { doc, envelope, paragraph, text } from '#/plugins/__tests__/fixtures/documents';
import { fixtureMedia } from '#/plugins/__tests__/fixtures/features';
import { unitsOf } from '#/plugins/__tests__/fixtures/units';
import {
    vocabularyAlign,
    vocabularyBlocks,
    vocabularyIndent,
    vocabularyLink,
    vocabularyLists,
    vocabularyMarks,
    vocabularyMention,
    vocabularyStyles,
    vocabularyTables,
} from '#/plugins/__tests__/fixtures/vocabulary';
import { core } from '#/plugins/Core/feature';
import { defineEditor, defineReactPresentation } from '#/react/compile/define';
import { RichTextEditor } from '#/react/RichTextEditor/RichTextEditor';
import { type EditorHandle } from '#/react/types';
import { SLICE_TYPE } from '#/runtime/clipboard/slice';
import { type RuntimeHandle, runtimeOf } from '#/runtime/runtime';
import { type AuthoringPolicy, type DocumentChange } from '#/runtime/types';
import { paste } from '#/testing';

import { inputOf, transfer } from './transfer';

// The vocabulary stand-ins the engine can build, with a figure whose caption it can fill.
export const features = [
    core(),
    vocabularyStyles(),
    vocabularyAlign(),
    vocabularyIndent(),
    vocabularyBlocks(),
    vocabularyLists(),
    vocabularyTables(),
    fixtureMedia(),
    vocabularyMention(),
    vocabularyMarks(),
    vocabularyLink(),
];
export const model = compileContentModel(features, { id: 'fixture.vocabulary', version: 1 });
export const ALLOW = { create: true, edit: true, remove: true, paste: true };
export const MIB = 1024 * 1024;

export type Options = {
    blocks?: readonly JsonValue[];
    sliceContext?: string | null;
    policy?: Partial<AuthoringPolicy>;
    limits?: Partial<ResourceLimits>;
    editorModel?: ContentModel;
    readOnly?: boolean;
    generateId?: () => string;
};

/** Mounts an editor of the vocabulary stand-ins, ready, with its view, diagnostics, changes and live region. */
export const mount = (options?: Options) => {
    let given: Options = {};
    if (options !== undefined) {
        given = options;
    }

    const {
        blocks = [paragraph(text('ab'))],
        sliceContext = null,
        policy = {},
        limits = {},
        editorModel = model,
        readOnly = false,
        generateId,
    } = given;
    const definition = defineEditor({
        id: 'test.clipboard',
        model: editorModel,
        policy,
        limits,
        plugins: unitsOf(editorModel),
    });
    const ref = createRef<EditorHandle<object>>();
    const ids: { generateId?: () => string } = {};
    if (generateId !== undefined) {
        ids.generateId = generateId;
    }

    const diagnostics: Diagnostic[] = [];
    const changes: DocumentChange[] = [];
    const rendered = render(
        <RichTextEditor
            aria-label="Notes"
            data-test-id={`editor-${String(sliceContext)}`}
            definition={definition}
            defaultValue={{
                documentId: 'document-1',
                revision: null,
                document: envelope(doc(...blocks)) as never,
            }}
            presentation={defineReactPresentation({ sliceContext })}
            readOnly={readOnly}
            {...ids}
            ref={ref}
            onDiagnostic={(diagnostic) => diagnostics.push(diagnostic)}
            onDocumentChange={(change) => changes.push(change)}
        />,
    );
    act(() => {
        vi.advanceTimersToNextFrame();
    });
    const handle = ref.current;
    if (handle === null) {
        throw new Error('no editor');
    }

    const view = runtimeOf(handle)?.view;
    if (view === undefined) {
        throw new Error('no view');
    }

    const announced = () => {
        const region = rendered.container.querySelector('[aria-live="polite"]');

        return region?.textContent;
    };

    const content = () => handle.getSnapshot().document.content.content as unknown;

    return { handle, view, diagnostics, changes, announced, content, unmount: rendered.unmount };
};

export type Mounted = ReturnType<typeof mount>;

export const pasteInto = ({ handle }: Mounted, data: Readonly<Record<string, string>>, files: readonly File[] = []) => {
    act(() => {
        paste(handle, inputOf(data, files));
    });
};

/** The paste event itself, for the cases that read the event or carry a flavor the helper does not model. */
export const pasteEventInto = (
    { view }: Mounted,
    data: Readonly<Record<string, string>>,
    files: readonly File[] = [],
) => {
    const event = new ClipboardEvent('paste', {
        clipboardData: transfer(data, files),
        bubbles: true,
        cancelable: true,
    });
    act(() => {
        view.dom.dispatchEvent(event);
    });

    return event;
};

/** Dispatches a drop of `data` at a stubbed point inside the first paragraph, as a browser does after the pointer release. */
export const dropInto = ({ view }: Mounted, data: Readonly<Record<string, string>>) => {
    vi.spyOn(view, 'posAtCoords').mockReturnValue({ pos: 1, inside: 0 });
    const event = new DragEvent('drop', { bubbles: true, cancelable: true });
    // happy-dom's DragEvent ignores the `dataTransfer` init.
    Object.defineProperty(event, 'dataTransfer', { value: transfer(data) });
    act(() => {
        view.dom.dispatchEvent(event);
    });

    return event;
};

export const copyFrom = ({ view }: Mounted, type: 'copy' | 'cut' = 'copy') => {
    const clipboardData = new DataTransfer();
    act(() => {
        view.dom.dispatchEvent(new ClipboardEvent(type, { clipboardData, bubbles: true, cancelable: true }));
    });

    return {
        html: clipboardData.getData('text/html'),
        text: clipboardData.getData('text/plain'),
        slice: clipboardData.getData(SLICE_TYPE),
    };
};

/** Releases Shift, which `pressKey` has no way to do. */
export const releaseShift = ({ view }: Mounted) =>
    act(() => {
        view.dom.dispatchEvent(new KeyboardEvent('keyup', { key: 'Shift', bubbles: true }));
    });

export const selectAll = ({ view }: Mounted) =>
    act(() => {
        view.dispatch(view.state.tr.setSelection(new AllSelection(view.state.doc)));
    });

export const caretAtEnd = ({ view }: Mounted) =>
    act(() => {
        view.dispatch(view.state.tr.setSelection(Selection.atEnd(view.state.doc)));
    });

export const undo = ({ handle }: Mounted) =>
    act(() => {
        (handle as unknown as RuntimeHandle).execute('history.undo');
    });

/** A slice payload of the vocabulary model with `content`, as the editor writes one. */
export const slicePayload = (content: readonly JsonValue[], extra: Readonly<Record<string, JsonValue>> = {}) =>
    JSON.stringify({
        format: 'frontify.rich-text-slice',
        formatVersion: 1,
        model: { id: 'fixture.vocabulary', version: 1 },
        requiredCapabilities: model.capabilities.map(({ id, version }) => ({ id, version })),
        context: 'a',
        openStart: 0,
        openEnd: 0,
        content,
        ...extra,
    });

export const nodeIdsOf = (value: unknown): string[] => {
    if (Array.isArray(value)) {
        return value.flatMap(nodeIdsOf);
    }

    if (typeof value !== 'object' || value === null) {
        return [];
    }

    const record = value as Record<string, unknown>;
    const own: string[] = [];
    const attrs = record.attrs as Record<string, unknown> | undefined;
    if (attrs !== undefined && typeof attrs.nodeId === 'string') {
        own.push(attrs.nodeId);
    }

    return [...own, ...nodeIdsOf(record.content)];
};

export const textOf = (mounted: Mounted) =>
    mounted.view.state.doc.textBetween(0, mounted.view.state.doc.content.size, '|');
