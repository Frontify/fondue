/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Diagnostic, type ResourceLimits } from '#/model';
import { type CompiledDefinition } from '#/runtime/definition';

import { type ContentChecks } from '../capabilities/checks/contentIssues';
import { createDomIds } from '../domIds';
import { type EditorRuntime, type RuntimeHandle } from '../runtime';

import { type Actions } from './actions';
import { type Columns } from './columns';
import { type Commands } from './commands';
import { type Commit } from './commit';
import { type Composition } from './composition';
import { type HistoryService } from './history';
import { type Identity } from './identity';
import { type Metrics } from './metrics';
import { type ModeService } from './mode';
import { type PolicyService } from './policy';
import { type Prepare } from './prepare';
import { type Shown } from './shown';
import { type Store } from './store';
import { type TargetsService } from './targets';
import { type ViewService } from './view';

/** What the editor layer and the bridge call: each member is the service that owns it, or one line over it. */
export const createFacade = (a: {
    handle: RuntimeHandle;
    definition: CompiledDefinition;
    limits: ResourceLimits;
    suggestionListId: string;
    interactionRoots: ReadonlySet<HTMLElement>;
    identity: Pick<Identity, 'session'>;
    store: Store;
    policy: Pick<PolicyService, 'current' | 'writeRefusal'>;
    view: Pick<ViewService, 'current' | 'nodeViews' | 'attach' | 'detach' | 'faultView'>;
    commit: Pick<Commit, 'select'>;
    prepare: Pick<Prepare, 'exceededLimit'>;
    report: (diagnostic: Diagnostic) => void;
    watch: EditorRuntime['watch'];
    targets: Pick<TargetsService, 'captureRange' | 'changeServices' | 'coordinator'>;
    commands: Pick<Commands, 'refusal' | 'perform'>;
    mode: Pick<ModeService, 'setDisabled'>;
    columns: Pick<Columns, 'set'>;
    actions: Pick<Actions, 'nodeActions'>;
    shown: Pick<Shown, 'emitSaveStatus'>;
    history: Pick<HistoryService, 'clear'>;
    composition: Pick<Composition, 'wait'>;
    metrics: Pick<Metrics, 'measure'>;
    checks: Pick<ContentChecks, 'run'>;
}): EditorRuntime => {
    const { handle, definition, limits, suggestionListId, interactionRoots, identity, store, policy, view } = a;
    const { commit, prepare, report, watch, targets, commands, mode, columns, actions, shown } = a;
    const { history, composition, metrics, checks } = a;

    return {
        handle,
        definition,
        suggestionListId,
        nextDomId: createDomIds(identity.session().sessionId),
        get view() {
            return view.current();
        },
        interactionRoots,
        get state() {
            return store.state;
        },
        get policy() {
            return policy.current();
        },
        get nodeViews() {
            return view.nodeViews;
        },
        limits,
        exceededLimit: prepare.exceededLimit,
        attach: view.attach,
        detach: view.detach,
        report,
        captureRange: (range, captureOptions) => targets.captureRange(captureOptions, range),
        refusal: commands.refusal,
        perform: commands.perform,
        select: commit.select,
        writeRefusal: policy.writeRefusal,
        watch,
        startAsync: targets.coordinator.start,
        changeServices: targets.changeServices,
        setDisabled: mode.setDisabled,
        setColumns: columns.set,
        faultView: view.faultView,
        nodeActions: actions.nodeActions,
        saveStatusChanged: shown.emitSaveStatus,
        clearHistory: () => history.clear(),
        afterInput: (settled, timeoutMs) => composition.wait(settled, timeoutMs),
        measure: (kind, started, failureCode) => metrics.measure(kind, started, failureCode),
        runChecks: () => checks.run(),
    };
};
