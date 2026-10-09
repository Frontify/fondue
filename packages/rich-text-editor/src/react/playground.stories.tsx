/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useEffect, useRef, useState } from 'react';

import { bold, core } from '#/features';
import {
    type CommandResult,
    type CommandsOfModel,
    defineEditor,
    type EditorHandle,
    type RichTextEditorProps,
    RichTextEditor,
    type SelectionHandle,
} from '#/index';
import { compileContentModel, createEmptyDocument, type JsonValue } from '#/model';

// The features delivered so far; each later pair adds its own (DR-063).
const model = compileContentModel([core(), bold()], { id: 'story.playground', version: 1 });
const definition = defineEditor({ id: 'story.playground', model });

/** Props the editor accepts and types but does not act on yet, with the pair that wires each (DR-063). */
const NOT_WIRED: readonly (readonly [string, string])[] = [
    ['profile', 'pairs 37 and 38, TASK-rte-profiles; until then the definition prop is required'],
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

type Commands = CommandsOfModel<typeof model>;
type PlaygroundProps = RichTextEditorProps<Commands> & {
    /** The `create` value of the `marks.bold` authoring policy, which `updatePolicy` applies to the mounted editor. */
    readonly allowNewBold: boolean;
};

const resultText = (result: CommandResult | undefined) => {
    if (result === undefined) {
        return 'no editor';
    }
    if (result.status === 'rejected') {
        return `rejected ${result.code}`;
    }
    return result.status;
};

const Playground = ({ allowNewBold, ...props }: PlaygroundProps) => {
    const [events, setEvents] = useState<readonly { readonly id: number; readonly text: string }[]>([]);
    const counterRef = useRef(0);
    const handleRef = useRef<EditorHandle<Commands>>(null);
    const targetRef = useRef<SelectionHandle | null>(null);
    const [document, setDocument] = useState<JsonValue>(props.defaultValue.document.content as unknown as JsonValue);
    const log = (text: string) => {
        counterRef.current += 1;
        const id = counterRef.current;
        setEvents((previous) => [...previous.slice(-19), { id, text }]);
    };
    useEffect(() => {
        const { authoring } = definition;
        const rules = { create: allowNewBold, edit: true, remove: true, paste: true };
        handleRef.current?.updatePolicy({ ...authoring, features: { ...authoring.features, 'marks.bold': rules } });
    }, [allowNewBold]);
    return (
        <div style={{ display: 'grid', gap: '1rem' }}>
            <section aria-label="Commands" style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                    type="button"
                    onClick={() =>
                        log(`execute mark.bold.toggle ${resultText(handleRef.current?.execute('mark.bold.toggle'))}`)
                    }
                >
                    Toggle bold
                </button>
                <button
                    type="button"
                    onClick={async () => {
                        const handle = handleRef.current;
                        if (handle !== null) {
                            log(
                                `enqueue text.insert ${resultText(await handle.enqueue('text.insert', { text: '*' }))}`,
                            );
                        }
                    }}
                >
                    Insert a star
                </button>
                <button
                    type="button"
                    onClick={() => {
                        const captured = handleRef.current?.captureTarget({
                            purpose: 'format',
                            onIntersectingEdit: 'map',
                        });
                        if (captured === undefined) {
                            log('captureTarget no editor');
                            return;
                        }
                        if (captured.status === 'captured') {
                            targetRef.current = captured.target;
                        }
                        log(`captureTarget ${captured.status}`);
                    }}
                >
                    Capture the selection
                </button>
                <button
                    type="button"
                    onClick={() => {
                        const target = targetRef.current;
                        if (target === null) {
                            log('no captured target');
                            return;
                        }
                        log(
                            `execute mark.bold.toggle on the target ${resultText(handleRef.current?.execute('mark.bold.toggle', undefined, { target }))}`,
                        );
                    }}
                >
                    Bold the captured text
                </button>
                <button
                    type="button"
                    onClick={() => {
                        const target = targetRef.current;
                        if (target === null) {
                            log('no captured target');
                            return;
                        }
                        handleRef.current?.releaseTarget(target);
                        targetRef.current = null;
                        log('releaseTarget');
                    }}
                >
                    Release the captured target
                </button>
                <button
                    type="button"
                    onClick={() => {
                        const snapshot = handleRef.current?.getSnapshot();
                        if (snapshot === undefined) {
                            log('getSnapshot no editor');
                            return;
                        }
                        log(`getSnapshot #${snapshot.stamp.sequence} compositionActive ${snapshot.compositionActive}`);
                    }}
                >
                    Read the snapshot
                </button>
            </section>
            <RichTextEditor
                {...props}
                ref={handleRef}
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
        allowNewBold: true,
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
