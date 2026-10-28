/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ThemeProvider } from '@frontify/fondue-components';
import { useEffect, useRef } from 'react';

import { defineEditor, type EditorHandle, RichTextEditor } from '#/index';
import { compileContentModel, type RichTextDocument } from '#/model';
import { codeBlock, core } from '#/plugins';
import { pluginsFor } from '#/plugins/__tests__/fixtures/pluginsFor';
import { bulletList } from '#/plugins/BulletList/feature';
import { listItem } from '#/plugins/ListItem/feature';
import { setSelection } from '#/testing';

const model = compileContentModel([core(), listItem(), bulletList(), codeBlock()], {
    id: 'test.code-ct',
    version: 1,
});
const definition = defineEditor({ id: 'test.code-ct', model, plugins: pluginsFor(model) });

/** One change as the probe records it: where it came from and the document content after it. */
export type CodeChange = {
    origin: string;
    commandId: string | null;
    content: unknown;
};

declare global {
    // oxlint-disable-next-line typescript/consistent-type-definitions -- only an interface merges into the global `Window`.
    interface Window {
        /** The code probe's handle, the selection helper and each change. */
        codeRte?: {
            handle: EditorHandle;
            setSelection: typeof setSelection;
            changes: CodeChange[];
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

export type CodeProbeProps = { blocks: readonly object[] };

/** Mounts a code block, including inside a list, between two focusable buttons. */
export const CodeProbe = ({ blocks }: CodeProbeProps) => {
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
