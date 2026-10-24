/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createUnmanagedStatus, type SaveCoordinator } from '../saves';
import {
    type CommitOptions,
    type CommitResult,
    type DocumentStamp,
    type SaveStatus,
    type ServerRevision,
} from '../types';

import { type Lifecycle } from './lifecycle';

export interface Saving {
    /** Installs the save coordinator; without one the session stays unmanaged. */
    attach(coordinator: SaveCoordinator | undefined): void;
    status(): SaveStatus;
    /** Whether the session has unsaved changes; an unmanaged one acknowledges only what it loaded. */
    unsaved(): boolean;
    /** Writes the document; an unmanaged session blocks. */
    commit(options: CommitOptions): Promise<CommitResult>;
    /** `EditorHandle.requestCommit`: blocks a managed session while its document is replaced. */
    request(options: CommitOptions): Promise<CommitResult>;
    changed(): void;
    settled(): void;
    dispose(): void;
    outcomeUnknown(): boolean;
    serviceChanged(): void;
    /** The session starts again from a loaded record with `revision`, after the `previous` stamp. */
    replaced(revision: ServerRevision | null, previous: DocumentStamp): void;
}

export const createSaving = (args: {
    revision: ServerRevision | null;
    sequence: () => number;
    lifecycle: Pick<Lifecycle, 'is'>;
}): Saving => {
    let unmanaged = createUnmanagedStatus(args.revision);
    let saves: SaveCoordinator | undefined;
    const commit = (options: CommitOptions): Promise<CommitResult> => {
        if (saves === undefined) {
            return Promise.resolve({ status: 'blocked', code: 'unmanaged' });
        }
        return saves.commit(options);
    };
    return {
        attach: (coordinator) => {
            saves = coordinator;
        },
        status: (): SaveStatus => {
            if (saves !== undefined) {
                return saves.status();
            }
            return unmanaged(args.sequence());
        },
        unsaved: () => {
            if (saves !== undefined) {
                return saves.unsaved();
            }
            return args.sequence() > 0;
        },
        commit,
        request: (options) => {
            // Only the replacement's own `save` writes while the document is replaced.
            if (saves !== undefined && args.lifecycle.is('transitioning')) {
                return Promise.resolve({ status: 'blocked', code: 'not-ready' });
            }
            return commit(options);
        },
        changed: () => saves?.changed(),
        settled: () => saves?.settled(),
        dispose: () => saves?.dispose(),
        outcomeUnknown: () => saves?.outcomeUnknown() === true,
        serviceChanged: () => saves?.serviceChanged(),
        replaced: (revision, previous) => {
            if (saves === undefined) {
                unmanaged = createUnmanagedStatus(revision);
            } else {
                saves.replaced(revision, previous);
            }
        },
    };
};
