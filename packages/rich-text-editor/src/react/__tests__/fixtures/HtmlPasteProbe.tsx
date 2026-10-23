/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AllSelection } from 'prosemirror-state';
import { useEffect, useRef } from 'react';

import { htmlModel } from '#/features/__tests__/fixtures/html';
import { defineEditor, defineReactPresentation, type EditorHandle, RichTextEditor } from '#/index';
import { createEmptyDocument } from '#/model';
import { runtimeOf } from '#/runtime/runtime';

const model = htmlModel();
const definition = defineEditor({ id: 'test.html-paste', model });
const presentation = defineReactPresentation({});

declare global {
    interface Window {
        /** The mounted editor of the HTML stand-ins and what the HTML paste tests read of it. */
        htmlPaste?: {
            /** The stored content of the published document. */
            readonly content: () => unknown;
            readonly selectAll: () => void;
        };
    }
}

/** An empty editor of the shipped text features and the HTML parse rule stand-ins, as `fromHTML` converts with. */
export const HtmlPasteProbe = () => {
    const ref = useRef<EditorHandle<object>>(null);
    useEffect(() => {
        const handle = ref.current as EditorHandle | null;
        if (handle === null) {
            return;
        }
        const view = runtimeOf(handle)?.view;
        if (view === undefined) {
            return;
        }
        window.htmlPaste = {
            content: () => handle.getSnapshot().document.content.content,
            selectAll: () => {
                view.dispatch(view.state.tr.setSelection(new AllSelection(view.state.doc)));
                handle.focus();
            },
        };
    }, []);
    return (
        <RichTextEditor
            aria-label="Notes"
            definition={definition}
            defaultValue={{ documentId: 'document-1', revision: null, document: createEmptyDocument(model) }}
            presentation={presentation}
            ref={ref}
        />
    );
};
