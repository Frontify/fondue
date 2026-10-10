/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useRef, useState } from 'react';

import { bold, core } from '#/features';
import { defineEditor, type RichTextEditorProps, RichTextEditor } from '#/index';
import { compileContentModel, createEmptyDocument, type JsonValue } from '#/model';

const model = compileContentModel([core(), bold()], { id: 'story.playground', version: 1 });
const definition = defineEditor({ id: 'story.playground', model });

const Playground = (props: RichTextEditorProps<object>) => {
    const [events, setEvents] = useState<readonly { readonly id: number; readonly text: string }[]>([]);
    const counterRef = useRef(0);
    const [document, setDocument] = useState<JsonValue>(props.defaultValue.document.content as unknown as JsonValue);
    const log = (text: string) => {
        counterRef.current += 1;
        const id = counterRef.current;
        setEvents((previous) => [...previous.slice(-19), { id, text }]);
    };
    return (
        <div style={{ display: 'grid', gap: '1rem' }}>
            <RichTextEditor
                {...props}
                onReady={(session) => log(`ready ${session.sessionId}`)}
                onDocumentChange={(change) => {
                    log(`documentChange ${change.origin} ${change.commandId ?? ''} #${change.stamp.sequence}`);
                    setDocument(change.readDocument().content as unknown as JsonValue);
                }}
                onDiagnostic={(diagnostic) => log(`diagnostic ${diagnostic.code}`)}
            />
            <section aria-label="Event log">
                <ol>
                    {events.map(({ id, text }) => (
                        <li key={id}>{text}</li>
                    ))}
                </ol>
            </section>
            <section aria-label="Document JSON">
                <pre>{JSON.stringify(document, null, 2)}</pre>
            </section>
        </div>
    );
};

const meta: Meta<typeof Playground> = {
    title: 'Rich Text Editor/Playground',
    component: Playground,
    tags: ['autodocs'],
    args: {
        'aria-label': 'Notes',
        definition,
        defaultValue: { documentId: 'story-document', revision: null, document: createEmptyDocument(model) },
        placeholder: 'Write something, and press Mod+B for bold',
        readOnly: false,
        disabled: false,
        required: false,
        spellCheck: true,
        status: 'neutral',
    },
    argTypes: {
        definition: { control: false },
        defaultValue: { control: false },
        locale: { control: false },
        services: { control: false },
        portalContainer: { control: false },
        presentation: { control: false },
        profile: { control: 'select', options: ['inline', 'comment', 'document', 'brand-document'] },
        status: { control: 'select', options: ['neutral', 'success', 'error', 'loading'] },
    },
};
export default meta;

type Story = StoryObj<typeof Playground>;

export const Default: Story = {};
