/* (c) Copyright Frontify Ltd., all rights reserved. */

import { NodeSelection } from 'prosemirror-state';

import { COMMAND_META } from '#/definition';

import { documentApi } from './api/document';
import { positionsIn } from './api/shared';
import { type CommandOutcome, type DocumentApi } from './documentApi';
import { type EditorRuntime } from './runtime';
import { mediaOf } from './session/uploadsWiring';
import { type CommandResult } from './types';

export { contentChecksApi } from './api/checks';
export { type CommandSession, pluginCommand, type PluginCommandSpec } from './api/commands';
export { positionsOf, rangeOf } from './api/shared';
export { type CommandContext } from '#/definition';

/** What a command's result says to plugin code: its status, and the code of a refusal. */
const outcomeOf = (result: CommandResult): CommandOutcome => {
    if (result.status === 'rejected') {
        return { status: 'rejected', code: result.code };
    }

    return { status: result.status };
};

/** The document API over the live session, whose writes each commit as one undo step. */
export const liveDocumentApi = (runtime: EditorRuntime): DocumentApi => {
    const { definition } = runtime;

    return documentApi({
        model: definition.model,
        schema: definition.schema,
        lookup: (id) => definition.commands.get(id),
        limits: runtime.limits,
        state: () => runtime.state,
        resolve: (range) => positionsIn(range, runtime.state.doc),
        // A command origin makes each write its own undo step, apart from the typing before it.
        edit: (command, payload) =>
            outcomeOf(
                runtime.perform({
                    run: (state, dispatch) =>
                        command.run(
                            state,
                            (transaction) => dispatch?.(transaction.setMeta(COMMAND_META, null)),
                            payload,
                        ),
                    active: () => false,
                }),
            ),
        refusal: (before, transaction) => runtime.writeRefusal(before, transaction),
        refused: () => undefined,
        execute: (id, payload, options) => runtime.handle.execute(id, payload, options),
        query: (id, payload, options) => runtime.handle.query(id, payload, options),
        capture: (range, options) => {
            if (range === undefined) {
                const captured = runtime.handle.captureTarget(options);

                return captured.status === 'captured' ? captured.target : undefined;
            }

            const positions = positionsIn(range, runtime.state.doc);
            if (positions === undefined) {
                return undefined;
            }

            const captured = runtime.captureRange(positions, options);

            return captured.status === 'captured' ? captured.target : undefined;
        },
        release: (target) => runtime.handle.releaseTarget(target),
        select: (transaction, scroll) => {
            const { selection } = transaction;
            if (selection instanceof NodeSelection) {
                runtime.select({ node: selection.from, scroll });
            } else {
                runtime.select({
                    anchor: selection.anchor,
                    head: selection.head,
                    scroll,
                });
            }

            return true;
        },
        policy: () => runtime.policy,
        editable: () => {
            const { phase, mode } = runtime.handle.getSummary();

            return phase === 'ready' && mode === 'editable';
        },
        positionAt: (element) => {
            const { view } = runtime;
            if (view === undefined || !view.dom.contains(element)) {
                return undefined;
            }

            return view.posAtDOM(element, 0);
        },
        document: () => runtime.handle.getSnapshot().document,
        later: (effect) => effect(),
        uploads: () => mediaOf(runtime)?.uploads,
    });
};
