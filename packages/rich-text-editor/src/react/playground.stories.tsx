/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useEffect, useMemo, useRef, useState } from 'react';

import {
    align,
    bold,
    brandStyles,
    code,
    codeBlock,
    columns,
    core,
    emoji,
    featuresById,
    fontColor,
    formatClear,
    heading,
    inputRules,
    italic,
    language,
    quote,
    rule,
    strike,
    subscript,
    superscript,
    underline,
} from '#/features';
import {
    type ColorToken,
    type CommandResult,
    type CommandsOfModel,
    defineEditor,
    defineNodeView,
    defineReactPresentation,
    type EditorHandle,
    type PersistenceService,
    type PresentationStyle,
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
        emoji(),
        subscript(),
        superscript(),
        heading(),
        quote(),
        codeBlock(),
        // Any colour through the picker, beside the presentation's tokens.
        fontColor({ literalColors: true }),
        brandStyles(),
        rule(),
        columns(),
        ...featuresById(['lists.item', 'lists.bullet', 'lists.ordered', 'lists.task']),
        inputRules({ typography }),
        align(),
        language(),
        formatClear(),
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
    ['mark.color.menu.open'],
    ['list.bullet.toggle', { command: 'list.ordered.toggle', payload: { start: 1 } }, 'list.task.toggle'],
    ['quote.toggle', 'code-block.toggle', 'emoji.picker.open'],
    [
        { command: 'block.align.set', payload: { align: 'left' } },
        { command: 'block.align.set', payload: { align: 'center' } },
        { command: 'block.align.set', payload: { align: 'right' } },
        { command: 'block.align.set', payload: { align: 'justify' } },
    ],
    ['mark.language.edit', 'format.clear'],
    ['rule.insert', 'column.break.insert'],
];

// Brand styles as a host passes them: headings and paragraphs, and one deprecated style the picker leaves out.
const brandStylesOf = (leadSize: number): readonly PresentationStyle[] => [
    {
        id: 'brand.title',
        label: 'Title',
        appliesTo: ['heading'],
        deprecated: false,
        recipe: { fontFamily: 'Georgia, serif', fontSize: 32, fontWeight: 700, color: '#1d4ed8' },
    },
    {
        id: 'brand.lead',
        label: 'Lead',
        appliesTo: ['paragraph'],
        deprecated: false,
        recipe: { fontSize: leadSize, lineHeight: 1.5, fontWeight: 300 },
    },
    {
        id: 'brand.caption',
        label: 'Caption',
        appliesTo: ['paragraph'],
        deprecated: false,
        recipe: { fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em' },
    },
    { id: 'brand.legacy', label: 'Legacy', appliesTo: ['paragraph'], deprecated: true, recipe: { fontSize: 18 } },
];
const COLOR_TOKENS: readonly ColorToken[] = [
    { id: 'brand.red', label: 'Brand red', value: '#c0392b', usage: ['font_color'] },
    { id: 'brand.blue', label: 'Brand blue', value: '#1d4ed8', usage: ['font_color'] },
    { id: 'brand.gray', label: 'Gray', value: '#4b5563', usage: ['font_color'] },
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
    /** The presentation's `columns`, 1 to 6; above 1, the first `columns - 1` column breaks each end a column. */
    readonly columns: number;
    /** The presentation's `columnGap`: `normal`, or a length in `px` or `rem`. */
    readonly columnGap: string;
    /** Throws in render at mount, so the story opens on the recovery shell. */
    readonly brokenAtMount: boolean;
    /** Composes `RichTextEditor.BubbleToolbar`, which shows above a text selection beside the fixed toolbar. */
    readonly bubbleToolbar: boolean;
    /** Renders the editor's overlays into a host element below the editor, as `portalContainer`. */
    readonly hostPortalContainer: boolean;
    /** How the in-memory server answers each save, so `RichTextEditor.Status` shows each message. */
    readonly serverAnswer: 'saved' | 'conflict' | 'forbidden' | 'invalid' | 'incompatible-writer';
    /** Strikethrough and secondary text colour on a checked task item, in the editor and the reader. */
    readonly strikeCheckedTasks: boolean;
    /** The font size of the Lead brand style's recipe, in px; a change restyles every Lead block with no document change. */
    readonly leadFontSize: number;
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
    columns: columnCount,
    columnGap,
    brokenAtMount,
    bubbleToolbar,
    hostPortalContainer,
    serverAnswer,
    strikeCheckedTasks,
    leadFontSize,
    ...props
}: PlaygroundProps) => {
    const [hostContainer, setHostContainer] = useState<HTMLElement | null>(null);
    const hostPanelRef = useRef<HTMLElement>(null);
    const presentation = useMemo(() => {
        let context: string | null = null;
        if (sliceContext !== '') {
            context = sliceContext;
        }
        return defineReactPresentation({
            contentClassName,
            toolbar: TOOLBAR,
            toolbarShortcut,
            sliceContext: context,
            strikeCheckedTasks,
            styles: brandStylesOf(leadFontSize),
            colorTokens: COLOR_TOKENS,
            columns: columnCount,
            columnGap,
        });
    }, [contentClassName, toolbarShortcut, sliceContext, strikeCheckedTasks, leadFontSize, columnCount, columnGap]);
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
                    onClick={() => log(`execute rule.insert ${resultText(handleRef.current?.execute('rule.insert'))}`)}
                >
                    Insert a divider
                </button>
                <button
                    type="button"
                    onClick={() =>
                        log(
                            `execute column.break.insert ${resultText(handleRef.current?.execute('column.break.insert'))}`,
                        )
                    }
                >
                    Insert a column break
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

Type \`:\` at the start of a word, then at least two letters, to open emoji suggestions. Enter or Tab inserts the active emoji as text. Escape closes the list and keeps what was typed.

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
| Set the last text colour again | \`mark.color.reapply\` | \`Mod-Shift-h\` | ⇧⌘H | Ctrl+Shift+H |

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
| Column break, while \`columns\` is above 1 | \`column.break.insert\` | \`Mod-Shift-Enter\` | ⇧⌘Enter | Ctrl+Shift+Enter |
| Remove the column break before the caret |  | \`Backspace\` | Backspace | Backspace |
| Remove a selected rule, image or column break |  | \`Backspace\`, \`Delete\` | Backspace, Delete | Backspace, Delete |
| Gap cursor beside a block with no text position next to it |  | \`ArrowUp\`, \`ArrowDown\`, \`ArrowLeft\`, \`ArrowRight\` | ↑ ↓ ← → | Up Down Left Right |

Type \`---\`, \`***\` or \`___\` and a space at the start of a paragraph for a divider. Typing at a gap cursor starts a paragraph there.

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

With \`tabMovesFocus\`, Tab and Shift+Tab always move focus out of the editor and indent or outdent no item; Mod-] and Mod-[ still do. Tab still accepts an open suggestion.

## Alignment, language and clear formatting

Align left, center, right or justify with the toolbar or Mod+Shift+L, Mod+Shift+E, Mod+Shift+R and Mod+Shift+J. Pressing the alignment a selection already has removes it. Language opens a picker that sets or removes the language of the selection. Clear formatting removes marks, lifts list items out and turns the selection into plain paragraphs. Mod+\\ clears inline marks only. Strike checked tasks, in the controls, strikes a checked task's text.

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
        columns: 1,
        columnGap: 'normal',
        brokenAtMount: false,
        bubbleToolbar: false,
        hostPortalContainer: false,
        serverAnswer: 'saved',
        strikeCheckedTasks: false,
        leadFontSize: 20,
        defaultToolbarMode: 'fixed',
        definition,
        defaultValue: { documentId: 'story-document', revision: null, document: createEmptyDocument(model) },
        placeholder: 'Write something, type **text** or ## and a space, pick a text style, and Mod+Z to undo',
        inputRules: { exclude: [] },
        readOnly: false,
        disabled: false,
        required: false,
        spellCheck: true,
        tabMovesFocus: false,
        scrollSelectionIntoView: true,
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
        tabMovesFocus: { control: 'boolean' },
        strikeCheckedTasks: { control: 'boolean' },
        columns: { control: { type: 'number', min: 1, max: 6, step: 1 } },
        columnGap: { control: 'text' },
        scrollSelectionIntoView: { control: 'boolean' },
        profile: { control: 'select', options: ['inline', 'comment', 'document', 'brand-document'] },
        status: { control: 'select', options: ['neutral', 'success', 'error', 'loading'] },
        defaultToolbarMode: { control: 'select', options: ['fixed', 'bubble'] },
        serverAnswer: {
            control: 'select',
            options: ['saved', 'conflict', 'forbidden', 'invalid', 'incompatible-writer'],
        },
        leadFontSize: { control: { type: 'range', min: 12, max: 32, step: 1 } },
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
