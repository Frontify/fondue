/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useRef } from 'react';

import { bold, core } from '#/features';
import { type CompiledEditorDefinition, defineEditor, type EditorHandle, RichTextEditor } from '#/index';
import { compileContentModel, type ContentNodeJSON } from '#/model';
import { runtimeOf } from '#/runtime/runtime';
import { setSelection } from '#/testing';

const model = compileContentModel([core(), bold()], {
    id: 'test.ct',
    version: 1,
});
const ALLOW = { create: true, edit: true, remove: true };
/** The component-test model's definitions: every feature allowed, and paragraphs that may not change. */
const definitions = {
    open: defineEditor({ id: 'test.ct', model }),
    guarded: defineEditor({
        id: 'test.ct',
        model,
        policy: { features: { core: { ...ALLOW, edit: false } } },
    }),
};

/** A text, or a link around the text inside `[` and `]`, as `Read the [guide]`. */
const textOf = (text: string) =>
    text.split(/(\[[^\]]*\])/).flatMap((part) => {
        if (part === '') {
            return [];
        }
        if (!part.startsWith('[')) {
            return [{ type: 'text', text: part }];
        }
        const link = {
            type: 'link',
            attrs: { href: 'https://example.com/followed', openInNewWindow: false, styleId: null },
        };
        return [{ type: 'text', text: part.slice(1, -1), marks: [link] }];
    });

/** A document of `blocks` in the component-test model, which needs the features `capabilities` name. */
const documentOf = (blocks: readonly ContentNodeJSON[], capabilities: readonly string[]) => ({
    documentId: 'document-1',
    revision: null,
    document: {
        format: 'frontify.rich-text' as const,
        formatVersion: 1 as const,
        model: { id: 'test.ct', version: 1 },
        requiredCapabilities: capabilities.map((id) => ({ id, version: 1 })),
        content: { type: 'doc', attrs: { lang: null, dir: 'auto' }, content: blocks },
    },
});

/** A document of one paragraph per text, in the component-test model. */
export const storedOf = (...texts: readonly string[]) =>
    documentOf(
        texts.map((text) => ({ type: 'paragraph', attrs: { lang: null }, content: textOf(text) })),
        ['core'],
    );

declare global {
    interface Window {
        /** The mounted editor's handle and the selection helper, for tests that drive it from the page. */
        rte?: {
            readonly handle: EditorHandle;
            readonly setSelection: typeof setSelection;
            /** The text of the runtime's document. */
            readonly text: () => string | undefined;
        };
    }
}

/** Mounts the component-test editor after a focusable button, and reports each change's origin and command. */
export const EditorProbe = ({
    texts = ['ab'],
    readOnly = false,
    guarded = false,
    onChange,
}: {
    readonly texts?: readonly string[];
    readonly readOnly?: boolean;
    /** Mounts the definition whose policy keeps every paragraph as it is. */
    readonly guarded?: boolean;
    readonly onChange?: (change: { readonly origin: string; readonly commandId: string | null }) => void;
}) => {
    const ref = useRef<EditorHandle<object>>(null);
    const defaultValue = storedOf(...texts);
    let definition: CompiledEditorDefinition<object> = definitions.open;
    if (guarded) {
        definition = definitions.guarded;
    }
    useEffect(() => {
        if (ref.current !== null) {
            const handle = ref.current as EditorHandle;
            const runtime = runtimeOf(handle);
            window.rte = {
                handle,
                setSelection,
                text: () => runtime?.view?.state.doc.textContent,
            };
        }
    }, []);
    const editor = (
        <>
            <button type="button">Before</button>
            <RichTextEditor
                aria-label="Notes"
                definition={definition}
                defaultValue={defaultValue}
                readOnly={readOnly}
                ref={ref}
                onDocumentChange={({ origin, commandId }) => onChange?.({ origin, commandId })}
            />
        </>
    );
    return editor;
};
