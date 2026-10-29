/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Diagnostic, type ResourceLimits } from '#/model';
import { type CompiledDefinition } from '#/runtime/definition';

import { type ContentChecks } from '../../capabilities/checks/contentIssues';
import { createDomIds } from '../../dom/domIds';
import { pluginError } from '../../reporting/events';
import { type EditorRuntime, type RuntimeHandle } from '../../runtime';
import { type Actions } from '../editing/actions';
import { type Commands } from '../editing/commands';
import { type Commit } from '../editing/commit';
import { type HistoryService } from '../editing/history';
import { type Prepare } from '../editing/prepare';
import { type ViewService } from '../editing/view';
import { type Columns } from '../state/columns';
import { type Composition } from '../state/composition';
import { type Identity } from '../state/identity';
import { type Metrics } from '../state/metrics';
import { type ModeService } from '../state/mode';
import { type PolicyService } from '../state/policy';
import { type Shown } from '../state/shown';
import { type Store } from '../state/store';

import { type TargetsService } from './targets';

/** What the editor layer and the bridge call: each member is the service that owns it, or one line over it. */
export const createFacade = (args: {
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
    notifyWatchers: () => void;
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
    const { handle, definition, limits, suggestionListId, interactionRoots, identity, store, policy, view } = args;
    const { commit, prepare, report, watch, notifyWatchers, targets, commands, mode, columns, actions, shown } = args;
    const { history, composition, metrics, checks } = args;

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
        reportPluginError: (error, featureId) => report(pluginError(error, featureId)),
        captureRange: (range, captureOptions) => targets.captureRange(captureOptions, range),
        refusal: commands.refusal,
        perform: commands.perform,
        select: commit.select,
        writeRefusal: policy.writeRefusal,
        watch,
        notifyWatchers,
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
