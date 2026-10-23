/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AllSelection } from 'prosemirror-state';
import { useEffect, useRef } from 'react';

import { documentModel } from '#/features';
import { defineEditor, defineReactPresentation, type EditorHandle, RichTextEditor } from '#/index';
import { createEmptyDocument, type RichTextDocument } from '#/model';
import metadata from '#/model/__tests__/fixtures/a11y/metadata.json';
import { runtimeOf } from '#/runtime/runtime';

const definition = defineEditor({ id: 'test.metadata', model: documentModel });
/** Every asset at a same-origin URL, which the CT page CSP allows, answered through `page.route`. */
const presentation = defineReactPresentation({
    resolveAssetUrl: (assetId: string) => `${window.location.origin}/test-assets/${assetId}`,
});

declare global {
    interface Window {
        /** Copies the whole source editor as HTML, and pastes HTML over the whole target editor, returning its blocks. */
        metadataClip?: { readonly copy: () => string; readonly paste: (html: string) => unknown };
    }
}

const viewOf = (handle: EditorHandle | null) => {
    if (handle === null) {
        throw new Error('The editor did not mount.');
    }
    const view = runtimeOf(handle)?.view;
    if (view === undefined) {
        throw new Error('The editor did not mount.');
    }
    view.dispatch(view.state.tr.setSelection(new AllSelection(view.state.doc)));
    return view;
};

/** An editor holding the accessibility metadata fixture, named Source, and an empty one named Target. */
export const MetadataProbe = () => {
    const sourceRef = useRef<EditorHandle<object>>(null);
    const targetRef = useRef<EditorHandle<object>>(null);
    useEffect(() => {
        window.metadataClip = {
            copy: () => {
                const clipboardData = new DataTransfer();
                viewOf(sourceRef.current).dom.dispatchEvent(
                    new ClipboardEvent('copy', { clipboardData, bubbles: true, cancelable: true }),
                );
                return clipboardData.getData('text/html');
            },
            paste: (html) => {
                const clipboardData = new DataTransfer();
                clipboardData.setData('text/html', html);
                viewOf(targetRef.current).dom.dispatchEvent(
                    new ClipboardEvent('paste', { clipboardData, bubbles: true, cancelable: true }),
                );
                return targetRef.current?.getSnapshot().document.content.content;
            },
        };
    }, []);
    return (
        <>
            <RichTextEditor
                aria-label="Source"
                definition={definition}
                presentation={presentation}
                defaultValue={{
                    documentId: 'source',
                    revision: null,
                    document: metadata as unknown as RichTextDocument,
                }}
                ref={sourceRef}
            />
            <RichTextEditor
                aria-label="Target"
                definition={definition}
                presentation={presentation}
                defaultValue={{ documentId: 'target', revision: null, document: createEmptyDocument(documentModel) }}
                ref={targetRef}
            />
        </>
    );
};
