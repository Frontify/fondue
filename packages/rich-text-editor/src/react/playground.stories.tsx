/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useEffect, useMemo, useRef, useState } from 'react';

import {
    bold,
    code,
    codeBlock,
    core,
    featuresById,
    heading,
    inputRules,
    italic,
    quote,
    strike,
    subscript,
    superscript,
    underline,
} from '#/features';
import {
    type CommandResult,
    type CommandsOfModel,
    defineEditor,
    defineNodeView,
    defineReactPresentation,
    type EditorHandle,
    type PersistenceService,
    type RichTextEditorProps,
    RichTextEditor,
    type SaveResponse,
    type SelectionHandle,
    useEditorSelection,
    useRichTextFormField,
    useRichTextNodeView,
} from '#/index';
import { compileContentModel, createEmptyDocument, defineFeature, type JsonValue, setBlock } from '#/model';
import { createFakePersistenceService } from '#/testing';

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

// A node view stand-in until a shipped feature has one: a callout block whose chrome React renders.
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

// Every typography rule is on.
const typography = [
    'typography.quotes',
    'typography.ellipsis',
    'typography.dashes',
    'typography.symbols',
    'typography.numeric',
] as const;
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
        codeBlock(),
        ...featuresById(['lists.item', 'lists.bullet', 'lists.ordered', 'lists.task']),
        inputRules({ typography }),
        callouts,
    ],
    { id: 'story.playground', version: 1 },
);
const definition = defineEditor({ id: 'story.playground', model });

// The document toolbar's groups of the shipped features.
const TOOLBAR = [
    ['history.undo', 'history.redo'],
    ['text-style'],
    [
        'mark.bold.toggle',
        'mark.italic.toggle',
        'mark.underline.toggle',
        'mark.strike.toggle',
        'mark.code.toggle',
        'mark.subscript.toggle',
        'mark.superscript.toggle',
    ],
    ['list.bullet.toggle', { command: 'list.ordered.toggle', payload: { start: 1 } }, 'list.task.toggle'],
    ['quote.toggle', 'code-block.toggle'],
];

type Commands = CommandsOfModel<typeof model>;
type PlaygroundProps = RichTextEditorProps<Commands> & {
    /** The `create` value of the `marks.bold` authoring policy, which `updatePolicy` applies to the mounted editor. */
    readonly allowNewBold: boolean;
    /** The `paste` value of the `marks.bold` authoring policy: off, pasted and dropped bold keeps its text only. */
    readonly allowPastedBold: boolean;
    /** The presentation's `sliceContext`; empty is `null`, the package's value for this page load. */
    readonly sliceContext: string;
    /** The presentation's `contentClassName`, which the surface carries beside `fondue-rte-content`. */
    readonly contentClassName: string;
    /** The presentation's `toolbarShortcut`, which moves focus between the surface and the toolbars. */
    readonly toolbarShortcut: string;
    /** Throws in render at mount, so the story opens on the recovery shell. */
    readonly brokenAtMount: boolean;
    /** Composes `RichTextEditor.BubbleToolbar`, which shows above a text selection beside the fixed toolbar. */
    readonly bubbleToolbar: boolean;
    /** Renders the editor's overlays into a host element below the editor, as `portalContainer`. */
    readonly hostPortalContainer: boolean;
    /** How the in-memory server answers each save, so `RichTextEditor.Status` shows each message. */
    readonly serverAnswer: 'saved' | 'conflict' | 'forbidden' | 'invalid' | 'incompatible-writer';
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

const Playground = ({
    allowNewBold,
    allowPastedBold,
    sliceContext,
    contentClassName,
    toolbarShortcut,
    brokenAtMount,
    bubbleToolbar,
    hostPortalContainer,
    serverAnswer,
    ...props
}: PlaygroundProps) => {
    const [hostContainer, setHostContainer] = useState<HTMLElement | null>(null);
    const hostPanelRef = useRef<HTMLElement>(null);
    const presentation = useMemo(() => {
        let context: string | null = null;
        if (sliceContext !== '') {
            context = sliceContext;
        }
        return defineReactPresentation({ contentClassName, toolbar: TOOLBAR, toolbarShortcut, sliceContext: context });
    }, [contentClassName, toolbarShortcut, sliceContext]);
    const [events, setEvents] = useState<readonly { readonly id: number; readonly text: string }[]>([]);
    const counterRef = useRef(0);
    const handleRef = useRef<EditorHandle<Commands>>(null);
    const targetRef = useRef<SelectionHandle | null>(null);
    const [document, setDocument] = useState<JsonValue>(props.defaultValue.document.content as unknown as JsonValue);
    const [broken, setBroken] = useState(brokenAtMount);
    const field = useRichTextFormField(handleRef);
    // An in-memory server in place of the host's, so the save states show.
    const answerRef = useRef(serverAnswer);
    useEffect(() => {
        answerRef.current = serverAnswer;
    }, [serverAnswer]);
    const [services] = useState(() => {
        const server = createFakePersistenceService();
        const persistence: PersistenceService = {
            save: (request, context) => {
                const answer = answerRef.current;
                if (answer === 'saved') {
                    return server.save(request, context);
                }
                let response: SaveResponse = { status: 'conflict', currentRevision: 'story-remote' };
                if (answer !== 'conflict') {
                    response = { status: 'rejected', code: answer, diagnostics: [] };
                }
                return Promise.resolve(response);
            },
            read: server.read,
        };
        return { persistence };
    });
    const [saveStatus, setSaveStatus] = useState('not mounted');
    const log = (text: string) => {
        counterRef.current += 1;
        const id = counterRef.current;
        setEvents((previous) => [...previous.slice(-19), { id, text }]);
    };
    useEffect(() => {
        const { authoring } = definition;
        const rules = { create: allowNewBold, edit: true, remove: true, paste: allowPastedBold };
        handleRef.current?.updatePolicy({ ...authoring, features: { ...authoring.features, 'marks.bold': rules } });
    }, [allowNewBold, allowPastedBold]);
    // `null` keeps the editor's own overlay root.
    let portalContainer: HTMLElement | null = null;
    if (hostPortalContainer) {
        portalContainer = hostContainer;
    }
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
                    onClick={() =>
                        log(
                            `execute heading.set ${resultText(handleRef.current?.execute('heading.set', { level: 2 }))}`,
                        )
                    }
                >
                    Heading 2
                </button>
                <button
                    type="button"
                    onClick={() =>
                        log(`execute block.move.down ${resultText(handleRef.current?.execute('block.move.down'))}`)
                    }
                >
                    Move the block down
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
                <button
                    type="button"
                    onClick={async () => {
                        const handle = handleRef.current;
                        if (handle === null) {
                            return;
                        }
                        const result = await handle.replaceDocument({
                            expected: handle.getSnapshot().stamp,
                            next: {
                                documentId: 'story-replaced',
                                revision: null,
                                document: createEmptyDocument(model),
                            },
                            unsaved: { action: 'save' },
                            selection: 'start',
                            history: 'reset',
                        });
                        if (result.status === 'rejected') {
                            log(`replaceDocument rejected ${result.code}`);
                            return;
                        }
                        log(`replaceDocument ${result.status}`);
                    }}
                >
                    Replace with an empty document
                </button>
                <button type="button" onClick={() => setBroken(true)}>
                    Throw in render
                </button>
                <button
                    type="button"
                    onClick={async () => {
                        const result = await handleRef.current?.requestCommit({ reason: 'manual' });
                        if (result === undefined) {
                            log('requestCommit no editor');
                            return;
                        }
                        let code = '';
                        if (result.status !== 'acknowledged') {
                            code = result.code;
                        }
                        log(`requestCommit ${result.status} ${code}`);
                    }}
                >
                    Save now
                </button>
                <button
                    type="button"
                    onClick={() => {
                        const handle = handleRef.current;
                        const panel = hostPanelRef.current;
                        if (handle === null || panel === null) {
                            return;
                        }
                        handle.registerInteractionRoot(panel);
                        log('registerInteractionRoot host panel');
                    }}
                >
                    Register the host panel
                </button>
            </section>
            <RichTextEditor.Root
                // The toolbar mode is a default, which a new mount takes.
                key={props.defaultToolbarMode}
                {...props}
                presentation={presentation}
                services={services}
                portalContainer={portalContainer}
                ref={handleRef}
                onReady={(session) => {
                    log(`ready ${session.sessionId}`);
                    const handle = handleRef.current;
                    if (handle === null) {
                        return;
                    }
                    const show = () => {
                        const { state, latestSequence, acknowledgedSequence, revision } = handle.getSaveStatus();
                        setSaveStatus(
                            `${state}, #${latestSequence} of which #${acknowledgedSequence} saved as ${revision}`,
                        );
                    };
                    show();
                    handle.subscribe('saveStatusChange', (status) => {
                        log(
                            `saveStatusChange ${status.state} #${status.latestSequence}/${status.acknowledgedSequence}`,
                        );
                        show();
                    });
                    handle.subscribe('selectionChange', (selection) => log(`selectionChange ${selection.kind}`));
                    handle.subscribe('replaced', (replaced) => log(`replaced generation ${replaced.generation}`));
                    handle.subscribe('operationMetric', (metric) =>
                        log(`operationMetric ${metric.kind} ${metric.durationMs} ms ${metric.failureCode ?? ''}`),
                    );
                }}
                onDocumentChange={(change) => {
                    log(`documentChange ${change.origin} ${change.commandId ?? ''} #${change.stamp.sequence}`);
                    setDocument(change.readDocument().content as unknown as JsonValue);
                }}
                onDiagnostic={(diagnostic) =>
                    log(`diagnostic ${diagnostic.code} ${JSON.stringify(diagnostic.details ?? {})}`)
                }
                onFocus={() => log('focus')}
                onBlur={() => log('blur')}
                onToolbarModeChange={(mode) => log(`toolbarModeChange ${mode}`)}
            >
                <RichTextEditor.Toolbar />
                {bubbleToolbar && <RichTextEditor.BubbleToolbar />}
                <RichTextEditor.Surface />
                <RichTextEditor.Status />
                <SelectionReadout />
                <p>Save status: {saveStatus}</p>
                <Breaker armed={broken} />
            </RichTextEditor.Root>
            <section aria-label="Form field" style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                    type="button"
                    onClick={() => {
                        const result = field.validate();
                        if (result.valid) {
                            log('validate valid');
                            return;
                        }
                        log(`validate ${result.reason}`);
                    }}
                >
                    Validate
                </button>
                <button
                    type="button"
                    onClick={async () => {
                        const result = await field.reset();
                        if (result.status === 'rejected') {
                            log(`reset rejected ${result.code}`);
                            return;
                        }
                        log(`reset ${result.status}`);
                    }}
                >
                    Reset
                </button>
                <button
                    type="button"
                    onClick={async () => {
                        try {
                            const settled = await field.getSettledValue({ timeoutMs: 1000 });
                            log(`getSettledValue ${JSON.stringify(settled.content).length} characters of JSON`);
                        } catch {
                            log('getSettledValue timeout');
                        }
                    }}
                >
                    Read the settled value
                </button>
            </section>
            <section ref={hostPanelRef} aria-label="Host panel">
                <button type="button">A host control</button>
                <div ref={setHostContainer} />
            </section>
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
    parameters: {
        docs: {
            description: {
                component: `
## Keyboard reference

Shortcuts of the shipped features, in the package key syntax and as each platform shows them.

## History

| Action | Command | Key | Apple | Other platforms |
|---|---|---|---|---|
| Undo | \`history.undo\` | \`Mod-z\` | ⌘Z | Ctrl+Z |
| Redo | \`history.redo\` | \`Mod-Shift-z\` | ⇧⌘Z | Ctrl+Shift+Z |
| Redo | \`history.redo\` | \`other:Ctrl-y\` | none | Ctrl+Y |

## Text formatting

| Action | Command | Key | Apple | Other platforms |
|---|---|---|---|---|
| Bold | \`mark.bold.toggle\` | \`Mod-b\` | ⌘B | Ctrl+B |
| Italic | \`mark.italic.toggle\` | \`Mod-i\` | ⌘I | Ctrl+I |
| Underline | \`mark.underline.toggle\` | \`Mod-u\` | ⌘U | Ctrl+U |
| Strikethrough | \`mark.strike.toggle\` | \`Mod-Shift-x\` | ⇧⌘X | Ctrl+Shift+X |
| Code | \`mark.code.toggle\` | \`Mod-e\` | ⌘E | Ctrl+E |
| Subscript | \`mark.subscript.toggle\` | \`Mod-,\` | ⌘, | Ctrl+, |
| Superscript | \`mark.superscript.toggle\` | \`Mod-.\` | ⌘. | Ctrl+. |

## Blocks

| Action | Command | Key | Apple | Other platforms |
|---|---|---|---|---|
| Line break | \`hard-break.insert\` | \`Shift-Enter\` | ⇧Enter | Shift+Enter |
| Normal text | \`paragraph.set\` | \`mac:Mod-Alt-0\` | ⌥⌘0 | none |
| Normal text | \`paragraph.set\` | \`other:Ctrl-Shift-0\` | none | Ctrl+Shift+0 |
| Heading 1 | \`heading.set\` with \`{ level: 1 }\` | \`mac:Mod-Alt-1\` | ⌥⌘1 | none |
| Heading 2 | \`heading.set\` with \`{ level: 2 }\` | \`mac:Mod-Alt-2\` | ⌥⌘2 | none |
| Heading 3 | \`heading.set\` with \`{ level: 3 }\` | \`mac:Mod-Alt-3\` | ⌥⌘3 | none |
| Heading 4 | \`heading.set\` with \`{ level: 4 }\` | \`mac:Mod-Alt-4\` | ⌥⌘4 | none |
| Heading 5 | \`heading.set\` with \`{ level: 5 }\` | \`mac:Mod-Alt-5\` | ⌥⌘5 | none |
| Heading 6 | \`heading.set\` with \`{ level: 6 }\` | \`mac:Mod-Alt-6\` | ⌥⌘6 | none |
| Heading 1 | \`heading.set\` with \`{ level: 1 }\` | \`other:Ctrl-Shift-1\` | none | Ctrl+Shift+1 |
| Heading 2 | \`heading.set\` with \`{ level: 2 }\` | \`other:Ctrl-Shift-2\` | none | Ctrl+Shift+2 |
| Heading 3 | \`heading.set\` with \`{ level: 3 }\` | \`other:Ctrl-Shift-3\` | none | Ctrl+Shift+3 |
| Heading 4 | \`heading.set\` with \`{ level: 4 }\` | \`other:Ctrl-Shift-4\` | none | Ctrl+Shift+4 |
| Heading 5 | \`heading.set\` with \`{ level: 5 }\` | \`other:Ctrl-Shift-5\` | none | Ctrl+Shift+5 |
| Heading 6 | \`heading.set\` with \`{ level: 6 }\` | \`other:Ctrl-Shift-6\` | none | Ctrl+Shift+6 |
| Move up | \`block.move.up\` | \`Mod-Alt-ArrowUp\` | ⌥⌘↑ | Ctrl+Alt+Up |
| Move down | \`block.move.down\` | \`Mod-Alt-ArrowDown\` | ⌥⌘↓ | Ctrl+Alt+Down |

## Code blocks

| Action | Command | Key | Apple | Other platforms |
|---|---|---|---|---|
| Indent the lines the selection touches | \`code-block.indent\` | \`Mod-]\` | ⌘] | Ctrl+] |
| Outdent the lines the selection touches | \`code-block.outdent\` | \`Mod-[\` | ⌘[ | Ctrl+[ |
| Leave the block for a new paragraph |  | \`Mod-Enter\` | ⌘Enter | Ctrl+Enter |
| New paragraph after the block, when the caret is at its end and nothing follows it |  | \`ArrowDown\` | ↓ | Down |
| Move focus out of the editor |  | \`Tab\` | Tab | Tab |

Tab and Shift+Tab in a code block are not handled, so focus leaves the editor. Mod-] and Mod-[ indent and outdent lines there, and do not move a list or task item that contains the block.

## Lists

| Action | Command | Key | Apple | Other platforms |
|---|---|---|---|---|
| Bulleted list | \`list.bullet.toggle\` | \`Mod-Shift-8\` | ⇧⌘8 | Ctrl+Shift+8 |
| Numbered list | \`list.ordered.toggle\` with \`{ start: 1 }\` | \`Mod-Shift-7\` | ⇧⌘7 | Ctrl+Shift+7 |
| Task list | \`list.task.toggle\` | \`Mod-Shift-9\` | ⇧⌘9 | Ctrl+Shift+9 |
| Indent a list item | \`list.indent\` | \`Mod-]\` | ⌘] | Ctrl+] |
| Indent a list item | \`list.indent\` | \`Tab\` | Tab | Tab |
| Outdent a list item | \`list.outdent\` | \`Mod-[\` | ⌘[ | Ctrl+[ |
| Outdent a list item | \`list.outdent\` | \`Shift-Tab\` | ⇧Tab | Shift+Tab |
| Indent a task | \`task.indent\` | \`Mod-]\` | ⌘] | Ctrl+] |
| Indent a task | \`task.indent\` | \`Tab\` | Tab | Tab |
| Outdent a task | \`task.outdent\` | \`Mod-[\` | ⌘[ | Ctrl+[ |
| Outdent a task | \`task.outdent\` | \`Shift-Tab\` | ⇧Tab | Shift+Tab |
| Check or uncheck a task | \`task.toggle\` | \`Mod-Enter\` | ⌘Enter | Ctrl+Enter |

Tab in an item that cannot nest, such as the first item, moves focus out of the editor.

## Surface

| Action | Key | Apple | Other platforms |
|---|---|---|---|
| Select all, node views included | \`Mod-a\` | ⌘A | Ctrl+A |
`,
            },
        },
    },
    args: {
        'aria-label': 'Notes',
        allowNewBold: true,
        allowPastedBold: true,
        sliceContext: '',
        contentClassName: 'playground-content',
        toolbarShortcut: 'Alt-F10',
        brokenAtMount: false,
        bubbleToolbar: false,
        hostPortalContainer: false,
        serverAnswer: 'saved',
        defaultToolbarMode: 'fixed',
        definition,
        defaultValue: { documentId: 'story-document', revision: null, document: createEmptyDocument(model) },
        placeholder: 'Write something, type **text** or ## and a space, pick a text style, and Mod+Z to undo',
        inputRules: { exclude: [] },
        readOnly: false,
        disabled: false,
        required: false,
        spellCheck: true,
        status: 'neutral',
        persistenceOptions: { autosave: 'debounced', delayMs: 500, maxWaitMs: 5000 },
    },
    argTypes: {
        definition: { control: false },
        defaultValue: { control: false },
        locale: { control: false },
        services: { control: false },
        portalContainer: { control: false },
        presentation: { control: false },
        inputRules: { control: 'object' },
        profile: { control: 'select', options: ['inline', 'comment', 'document', 'brand-document'] },
        status: { control: 'select', options: ['neutral', 'success', 'error', 'loading'] },
        defaultToolbarMode: { control: 'select', options: ['fixed', 'bubble'] },
        serverAnswer: {
            control: 'select',
            options: ['saved', 'conflict', 'forbidden', 'invalid', 'incompatible-writer'],
        },
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

/** A render error at mount, which shows the recovery shell with Retry and Copy content. */
export const Recovery: Story = { args: { brokenAtMount: true } };

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
