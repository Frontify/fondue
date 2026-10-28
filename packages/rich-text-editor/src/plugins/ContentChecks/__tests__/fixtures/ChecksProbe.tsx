/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useRef } from 'react';

import { defineReactPresentation } from '#/entries/authoring';
import { defineEditor, type EditorHandle, RichTextEditor } from '#/index';
import { compileContentModel, type ContentNodeJSON } from '#/model';
import { contentChecks, core, heading, language, link, image } from '#/plugins';
import { pluginsFor } from '#/plugins/__tests__/fixtures/pluginsFor';
import { runtimeOf } from '#/runtime/runtime';

const model = compileContentModel([core(), heading(), link(), language(), image(), contentChecks()], {
    id: 'test.checks',
    version: 1,
});
const definition = defineEditor({ id: 'test.checks', model, plugins: pluginsFor(model) });

const paragraph = (value: string): ContentNodeJSON => ({
    type: 'paragraph',
    attrs: { lang: null },
    content: [{ type: 'text', text: value }],
});

const blocks: readonly ContentNodeJSON[] = [
    {
        type: 'paragraph',
        attrs: { lang: null },
        content: [
            { type: 'text', text: 'Read ' },
            { type: 'text', text: 'here', marks: [{ type: 'link', attrs: { href: 'https://example.com' } }] },
        ],
    },
    ...Array.from({ length: 40 }, (_, index) => paragraph(`Line ${index + 1}`)),
    { type: 'heading', attrs: { nodeId: 'empty', level: 2, lang: null } },
];

declare global {
    // oxlint-disable-next-line typescript/consistent-type-definitions -- only an interface merges into the global `Window`.
    interface Window {
        checksRte?: {
            sequence: () => number;
            document: () => string;
            selection: () => {
                empty: boolean;
                from: number;
                to: number;
                nodeId: unknown;
                type: string;
            };
            headingRange: () => { from: number; to: number };
            select: (from: number, to: number) => void;
        };
    }
}

/** A tall document whose empty heading starts below a short scrolling frame, with a vague link at the top. */
export const ChecksProbe = () => {
    const ref = useRef<EditorHandle>(null);
    useEffect(() => {
        const handle = ref.current;
        const runtime = handle === null ? undefined : runtimeOf(handle);
        if (handle === null || runtime === undefined) {
            return;
        }

        window.checksRte = {
            sequence: () => handle.getSummary().sequence,
            document: () => JSON.stringify(handle.getSnapshot().document),
            selection: () => {
                const { $from, from, to, empty } = runtime.state.selection;

                return { empty, from, to, nodeId: $from.parent.attrs.nodeId, type: $from.parent.type.name };
            },
            select: (from, to) => runtime.select({ anchor: from, head: to }),
            headingRange: () => {
                let range = { from: -1, to: -1 };
                runtime.state.doc.descendants((node, pos) => {
                    if (node.type.name === 'heading') {
                        range = { from: pos + 1, to: pos + node.nodeSize - 1 };
                    }
                });

                return range;
            },
        };
    });

    return (
        <div data-test-id="frame" style={{ blockSize: 260, overflow: 'auto', backgroundColor: '#ffffff' }}>
            <RichTextEditor
                ref={ref}
                aria-label="Notes"
                definition={definition}
                presentation={defineReactPresentation({ toolbar: [['checks.open']] })}
                defaultValue={{
                    documentId: 'document-1',
                    revision: null,
                    document: {
                        format: 'frontify.rich-text',
                        formatVersion: 1,
                        model: model.ref,
                        requiredCapabilities: model.capabilities,
                        content: { type: 'doc', attrs: { lang: null, dir: 'auto' }, content: blocks },
                    },
                }}
            />
        </div>
    );
};
