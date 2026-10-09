/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useEffect, useRef, useState } from 'react';

import { bold, core } from '#/features';
import {
    type CommandResult,
    type CommandsOfModel,
    defineEditor,
    defineNodeView,
    type EditorHandle,
    type RichTextEditorProps,
    RichTextEditor,
    type SelectionHandle,
    useEditorSelection,
    useRichTextNodeView,
} from '#/index';
import { compileContentModel, createEmptyDocument, defineFeature, type JsonValue, setBlock } from '#/model';

// Turns on the package's input rule engine with `bold.stars`, until `marks.bold` declares its own rules; the CT probe shares it.
export const boldRules = defineFeature({
    id: 'story.bold-rules',
    version: 1,
    requires: [{ id: 'marks.bold', version: 1 }],
    inputRules: [{ id: 'bold.stars', kind: 'mark-delimiter', open: '**', close: '**', mark: 'bold' }],
});

/** The chrome of the callout stand-in: a button that switches its tone through a node view action. */
const CalloutChrome = () => {
    const { attrs, update } = useRichTextNodeView();
    const warning = attrs.tone === 'warning';
    return (
        <button
            type="button"
            aria-pressed={warning}
            onClick={() => {
                let tone = 'warning';
                if (warning) {
                    tone = 'info';
                }
                update({ tone });
            }}
        >
            Warning tone
        </button>
    );
};

// A node view stand-in until a shipped feature has one: a callout block whose chrome React renders (TASK-rte-bridge).
const callouts = defineNodeView(
    defineFeature({
        id: 'story.callout',
        version: 1,
        requires: [{ id: 'core', version: 1 }],
        nodes: {
            callout: {
                group: 'block',
                content: 'text*',
                marks: [],
                attrs: {
                    nodeId: { type: 'string', required: true },
                    tone: { type: 'enum', values: ['info', 'warning'], default: 'info' },
                },
                html: ['aside', { 'data-tone': { attr: 'tone' } }, 0],
                parse: [{ tag: 'aside', attrs: { tone: { from: 'data-tone' } } }],
            },
        },
        commands: { 'story.callout.set': setBlock('callout', { toggle: true }) },
    })(),
    { node: 'callout', component: CalloutChrome },
);

// The features delivered so far; each later pair adds its own (DR-063).
const model = compileContentModel([core(), bold(), boldRules(), callouts], { id: 'story.playground', version: 1 });
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

/** Reads the selection through `useEditorSelection`, which rerenders only when the shown text changes. */
const SelectionReadout = () => {
    const shown = useEditorSelection((selection) => `${selection.kind}, collapsed ${String(selection.collapsed)}`);
    return <p>Selection: {shown}</p>;
};

/** A host part that throws while rendering when `armed`, which shows the recovery shell. */
const Breaker = ({ armed }: { readonly armed: boolean }) => {
    if (armed) {
        throw new Error('The playground broke the editor on purpose.');
    }
    return null;
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
    const [broken, setBroken] = useState(false);
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
    // The part works again once the shell shows, so Retry mounts the editor.
    useEffect(() => {
        if (broken) {
            // oxlint-disable-next-line @eslint-react/set-state-in-effect -- the recovery shell has replaced the part by now.
            setBroken(false);
        }
    }, [broken]);
    return (
        <div style={{ display: 'grid', gap: '1rem' }}>
            <section aria-label="Commands" style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                    type="button"
                    onClick={() =>
                        log(`execute history.undo ${resultText(handleRef.current?.execute('history.undo'))}`)
                    }
                >
                    Undo
                </button>
                <button
                    type="button"
                    onClick={() =>
                        log(`execute history.redo ${resultText(handleRef.current?.execute('history.redo'))}`)
                    }
                >
                    Redo
                </button>
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
                    onClick={() =>
                        log(
                            `execute mark.bold.toggle with focus editor ${resultText(handleRef.current?.execute('mark.bold.toggle', undefined, { focus: 'editor' }))}`,
                        )
                    }
                >
                    Toggle bold and focus the editor
                </button>
                <button
                    type="button"
                    onClick={() =>
                        log(`execute story.callout.set ${resultText(handleRef.current?.execute('story.callout.set'))}`)
                    }
                >
                    Toggle callout
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
                <button type="button" onClick={() => setBroken(true)}>
                    Throw in render
                </button>
            </section>
            <RichTextEditor.Root
                {...props}
                ref={handleRef}
                onReady={(session) => log(`ready ${session.sessionId}`)}
                onDocumentChange={(change) => {
                    log(`documentChange ${change.origin} ${change.commandId ?? ''} #${change.stamp.sequence}`);
                    setDocument(change.readDocument().content as unknown as JsonValue);
                }}
                onDiagnostic={(diagnostic) => log(`diagnostic ${diagnostic.code}`)}
            >
                <RichTextEditor.Surface />
                <SelectionReadout />
                <Breaker armed={broken} />
            </RichTextEditor.Root>
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
    excludeStories: ['boldRules'],
    args: {
        'aria-label': 'Notes',
        allowNewBold: true,
        definition,
        defaultValue: { documentId: 'story-document', revision: null, document: createEmptyDocument(model) },
        placeholder: 'Write something, press Mod+B or type **text** for bold, and Mod+Z to undo',
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

/** A document that opens with a node view, whose chrome sits beside the text it holds. */
export const NodeView: Story = {
    args: {
        defaultValue: {
            documentId: 'story-node-view',
            revision: null,
            document: {
                format: 'frontify.rich-text',
                formatVersion: 1,
                model: model.ref,
                requiredCapabilities: [
                    { id: 'core', version: 1 },
                    { id: 'story.callout', version: 1 },
                ],
                content: {
                    type: 'doc',
                    attrs: { lang: null, dir: 'auto' },
                    content: [
                        {
                            type: 'paragraph',
                            attrs: { lang: null },
                            content: [{ type: 'text', text: 'The callout below is a node view.' }],
                        },
                        {
                            type: 'callout',
                            attrs: { nodeId: 'callout-1', tone: 'info' },
                            content: [
                                { type: 'text', text: 'Its text stays editable while React renders its button.' },
                            ],
                        },
                    ],
                },
            },
        },
    },
};

/** A document in an unknown format version, which shows the blocked shell with its reason and Copy original. */
export const Blocked: Story = {
    args: {
        defaultValue: {
            documentId: 'story-blocked',
            revision: null,
            document: { ...createEmptyDocument(model), formatVersion: 2 as 1 },
        },
    },
};

/** Content this model does not know opens as labelled islands, which move and delete as a whole. */
export const Islands: Story = {
    args: {
        defaultValue: {
            documentId: 'story-islands',
            revision: null,
            document: {
                format: 'frontify.rich-text',
                formatVersion: 1,
                model: model.ref,
                requiredCapabilities: [{ id: 'core', version: 1 }],
                content: {
                    type: 'doc',
                    attrs: { lang: null, dir: 'auto' },
                    content: [
                        {
                            type: 'paragraph',
                            attrs: { lang: null },
                            content: [
                                { type: 'text', text: 'The block below comes from a feature this editor lacks.' },
                            ],
                        },
                        {
                            type: 'quote_card',
                            attrs: { author: 'Ada' },
                            content: [{ type: 'text', text: 'Its text stays readable and is saved unchanged.' }],
                        },
                    ] as never,
                },
            },
        },
    },
};
