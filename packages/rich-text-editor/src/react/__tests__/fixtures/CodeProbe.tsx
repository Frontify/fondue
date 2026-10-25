/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ThemeProvider } from '@frontify/fondue-components';
import { useEffect, useRef } from 'react';

import { codeBlock, core } from '#/features';
import { unitsOf } from '#/features/__tests__/fixtures/units';
import { bulletList } from '#/features/listsBullet/feature';
import { listItem } from '#/features/listsItem/feature';
import { defineEditor, type EditorHandle, RichTextEditor } from '#/index';
import { compileContentModel, type RichTextDocument } from '#/model';
import { setSelection } from '#/testing';

const model = compileContentModel([core(), listItem(), bulletList(), codeBlock()], {
    id: 'test.code-ct',
    version: 1,
});
const definition = defineEditor({ id: 'test.code-ct', model, plugins: unitsOf(model) });

/** One change as the probe records it: where it came from and the document content after it. */
export interface CodeChange {
    readonly origin: string;
    readonly commandId: string | null;
    readonly content: unknown;
}

declare global {
    interface Window {
        /** The code probe's handle, the selection helper and each change. */
        codeRte?: {
            readonly handle: EditorHandle;
            readonly setSelection: typeof setSelection;
            readonly changes: CodeChange[];
        };
    }
}

const documentOf = (blocks: readonly object[]): RichTextDocument =>
    ({
        format: 'frontify.rich-text',
        formatVersion: 1,
        model: model.ref,
        requiredCapabilities: model.capabilities,
        content: { type: 'doc', attrs: { lang: null, dir: 'auto' }, content: [...blocks] },
    }) as unknown as RichTextDocument;

/** Mounts a code block, including inside a list, between two focusable buttons. */
export const CodeProbe = ({ blocks }: { readonly blocks: readonly object[] }) => {
    const ref = useRef<EditorHandle>(null);
    const changesRef = useRef<CodeChange[]>([]);
    useEffect(() => {
        const handle = ref.current;
        if (handle !== null) {
            window.codeRte = { handle, setSelection, changes: changesRef.current };
        }
    }, []);
    return (
        <ThemeProvider>
            <button type="button" tabIndex={0}>
                Before
            </button>
            <RichTextEditor
                aria-label="Notes"
                definition={definition}
                defaultValue={{ documentId: 'document-1', revision: null, document: documentOf(blocks) }}
                ref={ref}
                onDocumentChange={({ origin, commandId, readDocument }) => {
                    changesRef.current.push({ origin, commandId, content: readDocument().content });
                }}
            />
            <button type="button" tabIndex={0}>
                After
            </button>
        </ThemeProvider>
    );
};
