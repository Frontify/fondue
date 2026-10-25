/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorState, Selection } from 'prosemirror-state';

import { type CompiledDefinition } from '#/definition';
import { type CapabilityRef, type ResourceLimits, sameDocument, isRecord } from '#/model';
import { type TreeNode, decodeToTree, diagnostic } from '#/model/internal';

import { sameStamp } from '../saves';
import { type ReplaceDocumentRequest, type ReplaceResult, type SessionToken } from '../types';

import { type Busy } from './busy';
import { type Commit } from './commit';
import { type Composition } from './composition';
import { type Encoder } from './encode';
import { type Faults } from './faults';
import { type Focus } from './focus';
import { type HistoryService } from './history';
import { type Identity } from './identity';
import { type Lifecycle } from './lifecycle';
import { type Metrics } from './metrics';
import { type PolicyService } from './policy';
import { type Queue } from './queue';
import { type Saving } from './saving';
import { type Shown } from './shown';
import { type Store } from './store';
import { type TargetsService } from './targets';
import { type ReplaceCode } from './types';
import { type UploadService } from './uploads-wiring';
import { type ViewService } from './view';

export interface Replace {
    /** `EditorHandle.replaceDocument`: the Replacement steps in order, stopping at the first that fails. */
    replaceDocument(request: ReplaceDocumentRequest): Promise<ReplaceResult>;
}

const refused = (code: ReplaceCode): ReplaceResult => ({ status: 'rejected', code });

/** Replacement step 5 for a session with unsaved changes: `undefined` when the policy lets the replacement go on. */
const leaveUnsaved = async (
    saving: Pick<Saving, 'commit'>,
    identity: Pick<Identity, 'stamp'>,
    unsaved: ReplaceDocumentRequest['unsaved'],
): Promise<ReplaceCode | undefined> => {
    // A host in JavaScript may pass no policy at all.
    if (!isRecord(unsaved)) {
        return 'unsaved';
    }
    if (unsaved.action === 'save') {
        const result = await saving.commit({ reason: 'navigate' });
        // A write whose outcome is unknown goes on to step 6, which refuses it.
        if (result.status === 'acknowledged' || (result.status === 'failed' && result.outcome === 'unknown')) {
            return undefined;
        }
        return 'unsaved';
    }
    if (unsaved.action === 'checkpoint') {
        // A checkpoint with no receipt cannot hold the current stamp.
        if (!isRecord(unsaved.receipt) || !isRecord(unsaved.receipt.stamp)) {
            return 'unsaved';
        }
        if (sameStamp(unsaved.receipt.stamp, identity.stamp())) {
            return undefined;
        }
        return 'checkpoint-invalid';
    }
    if (unsaved.action === 'discard' && unsaved.confirmed === true) {
        return undefined;
    }
    return 'unsaved';
};

/** The decoded document in a state with empty history; `undefined` when the schema refuses the tree. */
const freshState = (
    definition: CompiledDefinition,
    history: Pick<HistoryService, 'fresh'>,
    request: ReplaceDocumentRequest,
    tree: TreeNode,
): EditorState | undefined => {
    try {
        const doc = definition.schema.nodeFromJSON(tree);
        let selection = Selection.atStart(doc);
        if (request.selection === 'end') {
            selection = Selection.atEnd(doc);
        }
        return history.fresh(doc, selection);
    } catch {
        return undefined;
    }
};

/** Reports the operation metric of each replacement, with the failure code of a refused one. */
const measured = (
    metrics: Pick<Metrics, 'measure'>,
    replace: (request: ReplaceDocumentRequest) => Promise<ReplaceResult>,
): Replace => ({
    replaceDocument: async (request) => {
        const started = Date.now();
        const result = await replace(request);
        let failureCode: string | null = null;
        if (result.status === 'rejected') {
            failureCode = result.code;
        }
        metrics.measure('replace', started, failureCode);
        return result;
    },
});

export const createReplace = (a: {
    definition: CompiledDefinition;
    limits: ResourceLimits;
    lifecycle: Pick<Lifecycle, 'is' | 'to'>;
    identity: Pick<Identity, 'session' | 'stamp' | 'nextGeneration'>;
    store: Store;
    encoder: Pick<Encoder, 'capabilities'>;
    policy: Pick<PolicyService, 'setCapabilities'>;
    saving: Pick<Saving, 'status' | 'commit' | 'unsaved' | 'outcomeUnknown' | 'replaced' | 'settled'>;
    composition: Pick<Composition, 'active'>;
    shown: Pick<Shown, 'snapshot' | 'setPublished' | 'emitSelection' | 'emitSaveStatus'>;
    view: Pick<ViewService, 'current' | 'refresh'>;
    commit: Pick<Commit, 'guarded' | 'installState'>;
    focus: Pick<Focus, 'refocus'>;
    targets: Pick<TargetsService, 'coordinator'>;
    queue: Pick<Queue, 'drain' | 'settle'>;
    uploads: Pick<UploadService['raw'], 'reset'>;
    faults: Pick<Faults, 'fault' | 'withoutRecovery'>;
    busy: Pick<Busy, 'run'>;
    events: { notify: () => void; emit: (event: 'replaced', value: SessionToken) => void };
    metrics: Pick<Metrics, 'measure'>;
    history: Pick<HistoryService, 'fresh'>;
}): Replace => {
    const { definition, limits, lifecycle, identity, store, encoder, policy, saving, composition, shown } = a;
    const { view, commit, focus, targets, queue, uploads, faults, busy, events, metrics, history } = a;
    const { coordinator } = targets;

    /** Leaves `transitioning` after a failed step, so what waited runs on the unchanged session. */
    const resume = (code: ReplaceCode, focused: boolean): ReplaceResult => {
        // A listener may have faulted or disposed the session since the step began.
        if (lifecycle.is('transitioning')) {
            lifecycle.to('ready');
        }
        view.refresh();
        coordinator.settle();
        saving.settled();
        queue.drain();
        focus.refocus(focused);
        return refused(code);
    };

    /**
     * Replacement step 8: the decoded document in a fresh state with empty history, in the next generation of the
     * session; a view that throws while it installs the state faults the session.
     */
    const installNext = (
        request: ReplaceDocumentRequest,
        tree: TreeNode,
        stored: readonly CapabilityRef[],
        focused: boolean,
    ): ReplaceResult => {
        const fresh = freshState(definition, history, request, tree);
        if (fresh === undefined) {
            faults.fault(diagnostic('runtime.view-fault', undefined, undefined, 'error'));
            return refused('faulted');
        }
        const outgoing = store.state.doc;
        // Roots that plugin views dispatch while the state installs commit in the new generation.
        const installed = commit.guarded(() => {
            const published = faults.withoutRecovery(() => commit.installState(fresh));
            if (!published) {
                return false;
            }
            // Intents of the old generation end before anything can drain them into the next.
            queue.settle('wrong-session');
            const previous = identity.nextGeneration(request.next.documentId);
            shown.setPublished(store.state);
            encoder.capabilities = stored;
            policy.setCapabilities(encoder.capabilities);
            saving.replaced(request.next.revision, previous);
            // A plugin view may have faulted or disposed the session while the state installed.
            if (lifecycle.is('transitioning')) {
                lifecycle.to('ready');
            }
            view.refresh();
            return true;
        });
        if (!installed) {
            return refused('faulted');
        }
        // What the old generation started or queued ends now and changes nothing here.
        coordinator.abortWhere(() => true);
        uploads.reset(outgoing);
        coordinator.settle();
        busy.run(events.notify);
        shown.emitSelection();
        shown.emitSaveStatus();
        events.emit('replaced', identity.session());
        focus.refocus(focused);
        return { status: 'replaced', session: identity.session() };
    };

    const replace = async (request: ReplaceDocumentRequest): Promise<ReplaceResult> => {
        if (!lifecycle.is('ready')) {
            return refused('not-ready');
        }
        const { next } = request;
        const { document } = next;
        // The input is untrusted: only a record names a model, and `decodeToTree` judges any other input.
        if (isRecord(document) && isRecord(document.model) && document.model.id !== definition.model.ref.id) {
            return refused('wrong-model');
        }
        const { result, tree } = decodeToTree(document, definition.model, { limits });
        if (result.status !== 'editable' || tree === undefined) {
            return refused('invalid-document');
        }
        // A host that echoes its own save gets the current session back with nothing changed; hashing waits for a checked document.
        if (
            next.documentId === identity.session().documentId &&
            next.revision === saving.status().revision &&
            sameDocument(document, shown.snapshot().document)
        ) {
            return { status: 'replaced', session: identity.session() };
        }
        if (!sameStamp(request.expected, identity.stamp())) {
            return refused('changed-since-request');
        }
        if (composition.active()) {
            return refused('composition-active');
        }
        const focused = view.current()?.hasFocus() === true;
        lifecycle.to('transitioning');
        view.refresh();
        if (saving.unsaved()) {
            const code = await leaveUnsaved(saving, identity, request.unsaved);
            // The session was disposed, or faulted, while the step 5 write ran.
            if (!lifecycle.is('transitioning')) {
                return refused('not-ready');
            }
            if (code !== undefined) {
                return resume(code, focused);
            }
        }
        if (saving.outcomeUnknown()) {
            return resume('save-unresolved', focused);
        }
        // A keystroke the view read during step 5 is kept, not replaced.
        if (!sameStamp(request.expected, identity.stamp())) {
            return resume('changed-since-request', focused);
        }
        return installNext(request, tree, result.document.requiredCapabilities, focused);
    };

    return measured(metrics, replace);
};
