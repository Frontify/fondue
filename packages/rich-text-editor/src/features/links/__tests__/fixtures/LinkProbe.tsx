/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useRef, useState } from 'react';

import { defineReactPresentation } from '#/entries/authoring';
import { bold, core } from '#/features';
import { unitsOf } from '#/features/__tests__/fixtures/units';
import { links } from '#/features/links/feature';
import { defineEditor, type EditorHandle, RichTextEditor } from '#/index';
import { compileContentModel, type RichTextDocument } from '#/model';
import { runtimeOf } from '#/runtime/runtime';
import { setSelection } from '#/testing';

const model = compileContentModel([core(), bold(), links()], { id: 'test.links-ct', version: 1 });
const definition = defineEditor({ id: 'test.links-ct', model, plugins: unitsOf(model) });

const linkMark = (href: string, openInNewWindow: boolean) => ({
    type: 'link',
    attrs: { href, openInNewWindow, styleId: null },
});

const document = {
    format: 'frontify.rich-text',
    formatVersion: 1,
    model: model.ref,
    requiredCapabilities: model.capabilities,
    content: {
        type: 'doc',
        attrs: { lang: null, dir: 'auto' },
        content: [
            {
                type: 'paragraph',
                attrs: { lang: null },
                content: [
                    { type: 'text', text: 'Read the ' },
                    { type: 'text', text: 'guide', marks: [linkMark('#followed', false)] },
                    { type: 'text', text: ' or ' },
                    { type: 'text', text: 'apart', marks: [linkMark('https://example.com/apart', true)] },
                    { type: 'text', text: ' now' },
                ],
            },
        ],
    },
} as unknown as RichTextDocument;

/** Sets a `link` mark with a `javascript:` `href` on `text` straight through the view, as a value past every check would arrive. */
const injectUnsafe = (handle: EditorHandle, text: string) => {
    const view = runtimeOf(handle)?.view;
    if (view === undefined) {
        return;
    }

    let from = -1;
    view.state.doc.descendants((node, pos) => {
        const at = node.isText ? (node.text ?? '').indexOf(text) : -1;
        if (from < 0 && at >= 0) {
            from = pos + at;
        }
    });
    const mark = view.state.schema.mark('link', { href: 'javascript:alert(1)', openInNewWindow: false, styleId: null });
    view.dispatch(view.state.tr.addMark(from, from + text.length, mark));
};

declare global {
    // oxlint-disable-next-line typescript/consistent-type-definitions -- only an interface merges into the global `Window`.
    interface Window {
        /** The link probe's handle and helpers. */
        linkRte?: {
            readonly handle: EditorHandle;
            readonly setSelection: typeof setSelection;
            readonly injectUnsafe: (text: string) => void;
        };
    }
}

/** Mounts `links` over a same-window and a new-window link, with Bold and Link on the toolbar, editable unless `readOnly`. */
export const LinkProbe = ({ readOnly = false }: { readonly readOnly?: boolean }) => {
    const [presentation] = useState(() => defineReactPresentation({ toolbar: [['mark.bold.toggle', 'link.edit']] }));
    const ref = useRef<EditorHandle>(null);
    useEffect(() => {
        const handle = ref.current;
        if (handle !== null) {
            window.linkRte = { handle, setSelection, injectUnsafe: (text) => injectUnsafe(handle, text) };
        }
    }, []);

    return (
        <>
            <RichTextEditor
                aria-label="Notes"
                definition={definition}
                presentation={presentation}
                readOnly={readOnly}
                defaultValue={{ documentId: 'document-1', revision: null, document }}
                ref={ref}
            />
            <button type="button">After</button>
        </>
    );
};
