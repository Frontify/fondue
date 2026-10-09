/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useRef, useState } from 'react';

import { bold, core } from '#/features';
import { defineEditor, type RichTextEditorProps, RichTextEditor } from '#/index';
import { compileContentModel, createEmptyDocument, type JsonValue } from '#/model';

// The features delivered so far; each later pair adds its own (DR-063).
const model = compileContentModel([core(), bold()], { id: 'story.playground', version: 1 });
const definition = defineEditor({ id: 'story.playground', model });

/** Props the editor accepts and types but does not act on yet, with the pair that wires each (DR-063). */
const NOT_WIRED: readonly (readonly [string, string])[] = [
    ['profile', 'pair 37, TASK-rte-profiles'],
    ['presentation', 'pair 19, TASK-rte-chrome'],
    ['services', 'pair 17, TASK-rte-persistence'],
    ['persistenceOptions', 'pair 17, TASK-rte-persistence'],
    ['portalContainer', 'pair 19, TASK-rte-chrome'],
    ['inputRules', 'pair 23, TASK-rte-input-keys'],
    ['defaultToolbarMode', 'pair 19, TASK-rte-chrome'],
    ['onToolbarModeChange', 'pair 19, TASK-rte-chrome'],
    ['onFocus', 'pair 19, TASK-rte-chrome'],
    ['onBlur', 'pair 19, TASK-rte-chrome'],
    ['onSubmit', 'pair 37, TASK-rte-profiles'],
];

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
            <section aria-label="Props not wired yet">
                <ul>
                    {NOT_WIRED.map(([prop, pair]) => (
                        <li key={prop}>
                            <code>{prop}</code>: {pair}
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

const meta: Meta<typeof Playground> = {
    title: 'Rich Text Editor/Playground',
    component: Playground,
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
        environment: { control: false },
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
