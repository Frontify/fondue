/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Transaction } from 'prosemirror-state';

import { type Diagnostic } from '#/model';
import { diagnostic } from '#/model/internal';
import { ORIGIN_META } from '#/runtime/definition';

import { secondCopyInView } from '../../guards/engines';
import { ENTER_RULES_META } from '../../inputRules/inputRules';
import { type Busy } from '../state/busy';
import { type Lifecycle } from '../state/lifecycle';
import { type Store } from '../state/store';
import { type Candidate, type Prepared } from '../state/types';

import { actionOrigin } from './history';
import { DUPLICATE_ENGINE, type Prepare } from './prepare';

/** What committing a root reads besides that flag and those deferred roots. */
type CommitQueueArgs = {
    lifecycle: Pick<Lifecycle, 'is'>;
    store: Pick<Store, 'state'>;
    prepare: Pick<Prepare, 'take' | 'markRules'>;
    busy: Pick<Busy, 'run'>;
    report: (diagnostic: Diagnostic) => void;
    fault: (diagnostic: Diagnostic) => void;
    publish(candidate: Candidate): boolean;
};

/** The commit-queue arguments, the typing flag, and the roots deferred while an install runs. */
type CommitQueueContext = CommitQueueArgs & {
    typing: boolean;
    installing: boolean;
    deferred: Transaction[];
};

const guardInstall = <T>(context: CommitQueueContext, work: () => T): T => {
    context.installing = true;
    let result: T;
    try {
        result = work();
    } finally {
        context.installing = false;
    }

    for (let next = context.deferred.shift(); next !== undefined; next = context.deferred.shift()) {
        // A listener of this install may have faulted or disposed the session, which then commits nothing more.
        if (!context.lifecycle.is('ready')) {
            context.deferred.length = 0;
            break;
        }

        commitRoot(context, next);
    }

    return result;
};

const commitRoot = (context: CommitQueueContext, root: Transaction) => {
    // A plugin view's `update` may dispatch inside `view.updateState`; its root waits for the install to publish.
    if (context.installing) {
        context.deferred.push(root);

        return;
    }

    // A recorded `beforeinput` describes this batch only, accepted or not.
    const typed = context.typing;
    context.typing = false;
    // A faulted session installs nothing more, so a broken view never updates again.
    if (context.lifecycle.is('faulted', 'disposed')) {
        return;
    }

    if (root.before !== context.store.state.doc) {
        context.report(diagnostic('runtime.stale-transaction', undefined, undefined, 'error'));

        return;
    }

    // Input rules fire only on typed text, never on a paste or a command after a `beforeinput` that changed nothing.
    if (typed && actionOrigin(root) === undefined) {
        root.setMeta(ORIGIN_META, 'input');
        context.prepare.markRules(root);
    } else if (root.getMeta(ENTER_RULES_META) === true) {
        context.prepare.markRules(root);
    }

    context.busy.run(() => {
        const prepared: Prepared = context.prepare.take(root);
        if ('candidate' in prepared) {
            guardInstall(context, () => context.publish(prepared));
        } else if (prepared.fault !== undefined) {
            context.fault(prepared.fault);
        } else if (prepared.diagnostic !== undefined) {
            context.report(prepared.diagnostic);
        }

        if (secondCopyInView(context.store.state.schema)) {
            context.report(DUPLICATE_ENGINE);
        }
    });
};

/** The typing flag and the roots deferred while an install runs. */
export const createCommitQueue = (a: CommitQueueArgs) => {
    const context: CommitQueueContext = {
        ...a,
        typing: false,
        installing: false,
        deferred: [],
    };

    return {
        guarded: <T>(work: () => T) => guardInstall(context, work),
        commit: (root: Transaction) => commitRoot(context, root),
        markTyping: () => {
            context.typing = true;
        },
        clearDeferred: () => {
            context.deferred.length = 0;
        },
    };
};
