/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorState } from 'prosemirror-state';

import { type EngineCommand } from '#/definition';
import { type Diagnostic, type ResourceLimits } from '#/model';

import { type AsyncOperation, type AsyncRequest } from '../../../async';
import { type SelectionHandle, type SessionToken } from '../../../types';

/** The `UploadService` shape the session calls, whose answers it checks as untrusted input. */
export interface UploadServiceLike {
    upload(
        request: { readonly operationId: string; readonly blob: Blob; readonly filename: string },
        context: {
            readonly signal: AbortSignal;
            readonly session: SessionToken;
            readonly reportProgress: (fraction: number) => void;
        },
    ): Promise<unknown>;
    releaseUnused(
        operationId: string,
        context: { readonly signal: AbortSignal; readonly session: SessionToken },
    ): Promise<void>;
}

/**
 * Why a file did not upload, which the editor says with how to fix it: its type, its size, its pixels, a size its
 * header does not tell, or an SVG that holds active content.
 */
export type UploadRejection = 'type' | 'size' | 'pixels' | 'unreadable' | 'unsafe';

/**
 * What the live region announces: once per gesture of chosen, pasted or dropped files, with each file refused and
 * the uploads it started, then once per upload's later start, end, failure or cancel.
 */
export type UploadEvent =
    | { readonly kind: 'started' | 'failed' | 'cancelled'; readonly name: string }
    | {
          readonly kind: 'completed';
          readonly name: string;
          readonly altMissing: boolean;
          /** Whether a replacement asks the author to review the alternative text it kept. */
          readonly review: boolean;
      }
    | {
          readonly kind: 'gesture';
          readonly refused: readonly { readonly name: string; readonly reason: UploadRejection }[];
          readonly started: readonly string[];
      };

/** Where chosen, pasted or dropped files go: new slots at the selection or a range, or the image `nodeId`. */
export type UploadPlace =
    | {
          readonly kind: 'insert';
          readonly origin: 'command' | 'paste' | 'drop';
          readonly range?: { readonly from: number; readonly to: number };
      }
    | { readonly kind: 'replace'; readonly nodeId: string };

/** What the uploads read of the session and run through it. */
export interface UploadHost {
    readonly state: () => EditorState;
    readonly limits: ResourceLimits;
    /** The media types `media.image` accepts. */
    readonly acceptTypes: readonly string[];
    readonly service: () => UploadServiceLike | undefined;
    readonly session: () => SessionToken;
    readonly generateId: () => string;
    /** Whether the policy lets `media.image` take this action. */
    readonly allows: (action: 'create' | 'edit' | 'paste') => boolean;
    readonly start: (request: AsyncRequest) => AsyncOperation;
    /** Aborts `operations` together, so none of them starts another waiting one. */
    readonly abort: (operations: readonly AsyncOperation[]) => void;
    readonly capture: (
        range: { readonly from: number; readonly to: number } | undefined,
    ) => SelectionHandle | undefined;
    readonly release: (target: SelectionHandle) => void;
    /** Runs `command` as the author's own undo step, from the state with the selection at `target` when set. */
    readonly run: (command: EngineCommand, target: SelectionHandle | undefined) => boolean;
    /** Applies a completion with no undo step, or returns why it cannot. */
    readonly fill: (command: EngineCommand) => string | undefined;
    /** Records on a replaced image the `assetId` its upload set. */
    readonly replaced: (nodeId: string, assetId: string) => void;
    readonly report: (diagnostic: Diagnostic) => void;
    readonly event: (event: UploadEvent) => void;
    /** The chrome reads a new status, such as a progress step. */
    readonly changed: () => void;
}

/** A file that passed the checks, with the name and size its slot starts with. */
export interface Checked {
    readonly file: File;
    readonly name: string;
    readonly width: number | null;
    readonly height: number | null;
}
