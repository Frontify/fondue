/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createRef } from 'react';

import { bold, core } from '#/features';
import { fixtureItalic } from '#/features/__tests__/fixtures/features';
import {
    type CommandsOfModel,
    defineEditor,
    defineEditorPlugin,
    type EditorCommand,
    type EditorHandle,
    RichTextEditor,
} from '#/index';
import { compileContentModel, createEmptyDocument } from '#/model';

// A custom model from shipped features and an outside one without commands.
const model = compileContentModel([core(), bold(), fixtureItalic()], { id: 'acme.notes', version: 1 });
const definition = defineEditor({ id: 'acme.notes', model });
const defaultValue = { documentId: 'document-1', revision: null, document: createEmptyDocument(model) };
const ref = createRef<EditorHandle<CommandsOfModel<typeof model>>>();

export const usage = (
    <RichTextEditor aria-label="Notes" definition={definition} defaultValue={defaultValue} ref={ref} />
);

// @ts-expect-error: one accessible name source is required.
export const unnamed = <RichTextEditor definition={definition} defaultValue={defaultValue} />;

// Command ids and payloads come from the compiled definition, so `any` or `never` would fail here.
declare const derived: EditorHandle<CommandsOfModel<typeof model>>;
declare const shipped: EditorHandle;
export const commands = () => {
    derived.query('mark.bold.toggle');
    // @ts-expect-error: the model installs no italic command.
    derived.query('mark.italic.toggle');
    // @ts-expect-error: `mark.bold.toggle` takes no payload.
    derived.query('mark.bold.toggle', { level: 1 });
    // @ts-expect-error: the model installs no italic command.
    derived.execute('mark.italic.toggle');
    shipped.query('history.undo');
    // @ts-expect-error: the default map names only the core's commands.
    shipped.query('link.set', { href: 'https://frontify.com', openInNewWindow: false, styleId: null });
    // @ts-expect-error: the default map names only the core's commands.
    shipped.query('outline.toggle');
};

// A command whose `run` takes no payload needs no declaration.
export const authored = defineEditorPlugin(core, {
    commands: {
        'acme.plain': { run: (api) => api.marks.toggle('bold') },
    },
});

// @ts-expect-error: a command typed with a payload declares it.
export const bare: EditorCommand<{ readonly level: number }> = { run: () => true };

// A toolbar entry has an accessible name: `labelKey`, or `label` with an `en-US` entry.
export const toolbar = defineEditorPlugin(core, {
    toolbar: [
        { id: 'keyed', kind: 'button', command: 'acme.plain', labelKey: 'RichTextEditor_bold', icon: 'IconLink' },
        { id: 'named', kind: 'button', command: 'acme.plain', label: { 'en-US': 'Plain' }, icon: 'IconLink' },
        // @ts-expect-error: neither `label` nor `labelKey` names the entry.
        { id: 'unnamed', kind: 'button', command: 'acme.plain', icon: 'IconLink' },
        // @ts-expect-error: `label` has no `en-US` entry.
        { id: 'foreign', kind: 'button', command: 'acme.plain', label: { 'de-DE': 'Schlicht' }, icon: 'IconLink' },
    ],
});
