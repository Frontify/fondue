/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorState, type Transaction } from 'prosemirror-state';

import { type Diagnostic } from '#/model';

import { type ExceededLimit } from '../limits';
import { type InputOutcome } from '../portTypes';
import { type CommandResult, type EditorSummary, type ReplaceResult } from '../types';

export type { InputOutcome };

export type Mode = EditorSummary['mode'];
export type RejectedCode = Extract<CommandResult, { status: 'rejected' }>['code'];
export type ReplaceCode = Extract<ReplaceResult, { status: 'rejected' }>['code'];

/** A batch checked against policy and limits and not installed, with how it maps positions. */
export type Candidate = {
    candidate: EditorState;
    root: Transaction;
    /** The root and what plugins appended to it. */
    transactions: readonly Transaction[];
    mapping: Transaction['mapping'];
    /** When the batch started, and how many transactions plugins appended to it. */
    started: number;
    appended: number;
};
/** What the `operationMetric` of a batch that changed the document reports. */
export type BatchMetric = Pick<Candidate, 'started' | 'appended'> & { kind: 'commit' | 'paste' };
/** A candidate, or why a batch cannot be installed. */
export type Prepared =
    | Candidate
    | {
          code: RejectedCode;
          diagnostic?: Diagnostic;
          fault?: Diagnostic;
          limit?: ExceededLimit | undefined;
      };
/** Who runs a command: a host call, a queued intent, or an async result. */
export type Route = 'host' | 'queue' | 'async' | 'node';
/** What a command would do now: nothing, a prepared batch, or a rejection. */
export type Attempt = Prepared | { unchanged: true };

export type Intent = {
    id: string;
    payload: unknown;
    options: unknown;
    depth: number;
    resolve: (result: CommandResult) => void;
};
