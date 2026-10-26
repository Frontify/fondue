/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorState } from 'prosemirror-state';

import { type Diagnostic, type ResourceLimits } from '#/model';
import { type EngineCommand } from '#/runtime/definition';

import { type AsyncOperation, type AsyncRequest } from '../../../async/async';
import { type UploadEvent, type UploadPlace, type UploadRejection } from '../../../portTypes';
import { type SelectionHandle, type SessionToken } from '../../../types';

/** The `UploadService` shape the session calls, whose answers it checks as untrusted input. */
export type UploadServiceLike = {
    upload(
        request: { operationId: string; blob: Blob; filename: string },
        context: {
            signal: AbortSignal;
            session: SessionToken;
            reportProgress: (fraction: number) => void;
        },
    ): Promise<unknown>;
    releaseUnused(operationId: string, context: { signal: AbortSignal; session: SessionToken }): Promise<void>;
};

export type { UploadEvent, UploadPlace, UploadRejection };

/** What the uploads read of the session and run through it. */
export type UploadHost = {
    state: () => EditorState;
    limits: ResourceLimits;
    /** The media types `media.image` accepts. */
    acceptTypes: readonly string[];
    service: () => UploadServiceLike | undefined;
    session: () => SessionToken;
    generateId: () => string;
    /** Whether the policy lets `media.image` take this action. */
    allows: (action: 'create' | 'edit' | 'paste') => boolean;
    start: (request: AsyncRequest) => AsyncOperation;
    /** Aborts `operations` together, so none of them starts another waiting one. */
    abort: (operations: readonly AsyncOperation[]) => void;
    capture: (range: { from: number; to: number } | undefined) => SelectionHandle | undefined;
    release: (target: SelectionHandle) => void;
    /** Runs `command` as the author's own undo step, from the state with the selection at `target` when set. */
    run: (command: EngineCommand, target: SelectionHandle | undefined) => boolean;
    /** Applies a completion with no undo step, or returns why it cannot. */
    fill: (command: EngineCommand) => string | undefined;
    /** Records on a replaced image the `assetId` its upload set. */
    replaced: (nodeId: string, assetId: string) => void;
    report: (diagnostic: Diagnostic) => void;
    event: (event: UploadEvent) => void;
    /** The chrome reads a new status, such as a progress step. */
    changed: () => void;
};

/** A file that passed the checks, with the name and size its slot starts with. */
export type Checked = {
    file: File;
    name: string;
    width: number | null;
    height: number | null;
};
