/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createElement } from 'react';

import { createCodecs } from '#/codecs';
import { type EditorHandle } from '#/index';
import { type ContentModel, type Diagnostic, type RichTextDocument } from '#/model';
import { RichTextReader } from '#/reader';

const RENDERER_FAILURES = ['reader.override-failed', 'codecs.override-failed', 'runtime.view-fault'];

/** One counter for the three places a renderer failure is reported. */
export const createRendererFailureCounter = () => {
    let failures = 0;
    const record = (diagnostic: Diagnostic) => {
        if (RENDERER_FAILURES.includes(diagnostic.code)) {
            failures += 1;
        }
    };
    return { record, failures: () => failures };
};

type RendererFailureCounter = ReturnType<typeof createRendererFailureCounter>;

/** The reader calls `onDiagnostic` while it renders, once per diagnostic of a document while the function stays the same. */
export const readerElement = (counter: RendererFailureCounter, model: ContentModel, document: RichTextDocument) =>
    createElement(RichTextReader, { document, model, onDiagnostic: counter.record });

/** The codecs return their diagnostics beside their output. */
export const recordCodecFailures = (
    counter: RendererFailureCounter,
    model: ContentModel,
    document: RichTextDocument,
) => {
    const { diagnostics } = createCodecs(model).toHTML(document);
    for (const diagnostic of diagnostics) {
        counter.record(diagnostic);
    }
};

/** An editor reports a view fault through its `diagnostic` event, which `onDiagnostic` of `RichTextEditor` also receives. */
export const recordEditorFailures = (counter: RendererFailureCounter, handle: EditorHandle<object>) =>
    handle.subscribe('diagnostic', counter.record);
