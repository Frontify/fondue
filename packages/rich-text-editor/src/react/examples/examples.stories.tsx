/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Dialog } from '@frontify/fondue-components';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useEffect, useRef, useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { RichTextReader } from '#/entries/reader';
import { commentModel } from '#/features';
import {
    boldPlugin,
    type CompiledEditorDefinition,
    corePlugin,
    defineEditor,
    defineReactPresentation,
    type EditorHandle,
    italicPlugin,
    type LoadedDocument,
    linksPlugin,
    modelOf,
    type PersistenceService,
    RichTextEditor,
    type RichTextProfile,
    type Snapshot,
    useRichTextFormField,
} from '#/index';
import { type ContentModel, createEmptyDocument } from '#/model';
import { createFakePersistenceService } from '#/testing';

import { recordOf, text, textOf } from './records';

const plugins = [corePlugin(), boldPlugin(), italicPlugin(), linksPlugin()] as const;
const model = modelOf(plugins, { id: 'story.examples', version: 1 });
const exampleDefinition = defineEditor({ id: 'story.examples', model, plugins });
const presentation = defineReactPresentation({ toolbar: [['mark.bold.toggle', 'mark.italic.toggle', 'link.edit']] });

const NOTE = recordOf(model, 'note-1', text('The note as the server stored it.'));
const REFUSED_NOTE = recordOf(model, 'note-1', text('Type here: the server refuses every save.'));
const OPENED_NOTE = recordOf(model, 'note-1', text('The version you opened.'));
const COLLEAGUE_NOTE = recordOf(model, 'note-1', text('The version a colleague saved.'));
const SUMMARY = recordOf(model, 'summary-1', text('The summary.'));
const DETAILS = recordOf(model, 'details-1', text('The details.'));
const DESCRIPTION = recordOf(model, 'description-1', text('Select text and press Mod+K to link it.'));

/** The args of an example that mounts one editor: its definition and the record it opens. */
interface EditorArgs {
    readonly definition: CompiledEditorDefinition<object>;
    readonly defaultValue: LoadedDocument;
}

// The editor's profile or the host's delays settle before a play function reads the surface.
const LOAD = { timeout: 10_000 };
// The surface is queried inside the wait because the loading shell's textbox is replaced when the editor mounts.
const surfaceOf = (root: HTMLElement, name: string) =>
    waitFor(async () => {
        const live = within(root).getByRole('textbox', { name });
        // The shell has no `contenteditable`; the mounted surface has it, `false` while read-only.
        await expect(live).toHaveAttribute('contenteditable');
        return live;
    }, LOAD);
/** The surface once its editor is ready: until then it shows the content but takes no focus, so typing is lost. */
const editableSurfaceOf = (root: HTMLElement, name: string) =>
    waitFor(async () => {
        const live = within(root).getByRole('textbox', { name });
        await expect(live).toHaveAttribute('contenteditable', 'true');
        return live;
    }, LOAD);

/** The key a platform's `Mod` is, as a user-event key name; prosemirror-keymap reads `Mod` from `navigator.platform`. */
const modKey = () => {
    if (/Mac|iP(hone|[oa]d)/.test(navigator.platform)) {
        return 'Meta';
    }
    return 'Control';
};

// The host's server, which answers the stored record after a short wait.
const loadNote = (stored: LoadedDocument) =>
    new Promise<LoadedDocument>((resolve) => {
        setTimeout(() => resolve(stored), 300);
    });

/** Mounts the editor once the record has loaded, with that record as `defaultValue`. */
const InitialLoadExample = ({ definition, defaultValue }: EditorArgs) => {
    const [record, setRecord] = useState<LoadedDocument | null>(null);
    useEffect(() => {
        let live = true;
        loadNote(defaultValue)
            .then((loaded) => {
                if (live) {
                    setRecord(loaded);
                }
                return loaded;
            })
            .catch(() => undefined);
        return () => {
            live = false;
        };
    }, [defaultValue]);
    if (record === null) {
        return <p role="status">Loading the note</p>;
    }
    return (
        <RichTextEditor aria-label="Note" definition={definition} presentation={presentation} defaultValue={record} />
    );
};

const EMPTY_COMMENT: LoadedDocument = {
    documentId: 'comment-new',
    revision: null,
    document: createEmptyDocument(commentModel),
};

/** A comment box: Mod+Enter or Send hands the host the current snapshot. */
const SubmitSnapshotExample = ({
    profile,
    defaultValue,
}: {
    readonly profile: RichTextProfile;
    readonly defaultValue: LoadedDocument;
}) => {
    const handleRef = useRef<EditorHandle>(null);
    const [sent, setSent] = useState<readonly { readonly id: number; readonly text: string }[]>([]);
    const send = (snapshot: Snapshot) =>
        setSent((previous) => [...previous, { id: previous.length, text: textOf(snapshot.document.content) }]);
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '1rem' }}>
            <RichTextEditor
                aria-label="Comment"
                profile={profile}
                defaultValue={defaultValue}
                ref={handleRef}
                onSubmit={send}
            />
            <button
                type="button"
                onClick={() => {
                    const handle = handleRef.current;
                    if (handle !== null) {
                        send(handle.getSnapshot());
                    }
                }}
            >
                Send
            </button>
            <section aria-label="Sent comments">
                <ol>
                    {sent.map(({ id, text: sentText }) => (
                        <li key={id}>{sentText}</li>
                    ))}
                </ol>
            </section>
        </div>
    );
};

// A host server that refuses every save, as one does once the author has lost access.
const refusingServer: PersistenceService = {
    save: () => Promise.resolve({ status: 'rejected', code: 'forbidden', diagnostics: [] }),
    read: createFakePersistenceService().read,
};
const refusingServices = { persistence: refusingServer };

/** Saves after each pause in typing; `RichTextEditor.Status` shows the refusal, and the edits stay in the editor. */
const SaveFailureExample = ({ definition, defaultValue }: EditorArgs) => (
    <RichTextEditor.Root
        aria-label="Note"
        definition={definition}
        presentation={presentation}
        defaultValue={defaultValue}
        services={refusingServices}
        persistenceOptions={{ delayMs: 200 }}
    >
        <RichTextEditor.Toolbar />
        <RichTextEditor.Surface />
        <RichTextEditor.Status />
    </RichTextEditor.Root>
);

/** A newer version from elsewhere replaces the document through `replaceDocument`, which saves unsaved edits first. */
const ExternalReplacementExample = ({
    definition,
    defaultValue,
    replacement,
}: EditorArgs & { readonly replacement: LoadedDocument }) => {
    const handleRef = useRef<EditorHandle>(null);
    const [services] = useState(() => ({ persistence: createFakePersistenceService() }));
    const [outcome, setOutcome] = useState('');
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '1rem' }}>
            <button
                type="button"
                onClick={async () => {
                    const handle = handleRef.current;
                    if (handle === null) {
                        return;
                    }
                    const result = await handle.replaceDocument({
                        expected: handle.getSnapshot().stamp,
                        next: replacement,
                        unsaved: { action: 'save' },
                        selection: 'start',
                        history: 'reset',
                    });
                    if (result.status === 'rejected') {
                        setOutcome(`Not replaced: ${result.code}`);
                        return;
                    }
                    setOutcome('Replaced with the colleague’s version');
                }}
            >
                Load the colleague’s version
            </button>
            <RichTextEditor
                aria-label="Note"
                definition={definition}
                presentation={presentation}
                defaultValue={defaultValue}
                services={services}
                ref={handleRef}
            />
            <p role="status">{outcome}</p>
        </div>
    );
};

const PUBLISHED = recordOf(
    model,
    'published-1',
    text('Published content reads the same with '),
    { type: 'text', text: 'bold', marks: [{ type: 'bold' }] },
    text(' text in both.'),
);

/** The same document in a read-only editor and in `RichTextReader`, which renders it as HTML without an editor. */
const ReadonlyAndReaderExample = ({
    definition,
    defaultValue,
    model: readerModel,
}: EditorArgs & { readonly model: ContentModel }) => (
    <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
        <section aria-label="Read-only editor">
            <RichTextEditor
                aria-label="Published note"
                definition={definition}
                presentation={presentation}
                defaultValue={defaultValue}
                readOnly
            />
        </section>
        <section aria-label="Reader">
            <RichTextReader document={defaultValue.document} model={readerModel} />
        </section>
    </div>
);

/** Two editors of one definition, each with its own document, toolbar, history and selection. */
const TwoEditorsExample = ({
    definition,
    summary,
    details,
}: {
    readonly definition: CompiledEditorDefinition<object>;
    readonly summary: LoadedDocument;
    readonly details: LoadedDocument;
}) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '1rem' }}>
        <RichTextEditor
            aria-label="Summary"
            definition={definition}
            presentation={presentation}
            defaultValue={summary}
        />
        <RichTextEditor
            aria-label="Details"
            definition={definition}
            presentation={presentation}
            defaultValue={details}
        />
    </div>
);

/** An editor inside a modal host dialog, whose link popover opens inside the dialog and leaves it open. */
const PopupInHostDialogExample = ({ definition, defaultValue }: EditorArgs) => {
    const [open, setOpen] = useState(true);
    // The dialog renders into the story, so the docs page shows it in place.
    const [host, setHost] = useState<HTMLElement | null>(null);
    return (
        <div ref={setHost}>
            <button type="button" onClick={() => setOpen(true)}>
                Edit the description
            </button>
            {host !== null && (
                <Dialog.Root modal open={open} onOpenChange={setOpen}>
                    <Dialog.Content container={host}>
                        <Dialog.Header>
                            <Dialog.Title>Description</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <RichTextEditor
                                aria-label="Description"
                                definition={definition}
                                presentation={presentation}
                                defaultValue={defaultValue}
                            />
                        </Dialog.Body>
                    </Dialog.Content>
                </Dialog.Root>
            )}
        </div>
    );
};

const EMPTY_FEEDBACK: LoadedDocument = {
    documentId: 'feedback-new',
    revision: null,
    document: createEmptyDocument(model),
};

/** A required form field: `validate`, `getSettledValue` and `reset` from `useRichTextFormField`. */
const FormFieldExample = ({ definition, defaultValue }: EditorArgs) => {
    const handleRef = useRef<EditorHandle>(null);
    const field = useRichTextFormField(handleRef);
    const [invalid, setInvalid] = useState(false);
    const [message, setMessage] = useState('');
    let status: 'neutral' | 'error' = 'neutral';
    if (invalid) {
        status = 'error';
    }
    return (
        <form
            aria-label="Feedback form"
            style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '1rem' }}
            onSubmit={async (event) => {
                event.preventDefault();
                if (!field.validate().valid) {
                    setInvalid(true);
                    setMessage('');
                    return;
                }
                setInvalid(false);
                const value = await field.getSettledValue({ timeoutMs: 1000 });
                setMessage(`Sent: ${textOf(value.content)}`);
            }}
        >
            <RichTextEditor
                aria-label="Feedback"
                aria-errormessage="feedback-error"
                definition={definition}
                presentation={presentation}
                defaultValue={defaultValue}
                required
                status={status}
                ref={handleRef}
            />
            {invalid && <p id="feedback-error">Write your feedback before you send it.</p>}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button type="submit">Send</button>
                <button
                    type="button"
                    onClick={async () => {
                        await field.reset();
                        setInvalid(false);
                        setMessage('');
                    }}
                >
                    Reset
                </button>
            </div>
            <p role="status">{message}</p>
        </form>
    );
};

const meta: Meta = {
    title: 'Rich Text Editor/Examples',
    tags: ['autodocs', 'documents-behavior'],
    parameters: {
        docs: {
            description: {
                component: `
How a host wires the editor for common tasks. Every example passes the stored record once, as \`defaultValue\`, and reads changes back from the editor; none passes a new document on each change. To show another document, call \`replaceDocument\`, or mount again with a new \`key\` for another definition.

Async mentions are the [mentions story](?path=/story/rich-text-editor-features-mentions--default), and async uploads the [upload story](?path=/story/rich-text-editor-features-media-upload--default). Each shipped profile has its own story under [Profiles](?path=/docs/rich-text-editor-profiles--documentation).
`,
            },
        },
    },
    argTypes: {
        definition: { control: false },
        defaultValue: { control: false },
        model: { control: false },
        profile: { control: false },
        replacement: { control: false },
        summary: { control: false },
        details: { control: false },
    },
};
export default meta;

const editorArgs = { definition: exampleDefinition };

/** The host loads the record, then mounts the editor with it. */
export const InitialLoad: StoryObj<EditorArgs> = {
    args: { ...editorArgs, defaultValue: NOTE },
    render: (args) => <InitialLoadExample {...args} />,
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const surface = await surfaceOf(canvasElement, 'Note');
        await waitFor(() => expect(surface).toHaveTextContent('The note as the server stored it.'), LOAD);
        await expect(canvas.queryByText('Loading the note')).toBeNull();
    },
};

/** Mod+Enter, or the Send button, hands the host the current snapshot. */
export const SubmitSnapshot: StoryObj<{ readonly profile: RichTextProfile; readonly defaultValue: LoadedDocument }> = {
    args: { profile: 'comment', defaultValue: EMPTY_COMMENT },
    render: (args) => <SubmitSnapshotExample {...args} />,
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const sent = () =>
            within(canvas.getByRole('region', { name: 'Sent comments' }))
                .queryAllByRole('listitem')
                .map(({ textContent }) => textContent);
        await userEvent.type(await editableSurfaceOf(canvasElement, 'Comment'), 'Hello');
        await userEvent.keyboard(`{${modKey()}>}{Enter}{/${modKey()}}`);
        await waitFor(() => expect(sent()).toEqual(['Hello']), LOAD);
        await userEvent.click(canvas.getByRole('button', { name: 'Send' }));
        await waitFor(() => expect(sent()).toEqual(['Hello', 'Hello']), LOAD);
    },
};

/** A server that refuses each save: the status names the reason and the edits stay. */
export const SaveFailure: StoryObj<EditorArgs> = {
    args: { ...editorArgs, defaultValue: REFUSED_NOTE },
    render: (args) => <SaveFailureExample {...args} />,
    play: async ({ canvasElement }) => {
        const surface = await editableSurfaceOf(canvasElement, 'Note');
        await userEvent.type(surface, ' abc');
        await waitFor(
            () =>
                expect(
                    canvasElement.querySelector('[data-test-id="fondue-rich-text-editor-status"]'),
                ).toHaveTextContent('Not saved: you cannot edit this content. Ask for access or sign in again.'),
            LOAD,
        );
        await expect(surface).toHaveTextContent('abc');
    },
};

/** A newer version replaces the document through `replaceDocument`. */
export const ExternalReplacement: StoryObj<EditorArgs & { readonly replacement: LoadedDocument }> = {
    args: { ...editorArgs, defaultValue: OPENED_NOTE, replacement: COLLEAGUE_NOTE },
    render: (args) => <ExternalReplacementExample {...args} />,
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const surface = await editableSurfaceOf(canvasElement, 'Note');
        // Unsaved edits are saved before the replacement.
        await userEvent.type(surface, ' abc');
        await userEvent.click(canvas.getByRole('button', { name: 'Load the colleague’s version' }));
        await waitFor(
            () =>
                expect(canvasElement.querySelector('p[role="status"]')).toHaveTextContent(
                    'Replaced with the colleague’s version',
                ),
            LOAD,
        );
        await expect(surface.textContent).toBe('The version a colleague saved.');
    },
};

/** One document in a read-only editor and in the reader. */
export const ReadonlyAndReader: StoryObj<EditorArgs & { readonly model: ContentModel }> = {
    args: { ...editorArgs, model, defaultValue: PUBLISHED },
    render: (args) => <ReadonlyAndReaderExample {...args} />,
    // A read-only editor and the reader: no surface takes typing.
    parameters: { noSurface: true },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const published = 'Published content reads the same with bold text in both.';
        const surface = await surfaceOf(canvasElement, 'Published note');
        await expect(surface).toHaveAttribute('contenteditable', 'false');
        await expect(surface.textContent).toBe(published);
        const reader = canvas.getByRole('region', { name: 'Reader' });
        await expect(reader.textContent).toBe(published);
        await expect(reader.querySelector('strong')).toHaveTextContent('bold');
    },
};

/** Two editors on one page, sharing a definition. */
export const TwoEditors: StoryObj<{
    readonly definition: CompiledEditorDefinition<object>;
    readonly summary: LoadedDocument;
    readonly details: LoadedDocument;
}> = {
    args: { ...editorArgs, summary: SUMMARY, details: DETAILS },
    render: (args) => <TwoEditorsExample {...args} />,
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const details = await editableSurfaceOf(canvasElement, 'Details');
        await waitFor(() => expect(canvas.getAllByRole('toolbar', { name: 'Text formatting' })).toHaveLength(2), LOAD);
        await userEvent.type(details, ' Own text');
        await expect(details).toHaveTextContent('Own text');
        const summary = await surfaceOf(canvasElement, 'Summary');
        await expect(summary.textContent).toBe('The summary.');
    },
};

/** The link popover of an editor inside a modal host dialog. */
export const PopupInHostDialog: StoryObj<EditorArgs> = {
    args: { ...editorArgs, defaultValue: DESCRIPTION },
    render: (args) => <PopupInHostDialogExample {...args} />,
    // The modal dialog covers its frame, so the docs page shows it in a frame of its own.
    parameters: { docs: { story: { inline: false, height: '40rem' } } },
    play: async ({ canvasElement }) => {
        const page = within(canvasElement.ownerDocument.body);
        const findPopover = () =>
            canvasElement.ownerDocument.querySelector<HTMLElement>(
                '[data-test-id="fondue-rich-text-editor-link-popover"]',
            );
        const host = await page.findByRole('dialog', { name: 'Description' }, LOAD);
        const surface = await editableSurfaceOf(host, 'Description');
        await userEvent.click(surface);
        window.getSelection()?.selectAllChildren(surface);
        await userEvent.keyboard(`{${modKey()}>}k{/${modKey()}}`);
        const popover = await waitFor(() => {
            const found = findPopover();
            if (found === null) {
                throw new Error('The link popover is not open.');
            }
            return found;
        }, LOAD);
        await waitFor(() => expect(within(popover).getByRole('textbox', { name: 'URL' })).toHaveFocus(), LOAD);
        await userEvent.keyboard('https://example.com/brand');
        await userEvent.click(within(popover).getByRole('button', { name: 'Apply' }));

        await waitFor(() => expect(findPopover()).toBeNull(), LOAD);
        await expect(host).toBeVisible();
        await expect(surface.querySelector('a')).toHaveAttribute('href', 'https://example.com/brand');
    },
};

/** A required field with validation, the settled value and reset. */
export const FormField: StoryObj<EditorArgs> = {
    args: { ...editorArgs, defaultValue: EMPTY_FEEDBACK },
    render: (args) => <FormFieldExample {...args} />,
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const surface = await editableSurfaceOf(canvasElement, 'Feedback');
        const reminder = 'Write your feedback before you send it.';
        await userEvent.click(canvas.getByRole('button', { name: 'Reset' }));
        await expect(surface.textContent).toBe('');
        await userEvent.click(canvas.getByRole('button', { name: 'Send' }));
        await expect(await canvas.findByText(reminder)).toBeVisible();
        await expect(surface).toHaveAttribute('aria-invalid', 'true');

        await userEvent.type(surface, 'Great');
        await userEvent.click(canvas.getByRole('button', { name: 'Send' }));
        await waitFor(
            () => expect(canvasElement.querySelector('p[role="status"]')).toHaveTextContent('Sent: Great'),
            LOAD,
        );
        await expect(canvas.queryByText(reminder)).toBeNull();
    },
};
