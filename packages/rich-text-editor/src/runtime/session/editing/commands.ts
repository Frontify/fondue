/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorState, type Transaction } from 'prosemirror-state';

import { type Diagnostic, isRecord } from '#/model';
import { diagnostic, findUnsafeJson, snapshot } from '#/model/internal';
import { type CompiledDefinition, type EngineCommand } from '#/runtime/definition';

import { type CommandResult, type CommandState, type SelectionHandle } from '../../types';
import { type Busy } from '../state/busy';
import { type Composition } from '../state/composition';
import { type Identity } from '../state/identity';
import { type Lifecycle } from '../state/lifecycle';
import { type ModeService } from '../state/mode';
import { type PolicyService } from '../state/policy';
import { type Store } from '../state/store';
import { type Candidate, type Prepared, type RejectedCode, type Route } from '../state/types';

import { createAttempt } from './commandAttempt';

type Checked = { payload: unknown } | undefined;
type Base = EditorState | RejectedCode;

/** A `rejected` command result with `code`. */
export const rejected = (code: RejectedCode): CommandResult => ({ status: 'rejected', code });

/** The payload as one frozen JSON copy, which is what is checked and run; `undefined` for one that is not plain JSON. */
export const checkedPayload = (given: unknown): Checked => {
    if (given !== undefined && findUnsafeJson(given, '') !== undefined) {
        return undefined;
    }

    return { payload: snapshot(given) };
};

export type Commands = {
    /** What `execute` would do now, judged by the same checks and without installing anything. */
    query(id: string, given?: unknown, options?: unknown): CommandState;
    /** `query` for a resolved command, payload and base state, which `execute` and the editor layer reuse. */
    queryOn(command: EngineCommand | undefined, checked: Checked, base: Base): CommandState;
    /** Runs the command `id` by `route`, rejecting with `unknown-command` for an unregistered one. */
    run(id: string, given: unknown, options: unknown, route: Route): CommandResult;
    /** Runs `command` on the state `base` returns, and rejects as `busy` while a commit or notification is in progress. */
    runOn(command: EngineCommand | undefined, checked: Checked, base: () => Base, route: Route): CommandResult;
    /** The host's entry to `run`; with `focus: 'editor'` in `options` it then focuses the surface. */
    execute(id: string, given?: unknown, options?: unknown): CommandResult;
    /** Why the session or policy refuses `command` on `base` before it runs, or `undefined`. */
    refusal(command: EngineCommand, base: EditorState, payload: unknown): RejectedCode | undefined;
    /** Runs `command` with no payload as a host call, on the state at `options.target` when given. */
    perform(command: EngineCommand, options?: { target?: SelectionHandle }): CommandResult;
};

/** The services the session's commands read. */
type CommandArgs = {
    definition: CompiledDefinition;
    store: Store;
    identity: Identity;
    lifecycle: Lifecycle;
    mode: ModeService;
    policy: Pick<PolicyService, 'refusal'>;
    busy: Pick<Busy, 'run' | 'isBusy'>;
    composition: Pick<Composition, 'active'>;
    commit: {
        prepare(root: Transaction, ids: () => string, fromView: boolean): Prepared;
        install(prepared: Candidate): boolean;
        installedId(): string;
        queriedIds(): () => string;
    };
    baseOf: (options: unknown) => Base;
    focus: () => void;
    report: (diagnostic: Diagnostic) => void;
    fault: (diagnostic: Diagnostic) => void;
    inRender: () => boolean | undefined;
    commandHost: unknown;
    runtime: () => unknown;
};

/** The command arguments, the session a plugin reads, and the shared attempt. */
type CommandContext = CommandArgs & {
    session: object;
    attempt: ReturnType<typeof createAttempt>;
};

const queryCommand = (
    context: CommandContext,
    command: EngineCommand | undefined,
    checked: Checked,
    base: Base,
): CommandState => {
    let active: boolean | 'mixed' = false;
    if (command !== undefined && checked !== undefined && typeof base !== 'string') {
        active = command.active(base, checked.payload, { defer: () => undefined, session: context.session });
    }

    const attempted = context.attempt(command, checked, base, context.commit.queriedIds(), 'host');
    if ('code' in attempted) {
        return { enabled: false, active, disabledReason: attempted.code };
    }

    return { enabled: true, active, disabledReason: null };
};

// Installs exactly what `query` checked, so the two agree.
const runCommand = (
    context: CommandContext,
    command: EngineCommand | undefined,
    checked: Checked,
    base: () => Base,
    route: Route,
): CommandResult => {
    if (context.busy.isBusy()) {
        return rejected('busy');
    }

    const effects: (() => void)[] = [];
    const result = context.busy.run((): CommandResult => {
        const attempted = context.attempt(command, checked, base(), context.commit.installedId, route, effects);
        if ('unchanged' in attempted) {
            return { status: 'no-op', stamp: context.identity.stamp(), contentChanged: false };
        }

        if ('candidate' in attempted) {
            const before = context.identity.commitSequence();
            const contentChanged = context.commit.install(attempted);
            // The view faulted while it installed the batch, which a later fault or `dispose` from a listener leaves applied.
            if (context.identity.commitSequence() === before) {
                return rejected('not-ready');
            }

            return { status: 'applied', stamp: context.identity.stamp(), contentChanged };
        }

        if (attempted.diagnostic !== undefined) {
            context.report(attempted.diagnostic);
        }

        if (attempted.fault !== undefined) {
            context.fault(attempted.fault);
        }

        return rejected(attempted.code);
    });
    // Deferred effects, such as an overlay a plugin command opens, run once the command has run and its commit ended.
    if (result.status !== 'rejected') {
        for (const effect of effects) {
            effect();
        }
    }

    return result;
};

const executeCommand = (
    context: CommandContext,
    id: string,
    given: unknown,
    commandOptions: unknown,
): CommandResult => {
    // Commands belong in event handlers; a call inside a notification is already `busy`.
    if (!context.busy.isBusy() && context.inRender() === true) {
        context.report(diagnostic('react.execute-in-render', undefined, undefined, 'error'));

        return rejected('busy');
    }

    const result = runCommand(
        context,
        context.definition.commands.get(id),
        checkedPayload(given),
        () => context.baseOf(commandOptions),
        'host',
    );
    // Without `focus: 'editor'` a command leaves focus where it is.
    if (isRecord(commandOptions) && commandOptions.focus === 'editor') {
        context.focus();
    }

    return result;
};

export const createCommands = (a: CommandArgs): Commands => {
    // What a plugin command reads its session from; `runtime` is read when a command runs, after it exists.
    const commandSession = {
        get runtime() {
            return a.runtime();
        },
        host: a.commandHost,
    };
    const context: CommandContext = { ...a, session: commandSession, attempt: createAttempt(a, commandSession) };
    const queryOn: Commands['queryOn'] = (command, checked, base) => queryCommand(context, command, checked, base);
    const runOn: Commands['runOn'] = (command, checked, base, route) =>
        runCommand(context, command, checked, base, route);
    const run: Commands['run'] = (id, given, options, route) =>
        runOn(a.definition.commands.get(id), checkedPayload(given), () => a.baseOf(options), route);

    return {
        query: (id, given, options) => queryOn(a.definition.commands.get(id), checkedPayload(given), a.baseOf(options)),
        queryOn,
        run,
        runOn,
        execute: (id, given, commandOptions) => executeCommand(context, id, given, commandOptions),
        refusal: (command, base, payload) => {
            if (a.mode.refusesReadOnly(command)) {
                return 'readonly';
            }

            return a.policy.refusal(command, base, payload);
        },
        perform: (command, options) => runOn(command, { payload: undefined }, () => a.baseOf(options), 'host'),
    };
};
