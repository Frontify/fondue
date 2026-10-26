/* (c) Copyright Frontify Ltd., all rights reserved. */

import fc from 'fast-check';
import { AllSelection } from 'prosemirror-state';
import { useEffect, useRef } from 'react';

import { createCodecs } from '#/codecs';
import { unitsOf } from '#/features/__tests__/fixtures/units';
import { defineEditor, type EditorHandle, RichTextEditor } from '#/index';
import { type ContentNodeJSON, createEmptyDocument } from '#/model';
import { runtimeOf } from '#/runtime/runtime';

import { documentArb, markupTextArb } from './generated';
import { losslessModel } from './lossless';

const definition = defineEditor({ id: 'test.lossless', model: losslessModel, plugins: unitsOf(losslessModel) });

/** One generated document whose pasted `toHTML` output differs from it. */
type Mismatch = {
    html: string;
    expected: readonly ContentNodeJSON[];
    pasted: readonly ContentNodeJSON[];
};

declare global {
    // oxlint-disable-next-line typescript/consistent-type-definitions -- only an interface merges into the global `Window`.
    interface Window {
        /** Pastes the `toHTML` output of `numRuns` generated documents over the whole document; the ones that differ. */
        htmlRoundTrip?: (numRuns: number, seed: number) => readonly Mismatch[];
    }
}

/** `node` with every `nodeId` set to null, since a paste creates new ones. */
const withoutIds = (node: ContentNodeJSON): ContentNodeJSON => {
    const copy: Record<string, unknown> = { ...node };
    if (node.attrs !== undefined && Object.hasOwn(node.attrs, 'nodeId')) {
        copy.attrs = { ...node.attrs, nodeId: null };
    }

    if (node.content !== undefined) {
        copy.content = node.content.map(withoutIds);
    }

    return copy as unknown as ContentNodeJSON;
};

/** An empty editor of the shipped features whose HTML support is lossless. */
export const HtmlRoundTripProbe = () => {
    const ref = useRef<EditorHandle<object>>(null);
    useEffect(() => {
        const handle = ref.current;
        if (handle === null) {
            return;
        }

        const view = runtimeOf(handle)?.view;
        if (view === undefined) {
            return;
        }

        const codecs = createCodecs(losslessModel);
        window.htmlRoundTrip = (numRuns, seed) =>
            fc.sample(documentArb(losslessModel, markupTextArb), { numRuns, seed }).flatMap((document) => {
                const { html } = codecs.toHTML(document);
                view.dispatch(view.state.tr.setSelection(new AllSelection(view.state.doc)));
                const clipboardData = new DataTransfer();
                clipboardData.setData('text/html', html);
                view.dom.dispatchEvent(new ClipboardEvent('paste', { clipboardData, bubbles: true, cancelable: true }));
                const pasted = (handle.getSnapshot().document.content.content ?? []).map(withoutIds);
                const expected = (document.content.content ?? []).map(withoutIds);
                if (JSON.stringify(pasted) === JSON.stringify(expected)) {
                    return [];
                }

                return [{ html, expected, pasted }];
            });
    }, []);

    return (
        <RichTextEditor
            aria-label="Notes"
            definition={definition}
            defaultValue={{ documentId: 'document-1', revision: null, document: createEmptyDocument(losslessModel) }}
            ref={ref}
        />
    );
};
