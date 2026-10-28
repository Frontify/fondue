/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node } from 'prosemirror-model';
import { type EditorState, NodeSelection, TextSelection, type Transaction } from 'prosemirror-state';
import { type EditorView } from 'prosemirror-view';

import { type Diagnostic, type RichTextDocument } from '#/model';
import { COMMAND_META, NORMALIZE_META } from '#/runtime/definition';

import { scrollSelectionIntoView } from '../../dom/scroll';
import { type RuntimeEvents } from '../../reporting/events';
import { countTargets, restoreTargets } from '../../statePlugins/targets';
import { type ChangeOrigin } from '../../types';
import { type Busy } from '../state/busy';
import { type Identity } from '../state/identity';
import { type Lifecycle } from '../state/lifecycle';
import { type Metrics } from '../state/metrics';
import { type PolicyService } from '../state/policy';
import { type Shown } from '../state/shown';
import { type Store } from '../state/store';
import { type BatchMetric, type Candidate } from '../state/types';

import { createCommitQueue } from './commitQueue';
import { originOf } from './history';
import { type Prepare } from './prepare';
import { type ViewService } from './view';

type SelectTarget = { anchor: number; head: number; scroll?: boolean } | { node: number; scroll?: boolean };

export type Commit = {
    /** The view's `dispatchTransaction`: the one path by which any change reaches the view. */
    commit(root: Transaction): void;
    /** Publishes a checked batch, then commits the roots that plugin views dispatched while it was installed. */
    install(candidate: Candidate): boolean;
    /** `false` when the view threw and the session faulted. */
    installState(next: EditorState): boolean;
    /** Runs `work`, which installs states, then commits the roots that plugin views dispatched meanwhile. */
    guarded<T>(work: () => T): T;
    /** Repairs the provisional batches, then checks them as one change from the published document; `false` on a fault. */
    settleProvisional(mapping: Transaction['mapping']): boolean;
    /** Commits a selection change, and scrolls it into view when `scroll` is set. */
    select(target: SelectTarget): void;
    /** Records a `beforeinput`, which the next committed batch takes as typing. */
    markTyping(): void;
    /** Drops the roots that wait for an install to finish. */
    clearDeferred(): void;
};

/** The services that install a batch and publish it. */
type CommitArgs = {
    store: Store;
    identity: Pick<Identity, 'bumpSequence' | 'bumpCommit' | 'commitSequence' | 'stamp'>;
    lifecycle: Pick<Lifecycle, 'is'>;
    policy: Pick<PolicyService, 'breaks' | 'exceeds'>;
    shown: Pick<Shown, 'published' | 'setPublished' | 'addProvisional' | 'emitSelection' | 'emitSaveStatus'>;
    views: Pick<ViewService, 'current' | 'call'>;
    busy: Pick<Busy, 'run'>;
    metrics: Pick<Metrics, 'record'>;
    prepare: Pick<Prepare, 'prepare' | 'installedId' | 'isProvisional' | 'markRules' | 'take'>;
    encode: (doc: Node) => RichTextDocument;
    emit: <K extends 'documentChange'>(event: K, value: RuntimeEvents[K]) => void;
    notify: () => void;
    report: (diagnostic: Diagnostic) => void;
    resources: { targets: number };
    /** What an effective change tells the capabilities, in the Event order, which `announce` calls. */
    hooks: { committed(transactions: readonly Transaction[], fromHistory: boolean): void; changed(): void };
    fault: (diagnostic: Diagnostic) => void;
    viewFault: (attached: EditorView, candidate: EditorState) => void;
};

/**
 * Publishes the current state's document: counts an effective change, notifies selector stores, then emits the
 * change, the selection and the save status in the Event order.
 */
const announceChange = (
    a: CommitArgs,
    origin: ChangeOrigin,
    commandId: string | null,
    batch: BatchMetric,
    transactions: readonly Transaction[] = [],
): boolean => {
    const previous = a.shown.published();
    const current = a.store.state;
    a.shown.setPublished(current);
    // An effective change compares documents by node equality, never by serializing them.
    const changed = !current.doc.eq(previous.doc);
    if (changed) {
        a.identity.bumpSequence();
    }

    a.notify();
    if (changed) {
        let document: RichTextDocument | undefined;
        a.emit('documentChange', {
            stamp: a.identity.stamp(),
            commitSequence: a.identity.commitSequence(),
            origin,
            commandId,
            readDocument: () => {
                if (document === undefined) {
                    document = a.encode(current.doc);
                }

                return document;
            },
        });
        a.metrics.record(batch);
        a.hooks.committed(transactions, origin === 'history');
    }

    a.shown.emitSelection();
    if (changed) {
        a.hooks.changed();
    }

    a.shown.emitSaveStatus();

    return changed;
};

const installEditorState = (a: CommitArgs, next: EditorState): boolean => {
    const previous = a.store.state;
    a.store.set(next);
    const attached = a.views.current();
    if (attached !== undefined && a.views.call(() => attached.updateState(next)).threw) {
        a.store.set(previous);
        a.viewFault(attached, next);

        return false;
    }

    a.identity.bumpCommit();
    a.resources.targets += countTargets(next) - countTargets(previous);

    return true;
};

/** Installs a batch in the view and counts it, then publishes it, or keeps a provisional batch for input settling. */
const publishCandidate = (
    a: CommitArgs,
    { candidate, root, transactions, mapping, started, appended }: Candidate,
): boolean => {
    if (!installEditorState(a, candidate)) {
        return false;
    }

    if (a.prepare.isProvisional(root)) {
        a.shown.addProvisional(mapping);
        a.notify();

        return false;
    }

    const origin = originOf(root);
    const command: unknown = root.getMeta(COMMAND_META);
    let commandId: string | null = null;
    if (origin === 'command' && typeof command === 'string') {
        commandId = command;
    }

    const event: unknown = root.getMeta('uiEvent');
    let kind: BatchMetric['kind'] = 'commit';
    if (event === 'paste' || event === 'drop') {
        kind = 'paste';
    }

    return announceChange(a, origin, commandId, { kind, started, appended }, transactions);
};

const settleInput = (a: CommitArgs, mapping: Transaction['mapping']): boolean => {
    const started = Date.now();
    let appended = 0;
    // The repair runs inside the append limit before the settled batch publishes, and the check below judges it.
    const repaired = a.prepare.prepare(a.store.state.tr.setMeta(NORMALIZE_META, 'now'), a.prepare.installedId, false);
    if ('fault' in repaired && repaired.fault !== undefined) {
        a.fault(repaired.fault);

        return false;
    }

    if ('diagnostic' in repaired && repaired.diagnostic !== undefined) {
        a.report(repaired.diagnostic);
    }

    if ('candidate' in repaired && repaired.candidate.doc !== a.store.state.doc) {
        if (!installEditorState(a, repaired.candidate)) {
            return false;
        }

        mapping.appendMapping(repaired.mapping);
        appended = repaired.appended;
    }

    if (
        !a.policy.breaks(a.shown.published().doc, a.store.state.doc, mapping) &&
        a.policy.exceeds(a.store.state.doc, a.shown.published().doc) === undefined
    ) {
        announceChange(a, 'input', null, { kind: 'commit', started, appended });

        return true;
    }

    // Targets released during the composition stay released, and those captured during it stay.
    const restore = restoreTargets(a.shown.published(), a.store.state, mapping);
    let restored = a.shown.published();
    if (restore !== undefined) {
        restored = restored.apply(restore);
    }

    if (!installEditorState(a, restored)) {
        return false;
    }

    a.notify();

    return true;
};

const selectCommitted = (a: CommitArgs, commit: (root: Transaction) => void, target: SelectTarget) => {
    const { doc } = a.store.state;
    let transaction = a.store.state.tr;
    if ('node' in target) {
        transaction = transaction.setSelection(NodeSelection.create(doc, target.node));
    } else {
        transaction = transaction.setSelection(TextSelection.create(doc, target.anchor, target.head));
    }

    commit(transaction);
    const view = a.views.current();
    if (target.scroll !== true || view === undefined) {
        return;
    }

    // ProseMirror scrolls to the selection only while the browser's selection is in the surface, and a
    // panel that asks for this keeps focus.
    scrollSelectionIntoView(view, a.store.state.selection);
};

const createInstaller = (a: CommitArgs) =>
    [
        (next: EditorState) => installEditorState(a, next),
        (candidate: Candidate) => publishCandidate(a, candidate),
        (mapping: Transaction['mapping']) => settleInput(a, mapping),
    ] as const;

export const createCommit = (a: CommitArgs): Commit => {
    const [installState, publish, settleProvisional] = createInstaller(a);
    const queue = createCommitQueue({
        lifecycle: a.lifecycle,
        store: a.store,
        prepare: a.prepare,
        busy: a.busy,
        report: a.report,
        fault: a.fault,
        publish,
    });

    return {
        commit: queue.commit,
        install: (candidate) => queue.guarded(() => publish(candidate)),
        installState,
        guarded: queue.guarded,
        settleProvisional,
        select: (target) => selectCommitted(a, queue.commit, target),
        markTyping: queue.markTyping,
        clearDeferred: queue.clearDeferred,
    };
};
