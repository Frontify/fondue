/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ThemeProvider } from '@frontify/fondue-components';
import { useEffect, useRef } from 'react';

import { defineReactPresentation } from '#/entries/authoring';
import { bold, core, mentions } from '#/features';
import { unitsOf } from '#/features/__tests__/fixtures/units';
import { defineEditor, type EditorHandle, RichTextEditor } from '#/index';
import { compileContentModel, type RichTextDocument } from '#/model';
import { createFakeReferenceService, setSelection } from '#/testing';

const model = compileContentModel([core(), bold(), mentions()], { id: 'test.mentions-ct', version: 1 });
const definition = defineEditor({ id: 'test.mentions-ct', model, plugins: unitsOf(model) });
const presentation = defineReactPresentation({ toolbar: [['mention.search.open', 'mark.bold.toggle']] });
const service = createFakeReferenceService([
    { resourceType: 'user', resourceId: 'user-1', labelSnapshot: 'Ada Lovelace' },
    { resourceType: 'user', resourceId: 'user-2', labelSnapshot: 'Grace Hopper' },
    { resourceType: 'group', resourceId: 'group-1', labelSnapshot: 'Design team', kind: 'group' },
]);
const services = { references: service };

declare global {
    // oxlint-disable-next-line typescript/consistent-type-definitions -- only an interface merges into the global `Window`.
    interface Window {
        /** The mention probe's handle and the selection helper the specs drive it with. */
        mentionRte?: { handle: EditorHandle; setSelection: typeof setSelection };
    }
}

const paragraph = (content: readonly unknown[]) => ({ type: 'paragraph', attrs: { lang: null }, content });
const DOCUMENTS = {
    text: [paragraph([{ type: 'text', text: 'Hi' }])],
    mention: [
        paragraph([
            { type: 'text', text: 'Ask ' },
            {
                type: 'mention',
                attrs: { nodeId: 'mention-1', resourceType: 'user', resourceId: 'user-1', labelSnapshot: 'Ada' },
            },
            { type: 'text', text: ' now' },
        ]),
    ],
};

/** Mounts `mentions` over a fake `ReferenceService` between two focusable buttons, with the mention toolbar button. */
export const MentionProbe = ({ content = 'text' }: { content?: keyof typeof DOCUMENTS }) => {
    const ref = useRef<EditorHandle>(null);
    useEffect(() => {
        const handle = ref.current;
        if (handle !== null) {
            window.mentionRte = { handle, setSelection };
        }
    }, []);

    return (
        <ThemeProvider>
            {/* WebKit puts a button in the Tab order only with an explicit `tabIndex`. */}
            <button type="button" tabIndex={0}>
                Before
            </button>
            <RichTextEditor
                aria-label="Notes"
                definition={definition}
                presentation={presentation}
                services={services}
                defaultValue={{
                    documentId: 'document-1',
                    revision: null,
                    document: {
                        format: 'frontify.rich-text',
                        formatVersion: 1,
                        model: model.ref,
                        requiredCapabilities: model.capabilities,
                        content: { type: 'doc', attrs: { lang: null, dir: 'auto' }, content: DOCUMENTS[content] },
                    } as unknown as RichTextDocument,
                }}
                ref={ref}
            />
            <button type="button" tabIndex={0}>
                After
            </button>
        </ThemeProvider>
    );
};
