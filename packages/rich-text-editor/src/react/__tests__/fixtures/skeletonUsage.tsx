/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createRef } from 'react';

import { definePlugin } from '#/bridge/definePlugin';
import {
    type BlockDecoration,
    type BlockDecorationSource,
    type CommandsOfPart,
    type DecoratedBlock,
    defineEditorPart,
    defineReactPresentation,
    type EditorCommand,
    type EditorOverlay,
    type NodePending,
    type NodeViewContext,
} from '#/entries/authoring';
import { core } from '#/features';
import { fixtureItalic } from '#/features/__tests__/fixtures/features';
import { type spotlightEditor } from '#/features/__tests__/fixtures/spotlight/editor';
import {
    boldPlugin,
    type CommandsOfPlugins,
    corePlugin,
    defineEditor,
    type EditorHandle,
    modelOf,
    RichTextEditor,
    useCommandState,
} from '#/index';
import { createEmptyDocument } from '#/model';

// A custom model from shipped features and an outside one without commands.
const italicPlugin = definePlugin({ feature: fixtureItalic, editor: defineEditorPart(fixtureItalic, {}) });
const plugins = [corePlugin(), boldPlugin(), italicPlugin()] as const;
const model = modelOf(plugins, { id: 'acme.notes', version: 1 });
const definition = defineEditor({ id: 'acme.notes', model, plugins });
type Commands = CommandsOfPlugins<typeof plugins>;
const presentation = defineReactPresentation({ toolbar: [['mark.bold.toggle']] });
const defaultValue = { documentId: 'document-1', revision: null, document: createEmptyDocument(model) };
const ref = createRef<EditorHandle<Commands>>();

export const usage = (
    <RichTextEditor
        aria-label="Notes"
        definition={definition}
        presentation={presentation}
        defaultValue={defaultValue}
        ref={ref}
    />
);

// @ts-expect-error: one accessible name source is required.
export const unnamed = <RichTextEditor definition={definition} defaultValue={defaultValue} />;

// Command ids and payloads come from the compiled definition, so `any` or `never` would fail here.
declare const derived: EditorHandle<Commands>;
declare const shipped: EditorHandle;
declare const plugged: EditorHandle<CommandsOfPart<typeof spotlightEditor>>;
export const commands = () => {
    derived.query('mark.bold.toggle');
    // @ts-expect-error: the model installs no italic command.
    derived.query('mark.italic.toggle');
    // @ts-expect-error: `mark.bold.toggle` takes no payload.
    derived.query('mark.bold.toggle', { level: 1 });
    // @ts-expect-error: the model installs no italic command.
    derived.execute('mark.italic.toggle');
    // @ts-expect-error: `mark.bold.toggle` takes no payload.
    derived.enqueue('mark.bold.toggle', { level: 1 }).catch(() => undefined);
    shipped.query('history.undo');
    // @ts-expect-error: the default map names only the core's commands.
    shipped.query('link.set', { href: 'https://frontify.com', openInNewWindow: false, styleId: null });
    // @ts-expect-error: the default map names only the core's commands.
    shipped.query('outline.toggle');
    plugged.execute('fixture.spotlight.toggle');
    // @ts-expect-error: the plugin declares no such command.
    plugged.execute('fixture.spotlight.unknown');
};

// `useCommandState` takes the same typed IDs and payloads.
export const useStates = () => {
    useCommandState<Commands, 'mark.bold.toggle'>('mark.bold.toggle');
    // @ts-expect-error: the model installs no italic command.
    useCommandState<Commands>('mark.italic.toggle');
    // @ts-expect-error: `mark.bold.toggle` takes no payload.
    useCommandState<Commands, 'mark.bold.toggle'>('mark.bold.toggle', { level: 1 });
    useCommandState('block.move.up');
    // @ts-expect-error: the default map names only the core's commands.
    useCommandState('link.set', { href: 'https://frontify.com', openInNewWindow: false, styleId: null });
    useCommandState<CommandsOfPart<typeof spotlightEditor>>('fixture.spotlight.toggle');
    // @ts-expect-error: the plugin declares no such command.
    useCommandState<CommandsOfPart<typeof spotlightEditor>>('fixture.spotlight.unknown');
};

// The types that public plugin types reference are importable from the package root.
export type Referenced = [
    BlockDecoration,
    BlockDecorationSource,
    DecoratedBlock,
    EditorOverlay,
    NodePending,
    NodeViewContext,
];

// A command whose `run` takes a payload declares it.
export const authored = defineEditorPart(core, {
    needs: ['attributes', 'marks'],
    commands: {
        'acme.plain': { run: (api) => api.marks.toggle('bold') },
        'acme.level': {
            payload: { fields: { level: { type: 'integer' } } },
            run: (api, payload: { level: number }) => api.attributes.set('heading', payload),
        },
        'acme.undeclared': {
            // @ts-expect-error: `run` takes a payload that `payload` does not declare.
            run: (api, payload: { level: number }) => api.attributes.set('heading', payload),
        },
        'acme.wrong': {
            payload: { fields: { level: { type: 'string' } } },
            // @ts-expect-error: `run` takes a number where `payload` declares a string.
            run: (api, payload: { level: number }) => api.attributes.set('heading', payload),
        },
    },
});

// @ts-expect-error: a command typed with a payload declares it.
export const bare: EditorCommand<{ level: number }> = { run: () => true };

// A toolbar entry has an accessible name: `labelKey`, or `label` with an `en-US` entry.
export const toolbar = defineEditorPart(core, {
    toolbar: [
        { id: 'keyed', kind: 'button', command: 'acme.plain', labelKey: 'RichTextEditor_bold', icon: 'IconLink' },
        { id: 'named', kind: 'button', command: 'acme.plain', label: { 'en-US': 'Plain' }, icon: 'IconLink' },
        // @ts-expect-error: neither `label` nor `labelKey` names the entry.
        { id: 'unnamed', kind: 'button', command: 'acme.plain', icon: 'IconLink' },
        // @ts-expect-error: `label` has no `en-US` entry.
        { id: 'foreign', kind: 'button', command: 'acme.plain', label: { 'de-DE': 'Schlicht' }, icon: 'IconLink' },
    ],
});
