/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ThemeProvider } from '@frontify/fondue-components';
import { useEffect, useRef } from 'react';

import {
    bold,
    code,
    core,
    heading,
    italic,
    quote,
    strike,
    subscript,
    superscript,
    underline,
} from '../../src/features';
import { fixtureChromeViews } from '../../src/features/__fixtures__/chrome/view';
import { fixtureLink } from '../../src/features/__fixtures__/features';
import { defineEditor, defineReactPresentation, type EditorHandle, RichTextEditor } from '../../src/index';
import { compileContentModel, type ContentNodeJSON, defineFeature, toggleMark } from '../../src/model';
import { runtimeOf } from '../../src/runtime/runtime';
import { setSelection } from '../../src/testing';

/** Binds Ctrl and Alt with the keys that type `{`, `[`, `]`, `}`, `²` and `³` on German and `ą` and `ł` on Polish layouts with AltGr, and `\\` on German ones. */
const altGraphKeys = defineFeature({
    id: 'fixture.alt-graph-keys',
    version: 1,
    requires: [{ id: 'marks.bold', version: 1 }],
    commands: { 'fixture.alt-graph.run': toggleMark('bold') },
    keys: Object.fromEntries(
        ['7', '8', '9', '0', '2', '3', 'a', 'l', '\\'].map((key) => [`Ctrl-Alt-${key}`, 'fixture.alt-graph.run']),
    ),
});

const model = compileContentModel(
    [
        core(),
        bold(),
        italic(),
        underline(),
        strike(),
        code(),
        subscript(),
        superscript(),
        heading(),
        quote(),
        fixtureLink(),
        fixtureChromeViews(),
        altGraphKeys(),
    ],
    { id: 'test.text-ct', version: 1 },
);
const definition = defineEditor({ id: 'test.text-ct', model });
const presentation = defineReactPresentation({
    toolbar: [
        ['history.undo', 'history.redo'],
        ['text-style'],
        ['mark.bold.toggle', 'mark.italic.toggle', 'mark.underline.toggle', 'mark.strike.toggle', 'mark.code.toggle'],
    ],
});

const documentOf = (
    blocks: readonly ContentNodeJSON[],
    capabilities: readonly { readonly id: string; readonly version: number }[],
) => ({
    documentId: 'document-1',
    revision: null,
    document: {
        format: 'frontify.rich-text' as const,
        formatVersion: 1 as const,
        model: { id: 'test.text-ct', version: 1 },
        requiredCapabilities: capabilities,
        content: { type: 'doc', attrs: { lang: null, dir: 'auto' }, content: [...blocks] },
    },
});

/** A paragraph of `text`, with each run inside `*` and `*` italic, `_` and `_` bold and `[` and `]` a link. */
const markedParagraph = (text: string): ContentNodeJSON => ({
    type: 'paragraph',
    attrs: { lang: null },
    content: text
        .split(/(\*[^*]*\*|_[^_]*_|\[[^\]]*\])/)
        .filter((part) => part !== '')
        .map((part) => {
            const inner = part.slice(1, -1);
            if (part.startsWith('*')) {
                return { type: 'text', text: inner, marks: [{ type: 'italic' }] };
            }
            if (part.startsWith('_')) {
                return { type: 'text', text: inner, marks: [{ type: 'bold' }, { type: 'underline' }] };
            }
            if (part.startsWith('[')) {
                const link = {
                    type: 'link',
                    attrs: { href: 'https://example.com', openInNewWindow: false, styleId: null },
                };
                return { type: 'text', text: inner, marks: [link] };
            }
            return { type: 'text', text: part };
        }),
});
const plainParagraph = (text: string): ContentNodeJSON => ({
    type: 'paragraph',
    attrs: { lang: null },
    content: [{ type: 'text', text }],
});

declare global {
    interface Window {
        /** The handles of the two editors of `MarkedAndPlainProbe`, by name, and the selection helper. */
        markedAndPlain?: { readonly Marked: EditorHandle; readonly setSelection: typeof setSelection };
        /** The text probe's handle, the selection helper, and each change as `origin commandId`. */
        textRte?: {
            readonly handle: EditorHandle;
            readonly setSelection: typeof setSelection;
            readonly changes: string[];
            readonly text: () => string | undefined;
        };
    }
}

// A code block stand-in whose node view chrome comes before its text.
const nodeView: ContentNodeJSON = {
    type: 'chrome_block',
    attrs: { nodeId: 'code-1', language: 'plain', checked: false },
    content: [{ type: 'text', text: 'const a = 1;' }],
};

/**
 * Mounts the text features through `RichTextEditor` after a focusable button, with the text toolbar: one paragraph
 * per text, after a node view when `nodeViewFirst`.
 */
export const TextProbe = ({
    texts,
    nodeViewFirst = false,
    quoted = false,
    dir = 'ltr',
}: {
    readonly texts: readonly string[];
    readonly nodeViewFirst?: boolean;
    /** Puts the paragraphs in a quote. */
    readonly quoted?: boolean;
    /** The theme direction. */
    readonly dir?: 'ltr' | 'rtl';
}) => {
    let blocks = texts.map(plainParagraph);
    if (nodeViewFirst) {
        blocks = [nodeView, ...blocks];
    }
    if (quoted) {
        blocks = [{ type: 'blockquote', content: blocks }];
    }
    const ref = useRef<EditorHandle>(null);
    const changes = useRef<string[]>([]);
    useEffect(() => {
        const handle = ref.current;
        if (handle !== null) {
            window.textRte = {
                handle,
                setSelection,
                changes: changes.current,
                text: () => runtimeOf(handle)?.view?.state.doc.textContent,
            };
        }
    }, []);
    return (
        <ThemeProvider dir={dir}>
            <button type="button">Before</button>
            <RichTextEditor
                aria-label="Notes"
                definition={definition}
                presentation={presentation}
                defaultValue={documentOf(blocks, model.capabilities)}
                ref={ref}
                onDocumentChange={({ origin, commandId }) => changes.current.push(`${origin} ${commandId ?? ''}`)}
            />
        </ThemeProvider>
    );
};

/**
 * The same lines twice: with marks and links in the editor named Marked, and as plain text in a bare `contenteditable`
 * named Plain, with the surface's content styles, so the browser alone edits it.
 */
export const MarkedAndPlainProbe = ({ lines }: { readonly lines: readonly string[] }) => {
    const marked = useRef<EditorHandle>(null);
    useEffect(() => {
        if (marked.current !== null) {
            window.markedAndPlain = { Marked: marked.current, setSelection };
        }
    }, []);
    return (
        <>
            <RichTextEditor
                aria-label="Marked"
                definition={definition}
                defaultValue={documentOf(lines.map(markedParagraph), model.capabilities)}
                ref={marked}
            />
            <div
                role="textbox"
                aria-label="Plain"
                aria-multiline
                contentEditable
                suppressContentEditableWarning
                className="fondue-rte-content"
                data-rte-surface=""
            >
                {lines.map((line) => (
                    <p key={line}>{line.replaceAll(/[*_[\]]/g, '')}</p>
                ))}
            </div>
        </>
    );
};
