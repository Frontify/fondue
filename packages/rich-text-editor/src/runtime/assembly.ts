/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorView } from 'prosemirror-view';

import { type ContentModel } from '#/model';
import { type EngineCommand } from '#/runtime/definition';

import { type ClipboardSession, connectClipboard } from './clipboard/session';
import { pluginCommand } from './editorApi';
import { type EditorPort } from './port';
import { engineOf } from './portEngine';
import { createEditorRuntime, type EditorRuntimeOptions, runtimeOfView } from './runtime';

export { RUNTIME_PLUGINS } from './capabilities';
export { clipboardPlugin, dropCursorPlugin, type FileIntake } from './clipboard/plugin';
export { pluginCommand } from './editorApi';
export { authoringOf } from './policy';
export { type EditorRuntimeOptions } from './runtime';

/** Starts a session, which the React layers hold as a port. */
export const createPort = (options: EditorRuntimeOptions): EditorPort => createEditorRuntime(options);

/** Wires the clipboard of the session behind `port`. */
export const connectClipboardTo = (port: EditorPort, session: ClipboardSession): void => {
    connectClipboard(engineOf(port), session);
};

/** The port of the session whose surface shows `view`, for a plugin that one definition shares between editors. */
export const portOfView = (view: EditorView): EditorPort | undefined => runtimeOfView(view);

/** Runs `command` in the session behind `port`, as an edit that no command ID names; `false` when it was rejected. */
export const performIn = (port: EditorPort, command: EngineCommand): boolean =>
    engineOf(port).perform(command).status !== 'rejected';

/** The engine command of a plugin command over the session's own schema and commands, which a file intake runs. */
export const sessionCommand = <A>(
    port: EditorPort,
    run: (api: A) => boolean,
    model: ContentModel,
    extend: Parameters<typeof pluginCommand<A>>[4],
): EngineCommand => {
    const { schema, commands } = engineOf(port).definition;

    return pluginCommand({ run }, model, schema, (id) => commands.get(id), extend);
};
