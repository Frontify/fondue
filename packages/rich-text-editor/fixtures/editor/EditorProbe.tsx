/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useRef } from 'react';

import { bold, core } from '../../src/features';
import { defineEditor, type EditorHandle, RichTextEditor } from '../../src/index';
import { compileContentModel } from '../../src/model';
import { setSelection } from '../../src/testing';

const model = compileContentModel([core(), bold()], { id: 'test.ct', version: 1 });
const definition = defineEditor({ id: 'test.ct', model });

/** A document of one paragraph per text, in the CT model. */
export const storedOf = (...texts: readonly string[]) => ({
    documentId: 'document-1',
    revision: null,
    document: {
        format: 'frontify.rich-text' as const,
        formatVersion: 1 as const,
        model: { id: 'test.ct', version: 1 },
        requiredCapabilities: [{ id: 'core', version: 1 }],
        content: {
            type: 'doc',
            attrs: { lang: null, dir: 'auto' },
            content: texts.map((text) => ({
                type: 'paragraph',
                attrs: { lang: null },
                content: text === '' ? [] : [{ type: 'text', text }],
            })),
        },
    },
});

declare global {
    interface Window {
        /** The mounted editor's handle and the selection helper, for tests that drive it from the page. */
        rte?: { readonly handle: EditorHandle; readonly setSelection: typeof setSelection };
    }
}

/** Mounts the CT model's editor after a focusable button, and reports each change's origin and HTML. */
export const EditorProbe = ({
    texts = ['ab'],
    readOnly = false,
    placeholder,
    onChange,
}: {
    readonly texts?: readonly string[];
    readonly readOnly?: boolean;
    readonly placeholder?: string;
    readonly onChange?: (change: { readonly origin: string; readonly commandId: string | null }) => void;
}) => {
    const ref = useRef<EditorHandle<object>>(null);
    useEffect(() => {
        if (ref.current !== null) {
            window.rte = { handle: ref.current as EditorHandle, setSelection };
        }
    }, []);
    return (
        <>
            <button type="button">Before</button>
            <RichTextEditor
                aria-label="Notes"
                definition={definition}
                defaultValue={storedOf(...texts)}
                readOnly={readOnly}
                {...(placeholder === undefined ? {} : { placeholder })}
                ref={ref}
                onDocumentChange={({ origin, commandId }) => onChange?.({ origin, commandId })}
            />
        </>
    );
};
