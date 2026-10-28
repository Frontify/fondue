/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorState, Selection } from 'prosemirror-state';

import { type CapabilityRef, type ResourceLimits, sameDocument, isRecord } from '#/model';
import { type TreeNode, decodeToTree, diagnostic } from '#/model/internal';
import { type CompiledDefinition } from '#/runtime/definition';

import { sameStamp } from '../../reporting/saves';
import { type ReplaceDocumentRequest, type ReplaceResult, type SessionToken } from '../../types';
import { type Commit } from '../editing/commit';
import { type Focus } from '../editing/focus';
import { type HistoryService } from '../editing/history';
import { type ViewService } from '../editing/view';
import { type Busy } from '../state/busy';
import { type Composition } from '../state/composition';
import { type Encoder } from '../state/encode';
import { type Identity } from '../state/identity';
import { type Lifecycle } from '../state/lifecycle';
import { type Metrics } from '../state/metrics';
import { type PolicyService } from '../state/policy';
import { type Shown } from '../state/shown';
import { type Store } from '../state/store';
import { type ReplaceCode } from '../state/types';

import { type Faults } from './faults';
import { type Queue } from './queue';
import { type Saving } from './saving';
import { type TargetsService } from './targets';
import { type SessionUploads } from './uploadsWiring';

export type Replace = {
    /** `EditorHandle.replaceDocument`: checks the request, settles unsaved work, then installs the document, stopping at the first step that fails. */
    replaceDocument(request: ReplaceDocumentRequest): Promise<ReplaceResult>;
};

const refused = (code: ReplaceCode): ReplaceResult => ({ status: 'rejected', code });

/** Applies the request's unsaved-work policy to a session with unsaved changes: `undefined` when the policy lets the replacement go on. */
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
        // A write whose outcome is unknown goes on to the unknown-outcome check, which refuses it.
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

/** The tree and capabilities of a request's document, or the refusal when its model or content is not acceptable. */
const checkedRequest = (
    definition: CompiledDefinition,
    limits: ResourceLimits,
    request: ReplaceDocumentRequest,
): ReplaceResult | { tree: TreeNode; requiredCapabilities: readonly CapabilityRef[] } => {
    const { document } = request.next;
    // The input is untrusted: only a record names a model, and `decodeToTree` judges any other input.
    if (isRecord(document) && isRecord(document.model) && document.model.id !== definition.model.ref.id) {
        return refused('wrong-model');
    }

    const { result, tree } = decodeToTree(document, definition.model, { limits });
    if (result.status !== 'editable' || tree === undefined) {
        return refused('invalid-document');
    }

    return { tree, requiredCapabilities: result.document.requiredCapabilities };
};

/** The services a document replacement reads. */
type ReplaceArgs = {
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
    uploads: Pick<SessionUploads['raw'], 'reset'>;
    faults: Pick<Faults, 'fault' | 'withoutRecovery'>;
    busy: Pick<Busy, 'run'>;
    events: { notify: () => void; emit: (event: 'replaced', value: SessionToken) => void };
    metrics: Pick<Metrics, 'measure'>;
    history: Pick<HistoryService, 'fresh'>;
};

/** Leaves `transitioning` after a failed step, so what waited runs on the unchanged session. */
const resumeAfter = (args: ReplaceArgs, code: ReplaceCode, focused: boolean): ReplaceResult => {
    // A listener may have faulted or disposed the session since the step began.
    if (args.lifecycle.is('transitioning')) {
        args.lifecycle.to('ready');
    }

    args.view.refresh();
    args.targets.coordinator.settle();
    args.saving.settled();
    args.queue.drain();
    args.focus.refocus(focused);

    return refused(code);
};

/**
 * The decoded document in a fresh state with empty history, in the next generation of the
 * session; a view that throws while it installs the state faults the session.
 */
const installNext = (
    args: ReplaceArgs,
    request: ReplaceDocumentRequest,
    tree: TreeNode,
    stored: readonly CapabilityRef[],
    focused: boolean,
): ReplaceResult => {
    const fresh = freshState(args.definition, args.history, request, tree);
    if (fresh === undefined) {
        args.faults.fault(diagnostic('runtime.view-fault', undefined, undefined, 'error'));

        return refused('faulted');
    }

    const outgoing = args.store.state.doc;
    // Roots that plugin views dispatch while the state installs commit in the new generation.
    const installed = args.commit.guarded(() => {
        const published = args.faults.withoutRecovery(() => args.commit.installState(fresh));
        if (!published) {
            return false;
        }

        // Intents of the old generation end before anything can drain them into the next.
        args.queue.settle('wrong-session');
        const previous = args.identity.nextGeneration(request.next.documentId);
        args.shown.setPublished(args.store.state);
        args.encoder.capabilities = stored;
        args.policy.setCapabilities(args.encoder.capabilities);
        args.saving.replaced(request.next.revision, previous);
        // A plugin view may have faulted or disposed the session while the state installed.
        if (args.lifecycle.is('transitioning')) {
            args.lifecycle.to('ready');
        }

        args.view.refresh();

        return true;
    });
    if (!installed) {
        return refused('faulted');
    }

    // What the old generation started or queued ends now and changes nothing here.
    args.targets.coordinator.abortWhere(() => true);
    args.uploads.reset(outgoing);
    args.targets.coordinator.settle();
    args.busy.run(args.events.notify);
    args.shown.emitSelection();
    args.shown.emitSaveStatus();
    args.events.emit('replaced', args.identity.session());
    args.focus.refocus(focused);

    return { status: 'replaced', session: args.identity.session() };
};

const replaceDocument = async (args: ReplaceArgs, request: ReplaceDocumentRequest): Promise<ReplaceResult> => {
    if (!args.lifecycle.is('ready')) {
        return refused('not-ready');
    }

    const checked = checkedRequest(args.definition, args.limits, request);
    if ('status' in checked) {
        return checked;
    }

    const { next } = request;
    const { document } = next;
    const { tree, requiredCapabilities } = checked;

    // A host that echoes its own save gets the current session back with nothing changed; hashing waits for a checked document.
    if (
        next.documentId === args.identity.session().documentId &&
        next.revision === args.saving.status().revision &&
        sameDocument(document, args.shown.snapshot().document)
    ) {
        return { status: 'replaced', session: args.identity.session() };
    }

    if (!sameStamp(request.expected, args.identity.stamp())) {
        return refused('changed-since-request');
    }

    if (args.composition.active()) {
        return refused('composition-active');
    }

    const focused = args.view.current()?.hasFocus() === true;
    args.lifecycle.to('transitioning');
    args.view.refresh();
    if (args.saving.unsaved()) {
        const code = await leaveUnsaved(args.saving, args.identity, request.unsaved);
        // The session was disposed, or faulted, while the unsaved-work write ran.
        if (!args.lifecycle.is('transitioning')) {
            return refused('not-ready');
        }

        if (code !== undefined) {
            return resumeAfter(args, code, focused);
        }
    }

    if (args.saving.outcomeUnknown()) {
        return resumeAfter(args, 'save-unresolved', focused);
    }

    // A keystroke the view read while the unsaved-work step ran is kept, not replaced.
    if (!sameStamp(request.expected, args.identity.stamp())) {
        return resumeAfter(args, 'changed-since-request', focused);
    }

    return installNext(args, request, tree, requiredCapabilities, focused);
};

export const createReplace = (args: ReplaceArgs): Replace =>
    measured(args.metrics, (request) => replaceDocument(args, request));
