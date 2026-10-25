/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorState } from 'prosemirror-state';
import { type EditorView } from 'prosemirror-view';

import { type Diagnostic, type RichTextDocument } from '#/model';
import { diagnostic } from '#/model/format';

import { type RecoveryReceipt, type RecoveryService } from '../types';

import { type Composition } from './composition';
import { type Encoder } from './encode';
import { type Identity } from './identity';
import { type Lifecycle } from './lifecycle';
import { type Queue } from './queue';
import { type Saving } from './saving';
import { type Shown } from './shown';
import { type TargetsService } from './targets';
import { type ViewService } from './view';

export interface Faults {
    /** Ends editing for the session; after `dispose` it does nothing. */
    fault(found: Diagnostic): void;
    /** The view threw while it installed `candidate`: editing stops and the snapshot stays. */
    viewFault(attached: EditorView, candidate: EditorState): void;
    /** The document the view threw on, offered until `dispose`. */
    candidate(): RichTextDocument | null;
    hasRecovery(): boolean;
    /** Runs `work` while a view fault stores no recovery, as the next document of a replacement holds none of this session's work. */
    withoutRecovery<T>(work: () => T): T;
}

// The queue and the targets are built after the view that faults, so they are read lazily.
export const createFaults = (a: {
    lifecycle: Pick<Lifecycle, 'is' | 'to' | 'isDisposed' | 'ended'>;
    identity: Pick<Identity, 'session' | 'sequence'>;
    encode: Encoder['encode'];
    saving: Pick<Saving, 'status'>;
    composition: Pick<Composition, 'cancel'>;
    shown: Pick<Shown, 'takeProvisional'>;
    view: Pick<ViewService, 'refresh' | 'cancelReady'>;
    queue: () => Pick<Queue, 'settle'>;
    targets: () => Pick<TargetsService, 'coordinator'>;
    report: (diagnostic: Diagnostic) => void;
    recovery: () => RecoveryService | undefined;
}): Faults => {
    const { lifecycle, identity, encode, saving, composition, shown, view, queue, targets, report, recovery } = a;
    // The state the view threw on, which `candidate` offers until `dispose`.
    // ProseMirror runs that throwing update again on `setProps` and `destroy`.
    let recovered: EditorState | undefined;
    // Set while replacement step 8 installs the next document.
    let installingNext = false;
    const fault = (found: Diagnostic) => {
        if (lifecycle.isDisposed()) {
            return;
        }
        lifecycle.to('faulted');
        // A frame still pending would otherwise move the faulted session to ready.
        view.cancelReady();
        // A composition that settles later publishes nothing.
        composition.cancel();
        shown.takeProvisional();
        view.refresh();
        queue().settle('not-ready');
        report(found);
        // Results held for that settle are discarded now, as the faulted session takes none.
        const { coordinator } = targets();
        coordinator.settle();
        coordinator.abortWhere(() => true);
    };
    /** Stores the candidate of a view fault with the host's recovery service. */
    const storeRecovery = (candidate: EditorState) => {
        const service = recovery();
        if (service === undefined || lifecycle.isDisposed()) {
            return;
        }
        const checkpoint = {
            stamp: { ...identity.session(), sequence: identity.sequence() + 1 },
            acknowledgedRevision: saving.status().revision,
            document: encode(candidate.doc),
        };
        let stored: Promise<RecoveryReceipt>;
        try {
            stored = service.store(checkpoint, { signal: lifecycle.ended, session: identity.session() });
        } catch {
            return;
        }
        stored
            .then(({ receiptId }) => report(diagnostic('runtime.recovery-stored', undefined, { receiptId }, 'info')))
            // A store that fails leaves the candidate with `getRecoveryCandidate` only.
            .catch(() => undefined);
    };
    return {
        fault,
        viewFault: (attached, candidate) => {
            recovered = candidate;
            attached.dom.setAttribute('contenteditable', 'false');
            fault(diagnostic('runtime.view-fault', undefined, undefined, 'error'));
            if (!installingNext) {
                storeRecovery(candidate);
            }
        },
        candidate: () => {
            if (!lifecycle.is('faulted') || recovered === undefined) {
                return null;
            }
            return encode(recovered.doc);
        },
        hasRecovery: () => recovered !== undefined,
        withoutRecovery: (work) => {
            installingNext = true;
            const result = work();
            installingNext = false;
            return result;
        },
    };
};
